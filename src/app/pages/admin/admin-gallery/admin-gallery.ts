import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminDataService, AdminProject, AdminBlock, BlockPhoto } from '../../../services/admin-data.service';

@Component({
  selector: 'app-admin-gallery',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-gallery.html',
  styleUrl: './admin-gallery.css'
})
export class AdminGallery {
  adminData = inject(AdminDataService);
  private route = inject(ActivatedRoute);

  // Selected Apartment Project & Block
  selectedProjectId = signal<string>('');
  selectedBlockId = signal<string>('');

  // Category filter tag
  activeRoomTag = signal<string>('All');

  // Add Photo Modal
  showAddPhotoModal = signal(false);
  photoUrlInput = signal('');
  photoCaption = signal('');
  photoCategory = signal<'Living Room' | 'Kitchen' | 'Bedroom' | 'Bathroom' | 'Balcony' | 'Foyer'>('Living Room');
  selectedImagesList = signal<string[]>([]);

  // Add Block Modal
  showAddBlockModal = signal(false);
  newBlockName = signal('');
  newBlockHomes = signal(4);

  constructor() {
    this.route.queryParams.subscribe(params => {
      const projId = params['projectId'];
      const projList = this.adminData.projects();
      
      if (projId && projList.some(p => p.id === projId)) {
        this.onProjectChange(projId);
      } else if (projList.length > 0 && !this.selectedProjectId()) {
        this.selectedProjectId.set(projList[0].id);
        if (projList[0].blocks.length > 0) {
          this.selectedBlockId.set(projList[0].blocks[0].id);
        }
      }
    });
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

  get filteredPhotos(): BlockPhoto[] {
    const block = this.selectedBlock;
    if (!block) return [];
    const photos = block.photos || [];
    const tag = this.activeRoomTag();
    if (tag === 'All') return photos;
    return photos.filter(p => p.category.toLowerCase() === tag.toLowerCase());
  }

  onProjectChange(projectId: string) {
    this.selectedProjectId.set(projectId);
    const proj = this.adminData.projects().find(p => p.id === projectId);
    if (proj && proj.blocks.length > 0) {
      this.selectedBlockId.set(proj.blocks[0].id);
    } else {
      this.selectedBlockId.set('');
    }
  }

  openAddPhotoModal() {
    this.photoUrlInput.set('');
    this.photoCaption.set('');
    this.photoCategory.set('Living Room');
    this.selectedImagesList.set([]);
    this.showAddPhotoModal.set(true);
  }

  closeAddPhotoModal() {
    this.showAddPhotoModal.set(false);
  }

  onMultipleFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const files = Array.from(input.files);
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
        input.value = '';
      });
    }
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
    this.closeAddPhotoModal();
  }

  deletePhoto(photoId: string) {
    const pId = this.selectedProjectId();
    const bId = this.selectedBlockId();
    if (confirm('Delete this photo from block?')) {
      this.adminData.deletePhotoFromBlock(pId, bId, photoId);
    }
  }

  openAddBlockModal() {
    this.newBlockName.set('Block D – Home 04');
    this.newBlockHomes.set(4);
    this.showAddBlockModal.set(true);
  }

  closeAddBlockModal() {
    this.showAddBlockModal.set(false);
  }

  saveBlock(e: Event) {
    e.preventDefault();
    const pId = this.selectedProjectId();
    if (!pId || !this.newBlockName()) return;

    this.adminData.addBlockToProject(pId, this.newBlockName(), Number(this.newBlockHomes()));
    this.closeAddBlockModal();
  }

  deleteBlock(blockId: string) {
    const pId = this.selectedProjectId();
    if (confirm('Delete this block and all its photos?')) {
      this.adminData.deleteBlockFromProject(pId, blockId);
      const proj = this.selectedProject;
      if (proj && proj.blocks.length > 0) {
        this.selectedBlockId.set(proj.blocks[0].id);
      } else {
        this.selectedBlockId.set('');
      }
    }
  }
}
