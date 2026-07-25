import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
  currentYear = new Date().getFullYear();

  onSubscribe(event: Event, email: string) {
    event.preventDefault();
    if (email && email.trim()) {
      alert(`Thank you for subscribing, ${email}!`);
    }
  }
}
