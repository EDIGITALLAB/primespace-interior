import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultationModalService } from '../../services/consultation-modal.service';
import { FormspreeService } from '../../services/formspree.service';
import { AdminDataService, OfficeLocation } from '../../services/admin-data.service';

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

  private formspreeService = inject(FormspreeService);
  private adminData = inject(AdminDataService);

  constructor(public consultationModalService: ConsultationModalService) {}

  get consultationLocations(): OfficeLocation[] {
    const locs = this.adminData.officeLocations();
    return locs.filter(loc => loc.status !== 'INACTIVE');
  }

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

    const cleanPhone = (phone || '').replace(/\D/g, '').slice(0, 10);
    if (cleanPhone.length !== 10) {
      this.errorMessage.set('Please enter a valid 10-digit phone number.');
      return;
    }

    this.isSubmitting.set(true);

    const payload = {
      fullName: name.trim(),
      email: email.trim(),
      phone: cleanPhone,
      location: city.trim(),
      message: (description && description.trim().length >= 10) ? description.trim() : `Free Consultation booking request for ${city}`,
      source: 'Book Free Consultation Popup'
    };

    try {
      const result = await this.formspreeService.submitLeadForm(payload);

      if (result.dbSuccess || result.formspreeSuccess) {
        this.successMessage.set(`Thank you, ${name}! Your consultation request for ${city} has been received. Our lead architect will reach out to you within 24 hours.`);
        this.isSuccess.set(true);
        const form = event.target as HTMLFormElement;
        form.reset();
        this.consultationModalService.markSubmitted();
      } else {
        this.errorMessage.set(result.errorMessage || 'Oops! There was an issue submitting your request. Please try again.');
      }
    } catch (error) {
      this.errorMessage.set('Network connection error. Please check your internet connection.');
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
