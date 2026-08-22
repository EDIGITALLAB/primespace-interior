import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminDataService, AdminAppointment } from '../../../services/admin-data.service';

@Component({
  selector: 'app-admin-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-appointments.html',
  styleUrl: './admin-appointments.css'
})
export class AdminAppointments {
  adminData = inject(AdminDataService);

  searchQuery = signal('');
  statusFilter = signal('all');

  showModal = signal(false);
  clientName = signal('');
  phone = signal('');
  email = signal('');
  project = signal('Royale Villa');
  city = signal('Bangalore');
  preferredDate = signal('');
  preferredTime = signal('11:00 AM');
  notes = signal('');

  get filteredAppointments(): AdminAppointment[] {
    const query = this.searchQuery().toLowerCase().trim();
    const status = this.statusFilter();

    return this.adminData.appointments().filter(a => {
      const matchesSearch = !query || a.clientName.toLowerCase().includes(query) || a.phone.includes(query) || a.project.toLowerCase().includes(query);
      const matchesStatus = status === 'all' || a.status === status;
      return matchesSearch && matchesStatus;
    });
  }

  updateStatus(id: string, status: AdminAppointment['status']) {
    this.adminData.updateAppointmentStatus(id, status);
  }

  deleteAppointment(id: string) {
    if (confirm('Delete this site visit booking?')) {
      this.adminData.deleteAppointment(id);
    }
  }

  openAddModal() {
    this.clientName.set('');
    this.phone.set('');
    this.email.set('');
    this.project.set('Royale Villa');
    this.city.set('Bangalore');
    this.preferredDate.set(new Date().toISOString().slice(0, 10));
    this.preferredTime.set('11:00 AM');
    this.notes.set('');
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }

  saveAppointment(e: Event) {
    e.preventDefault();
    this.adminData.addAppointment({
      clientName: this.clientName(),
      phone: this.phone(),
      email: this.email(),
      project: this.project(),
      city: this.city(),
      preferredDate: this.preferredDate(),
      preferredTime: this.preferredTime(),
      notes: this.notes()
    });
    this.closeModal();
  }
}
