import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDataService } from '../../services/admin-data.service';

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
  readonly pageIndex = signal(0);
  private touchStartX = 0;
  private touchEndX = 0;

  adminData = inject(AdminDataService);

  get list(): Testimonial[] {
    const adminItems = this.adminData.testimonials().filter(at => (at.status || 'ACTIVE') === 'ACTIVE');
    if (adminItems && adminItems.length > 0) {
      return adminItems.map(at => ({
        name: at.name,
        avatar: at.avatar || '/default_user_avatar.svg',
        location: at.location,
        review: at.comment,
        service: at.project || at.role || 'Turnkey Project',
        rating: at.rating || 5
      }));
    }
    return [];
  }

  get visibleCards(): Testimonial[] {
    const all = this.list;
    if (all.length === 0) return [];
    if (all.length <= 3) return all;

    const start = ((this.pageIndex() % all.length) + all.length) % all.length;
    const N = all.length;
    return [
      all[start],
      all[(start + 1) % N],
      all[(start + 2) % N]
    ];
  }

  get totalPages(): number {
    return this.list.length;
  }

  nextPage() {
    if (this.list.length <= 3) return;
    this.pageIndex.update(idx => idx + 1);
  }

  prevPage() {
    if (this.list.length <= 3) return;
    this.pageIndex.update(idx => idx - 1);
  }

  onTouchStart(e: TouchEvent) {
    this.touchStartX = e.changedTouches[0].screenX;
  }

  onTouchEnd(e: TouchEvent) {
    this.touchEndX = e.changedTouches[0].screenX;
    this.handleSwipe();
  }

  private handleSwipe() {
    const diff = this.touchStartX - this.touchEndX;
    if (diff > 40) {
      this.nextPage();
    } else if (diff < -40) {
      this.prevPage();
    }
  }
}
