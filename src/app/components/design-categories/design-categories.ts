import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-design-categories',
  imports: [CommonModule],
  templateUrl: './design-categories.html',
  styleUrl: './design-categories.css',
})
export class DesignCategories {
  readonly currentSlide = signal(0);

  nextSlide() {
    this.currentSlide.set(1);
  }

  prevSlide() {
    this.currentSlide.set(0);
  }
}
