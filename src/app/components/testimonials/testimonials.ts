import { Component, signal, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

export interface Testimonial {
  name: string;
  avatar: string;
  location: string;
  review: string;
  service: string;
  rating: number;
  isClone?: boolean;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css',
})
export class Testimonials implements OnInit, OnDestroy {
  readonly activeIndex = signal(0);
  readonly isAnimating = signal(true);
  private timer: any = null;
  private touchStartX = 0;
  private touchEndX = 0;

  readonly list: Testimonial[] = [
    {
      name: 'Aarav Mehta',
      avatar: '/aarav_avatar.png',
      location: 'Indiranagar, Bengaluru',
      review: 'Prime Space turned our empty 3BHK flat into a luxury masterpiece. The oak wall paneling and hidden LED lights are exactly what we wanted. Highly professional team!',
      service: 'Full 3BHK Design Makeover',
      rating: 5,
      isClone: false
    },
    {
      name: 'Neha Mishra',
      avatar: '/neha_avatar.png',
      location: 'Patia, Bhubaneswar',
      review: 'Highly impressed with their bespoke modular kitchen design. The smart storage options and German soft-close hardware make cooking a daily joy.',
      service: 'Bespoke Modular Kitchen',
      rating: 5,
      isClone: false
    },
    {
      name: 'Vikram Sen',
      avatar: '/vikram_avatar.png',
      location: 'Whitefield, Bengaluru',
      review: 'The wardrobes and bedroom layouts they created transformed our master suite into a five-star resort suite. Exceptional detailing and quality checks.',
      service: 'Master Bedroom Renovation',
      rating: 5,
      isClone: false
    }
  ];

  // Display list includes 1 clone of Aarav at the end for continuous forward loop
  readonly displayList: Testimonial[] = [
    ...this.list.map(item => ({ ...item, isClone: false })),
    { ...this.list[0], isClone: true }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.startAutoSlide();
    }
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  startAutoSlide() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.stopAutoSlide();
    this.timer = setInterval(() => {
      this.nextIndex();
    }, 3800);
  }

  stopAutoSlide() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  nextIndex() {
    this.isAnimating.set(true);
    const curr = this.activeIndex();

    // If currently at clone (index 3), reset instantly to 0 first without animation
    if (curr >= this.list.length) {
      this.isAnimating.set(false);
      this.activeIndex.set(0);

      setTimeout(() => {
        this.isAnimating.set(true);
        this.activeIndex.set(1);
      }, 50);
      return;
    }

    const next = curr + 1;
    this.activeIndex.set(next);

    // If we just slid forward to index 3 (the clone), set timer to instantly jump back to 0
    if (next === this.list.length) {
      setTimeout(() => {
        this.isAnimating.set(false);
        this.activeIndex.set(0);
      }, 550);
    }
  }

  prevIndex() {
    this.isAnimating.set(true);
    const curr = this.activeIndex();

    if (curr === 0) {
      this.isAnimating.set(false);
      this.activeIndex.set(this.list.length);

      setTimeout(() => {
        this.isAnimating.set(true);
        this.activeIndex.set(this.list.length - 1);
      }, 50);
      return;
    }

    this.activeIndex.set(curr - 1);
  }

  setIndex(idx: number) {
    this.isAnimating.set(true);
    this.activeIndex.set(idx);
    this.startAutoSlide();
  }

  onTouchStart(e: TouchEvent) {
    this.stopAutoSlide();
    this.touchStartX = e.changedTouches[0].screenX;
  }

  onTouchEnd(e: TouchEvent) {
    this.touchEndX = e.changedTouches[0].screenX;
    this.handleSwipe();
    this.startAutoSlide();
  }

  private handleSwipe() {
    const diff = this.touchStartX - this.touchEndX;
    if (diff > 40) {
      this.nextIndex();
    } else if (diff < -40) {
      this.prevIndex();
    }
  }

  get activeDotIndex(): number {
    return this.activeIndex() % this.list.length;
  }
}
