import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminDataService, AdminCategory } from '../../../services/admin-data.service';
import { ConfirmModal } from '../../../components/confirm-modal/confirm-modal';

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [CommonModule, FormsModule, ConfirmModal],
  templateUrl: './admin-categories.html',
  styleUrl: './admin-categories.css'
})
export class AdminCategories implements OnInit {
  adminData = inject(AdminDataService);

  ngOnInit() {
    this.adminData.loadCategoriesFromBackend().subscribe();
  }

  get categories(): AdminCategory[] {
    return this.adminData.categories();
  }

  showModal = signal(false);
  isEditing = signal(false);
  editingId = signal('');

  // Delete Modal State
  showDeleteModal = signal(false);
  deletingId = signal('');
  deletingItemName = signal('');

  name = signal('');
  type = signal('Kitchen');
  subtitle = signal('');
  deliveryTime = signal('');
  image = signal('');
  galleryImagesList = signal<string[]>([]);
  newGalleryInput = signal('');
  description = signal('');
  featuresStr = signal('');

  addGalleryImage(url?: string) {
    if (this.galleryImagesList().length >= 5) {
      alert('Maximum 5 images allowed per category.');
      return;
    }
    const targetUrl = (url || this.newGalleryInput()).trim();
    if (targetUrl) {
      if (!this.galleryImagesList().includes(targetUrl)) {
        this.galleryImagesList.set([...this.galleryImagesList(), targetUrl]);
        if (!this.image()) {
          this.image.set(targetUrl);
        }
      }
      this.newGalleryInput.set('');
    }
  }

  removeGalleryImage(index: number) {
    const list = [...this.galleryImagesList()];
    if (index >= 0 && index < list.length) {
      const removedUrl = list[index];
      list.splice(index, 1);
      this.galleryImagesList.set(list);

      if (this.image() === removedUrl) {
        this.image.set(list.length > 0 ? list[0] : '');
      }
    }
  }

  setAsCover(url: string, event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.image.set(url);
    const list = this.galleryImagesList();
    if (list.includes(url)) {
      const filtered = list.filter(img => img !== url);
      this.galleryImagesList.set([url, ...filtered]);
    } else {
      if (list.length < 5) {
        this.galleryImagesList.set([url, ...list]);
      }
    }
  }

  isCoverImage(url: string): boolean {
    return this.image() === url;
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
      const files = Array.from(event.dataTransfer.files).filter(f => f.type.startsWith('image/'));
      this.processFiles(files);
    }
  }

  onFileUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const files = Array.from(input.files).filter(f => f.type.startsWith('image/'));
      this.processFiles(files);
      input.value = '';
    }
  }

  private processFiles(files: File[]) {
    const currentLength = this.galleryImagesList().length;
    if (currentLength >= 5) {
      alert('Maximum 5 images allowed per category.');
      return;
    }

    const availableSlots = 5 - currentLength;
    const filesToProcess = files.slice(0, availableSlots);

    filesToProcess.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result as string;
        if (result) {
          const currentList = this.galleryImagesList();
          if (currentList.length < 5 && !currentList.includes(result)) {
            this.galleryImagesList.set([...currentList, result]);
            if (!this.image()) {
              this.image.set(result);
            }
          }
        }
      };
      reader.readAsDataURL(file);
    });
  }

  openAddModal() {
    this.isEditing.set(false);
    this.editingId.set('');
    this.name.set('');
    this.type.set('Kitchen');
    this.subtitle.set('');
    this.deliveryTime.set('');
    this.image.set('');
    this.galleryImagesList.set([]);
    this.newGalleryInput.set('');
    this.description.set('');
    this.featuresStr.set('');
    this.showModal.set(true);
  }

  openEditModal(c: AdminCategory) {
    this.isEditing.set(true);
    this.editingId.set(c.id);
    this.name.set(c.name || '');
    this.type.set(c.type || 'Kitchen');
    this.subtitle.set(c.subtitle || '');
    this.deliveryTime.set(c.deliveryTime || '');
    this.image.set(c.image || '');
    this.galleryImagesList.set(c.galleryImages && c.galleryImages.length ? [...c.galleryImages] : (c.image ? [c.image] : []));
    this.newGalleryInput.set('');
    this.description.set(c.description || '');
    this.featuresStr.set((c.features || []).join('\n'));
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }

  openDeleteModal(c: AdminCategory) {
    this.deletingId.set(c.id);
    this.deletingItemName.set(c.name);
    this.showDeleteModal.set(true);
  }

  closeDeleteModal() {
    this.showDeleteModal.set(false);
    this.deletingId.set('');
    this.deletingItemName.set('');
  }

  confirmDelete() {
    if (this.deletingId()) {
      this.adminData.deleteCategory(this.deletingId());
      this.adminData.showToast('Design category deleted successfully!', 'danger');
    }
    this.closeDeleteModal();
  }

  saveCategory(e: Event) {
    e.preventDefault();

    const nameVal = (this.name() || '').trim();
    const subtitleVal = (this.subtitle() || '').trim();
    const deliveryVal = (this.deliveryTime() || '').trim();
    const descVal = (this.description() || '').trim();
    const featuresStrVal = (this.featuresStr() || '').trim();
    const gallery = this.galleryImagesList();

    if (!nameVal || !subtitleVal || !deliveryVal || !descVal || !featuresStrVal || gallery.length === 0) {
      alert('Please fill in all mandatory fields (Category Name, Subtitle, Delivery Time, Description, Key Highlights, and at least 1 Gallery Image).');
      return;
    }

    const slug = nameVal.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const selectedCover = this.image();
    let galleryImages = [...gallery];

    if (selectedCover) {
      galleryImages = [selectedCover, ...galleryImages.filter(img => img !== selectedCover)];
    }

    const coverImage = selectedCover || galleryImages[0];

    const features = featuresStrVal
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    if (this.isEditing()) {
      this.adminData.updateCategory(this.editingId(), {
        name: nameVal,
        slug,
        type: this.type(),
        subtitle: subtitleVal,
        deliveryTime: deliveryVal,
        image: coverImage,
        galleryImages,
        description: descVal,
        features
      });
      this.adminData.showToast('Category specifications updated successfully!', 'success');
    } else {
      this.adminData.addCategory({
        name: nameVal,
        slug,
        type: this.type(),
        subtitle: subtitleVal,
        priceStarting: '',
        deliveryTime: deliveryVal,
        image: coverImage,
        galleryImages,
        description: descVal,
        features,
        itemCount: 15
      });
      this.adminData.showToast('New design category created successfully!', 'success');
    }

    this.closeModal();
  }

  deleteCategory(id: string) {
    const c = this.categories.find(item => item.id === id);
    if (c) {
      this.openDeleteModal(c);
    }
  }
}
