import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ConsultationModalService } from '../../services/consultation-modal.service';
import { AdminDataService } from '../../services/admin-data.service';

@Component({
  selector: 'app-privacy-policy-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './privacy-policy-page.html',
  styleUrl: './privacy-policy-page.css'
})
export class PrivacyPolicyPage implements OnInit {
  adminData = inject(AdminDataService);

  constructor(public consultationModalService: ConsultationModalService) { }

  ngOnInit() {
    this.adminData.loadOfficeLocationsFromBackend().subscribe();
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }

  get contactEmail(): string {
    const locs = this.adminData.officeLocations();
    const activeLoc = locs.find(l => l.status === 'ACTIVE' && l.email);
    return activeLoc?.email || this.adminData.settings()?.email || 'support.primespaceinterior@gmail.com';
  }

  get gmailComposeUrl(): string {
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(this.contactEmail)}`;
  }

  scrollToSection(elementId: string, event: Event) {
    event.preventDefault();
    if (typeof document !== 'undefined') {
      const element = document.getElementById(elementId);
      if (element) {
        const yOffset = -90;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  }
}
