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
  subtitle = signal('');
  type = signal('Living Room');
  priceStarting = signal('₹2.50 Lakhs');
  image = signal('/hero_living_room.png');

  openAddModal() {
    this.isEditing.set(false);
    this.editingId.set('');
    this.name.set('');
    this.subtitle.set('');
    this.type.set('Living Room');
    this.priceStarting.set('₹2.50 Lakhs');
    this.image.set('/luxury_living_room_1.png');
    this.showModal.set(true);
  }

  openEditModal(c: AdminCategory) {
    this.isEditing.set(true);
    this.editingId.set(c.id);
    this.name.set(c.name);
    this.subtitle.set(c.subtitle);
    this.type.set(c.type);
    this.priceStarting.set(c.priceStarting);
    this.image.set(c.image);
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }

  saveCategory(e: Event) {
    e.preventDefault();
    const slug = this.name().toLowerCase().replace(/[^a-z0-9]+/g, '-');

    if (this.isEditing()) {
      this.adminData.updateCategory(this.editingId(), {
        name: this.name(),
        slug,
        subtitle: this.subtitle(),
        type: this.type(),
        priceStarting: this.priceStarting(),
        image: this.image()
      });
    } else {
      this.adminData.addCategory({
        name: this.name(),
        slug,
        subtitle: this.subtitle(),
        type: this.type(),
        priceStarting: this.priceStarting(),
        image: this.image(),
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
