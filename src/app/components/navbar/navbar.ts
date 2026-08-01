import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConsultationModalService } from '../../services/consultation-modal.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
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

