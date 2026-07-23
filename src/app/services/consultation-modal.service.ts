import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsultationModalService {
  isOpen = signal<boolean>(false);

  open() {
    this.isOpen.set(true);
  }

  close() {
    this.isOpen.set(false);
  }

  toggle() {
    this.isOpen.set(!this.isOpen());
  }
}
