import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ConsultationModalService } from '../../services/consultation-modal.service';
import { AdminDataService, OfficeLocation } from '../../services/admin-data.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  adminData = inject(AdminDataService);
  isScrolled = false;
  isSideMenuOpen = false;
  isMobileMenuOpen = false;
  isLocationsDropdownOpen = false;

  openDrawerSubmenu: { [key: string]: boolean } = {
    whatWeDo: false,
    products: false,
    locations: false,
    more: false
  };

  constructor(public consultationModalService: ConsultationModalService) {}

  get navLocations(): OfficeLocation[] {
    const locs = this.adminData.officeLocations();
    return locs.filter(loc => loc.status !== 'INACTIVE');
  }

  getCitySlug(city: string): string {
    if (!city) return 'bengaluru';
    const clean = city.trim().toLowerCase();
    if (clean === 'bangalore' || clean === 'bengaluru') return 'bengaluru';
    return clean.replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 20;
  }

  toggleSideMenu() {
    this.isSideMenuOpen = !this.isSideMenuOpen;
    if (typeof document !== 'undefined') {
      if (this.isSideMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleLocationsDropdown(event: Event) {
    if (typeof window !== 'undefined' && window.innerWidth <= 991.98) {
      event.preventDefault();
      event.stopPropagation();
      this.isLocationsDropdownOpen = !this.isLocationsDropdownOpen;
    }
  }

  toggleDrawerSubmenu(key: string, event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.openDrawerSubmenu[key] = !this.openDrawerSubmenu[key];
  }

  openConsultationModal(event: Event) {
    event.preventDefault();
    if (this.isSideMenuOpen) {
      this.toggleSideMenu();
    }
    this.consultationModalService.open();
  }
}

