import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Brand {
  id: string;
  name: string;
  category: string;
}

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brands.html',
  styleUrl: './brands.css',
})
export class Brands {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;

  private touchStartX = 0;
  private touchEndX = 0;

  brandsList: Brand[] = [
    { id: 'jaquar', name: 'Jaquar', category: 'Bath & Lighting Fittings' },
    { id: 'saint-gobain', name: 'Saint-Gobain', category: 'Premium Glass Solutions' },
    { id: 'centuryply', name: 'CenturyPly', category: 'Plywood & Decorative Veneers' },
    { id: 'bosch', name: 'Bosch', category: 'Smart Home Appliances' },
    { id: 'siemens', name: 'Siemens', category: 'Built-in Kitchen Appliances' },
    { id: 'hettich', name: 'Hettich', category: 'German Hardware Systems' },
    { id: 'greenlam', name: 'Greenlam Laminates', category: 'Decorative Laminates & Surfaces' },
    { id: 'samsung', name: 'Samsung', category: 'Consumer Electronics & Appliances' },
    { id: 'asianpaints', name: 'Asian Paints', category: 'Luxury Paints & Wall Finishes' },
    { id: 'hafele', name: 'Häfele', category: 'Architectural Hardware & Fittings' },
    { id: 'kohler', name: 'Kohler', category: 'Luxury Sanitaryware & Fixtures' },
    { id: 'ddecor', name: "D'Decor", category: 'Premium Home Soft Furnishings' }
  ];

  scrollLeft() {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollBy({ left: -340, behavior: 'smooth' });
    }
  }

  scrollRight() {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollBy({ left: 340, behavior: 'smooth' });
    }
  }

  onTouchStart(e: TouchEvent) {
    this.touchStartX = e.changedTouches[0].screenX;
  }

  onTouchEnd(e: TouchEvent) {
    this.touchEndX = e.changedTouches[0].screenX;
    const diff = this.touchStartX - this.touchEndX;
    if (diff > 40) {
      this.scrollRight();
    } else if (diff < -40) {
      this.scrollLeft();
    }
  }
}
