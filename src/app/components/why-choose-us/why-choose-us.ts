import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  readonly pillars: WhyChoosePillar[] = [
    {
      id: '01',
      num: '01',
      icon: 'fa-solid fa-compass-drafting',
      title: 'Design First',
      tag: 'Creative Planning',
      description: 'Every project begins with thoughtful planning and creative design.',
      badgeText: 'Design First'
    },
    {
      id: '02',
      num: '02',
      icon: 'fa-solid fa-user-check',
      title: 'Experienced Execution',
      tag: 'Expert Team',
      description: 'Handled by professionals with years of industry expertise.',
      badgeText: 'Expert Execution'
    },
    {
      id: '03',
      num: '03',
      icon: 'fa-solid fa-receipt',
      title: 'Transparent Pricing',
      tag: 'Zero Hidden Costs',
      description: 'Clear quotations with absolutely no hidden costs.',
      badgeText: 'Clear Quote'
    },
    {
      id: '04',
      num: '04',
      icon: 'fa-solid fa-user-tie',
      title: 'Dedicated Project Manager',
      tag: 'Single Contact Lead',
      description: 'A single point of contact throughout your project.',
      badgeText: '1:1 Manager'
    },
    {
      id: '05',
      num: '05',
      icon: 'fa-solid fa-gem',
      title: 'Premium Quality',
      tag: 'Trusted Brands',
      description: 'Only trusted brands and premium-quality materials.',
      badgeText: 'Grade-A Materials'
    },
    {
      id: '06',
      num: '06',
      icon: 'fa-solid fa-calendar-check',
      title: 'Timely Delivery',
      tag: 'Committed Timelines',
      description: 'Projects delivered according to committed timelines.',
      badgeText: 'On-Time Handover'
    },
    {
      id: '07',
      num: '07',
      icon: 'fa-solid fa-chart-line',
      title: 'Digital Project Tracking',
      tag: 'Regular Progress',
      description: 'Stay updated with regular project progress reports.',
      badgeText: 'Live Reports'
    },
    {
      id: '08',
      num: '08',
      icon: 'fa-solid fa-headset',
      title: 'After Sales Support',
      tag: 'Warranty & Care',
      description: 'Warranty and maintenance assistance even after project completion.',
      badgeText: 'Lifetime Support'
    }
  ];
}
