import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-map-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map-contact.html',
  styleUrl: './map-contact.css'
})
export class MapContact {
  onSubmitMessage(event: Event, name: string, email: string, phone: string, service: string, message: string) {
    event.preventDefault();
    if (name && email && phone && service && message) {
      alert(`Thank you, ${name}! Your inquiry for "${service}" has been received. Our expert will reach out to you at ${email} or call ${phone} soon.`);
      const form = event.target as HTMLFormElement;
      form.reset();
    }
  }
}
