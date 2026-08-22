import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AdminDataService, AdminProject } from '../../../services/admin-data.service';

@Component({
  selector: 'app-admin-projects',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-projects.html',
  styleUrl: './admin-projects.css'
})
export class AdminProjects {
  adminData = inject(AdminDataService);

  searchQuery = signal('');
  selectedCityFilter = signal('all');
  selectedStatusFilter = signal('all');

  // Modal State
  showModal = signal(false);
  isEditing = signal(false);
  editingProjectId = signal('');

  // Form Fields
  title = signal('');
  subtitle = signal('');
  location = signal('');
  city = signal('Bangalore');
  status = signal<'completed' | 'ongoing'>('completed');
  projectType = signal('Villa');
  homeCount = signal(12);
  coverImage = signal('/hero_living_room.png');
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
    this.location.set('Indiranagar, Bangalore');
    this.city.set('Bangalore');
    this.status.set('completed');
    this.projectType.set('Villa');
    this.homeCount.set(12);
    this.coverImage.set('/luxury_living_room_1.png');
    this.description.set('');
    this.showModal.set(true);
  }

  openEditModal(p: AdminProject) {
    this.isEditing.set(true);
    this.editingProjectId.set(p.id);
    this.title.set(p.title);
    this.subtitle.set(p.subtitle);
    this.location.set(p.location);
    this.city.set(p.city);
    this.status.set(p.status);
    this.projectType.set(p.projectType);
    this.homeCount.set(p.homeCount);
    this.coverImage.set(p.coverImage);
    this.description.set(p.description);
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }

  saveProject(e: Event) {
    e.preventDefault();
    const statusLabel = this.status() === 'completed' ? 'Completed & Handed Over' : 'Live Construction Site';

    if (this.isEditing()) {
      this.adminData.updateProject(this.editingProjectId(), {
        title: this.title(),
        subtitle: this.subtitle(),
        location: this.location(),
        city: this.city(),
        status: this.status(),
        statusLabel,
        projectType: this.projectType(),
        homeCount: this.homeCount(),
        coverImage: this.coverImage(),
        description: this.description()
      });
    } else {
      this.adminData.addProject({
        title: this.title(),
        subtitle: this.subtitle(),
        location: this.location(),
        city: this.city(),
        apartmentName: this.title() + ' Estate',
        status: this.status(),
        statusLabel,
        projectType: this.projectType(),
        homeCount: this.homeCount(),
        coverImage: this.coverImage(),
        description: this.description(),
        blocks: [
          { id: 'b1', name: 'Block A (Main Wing)', homeCount: Math.floor(this.homeCount() / 2), completionPercentage: 100, selectedImageIndex: 0, gallery: [this.coverImage()], photos: [{ id: 'p1', url: this.coverImage(), caption: 'Main Wing Suite', category: 'Living Room' }] },
          { id: 'b2', name: 'Block B (Penthouse Suite)', homeCount: Math.ceil(this.homeCount() / 2), completionPercentage: 100, selectedImageIndex: 0, gallery: [this.coverImage()], photos: [{ id: 'p2', url: this.coverImage(), caption: 'Penthouse View', category: 'Living Room' }] }
        ]
      });
    }

    this.closeModal();
  }

  deleteProject(id: string) {
    if (confirm('Are you sure you want to delete this project?')) {
      this.adminData.deleteProject(id);
    }
  }
}
