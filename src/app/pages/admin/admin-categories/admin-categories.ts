import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminDataService, AdminCategory } from '../../../services/admin-data.service';

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-categories.html',
  styleUrl: './admin-categories.css'
})
export class AdminCategories {
  adminData = inject(AdminDataService);

  get categories(): AdminCategory[] {
    return this.adminData.categories();
  }

  showModal = signal(false);
  isEditing = signal(false);
  editingId = signal('');

  name = signal('');
  type = signal('Kitchen');
  subtitle = signal('');
  deliveryTime = signal('45 Days');
  image = signal('/kitchen_cat.png');
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

      // If deleted image was the selected cover image, auto-assign the first remaining image as cover
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
    if (!this.galleryImagesList().includes(url)) {
      if (this.galleryImagesList().length < 5) {
        this.galleryImagesList.set([...this.galleryImagesList(), url]);
      }
    }
  }

  isCoverImage(url: string): boolean {
    return this.image() === url;
  }

  onFileUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const currentLength = this.galleryImagesList().length;
      if (currentLength >= 5) {
        alert('Maximum 5 images allowed per category.');
        input.value = '';
        return;
      }

      const availableSlots = 5 - currentLength;
      const files = Array.from(input.files).slice(0, availableSlots);

      files.forEach(file => {
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
      input.value = '';
    }
  }

  openAddModal() {
    this.isEditing.set(false);
    this.editingId.set('');
    this.name.set('');
    this.type.set('Kitchen');
    this.subtitle.set('');
    this.deliveryTime.set('45 Days');
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
    this.deliveryTime.set(c.deliveryTime || '45 Days');
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

  saveCategory(e: Event) {
    e.preventDefault();
    const slug = this.name().toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const galleryImages = this.galleryImagesList();
    const coverImage = this.image() || (galleryImages.length ? galleryImages[0] : '/hero_kitchen.png');

    const features = this.featuresStr()
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    if (this.isEditing()) {
      this.adminData.updateCategory(this.editingId(), {
        name: this.name(),
        slug,
        type: this.type(),
        subtitle: this.subtitle(),
        deliveryTime: this.deliveryTime(),
        image: coverImage,
        galleryImages: galleryImages.length ? galleryImages : [coverImage],
        description: this.description(),
        features
      });
    } else {
      this.adminData.addCategory({
        name: this.name(),
        slug,
        type: this.type(),
        subtitle: this.subtitle(),
        priceStarting: '',
        deliveryTime: this.deliveryTime(),
        image: coverImage,
        galleryImages: galleryImages.length ? galleryImages : [coverImage],
        description: this.description(),
        features,
        itemCount: 15
      });
    }

    this.closeModal();
  }

  deleteCategory(id: string) {
    if (confirm('Delete this design category?')) {
      this.adminData.deleteCategory(id);
    }
  }
}
