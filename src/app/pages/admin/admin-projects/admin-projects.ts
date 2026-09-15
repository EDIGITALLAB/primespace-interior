import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AdminDataService, AdminProject } from '../../../services/admin-data.service';
import { ConfirmModal } from '../../../components/confirm-modal/confirm-modal';

@Component({
  selector: 'app-admin-projects',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ConfirmModal],
  templateUrl: './admin-projects.html',
  styleUrl: './admin-projects.css'
})
export class AdminProjects implements OnInit {
  adminData = inject(AdminDataService);

  ngOnInit() {
    this.adminData.loadProjectsFromBackend().subscribe();
  }

  searchQuery = signal('');
  selectedCityFilter = signal('all');
  selectedStatusFilter = signal('all');

  // Modal State
  showModal = signal(false);
  isEditing = signal(false);
  editingProjectId = signal('');

  // Delete Modal State
  showDeleteModal = signal(false);
  deletingId = signal('');
  deletingItemName = signal('');

  // Form Fields
  title = signal('');
  subtitle = signal('');
  location = signal('');
  city = signal('Bangalore');
  status = signal<'completed' | 'ongoing'>('completed');
  projectType = signal('Villa');
  homeCount = signal(0);
  coverImage = signal('');
  // Video Fields & Drag-Drop State
  videoUrl = signal('');
  videoUrls = signal<string[]>([]);
  videoInputUrl = signal('');
  isVideoDragging = signal(false);
  description = signal('');

  get filteredProjects(): AdminProject[] {
    const query = this.searchQuery().toLowerCase().trim();
    const city = this.selectedCityFilter();
    const status = this.selectedStatusFilter();

    return this.adminData.projects().filter(p => {
      const matchesSearch = !query || p.title.toLowerCase().includes(query) || p.location.toLowerCase().includes(query);
      const matchesCity = city === 'all' || p.city.toLowerCase() === city.toLowerCase();
      const matchesStatus = status === 'all' || p.status === status;
      return matchesSearch && matchesCity && matchesStatus;
    });
  }

  openAddModal() {
    this.isEditing.set(false);
    this.editingProjectId.set('');
    this.title.set('');
    this.subtitle.set('');
    this.location.set('');
    this.city.set('Bangalore');
    this.status.set('completed');
    this.projectType.set('Villa');
    this.homeCount.set(0);
    this.coverImage.set('');
    this.videoUrl.set('');
    this.videoUrls.set([]);
    this.videoInputUrl.set('');
    this.description.set('');
    this.showModal.set(true);
  }

  openEditModal(p: AdminProject) {
    this.isEditing.set(true);
    this.editingProjectId.set(p.id);
    this.title.set(p.title || '');
    this.subtitle.set(p.subtitle || '');
    this.location.set(p.location || '');
    this.city.set(p.city || 'Bangalore');
    this.status.set(p.status || 'completed');
    this.projectType.set(p.projectType || 'Villa');
    this.homeCount.set(p.homeCount || 0);
    this.coverImage.set(p.coverImage || '');
    this.videoUrl.set(p.videoUrl || '');
    if (p.videoUrls && p.videoUrls.length > 0) {
      this.videoUrls.set([...p.videoUrls]);
    } else if (p.videoUrl) {
      this.videoUrls.set([p.videoUrl]);
    } else {
      this.videoUrls.set([]);
    }
    this.videoInputUrl.set('');
    this.description.set(p.description || '');
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }

  openDeleteModal(p: AdminProject) {
    this.deletingId.set(p.id);
    this.deletingItemName.set(p.title);
    this.showDeleteModal.set(true);
  }

  closeDeleteModal() {
    this.showDeleteModal.set(false);
    this.deletingId.set('');
    this.deletingItemName.set('');
  }

  confirmDelete() {
    if (this.deletingId()) {
      this.adminData.deleteProject(this.deletingId());
      this.adminData.showToast('Project deleted successfully!', 'danger');
    }
    this.closeDeleteModal();
  }

  saveProject(e: Event) {
    e.preventDefault();

    const titleVal = (this.title() || '').trim();
    const subtitleVal = (this.subtitle() || '').trim();
    const locationVal = (this.location() || '').trim();
    const coverVal = (this.coverImage() || '').trim();
    const descVal = (this.description() || '').trim();

    if (!titleVal || !subtitleVal || !locationVal || !coverVal || !descVal) {
      alert('Please fill in all mandatory fields (Title, Subtitle, Location, Cover Image, and Description).');
      return;
    }

    const statusLabel = this.status() === 'completed' ? 'Completed & Handed Over' : 'Live Construction Site';
    const vUrls = Array.from(new Set(this.videoUrls().map(u => u.trim()).filter(Boolean)));
    const firstVideoUrl = vUrls[0] || (this.videoUrl() || '').trim();

    if (this.isEditing()) {
      this.adminData.updateProject(this.editingProjectId(), {
        title: titleVal,
        subtitle: subtitleVal,
        location: locationVal,
        city: this.city(),
        status: this.status(),
        statusLabel,
        projectType: this.projectType(),
        coverImage: coverVal,
        videoUrl: firstVideoUrl,
        videoUrls: vUrls,
        description: descVal
      });
      this.adminData.showToast('Project details updated successfully!', 'success');
    } else {
      this.adminData.addProject({
        title: titleVal,
        subtitle: subtitleVal,
        location: locationVal,
        city: this.city(),
        apartmentName: titleVal + ' Estate',
        status: this.status(),
        statusLabel,
        projectType: this.projectType(),
        homeCount: 0,
        coverImage: coverVal,
        videoUrl: firstVideoUrl,
        videoUrls: vUrls,
        description: descVal,
        blocks: [
          { id: 'b1', name: 'Block A (Main Wing)', homeCount: 0, completionPercentage: 100, selectedImageIndex: 0, gallery: [coverVal], photos: [{ id: 'p1', url: coverVal, caption: 'Main Wing Suite', category: 'Living Room' }] },
          { id: 'b2', name: 'Block B (Penthouse Suite)', homeCount: 0, completionPercentage: 100, selectedImageIndex: 0, gallery: [coverVal], photos: [{ id: 'p2', url: coverVal, caption: 'Penthouse View', category: 'Living Room' }] }
        ]
      });
      this.adminData.showToast('New project created successfully!', 'success');
    }

    this.closeModal();
  }

  onCoverImageUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.readAndSetCover(file);
      input.value = '';
    }
  }

  isDragging = signal(false);

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
      const file = event.dataTransfer.files[0];
      if ((file.type && file.type.startsWith('image/')) || /\.(jpg|jpeg|png|webp|avif|gif)$/i.test(file.name)) {
        this.readAndSetCover(file);
      }
    }
  }

  private readAndSetCover(file: File) {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const result = e.target?.result as string;
      if (result) {
        this.coverImage.set(result);
      }
    };
    reader.readAsDataURL(file);
  }

  triggerVideoPicker(event: Event, input: HTMLInputElement) {
    event.preventDefault();
    event.stopPropagation();
    input.click();
  }

  // Multi-Video Upload & Drag-Drop Handlers
  onVideoDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isVideoDragging.set(true);
  }

  onVideoDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isVideoDragging.set(false);
  }

  onVideoDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isVideoDragging.set(false);

    if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const files = Array.from(event.dataTransfer.files);
      this.processVideoFiles(files);
    }
  }

  onVideoFileUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const files = Array.from(input.files);
      this.processVideoFiles(files);
      input.value = '';
    }
  }

  private processVideoFiles(files: File[]) {
    const videoFiles = files.filter(f =>
      (f.type && f.type.startsWith('video/')) || /\.(mp4|webm|mov|mkv|avi|m4v)$/i.test(f.name)
    );

    if (videoFiles.length === 0) return;

    const readPromises = videoFiles.map(file => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          const result = e.target?.result as string;
          resolve(result || '');
        };
        reader.onerror = () => resolve('');
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readPromises).then(base64Results => {
      const validResults = base64Results.filter(Boolean);
      this.videoUrls.update(urls => {
        const updatedList = [...urls];
        for (const res of validResults) {
          if (!updatedList.includes(res)) {
            updatedList.push(res);
          }
        }
        return updatedList;
      });
    });
  }

  addVideoUrlFromInput(event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const url = this.videoInputUrl().trim();
    if (url) {
      this.videoUrls.update(urls => {
        if (urls.includes(url)) return urls;
        return [...urls, url];
      });
      this.videoInputUrl.set('');
    }
  }

  removeVideoUrl(index: number) {
    this.videoUrls.update(urls => urls.filter((_, i) => i !== index));
  }

  deleteProject(id: string) {
    const p = this.adminData.projects().find(item => item.id === id);
    if (p) {
      this.openDeleteModal(p);
    }
  }
}
