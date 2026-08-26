import { Component, signal, ElementRef, ViewChild, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ConsultationModalService } from '../../services/consultation-modal.service';

export interface ServiceItem {
  name: string;
  icon: string;
}

export interface ServiceCardData {
  id: string;
  slug: string;
  num: string;
  title: string;
  tagline: string;
  badge: string;
  icon: string;
  image: string;
  items: ServiceItem[];
}

@Component({
  selector: 'app-featured-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './featured-services.html',
  styleUrl: './featured-services.css',
})
export class FeaturedServices implements OnInit, OnDestroy {
  @ViewChild('fsCardsRow') fsCardsRow!: ElementRef<HTMLDivElement>;

  currentSlide = signal(0);
  private timer: any = null;

  constructor(
    public consultationModalService: ConsultationModalService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

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
      this.slideNext();
    }, 3800);
  }

  stopAutoSlide() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  readonly servicesList: ServiceCardData[] = [
    {
      id: '01',
      slug: 'residential-interiors',
      num: '01',
      title: 'Residential Interiors',
      tagline: 'End-to-end luxury home architecture & bespoke interior planning.',
      badge: '9 Specializations',
      icon: 'fa-solid fa-house-chimney-window',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop',
      items: [
        { name: 'Complete Home Interiors', icon: 'fa-solid fa-house' },
        { name: 'Modular Kitchen', icon: 'fa-solid fa-kitchen-set' },
        { name: 'Wardrobes', icon: 'fa-solid fa-door-closed' },
        { name: 'TV Units', icon: 'fa-solid fa-tv' },
        { name: 'False Ceiling', icon: 'fa-solid fa-layer-group' },
        { name: 'Wall Paneling', icon: 'fa-solid fa-border-all' },
        { name: 'Painting', icon: 'fa-solid fa-paint-roller' },
        { name: 'Lighting Design', icon: 'fa-solid fa-lightbulb' },
        { name: 'Space Planning', icon: 'fa-solid fa-compass-drafting' }
      ]
    },
    {
      id: '02',
      slug: 'civil-works',
      num: '02',
      title: 'Civil Works',
      tagline: 'Rock-solid structural modifications & precision engineering.',
      badge: '5 Core Solutions',
      icon: 'fa-solid fa-cubes-stacked',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
      items: [
        { name: 'Masonry & Brickwork', icon: 'fa-solid fa-trowel-bricks' },
        { name: 'Laser Tile Leveling', icon: 'fa-solid fa-vector-square' },
        { name: 'Concealed Electrical', icon: 'fa-solid fa-plug' },
        { name: 'Gypsum & POP Works', icon: 'fa-solid fa-shapes' },
        { name: 'Multi-Coat Painting', icon: 'fa-solid fa-brush' }
      ]
    },
    {
      id: '03',
      slug: 'wood-works',
      num: '03',
      title: 'Wood Works',
      tagline: 'Custom CNC precision joinery & handcrafted wooden masterwork.',
      badge: '7 Craft Options',
      icon: 'fa-solid fa-couch',
      image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=800&auto=format&fit=crop',
      items: [
        { name: 'Modular Furniture', icon: 'fa-solid fa-couch' },
        { name: 'Bespoke Hardwood', icon: 'fa-solid fa-tree' },
        { name: 'BWP Marine Plywood', icon: 'fa-solid fa-shield-halved' },
        { name: 'Natural Veneers', icon: 'fa-solid fa-leaf' },
        { name: 'Anti-Scratch Laminates', icon: 'fa-solid fa-gem' },
        { name: 'Mirror Acrylic Finish', icon: 'fa-solid fa-wand-magic-sparkles' },
        { name: 'Dust-Free PU Polish', icon: 'fa-solid fa-spray-can' }
      ]
    }
  ];

  get totalCards() {
    return this.servicesList.length;
  }

  slideTo(index: number) {
    const targetIndex = (index + this.totalCards) % this.totalCards;
    this.currentSlide.set(targetIndex);
    if (!isPlatformBrowser(this.platformId)) return;
    const row = this.fsCardsRow?.nativeElement;
    if (!row) return;
    const cards = Array.from(row.children) as HTMLElement[];
    const card = cards[targetIndex];
    if (card) {
      const rowWidth = row.clientWidth;
      const targetScrollLeft = card.offsetLeft - (rowWidth - card.clientWidth) / 2;
      row.scrollTo({ left: Math.max(0, targetScrollLeft), behavior: 'smooth' });
    }
  }

  slidePrev() {
    this.slideTo(this.currentSlide() - 1);
    this.startAutoSlide();
  }

  slideNext() {
    this.slideTo(this.currentSlide() + 1);
    this.startAutoSlide();
  }

  onCardsScroll(event: Event) {
    if (!isPlatformBrowser(this.platformId)) return;
    const target = event.target as HTMLElement;
    if (target && target.clientWidth > 0) {
      const scrollPos = target.scrollLeft;
      const cards = Array.from(target.children) as HTMLElement[];

      if (cards.length > 0) {
        let closestIndex = 0;
        let minDistance = Infinity;
        const centerPos = scrollPos + target.clientWidth / 2;

        cards.forEach((card, idx) => {
          const cardCenter = card.offsetLeft + card.clientWidth / 2;
          const distance = Math.abs(centerPos - cardCenter);
          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = idx;
          }
        });

        if (closestIndex !== this.currentSlide()) {
          this.currentSlide.set(closestIndex);
        }
      }
    }
  }

  openConsultationModal(event: Event) {
    event.preventDefault();
    this.consultationModalService.open();
  }
}
