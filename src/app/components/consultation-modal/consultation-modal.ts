import { Component } from '@angular/core';
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
  constructor(public consultationModalService: ConsultationModalService) {}

  onModalFormSubmit(event: Event, name: string, email: string, phone: string, city: string) {
    event.preventDefault();
    if (name && email && phone && city) {
      alert(`Thank you, ${name}! Your consultation request for ${city} has been received. Our lead architect will reach out to you within 24 hours.`);
      const form = event.target as HTMLFormElement;
      form.reset();
      this.consultationModalService.close();
    }
  }
}
