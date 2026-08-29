import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminDataService, AdminAppointment, AdminLead, AdminStats } from '../../../services/admin-data.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard {
  adminData = inject(AdminDataService);

  get stats(): AdminStats {
    return this.adminData.stats();
  }

  get currentDate(): string {
    const today = new Date();
    return today.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' });
  }

  get recentAppointments(): AdminAppointment[] {
    return this.adminData.appointments().slice(0, 5);
  }

  get recentLeads(): AdminLead[] {
    return [...this.adminData.leads()].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);
  }

  updateApptStatus(id: string, status: AdminAppointment['status']) {
    this.adminData.updateAppointmentStatus(id, status);
  }

  deleteAppt(id: string) {
    if (confirm('Delete this site appointment?')) {
      this.adminData.deleteAppointment(id);
    }
  }

  copiedText: string | null = null;

  copyToClipboard(text: string) {
    if (text) {
      navigator.clipboard.writeText(text);
      this.copiedText = text;
      setTimeout(() => {
        if (this.copiedText === text) {
          this.copiedText = null;
        }
      }, 2000);
    }
  }

  formatStatus(status: string): string {
    if (!status) return '';
    if (status === 'IN_PROGRESS' || status === 'In Progress') return 'In Progress';
    if (status === 'NEW' || status === 'New') return 'New';
    if (status === 'CONTACTED' || status === 'Contacted') return 'Contacted';
    if (status === 'COMPLETED' || status === 'Completed') return 'Completed';
    if (status === 'CLOSED' || status === 'Closed') return 'Closed';
    return status.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
  }

  updateLeadStatus(id: string, status: AdminLead['status']) {
    this.adminData.updateLeadStatus(id, status);
  }

  deleteLead(id: string) {
    if (confirm('Delete this inquiry?')) {
      this.adminData.deleteLead(id);
    }
  }
}
