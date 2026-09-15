import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminDataService, OfficeLocation } from '../../services/admin-data.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
  adminData = inject(AdminDataService);
  currentYear = new Date().getFullYear();
  showScrollTop = false;

  get footerLocations(): OfficeLocation[] {
    const locs = this.adminData.officeLocations();
    return locs.filter(loc => loc.status !== 'INACTIVE');
  }

  getCitySlug(city: string): string {
    if (!city) return 'bengaluru';
    const clean = city.trim().toLowerCase();
    if (clean === 'bangalore' || clean === 'bengaluru') return 'bengaluru';
    return clean.replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  formatExternalUrl(url?: string): string {
    if (!url || !url.trim()) return '#';
    const trimmed = url.trim();
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('//')) {
      return trimmed;
    }
    return `https://${trimmed}`;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (typeof window !== 'undefined') {
      this.showScrollTop = window.scrollY > 300;
    }
  }

  scrollToTop() {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  onSubscribe(event: Event, email: string) {
    event.preventDefault();
    if (email && email.trim()) {
      alert(`Thank you for subscribing, ${email}!`);
    }
  }
}
