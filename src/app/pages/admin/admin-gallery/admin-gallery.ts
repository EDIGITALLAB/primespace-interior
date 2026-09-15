import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AdminDataService, AdminProject, AdminBlock, BlockPhoto } from '../../../services/admin-data.service';
import { ConfirmModal } from '../../../components/confirm-modal/confirm-modal';

@Component({
  selector: 'app-admin-gallery',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ConfirmModal],
  templateUrl: './admin-gallery.html',
  styleUrl: './admin-gallery.css'
})
export class AdminGallery {
  adminData = inject(AdminDataService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);

  get projectVideos(): string[] {
    const proj = this.selectedProject;
    if (!proj) return [];
    if (proj.videoUrls && proj.videoUrls.length > 0) {
      return proj.videoUrls.filter(v => v && v.trim());
    }
    if (proj.videoUrl && proj.videoUrl.trim()) {
      return [proj.videoUrl.trim()];
    }
    return [];
  }

  isYouTubeUrl(url: string): boolean {
    if (!url) return false;
    return url.includes('youtube.com') || url.includes('youtu.be');
  }

  extractYouTubeId(url: string): string {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : '';
  }

  getSafeYouTubeUrl(url: string): SafeResourceUrl {
    const videoId = this.extractYouTubeId(url);
    const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=0` : url;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  isPlaying(videoEl: HTMLVideoElement): boolean {
    return !!(videoEl && !videoEl.paused && !videoEl.ended);
  }

  toggleVideoPlay(videoEl: HTMLVideoElement) {
    if (!videoEl) return;
    if (videoEl.paused) {
      if (typeof document !== 'undefined') {
        const allVideos = document.querySelectorAll('video');
        allVideos.forEach(v => {
          if (v !== videoEl) v.pause();
        });
      }
      videoEl.play();
    } else {
      videoEl.pause();
    }
  }

  onVideoPlay(event: Event) {
    const playingVid = event.target as HTMLVideoElement;
    if (typeof document !== 'undefined' && playingVid) {
      const allVideos = document.querySelectorAll('video');
      allVideos.forEach(v => {
        if (v !== playingVid) v.pause();
      });
    }
  }

  deleteVideo(index: number) {
    this.openDeleteVideoModal(index);
  }

  // Selected Apartment Project & Block
  selectedProjectId = signal<string>('');
  selectedBlockId = signal<string>('');

  // Category filter tag
  activeRoomTag = signal<string>('All');

  // Add Photo Modal & Drag State
  showAddPhotoModal = signal(false);
  isDragging = signal(false);
  photoUrlInput = signal('');
  photoCaption = signal('');
  photoCategory = signal<string>('Living Room');
  selectedImagesList = signal<string[]>([]);

  // Add Block Modal
  showAddBlockModal = signal(false);
  newBlockName = signal('');

  // Add Category Modal
  showAddCategoryModal = signal(false);
  newCategoryName = signal('');
  newBlockHomes = signal(4);

  // Delete Confirmation Modal State
  showDeleteModal = signal(false);
  deleteType = signal<'photo' | 'video'>('photo');
  deletingPhotoId = signal('');
  deletingVideoIndex = signal<number | null>(null);
  deletingItemName = signal('');

  constructor() {
    this.route.queryParams.subscribe(params => {
      const qProjId = params['projectId'];
      if (qProjId) {
        this.selectedProjectId.set(qProjId);
      }
      this.syncSelectedProjectFromParamsOrFirst();
    });

    this.adminData.loadProjectsFromBackend().subscribe(() => {
      this.syncSelectedProjectFromParamsOrFirst();
    });
  }

  private syncSelectedProjectFromParamsOrFirst() {
    const projList = this.adminData.projects();
    if (!projList || projList.length === 0) return;

    const qProjId = this.route.snapshot.queryParams['projectId'] || this.selectedProjectId();

    if (qProjId && projList.some(p => p.id === qProjId.toString())) {
      const matched = projList.find(p => p.id === qProjId.toString())!;
      this.selectedProjectId.set(matched.id);

      const currentBlockId = this.selectedBlockId();
      if (!currentBlockId || !matched.blocks.some(b => b.id === currentBlockId)) {
        if (matched.blocks.length > 0) {
          this.selectedBlockId.set(matched.blocks[0].id);
        } else {
          this.selectedBlockId.set('');
        }
      }
    }
  }

  get projectsList(): AdminProject[] {
    return this.adminData.projects();
  }

  get selectedProject(): AdminProject | undefined {
    return this.adminData.projects().find(p => p.id === this.selectedProjectId());
  }

  get selectedBlock(): AdminBlock | undefined {
    const proj = this.selectedProject;
    if (!proj) return undefined;
    return proj.blocks.find(b => b.id === this.selectedBlockId());
  }

  get availableCategories(): string[] {
    const block = this.selectedBlock;
    if (!block) return ['All'];

    const catsSet = new Set<string>();

    if (block.categories && block.categories.length > 0) {
      block.categories.forEach(c => {
        if (c && c.trim()) {
          const cap = c.split(' ')
            .map(w => w ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : '')
            .join(' ');
          catsSet.add(cap);
        }
      });
    }

    if (block.photos && block.photos.length > 0) {
      block.photos.forEach(p => {
        if (p.category && p.category.trim()) {
          const cap = p.category.split(' ')
            .map(w => w ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : '')
            .join(' ');
          catsSet.add(cap);
        }
      });
    }

    const catsList = Array.from(catsSet);
    return catsList.length > 0 ? ['All', ...catsList] : ['All'];
  }

  get filteredPhotos(): BlockPhoto[] {
    const block = this.selectedBlock;
    if (!block) return [];
    const photos = block.photos || [];
    const tag = this.activeRoomTag();
    if (tag === 'All') return photos;
    return photos.filter(p => (p.category || '').toLowerCase() === tag.toLowerCase());
  }

  onProjectChange(projectId: string) {
    this.selectedProjectId.set(projectId);
    const proj = this.adminData.projects().find(p => p.id === projectId);
    if (proj && proj.blocks.length > 0) {
      this.selectedBlockId.set(proj.blocks[0].id);
    } else {
      this.selectedBlockId.set('');
    }
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { projectId: projectId || null },
      queryParamsHandling: 'merge'
    });
  }

  get modalCategoriesList(): string[] {
    const defaultCats = ['Living Room', 'Kitchen', 'Bedroom', 'Bathroom', 'Balcony', 'Foyer'];
    const activeTag = this.activeRoomTag();
    const blockCats = this.selectedBlock?.categories || [];

    const set = new Set<string>();
    if (activeTag && activeTag !== 'All') set.add(activeTag);
    blockCats.forEach(c => set.add(c));
    defaultCats.forEach(c => set.add(c));

    return Array.from(set);
  }

  openAddPhotoModal() {
    this.photoUrlInput.set('');
    this.photoCaption.set('');
    const activeTag = this.activeRoomTag();
    const defaultCat = (activeTag && activeTag !== 'All') ? activeTag : 'Living Room';
    this.photoCategory.set(defaultCat);
    this.selectedImagesList.set([]);
    this.isDragging.set(false);
    this.showAddPhotoModal.set(true);
  }

  closeAddPhotoModal() {
    this.showAddPhotoModal.set(false);
  }

  // Drag & Drop Handlers
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
  }

  onFileDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);

    if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const files = Array.from(event.dataTransfer.files).filter(f => f.type.startsWith('image/'));
      this.processFiles(files);
    }
  }

  onMultipleFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const files = Array.from(input.files).filter(f => f.type.startsWith('image/'));
      this.processFiles(files);
      input.value = '';
    }
  }

  private processFiles(files: File[]) {
    const readPromises = files.map(file => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            resolve(e.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readPromises).then(base64Urls => {
      this.selectedImagesList.update(list => [...list, ...base64Urls]);
    });
  }

  addUrlImage() {
    const url = this.photoUrlInput().trim();
    if (url) {
      this.selectedImagesList.update(list => [...list, url]);
      this.photoUrlInput.set('');
    }
  }

  removeImage(index: number) {
    this.selectedImagesList.update(list => list.filter((_, i) => i !== index));
  }

  clearAllImages() {
    this.selectedImagesList.set([]);
  }

  savePhoto(e: Event) {
    e.preventDefault();
    const pId = this.selectedProjectId();
    const bId = this.selectedBlockId();
    if (!pId || !bId) return;

    let imagesToSave = [...this.selectedImagesList()];

    if (this.photoUrlInput().trim()) {
      imagesToSave.push(this.photoUrlInput().trim());
    }

    if (imagesToSave.length === 0) {
      imagesToSave.push('/hero_living_room.png');
    }

    const baseCaption = this.photoCaption().trim() || 'Interior Room Design';
    const category = this.photoCategory();

    const photosToSave = imagesToSave.map((url, idx) => ({
      url,
      caption: imagesToSave.length > 1 ? `${baseCaption} - ${idx + 1}` : baseCaption,
      category
    }));

    this.adminData.addMultiplePhotosToBlock(pId, bId, photosToSave);
    this.adminData.showToast('Photos added to block successfully!', 'success');
    this.closeAddPhotoModal();
  }

  // Delete Confirmation Modal Logic
  openDeletePhotoModal(photo: BlockPhoto) {
    this.deleteType.set('photo');
    this.deletingPhotoId.set(photo.id);
    this.deletingVideoIndex.set(null);
    this.deletingItemName.set(photo.caption || 'this photo');
    this.showDeleteModal.set(true);
  }

  openDeleteVideoModal(index: number) {
    this.deleteType.set('video');
    this.deletingVideoIndex.set(index);
    this.deletingPhotoId.set('');
    this.deletingItemName.set(`${this.selectedProject?.title || 'Project'} Walkthrough Video #${index + 1}`);
    this.showDeleteModal.set(true);
  }

  closeDeleteModal() {
    this.showDeleteModal.set(false);
    this.deletingPhotoId.set('');
    this.deletingVideoIndex.set(null);
    this.deletingItemName.set('');
  }

  confirmDeleteModal() {
    if (this.deleteType() === 'video' && this.deletingVideoIndex() !== null) {
      const idx = this.deletingVideoIndex()!;
      const proj = this.selectedProject;
      if (proj) {
        const current = this.projectVideos;
        const updated = current.filter((_, i) => i !== idx);

        this.adminData.updateProject(proj.id, {
          videoUrls: updated,
          videoUrl: updated[0] || ''
        });
        this.adminData.showToast('Walkthrough video deleted successfully!', 'danger');
      }
    } else if (this.deletingPhotoId()) {
      const pId = this.selectedProjectId();
      const bId = this.selectedBlockId();
      this.adminData.deletePhotoFromBlock(pId, bId, this.deletingPhotoId());
      this.adminData.showToast('Photo deleted successfully!', 'danger');
    }
    this.closeDeleteModal();
  }

  deletePhoto(photoId: string) {
    const photo = this.filteredPhotos.find(p => p.id === photoId);
    if (photo) {
      this.openDeletePhotoModal(photo);
    }
  }

  openAddBlockModal() {
    this.newBlockName.set('');
    this.showAddBlockModal.set(true);
  }

  closeAddBlockModal() {
    this.showAddBlockModal.set(false);
  }

  saveBlock(e: Event) {
    e.preventDefault();
    const pId = this.selectedProjectId();
    if (!pId || !this.newBlockName().trim()) return;

    this.adminData.addBlockToProject(pId, this.newBlockName().trim());
    this.adminData.showToast('New block added to project!', 'success');
    this.closeAddBlockModal();
  }

  openAddCategoryModal() {
    this.newCategoryName.set('');
    this.showAddCategoryModal.set(true);
  }

  closeAddCategoryModal() {
    this.showAddCategoryModal.set(false);
  }

  saveCategory(e: Event) {
    e.preventDefault();
    const bId = this.selectedBlockId();
    const catName = this.newCategoryName().trim();
    if (!bId || !catName) return;

    this.adminData.addCategoryToBlock(bId, catName);
    this.adminData.showToast('Room category added to block!', 'success');
    this.closeAddCategoryModal();
  }

  deleteBlock(blockId: string) {
    const pId = this.selectedProjectId();
    if (confirm('Delete this block and all its photos?')) {
      this.adminData.deleteBlockFromProject(pId, blockId);
      this.adminData.showToast('Block deleted successfully!', 'danger');
      const proj = this.selectedProject;
      if (proj && proj.blocks.length > 0) {
        this.selectedBlockId.set(proj.blocks[0].id);
      } else {
        this.selectedBlockId.set('');
      }
    }
  }
}
