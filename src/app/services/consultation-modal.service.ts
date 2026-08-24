import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsultationModalService {
  readonly isOpen = signal<boolean>(false);
  readonly isSubmitted = signal<boolean>(false);
  readonly isDismissed = signal<boolean>(false);

  constructor() {
    this.checkStatus();
  }

  private checkStatus() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const submitted = localStorage.getItem('primespace_consultation_submitted');
      if (submitted === 'true') {
        this.isSubmitted.set(true);
      }
      const dismissed = localStorage.getItem('primespace_consultation_dismissed');
      if (dismissed === 'true') {
        this.isDismissed.set(true);
      }
    }
  }

  // Opens modal manually when triggered by button clicks
  open() {
    this.isOpen.set(true);
  }

  // Opens modal automatically (only if form has not been submitted or dismissed by closing)
  openAuto() {
    if (!this.isSubmitted() && !this.isDismissed()) {
      this.isOpen.set(true);
    }
  }

  close() {
    this.isOpen.set(false);
    this.markDismissed();
  }

  toggle() {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  markDismissed() {
    this.isDismissed.set(true);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('primespace_consultation_dismissed', 'true');
    }
  }

  markSubmitted() {
    this.isSubmitted.set(true);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('primespace_consultation_submitted', 'true');
    }
  }

  resetSubmissionStatus() {
    this.isSubmitted.set(false);
    this.isDismissed.set(false);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('primespace_consultation_submitted');
      localStorage.removeItem('primespace_consultation_dismissed');
    }
  }
}
