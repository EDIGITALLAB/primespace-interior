import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminDataService, AdminTeamMember } from '../../../services/admin-data.service';

@Component({
  selector: 'app-admin-team',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-team.html',
  styleUrl: './admin-team.css'
})
export class AdminTeam {
  adminData = inject(AdminDataService);

  get teamMembers(): AdminTeamMember[] {
    return this.adminData.teamMembers();
  }

  showModal = signal(false);
  isEditing = signal(false);
  editingId = signal('');

  name = signal('');
  role = signal('');
  experience = signal('8+ Years');
  photo = signal('/about_living_room_masterpiece.png');
  bio = signal('');
  specialization = signal('');

  openAddModal() {
    this.isEditing.set(false);
    this.editingId.set('');
    this.name.set('');
    this.role.set('Interior Architect');
    this.experience.set('8+ Years');
    this.photo.set('/about_living_room_masterpiece.png');
    this.bio.set('');
    this.specialization.set('Luxury Joinery & Lighting');
    this.showModal.set(true);
  }

  openEditModal(m: AdminTeamMember) {
    this.isEditing.set(true);
    this.editingId.set(m.id);
    this.name.set(m.name);
    this.role.set(m.role);
    this.experience.set(m.experience);
    this.photo.set(m.photo);
    this.bio.set(m.bio);
    this.specialization.set(m.specialization);
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }

  saveMember(e: Event) {
    e.preventDefault();
    if (this.isEditing()) {
      this.adminData.updateTeamMember(this.editingId(), {
        name: this.name(),
        role: this.role(),
        experience: this.experience(),
        photo: this.photo(),
        bio: this.bio(),
        specialization: this.specialization()
      });
    } else {
      this.adminData.addTeamMember({
        name: this.name(),
        role: this.role(),
        experience: this.experience(),
        photo: this.photo(),
        bio: this.bio(),
        specialization: this.specialization()
      });
    }
    this.closeModal();
  }

  deleteMember(id: string) {
    if (confirm('Delete team member profile?')) {
      this.adminData.deleteTeamMember(id);
    }
  }
}
