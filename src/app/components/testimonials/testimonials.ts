import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Testimonial {
  name: string;
  avatar: string;
  location: string;
  review: string;
  service: string;
  rating: number;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css',
})
export class Testimonials {
  readonly activeIndex = signal(0);

  readonly list: Testimonial[] = [
    {
      name: 'Aarav Mehta',
      avatar: '/aarav_avatar.png',
      location: 'Indiranagar, Bengaluru',
      review: 'Prime Space turned our empty 3BHK flat into a luxury masterpiece. The oak wall paneling and hidden LED lights are exactly what we wanted. Highly professional team!',
      service: 'Full 3BHK Design Makeover',
      rating: 5
    },
    {
      name: 'Neha Mishra',
      avatar: '/neha_avatar.png',
      location: 'Patia, Bhubaneswar',
      review: 'Highly impressed with their bespoke modular kitchen design. The smart storage options and German soft-close hardware make cooking a daily joy.',
      service: 'Bespoke Modular Kitchen',
      rating: 5
    },
    {
      name: 'Vikram Sen',
      avatar: '/vikram_avatar.png',
      location: 'Whitefield, Bengaluru',
      review: 'The wardrobes and bedroom layouts they created transformed our master suite into a five-star resort suite. Exceptional detailing and quality checks.',
      service: 'Master Bedroom Renovation',
      rating: 5
    }
  ];

  nextIndex() {
    this.activeIndex.update(val => (val + 1) % this.list.length);
  }

  prevIndex() {
    this.activeIndex.update(val => (val - 1 + this.list.length) % this.list.length);
  }

  setIndex(idx: number) {
    this.activeIndex.set(idx);
  }
}
