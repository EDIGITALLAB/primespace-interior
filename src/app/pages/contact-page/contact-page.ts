import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConsultationModalService } from '../../services/consultation-modal.service';
import { MapContact } from '../../components/map-contact/map-contact';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, FormsModule, MapContact],
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.css',
})
export class ContactPage {
  // Form Signals
  readonly fullName = signal<string>('');
  readonly phone = signal<string>('');
  readonly email = signal<string>('');
  readonly propertyType = signal<string>('2bhk');
  readonly budget = signal<string>('10-15lakhs');
  readonly studioLocation = signal<string>('bengaluru');
  readonly message = signal<string>('');

  // Form State
  readonly isSubmitted = signal<boolean>(false);
  readonly isSubmitting = signal<boolean>(false);

  // Active FAQ Index
  readonly activeFaqIndex = signal<number | null>(0);

  constructor(public consultationModalService: ConsultationModalService) {}

  readonly faqs = [
    {
      q: 'How does the free 3D design consultation work?',
      a: 'Our senior interior architect meets with you (at our studio or virtually), reviews your floor plan, understands your lifestyle requirements, and presents a 3D layout along with a transparent room-by-room quote.'
    },
    {
      q: 'Do I need an appointment to visit the Experience Center?',
      a: 'Walk-ins are always welcome during business hours (9 AM - 7 PM, Mon-Sat). However, booking an appointment ensures a dedicated interior designer is ready to give you a guided walkthrough of our material displays.'
    },
    {
      q: 'What is the standard delivery timeline for a full home project?',
      a: 'We deliver complete factory-finished modular interiors in 45 days from the date of final design sign-off. We provide daily live digital tracking updates throughout the process.'
    },
    {
      q: 'What warranty is provided on modular cabinets and fittings?',
      a: 'We provide a 10-year structural warranty on all factory-manufactured cabinets, HDMR cores, and German soft-close hardware fittings (Hettich & Blum).'
    }
  ];

  toggleFaq(idx: number) {
    this.activeFaqIndex.set(this.activeFaqIndex() === idx ? null : idx);
  }

  submitContactForm(event: Event) {
    event.preventDefault();
    if (!this.fullName() || !this.phone()) {
      alert('Please fill in your name and phone number so our designers can reach out to you.');
      return;
    }

    this.isSubmitting.set(true);

    setTimeout(() => {
      this.isSubmitting.set(false);
      this.isSubmitted.set(true);
    }, 1000);
  }

  resetForm() {
    this.fullName.set('');
    this.phone.set('');
    this.email.set('');
    this.message.set('');
    this.isSubmitted.set(false);
  }
}
