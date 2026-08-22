import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminDataService, AdminLead } from '../../../services/admin-data.service';

@Component({
  selector: 'app-admin-leads',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-leads.html',
  styleUrl: './admin-leads.css'
})
export class AdminLeads {
  adminData = inject(AdminDataService);

  searchQuery = signal('');
  statusFilter = signal('all');

  get filteredLeads(): AdminLead[] {
    const query = this.searchQuery().toLowerCase().trim();
    const status = this.statusFilter();

    return this.adminData.leads()
      .filter(l => {
        const matchesSearch = !query || l.name.toLowerCase().includes(query) || l.phone.includes(query) || l.email.toLowerCase().includes(query) || l.city.toLowerCase().includes(query);
        const matchesStatus = status === 'all' || l.status === status;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
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

  updateStatus(id: string, status: AdminLead['status']) {
    this.adminData.updateLeadStatus(id, status);
  }

  deleteLead(id: string) {
    if (confirm('Delete this inquiry record?')) {
      this.adminData.deleteLead(id);
    }
  }

  exportCSV() {
    const leads = this.adminData.leads();
    let csv = 'ID,Name,Phone,Email,City,ProjectType,Status,Date,Message\n';
    leads.forEach(l => {
      csv += `"${l.id}","${l.name}","${l.phone}","${l.email}","${l.city}","${l.projectType}","${l.status}","${l.date}","${l.message.replace(/"/g, '""')}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PrimeSpace_Leads_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
  }
}
