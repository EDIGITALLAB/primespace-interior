import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ConsultationModalService } from '../../services/consultation-modal.service';

export interface ServiceCardData {
  id: string;
  slug: string;
  num: string;
  title: string;
  tagline: string;
  badge: string;
  icon: string;
  image: string;
  items: string[];
}

@Component({
  selector: 'app-featured-services',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './featured-services.html',
  styleUrl: './featured-services.css',
})
export class FeaturedServices {
  constructor(public consultationModalService: ConsultationModalService) {}

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
        'Complete Home Interiors',
        'Modular Kitchen',
        'Wardrobes',
        'TV Units',
        'False Ceiling',
        'Wall Paneling',
        'Painting',
        'Lighting Design',
        'Space Planning'
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
        'Masonry & Brickwork',
        'Laser Tile Leveling',
        'Concealed Electrical',
        'Gypsum & POP Works',
        'Multi-Coat Painting'
      ]
    },
    {
      id: '03',
      slug: 'wood-works',
      num: '03',
      title: 'Wood Works',
      tagline: 'German CNC precision joinery & handcrafted wooden masterwork.',
      badge: '7 Craft Options',
      icon: 'fa-solid fa-couch',
      image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=800&auto=format&fit=crop',
      items: [
        'Modular Furniture',
        'Bespoke Hardwood',
        'BWP Marine Plywood',
        'Natural Veneers',
        'Anti-Scratch Laminates',
        'Mirror Acrylic Finish',
        'Dust-Free PU Polish'
      ]
    }
  ];

  openConsultationModal(event: Event) {
    event.preventDefault();
    this.consultationModalService.open();
  }
}
