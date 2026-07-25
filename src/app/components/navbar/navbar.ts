import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConsultationModalService } from '../../services/consultation-modal.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  isScrolled = false;
  isSideMenuOpen = false;
  isMobileMenuOpen = false;

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

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  openConsultationModal(event: Event) {
    event.preventDefault();
    if (this.isSideMenuOpen) {
      this.toggleSideMenu();
    }
    this.consultationModalService.open();
  }
}
