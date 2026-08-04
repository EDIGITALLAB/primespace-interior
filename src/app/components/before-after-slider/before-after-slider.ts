import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-before-after-slider',
  imports: [CommonModule],
  templateUrl: './before-after-slider.html',
  styleUrl: './before-after-slider.css',
})
export class BeforeAfterSlider {
  readonly sliderPosition = signal(50);

  // Compute opacity for BEFORE badge (fades out when sliding to 0% / 100% AFTER)
  readonly beforeOpacity = computed(() => {
    const pos = this.sliderPosition();
    if (pos <= 10) return 0;
    if (pos >= 25) return 1;
    return (pos - 10) / 15;
  });

  // Compute opacity for AFTER badge (fades out when sliding to 100% / 100% BEFORE)
  readonly afterOpacity = computed(() => {
    const pos = this.sliderPosition();
    if (pos >= 90) return 0;
    if (pos <= 75) return 1;
    return (90 - pos) / 15;
  });

  onSliderInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.sliderPosition.set(Number(inputElement.value));
  }
}
