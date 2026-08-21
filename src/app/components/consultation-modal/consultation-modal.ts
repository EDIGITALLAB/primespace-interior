import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultationModalService } from '../../services/consultation-modal.service';

@Component({
  selector: 'app-consultation-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consultation-modal.html',
  styleUrl: './consultation-modal.css'
})
export class ConsultationModal {
  readonly isSubmitting = signal<boolean>(false);

  constructor(public consultationModalService: ConsultationModalService) {}

  async onModalFormSubmit(event: Event, name: string, email: string, phone: string, city: string) {
    event.preventDefault();
    if (!name || !email || !phone || !city) return;

    this.isSubmitting.set(true);

    try {
      const response = await fetch('https://formspree.io/f/moeabqjp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          phone: phone,
          location: city,
          formSource: 'Book Free Consultation Popup'
        })
      });

      if (response.ok) {
        alert(`Thank you, ${name}! Your consultation request for ${city} has been received. Our lead architect will reach out to you within 24 hours.`);
        const form = event.target as HTMLFormElement;
        form.reset();
        this.consultationModalService.markSubmitted();
        this.consultationModalService.close();
      } else {
        alert('Oops! There was an issue submitting your request. Please try again.');
      }
    } catch (error) {
      alert('Network connection error. Please try again later.');
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
