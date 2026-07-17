import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-before-after-slider',
  imports: [CommonModule],
  templateUrl: './before-after-slider.html',
  styleUrl: './before-after-slider.css',
})
export class BeforeAfterSlider {
  readonly sliderPosition = signal(50);

  onSliderInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.sliderPosition.set(Number(inputElement.value));
  }
}
