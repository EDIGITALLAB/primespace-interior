import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminDataService, AdminTestimonial } from '../../../services/admin-data.service';
import { ConfirmModal } from '../../../components/confirm-modal/confirm-modal';

@Component({
  selector: 'app-admin-testimonials',
  standalone: true,
  imports: [CommonModule, FormsModule, ConfirmModal],
  templateUrl: './admin-testimonials.html',
  styleUrl: './admin-testimonials.css'
})
export class AdminTestimonials implements OnInit {
  adminData = inject(AdminDataService);

  ngOnInit() {
    this.adminData.loadTestimonialsFromBackend().subscribe();
  }

  get testimonials(): AdminTestimonial[] {
    return this.adminData.testimonials();
  }

  showModal = signal(false);
  isEditing = signal(false);
  editingId = signal('');

  // Delete Confirmation Modal State
  showDeleteModal = signal(false);
  deletingId = signal('');
  deletingItemName = signal('');

  name = signal('');
  role = signal('');
  project = signal('');
  location = signal('');
  rating = signal(5);
  status = signal<string>('ACTIVE');
  comment = signal('');
  avatar = signal('');
  isVerified = signal(true);
  isFeatured = signal(true);

  openAddModal() {
    this.isEditing.set(false);
    this.editingId.set('');
    this.name.set('');
    this.role.set('');
    this.project.set('');
    this.location.set('');
    this.rating.set(5);
    this.status.set('ACTIVE');
    this.comment.set('');
    this.avatar.set('');
    this.isVerified.set(true);
    this.isFeatured.set(true);
    this.showModal.set(true);
  }

  openEditModal(t: AdminTestimonial) {
    this.isEditing.set(true);
    this.editingId.set(t.id);
    this.name.set(t.name || '');
    this.role.set(t.role || '');
    this.project.set(t.project || '');
    this.location.set(t.location || '');
    this.rating.set(t.rating != null ? t.rating : 5);
    this.status.set(t.status || 'ACTIVE');
    this.comment.set(t.comment || '');
    this.avatar.set(t.avatar || '');
    this.isVerified.set(t.isVerified ?? true);
    this.isFeatured.set(t.isFeatured ?? true);
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }

  openDeleteModal(t: AdminTestimonial) {
    this.deletingId.set(t.id);
    this.deletingItemName.set(t.name);
    this.showDeleteModal.set(true);
  }

  closeDeleteModal() {
    this.showDeleteModal.set(false);
    this.deletingId.set('');
    this.deletingItemName.set('');
  }

  confirmDelete() {
    if (this.deletingId()) {
      this.adminData.deleteTestimonial(this.deletingId());
      this.adminData.showToast('Client review deleted successfully!', 'danger');
    }
    this.closeDeleteModal();
  }

  saveTestimonial(e: Event) {
    e.preventDefault();

    const nameVal = (this.name() || '').trim();
    const roleVal = (this.role() || '').trim();
    const projectVal = (this.project() || '').trim();
    const locationVal = (this.location() || '').trim();
    const commentVal = (this.comment() || '').trim();

    if (!nameVal || !roleVal || !projectVal || !locationVal || !commentVal) {
      alert('Please fill in all mandatory fields (Client Name, Role, Project Name, Location, Review Comment).');
      return;
    }

    if (this.isEditing()) {
      this.adminData.updateTestimonial(this.editingId(), {
        name: nameVal,
        role: roleVal,
        project: projectVal,
        location: locationVal,
        rating: Number(this.rating()),
        status: this.status(),
        comment: commentVal,
        avatar: (this.avatar() || '').trim() || '/default_user_avatar.svg',
        isVerified: this.isVerified(),
        isFeatured: this.isFeatured()
      });
      this.adminData.showToast('Client review updated successfully!', 'success');
    } else {
      this.adminData.addTestimonial({
        name: nameVal,
        role: roleVal,
        project: projectVal,
        location: locationVal,
        rating: Number(this.rating()),
        status: this.status(),
        comment: commentVal,
        avatar: (this.avatar() || '').trim() || '/default_user_avatar.svg',
        isVerified: this.isVerified(),
        isFeatured: this.isFeatured()
      });
      this.adminData.showToast('New client review saved successfully!', 'success');
    }
    this.closeModal();
  }

  onAvatarUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.readAndSetAvatar(file);
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
      if (file.type.startsWith('image/')) {
        this.readAndSetAvatar(file);
      }
    }
  }

  private readAndSetAvatar(file: File) {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const result = e.target?.result as string;
      if (result) {
        this.avatar.set(result);
      }
    };
    reader.readAsDataURL(file);
  }

  deleteTestimonial(id: string) {
    const t = this.testimonials.find(item => item.id === id);
    if (t) {
      this.openDeleteModal(t);
    }
  }
}
