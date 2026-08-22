import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminDataService, AdminTestimonial } from '../../../services/admin-data.service';

@Component({
  selector: 'app-admin-testimonials',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-testimonials.html',
  styleUrl: './admin-testimonials.css'
})
export class AdminTestimonials {
  adminData = inject(AdminDataService);

  get testimonials(): AdminTestimonial[] {
    return this.adminData.testimonials();
  }

  showModal = signal(false);
  isEditing = signal(false);
  editingId = signal('');

  name = signal('');
  role = signal('Villa Owner');
  project = signal('Royale Villa');
  location = signal('Indiranagar');
  rating = signal(5);
  comment = signal('');
  avatar = signal('/about_living_room_masterpiece.png');
  isVerified = signal(true);

  openAddModal() {
    this.isEditing.set(false);
    this.editingId.set('');
    this.name.set('');
    this.role.set('Villa Owner');
    this.project.set('Royale Villa');
    this.location.set('Indiranagar');
    this.rating.set(5);
    this.comment.set('');
    this.avatar.set('/about_living_room_masterpiece.png');
    this.isVerified.set(true);
    this.showModal.set(true);
  }

  openEditModal(t: AdminTestimonial) {
    this.isEditing.set(true);
    this.editingId.set(t.id);
    this.name.set(t.name);
    this.role.set(t.role);
    this.project.set(t.project);
    this.location.set(t.location);
    this.rating.set(t.rating);
    this.comment.set(t.comment);
    this.avatar.set(t.avatar);
    this.isVerified.set(t.isVerified);
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }

  saveTestimonial(e: Event) {
    e.preventDefault();
    if (this.isEditing()) {
      this.adminData.updateTestimonial(this.editingId(), {
        name: this.name(),
        role: this.role(),
        project: this.project(),
        location: this.location(),
        rating: Number(this.rating()),
        comment: this.comment(),
        avatar: this.avatar(),
        isVerified: this.isVerified()
      });
    } else {
      this.adminData.addTestimonial({
        name: this.name(),
        role: this.role(),
        project: this.project(),
        location: this.location(),
        rating: Number(this.rating()),
        comment: this.comment(),
        avatar: this.avatar(),
        isVerified: this.isVerified()
      });
    }
    this.closeModal();
  }

  deleteTestimonial(id: string) {
    if (confirm('Delete this client review?')) {
      this.adminData.deleteTestimonial(id);
    }
  }
}
