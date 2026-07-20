import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Category {
  id: string;
  num: string;
  name: string;
  image: string;
  desc: string;
}

@Component({
  selector: 'app-design-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './design-categories.html',
  styleUrl: './design-categories.css',
})
export class DesignCategories {
  readonly activeIndex = signal(0);

  readonly categories: Category[] = [
    {
      id: 'kitchen',
      num: '01',
      name: 'Kitchen',
      image: '/kitchen_cat.png',
      desc: 'Bespoke modular kitchens designed for culinary excellence, featuring intelligent space utilization and German-engineered soft-close fittings.'
    },
    {
      id: 'living',
      num: '02',
      name: 'Living Room',
      image: '/living_cat.png',
      desc: 'Sophisticated living rooms crafted for entertainment and luxury relaxation, combining plush seating with custom TV units and ambient wall panels.'
    },
    {
      id: 'bedroom',
      num: '03',
      name: 'Bedroom',
      image: '/bedroom_cat.png',
      desc: 'Bespoke bedroom sanctuaries crafted to foster tranquil sleep. Includes custom headboards, side panels, and integrated accent lighting.'
    },
    {
      id: 'dining',
      num: '04',
      name: 'Dining Room',
      image: '/dining_cat.png',
      desc: 'Exquisite dining spaces built for gatherings. Features custom marble table installations, designer pendant lights, and display bars.'
    },
    {
      id: 'wardrobe',
      num: '05',
      name: 'Wardrobes',
      image: '/wardrobe_cat.png',
      desc: 'Luxury sliding and walk-in wardrobes with premium leather finishes, glass doors, sensor lighting, and smart modular organizers.'
    },
    {
      id: 'kids',
      num: '06',
      name: 'Kids Room',
      image: '/kids_cat.png',
      desc: 'Vibrant, safe, and modular children bedrooms incorporating smart study tables, playful bunk beds, and creative storage walls.'
    },
    {
      id: 'bathroom',
      num: '07',
      name: 'Bathroom',
      image: '/bathroom_cat.png',
      desc: 'Spa-like vanity units and bathroom transformations featuring gold finishes, storage cabinets, and clean marble slab counters.'
    },
    {
      id: 'balcony',
      num: '08',
      name: 'Balcony',
      image: '/balcony_cat.png',
      desc: 'Charming green escape spaces with vertical wooden rafters, fake grass flooring, custom swings, and storage coffee decks.'
    }
  ];

  setActiveCategory(index: number) {
    this.activeIndex.set(index);
  }
}
