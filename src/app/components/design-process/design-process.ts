import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-design-process',
  imports: [CommonModule],
  templateUrl: './design-process.html',
  styleUrl: './design-process.css',
})
export class DesignProcess {
  readonly activeStep = signal<number | null>(null);

  setActiveStep(step: number | null) {
    this.activeStep.set(step);
  }
}
