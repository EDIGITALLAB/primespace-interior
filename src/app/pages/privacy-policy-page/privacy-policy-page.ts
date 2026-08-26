import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ConsultationModalService } from '../../services/consultation-modal.service';

@Component({
  selector: 'app-privacy-policy-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './privacy-policy-page.html',
  styleUrl: './privacy-policy-page.css'
})
export class PrivacyPolicyPage implements OnInit {
  constructor(public consultationModalService: ConsultationModalService) { }

  ngOnInit() {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
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
