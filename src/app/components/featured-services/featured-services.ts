import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultationModalService } from '../../services/consultation-modal.service';

export interface ServiceCardData {
  id: string;
  num: string;
  title: string;
  icon: string;
  items: string[];
}

@Component({
  selector: 'app-featured-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './featured-services.html',
  styleUrl: './featured-services.css',
})
export class FeaturedServices {
  constructor(public consultationModalService: ConsultationModalService) {}

  readonly servicesList: ServiceCardData[] = [
    {
      id: '01',
      num: '01',
      title: 'Residential Interiors',
      icon: 'fa-solid fa-house-chimney-window',
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
      num: '02',
      title: 'Commercial Interiors',
      icon: 'fa-solid fa-city',
      items: [
        'Office Interiors',
        'Retail Showrooms',
        'Cafes',
        'Restaurants',
        'Clinics',
        'Salons',
        'Co-working Spaces'
      ]
    },
    {
      id: '03',
      num: '03',
      title: 'Civil Works',
      icon: 'fa-solid fa-cubes-stacked',
      items: [
        'Masonry',
        'Tiling',
        'Electrical',
        'POP Works',
        'Painting'
      ]
    },
    {
      id: '04',
      num: '04',
      title: 'Wood Works',
      icon: 'fa-solid fa-couch',
      items: [
        'Modular Furniture',
        'Custom Furniture',
        'Plywood Furniture',
        'Veneer',
        'Laminates',
        'Acrylic Finish',
        'PU Finish'
      ]
    },
    {
      id: '05',
      num: '05',
      title: 'Renovation',
      icon: 'fa-solid fa-paint-roller',
      items: [
        'Home Renovation',
        'Villa Renovation',
        'Office Renovation'
      ]
    }
  ];

  openConsultationModal(event: Event) {
    event.preventDefault();
    this.consultationModalService.open();
  }
}
