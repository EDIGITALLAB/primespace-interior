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
  readonly isSuccess = signal<boolean>(false);
  readonly successMessage = signal<string>('');
  readonly errorMessage = signal<string | null>(null);

  constructor(public consultationModalService: ConsultationModalService) {}

  closeModal() {
    this.isSuccess.set(false);
    this.errorMessage.set(null);
    this.consultationModalService.close();
  }

  async onModalFormSubmit(event: Event, name: string, email: string, phone: string, city: string, description?: string) {
    event.preventDefault();
    this.errorMessage.set(null);

    if (!name || !email || !phone || !city) {
      this.errorMessage.set('Please fill in all required fields (Name, Email, Phone, and Location).');
      return;
    }

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
          description: description || '',
          formSource: 'Book Free Consultation Popup'
        })
      });

      if (response.ok) {
        this.successMessage.set(`Thank you, ${name}! Your consultation request for ${city} has been received. Our lead architect will reach out to you within 24 hours.`);
        this.isSuccess.set(true);
        const form = event.target as HTMLFormElement;
        form.reset();
        this.consultationModalService.markSubmitted();
      } else {
        this.errorMessage.set('Oops! There was an issue submitting your request. Please try again.');
      }
    } catch (error) {
      this.errorMessage.set('Network connection error. Please check your internet connection and try again.');
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
