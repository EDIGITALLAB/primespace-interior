import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AdminDataService, AdminStats } from '../../../services/admin-data.service';

export interface NavItem {
  label: string;
  route: string;
  icon: string;
  badgeKey?: string;
}

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css'
})
export class AdminLayout {
  adminData = inject(AdminDataService);
  private router = inject(Router);

  isMobileSidebarOpen = signal(false);

  get stats(): AdminStats {
    return this.adminData.stats();
  }

  navItems: NavItem[] = [
    { label: 'Dashboard', route: '/admin/dashboard', icon: 'fa-solid fa-chart-line' },
    { label: 'Projects', route: '/admin/projects', icon: 'fa-solid fa-building-user' },
    { label: 'Categories', route: '/admin/categories', icon: 'fa-solid fa-layer-group' },
    { label: 'Gallery', route: '/admin/gallery', icon: 'fa-regular fa-images' },
    { label: 'Leads / Inquiry', route: '/admin/leads', icon: 'fa-solid fa-envelope-open-text', badgeKey: 'newLeads' },
    { label: 'Appointments', route: '/admin/appointments', icon: 'fa-solid fa-calendar-check', badgeKey: 'pendingAppointments' },
    { label: 'Testimonials', route: '/admin/testimonials', icon: 'fa-solid fa-star' },
    { label: 'Team', route: '/admin/team', icon: 'fa-solid fa-user-tie' },
    { label: 'Settings', route: '/admin/settings', icon: 'fa-solid fa-gear' }
  ];

  toggleMobileSidebar() {
    this.isMobileSidebarOpen.update(v => !v);
  }

  closeMobileSidebar() {
    this.isMobileSidebarOpen.set(false);
  }

  logout() {
    this.adminData.logout();
    this.router.navigate(['/admin/login']);
  }
}
