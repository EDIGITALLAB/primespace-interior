import { Component, signal, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

export interface WhyChoosePillar {
  id: string;
  num: string;
  icon: string;
  title: string;
  tag: string;
  description: string;
  badgeText: string;
}

@Component({
  selector: 'app-why-choose-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './why-choose-us.html',
  styleUrl: './why-choose-us.css',
})
export class WhyChooseUs {
  readonly activePillarIndex = signal(0);
  @ViewChild('pillarsTrack') pillarsTrack?: ElementRef<HTMLDivElement>;

  readonly pillars: WhyChoosePillar[] = [
    {
      id: '01',
      num: '01',
      icon: 'fa-solid fa-user-gear',
      title: 'Customer-Centric Focus',
      tag: 'Your Requirements First',
      description: 'Your requirements come first. We understand your needs, lifestyle, space & budget—and design around them.',
      badgeText: 'Customer First'
    },
    {
      id: '02',
      num: '02',
      icon: 'fa-solid fa-user-check',
      title: 'Experienced Execution',
      tag: 'Hands-on Experience',
      description: 'A new-age interior company backed by deep, hands-on execution experience to turn designs into reality.',
      badgeText: 'Expert Execution'
    },
    {
      id: '03',
      num: '03',
      icon: 'fa-solid fa-handshake',
      title: 'One Dedicated Partner',
      tag: 'Sketch to Handover',
      description: 'From first sketch to final handover. Design, materials, civil work, furniture, décor—all under one roof.',
      badgeText: 'Single Partner'
    },
    {
      id: '04',
      num: '04',
      icon: 'fa-solid fa-sliders',
      title: '100% Customized Solutions',
      tag: 'Nothing Standard',
      description: 'Customized dimensions, layouts, materials, finishes & furniture to suit your space, needs and budget.',
      badgeText: 'Fully Customized'
    },
    {
      id: '05',
      num: '05',
      icon: 'fa-solid fa-gem',
      title: 'Curated Premium Finishes',
      tag: 'Quality Materials',
      description: 'From kitchen tiles and slabs to fittings, storage, and furniture—customized down to the smallest detail.',
      badgeText: 'Grade-A Finishes'
    },
    {
      id: '06',
      num: '06',
      icon: 'fa-solid fa-calendar-check',
      title: 'Committed Timelines',
      tag: 'On-Time Handover',
      description: 'Design with confidence. Execute with experience. Projects delivered according to promised schedules.',
      badgeText: 'On-Time Delivery'
    },
    {
      id: '07',
      num: '07',
      icon: 'fa-solid fa-chart-line',
      title: 'Complete Coordination',
      tag: 'Live Progress Tracking',
      description: 'Everything coordinated seamlessly under one roof with regular updates and total transparency.',
      badgeText: 'Live Tracking'
    },
    {
      id: '08',
      num: '08',
      icon: 'fa-solid fa-shield-halved',
      title: 'Built to Last Guarantee',
      tag: 'Warranty & Support',
      description: 'Designed to fit. Built to last. Made for you—with continuous after-sales care and warranty assurance.',
      badgeText: 'Built To Last'
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  nextPillar() {
    this.activePillarIndex.update(val => (val + 1) % this.pillars.length);
    this.scrollToActivePillar();
  }

  prevPillar() {
    this.activePillarIndex.update(val => (val - 1 + this.pillars.length) % this.pillars.length);
    this.scrollToActivePillar();
  }

  setPillarIndex(idx: number) {
    this.activePillarIndex.set(idx);
    this.scrollToActivePillar();
  }

  scrollToActivePillar() {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.pillarsTrack?.nativeElement) {
      const track = this.pillarsTrack.nativeElement;
      const cards = Array.from(track.children) as HTMLElement[];
      const card = cards[this.activePillarIndex()];
      if (card) {
        const trackWidth = track.clientWidth;
        const targetScrollLeft = card.offsetLeft - (trackWidth - card.clientWidth) / 2;
        track.scrollTo({ left: Math.max(0, targetScrollLeft), behavior: 'smooth' });
      }
    }
  }

  onPillarsScroll(event: Event) {
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

        if (closestIndex !== this.activePillarIndex()) {
          this.activePillarIndex.set(closestIndex);
        }
      }
    }
  }
}
