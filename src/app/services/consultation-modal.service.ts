import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsultationModalService {
  readonly isOpen = signal<boolean>(false);
  readonly isSubmitted = signal<boolean>(false);

  constructor() {
    this.checkSubmissionStatus();
  }

  private checkSubmissionStatus() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const submitted = localStorage.getItem('primespace_consultation_submitted');
      if (submitted === 'true') {
        this.isSubmitted.set(true);
      }
    }
  }

  // Opens modal manually when triggered by button clicks
  open() {
    this.isOpen.set(true);
  }

  // Opens modal automatically (only if form has not been submitted yet)
  openAuto() {
    if (!this.isSubmitted()) {
      this.isOpen.set(true);
    }
  }

  close() {
    this.isOpen.set(false);
  }

  toggle() {
    this.isOpen.set(!this.isOpen());
  }

  markSubmitted() {
    this.isSubmitted.set(true);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('primespace_consultation_submitted', 'true');
    }
  }

  resetSubmissionStatus() {
    this.isSubmitted.set(false);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('primespace_consultation_submitted');
    }
  }
}
