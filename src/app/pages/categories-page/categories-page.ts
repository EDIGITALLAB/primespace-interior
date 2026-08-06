import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConsultationModalService } from '../../services/consultation-modal.service';
import { BeforeAfterSlider } from '../../components/before-after-slider/before-after-slider';

export interface CategoryDetail {
  id: string;
  num: string;
  name: string;
  tagline: string;
  images: string[];
  desc: string;
  startingPrice: string;
  priceNumeric: number;
  turnaround: string;
  daysNumeric: number;
  filterTag: string;
  rating?: number;
  reviewsCount?: number;
  features: string[];
  scopeOfWork: string[];
}

export interface MaterialDetail {
  id: string;
  title: string;
  shortTitle: string;
  icon: string;
  subtitle: string;
  desc: string;
  highlights: string[];
}

@Component({
  selector: 'app-categories-page',
  standalone: true,
  imports: [CommonModule, FormsModule, BeforeAfterSlider],
  templateUrl: './categories-page.html',
  styleUrl: './categories-page.css',
})
export class CategoriesPage {
  readonly activeFilter = signal<string>('all');
  readonly searchQuery = signal<string>('');
  readonly activeMaterialTab = signal<string>('hdmr');
  readonly sortBy = signal<string>('recommended');
  readonly budgetFilter = signal<string>('all');

  // Active image index for each card
  readonly activeCardImageMap = signal<Record<string, number>>({});

  // Selected Category for Quick View Modal
  readonly selectedCategoryModal = signal<CategoryDetail | null>(null);

  // Budget Calculator Signals
  readonly calcRoomType = signal<string>('2bhk');
  readonly calcPackage = signal<string>('premium');

  constructor(public consultationModalService: ConsultationModalService) {}

  readonly filterOptions = [
    { label: 'All Spaces', value: 'all' },
    { label: 'Kitchen', value: 'kitchen' },
    { label: 'Living Room', value: 'living' },
    { label: 'Bedroom', value: 'bedroom' },
    { label: 'Dining', value: 'dining' },
    { label: 'Wardrobes', value: 'wardrobe' },
    { label: 'Kids Room', value: 'kids' },
    { label: 'Bathroom', value: 'bathroom' },
    { label: 'Balcony', value: 'balcony' }
  ];

  readonly categories: CategoryDetail[] = [
    {
      id: 'kitchen',
      num: '01',
      name: 'Kitchen Units',
      tagline: 'Culinary Excellence & Modular Utility',
      images: ['/kitchen_cat.png', '/hero_kitchen.png', '/eleganza_plus_kitchen.png', '/essential_kitchen.png'],
      desc: 'Bespoke modular kitchens designed for culinary excellence, featuring intelligent space utilization, island counters, and German-engineered soft-close fittings.',
      startingPrice: '₹1.4 Lakhs',
      priceNumeric: 140000,
      turnaround: '45 Days',
      daysNumeric: 45,
      filterTag: 'kitchen',
      rating: 4.9,
      reviewsCount: 184,
      features: ['German Soft-Close Fittings', 'Quartz & Granite Countertops', 'Profile LED Cabinets', 'Pantry & Spice Pullouts'],
      scopeOfWork: ['Base & Wall Cabinets', 'Tandem Drawer Units', 'Tall Appliance Unit', 'Quartz Countertop with Sink Cutout', 'Under-Cabinet Sensor LEDs']
    },
    {
      id: 'living',
      num: '02',
      name: 'Living Room',
      tagline: 'Entertainment & Luxury Lounging',
      images: ['/living_cat.png', '/hero_living_room.png', '/after_living_room.png'],
      desc: 'Sophisticated living rooms crafted for entertainment and luxury relaxation, combining plush seating with custom TV wall panels and ambient lighting.',
      startingPrice: '₹1.8 Lakhs',
      priceNumeric: 180000,
      turnaround: '40 Days',
      daysNumeric: 40,
      filterTag: 'living',
      rating: 4.9,
      reviewsCount: 210,
      features: ['Custom Fluted TV Panels', 'Hidden Ambient LED Lighting', 'Plush Sectional Sofas', 'Designer Accent Wall Rafters'],
      scopeOfWork: ['Full-Wall Floating TV Console', 'Charcoal Rafters & Paneling', 'Foyer Shoe Rack with Seating', 'Cove Profile Lighting Layout']
    },
    {
      id: 'bedroom',
      num: '03',
      name: 'Bedroom Sanctuaries',
      tagline: 'Tranquil Retreats & Custom Bedding',
      images: ['/bedroom_cat.png', '/eleganza_bedroom.png'],
      desc: 'Bespoke bedroom sanctuaries crafted to foster tranquil sleep. Includes custom upholstered headboards, side panels, and integrated accent lighting.',
      startingPrice: '₹1.2 Lakhs',
      priceNumeric: 120000,
      turnaround: '35 Days',
      daysNumeric: 35,
      filterTag: 'bedroom',
      rating: 4.8,
      reviewsCount: 156,
      features: ['Full-Height Fabric Headboards', 'Integrated Side Tables', 'Study Nooks & Reading Lights', 'Mood Lighting Profiles'],
      scopeOfWork: ['King-Size Platform Bed Frame', 'Upholstered Wall Panel Headboard', 'Twin Floating Nightstands', 'Compact Wall-Mounted Study Desk']
    },
    {
      id: 'dining',
      num: '04',
      name: 'Dining Room',
      tagline: 'Elegant Gathering & Feast Spaces',
      images: ['/dining_cat.png', '/living_cat.png'],
      desc: 'Exquisite dining spaces built for memorable gatherings. Features custom marble table installations, designer pendant lights, and crockery bars.',
      startingPrice: '₹95,000',
      priceNumeric: 95000,
      turnaround: '30 Days',
      daysNumeric: 30,
      filterTag: 'dining',
      rating: 4.7,
      reviewsCount: 112,
      features: ['Italian Marble Dining Tops', 'Custom Crockery Display Units', 'Designer Chandelier Lighting', 'Wine & Bar Cabinets'],
      scopeOfWork: ['Glass-Front Crockery Cabinet', 'Marble-Top 6-Seater Dining Table', 'Accent Mirror Wall Paneling', 'Pendant Light Drop Ceiling']
    },
    {
      id: 'wardrobe',
      num: '05',
      name: 'Modular Wardrobes',
      tagline: 'Precision Organization & Glass Closets',
      images: ['/wardrobe_cat.png', '/bedroom_cat.png'],
      desc: 'Luxury sliding and walk-in wardrobes with premium leather finishes, smoked glass doors, sensor lighting, and smart modular organizers.',
      startingPrice: '₹1.1 Lakhs',
      priceNumeric: 110000,
      turnaround: '35 Days',
      daysNumeric: 35,
      filterTag: 'wardrobe',
      rating: 4.9,
      reviewsCount: 198,
      features: ['Smoked Glass & Aluminum Profiles', 'Auto-Sensor LED Hanger Rods', 'Soft-Touch Drawers with Locks', 'Integrated Vanity Mirrors'],
      scopeOfWork: ['Floor-to-Ceiling Loft Storage', 'Internal Drawer Dividers & Safe', 'Sensor Light Strip Profiles', 'Integrated Dressing Unit']
    },
    {
      id: 'kids',
      num: '06',
      name: 'Kids Bedroom',
      tagline: 'Vibrant, Safe & Modular Playrooms',
      images: ['/kids_cat.png', '/bedroom_cat.png'],
      desc: 'Vibrant, safe, and modular children bedrooms incorporating smart study tables, playful bunk beds, and non-toxic soft-edge storage walls.',
      startingPrice: '₹85,000',
      priceNumeric: 85000,
      turnaround: '30 Days',
      daysNumeric: 30,
      filterTag: 'kids',
      rating: 4.8,
      reviewsCount: 135,
      features: ['Rounded Soft-Edge Finishes', 'Bunk Beds with Drawer Storage', 'Ergonomic Study Desks', 'Magnetic Activity Walls'],
      scopeOfWork: ['Modular Storage Wardrobe', 'Ergonomic Height-Adjustable Desk', 'Bookcase & Toy Cubbies', 'Safety Corner Guarded Bed']
    },
    {
      id: 'bathroom',
      num: '07',
      name: 'Luxury Bathrooms',
      tagline: 'Spa-Inspired Vanities & Marble Counters',
      images: ['/bathroom_cat.png', '/kitchen_cat.png'],
      desc: 'Spa-like vanity units and bathroom transformations featuring gold brass fittings, storage cabinets, LED mirrors, and clean marble slab counters.',
      startingPrice: '₹65,000',
      priceNumeric: 65000,
      turnaround: '25 Days',
      daysNumeric: 25,
      filterTag: 'bathroom',
      rating: 4.8,
      reviewsCount: 89,
      features: ['Anti-Fungus Moisture HDMR', 'Touch-Sensor Defogger Mirrors', 'Brushed Gold/Rose Hardware', 'Under-Sink Storage Shelves'],
      scopeOfWork: ['Wall-Hung Vanity Storage', 'Backlit Touch Defogger Mirror', 'Tall Storage Linen Column', 'Waterproof WPC Shelving']
    },
    {
      id: 'balcony',
      num: '08',
      name: 'Balcony Decks',
      tagline: 'Green Urban Escapes & Coffee Lounges',
      images: ['/balcony_cat.png', '/living_cat.png'],
      desc: 'Charming green escape spaces with vertical wooden rafters, fake grass flooring, weather-proof swing chairs, and storage coffee decks.',
      startingPrice: '₹45,000',
      priceNumeric: 45000,
      turnaround: '20 Days',
      daysNumeric: 20,
      filterTag: 'balcony',
      rating: 4.9,
      reviewsCount: 140,
      features: ['All-Weather WPC Decking', 'Vertical Hydroponic Green Walls', 'Built-in Seating with Drawers', 'Ambient String & Solar Lights'],
      scopeOfWork: ['WPC Wooden Deck Tile Flooring', 'Vertical Wooden Rafter Ceiling', 'Storage Bench Deck Seating', 'Weather-Resistant Wall Paneling']
    }
  ];

  readonly materials: MaterialDetail[] = [
    {
      id: 'hdmr',
      title: 'HDMR & Boiling Waterproof Plywood',
      shortTitle: 'HDMR Board',
      icon: 'fa-solid fa-layer-group',
      subtitle: 'Grade A Core Strength',
      desc: 'High-Density Moisture-Resistant (HDMR) boards engineered for maximum screw holding capacity, termite resistance, and zero swelling in humid climates.',
      highlights: ['100% Termite & Borer Proof', '25-Year Warranty', 'Zero Swelling in Water', 'High Screw Holding Strength']
    },
    {
      id: 'acrylic',
      title: 'High-Gloss German Acrylic & Veneer',
      shortTitle: 'German Acrylic',
      icon: 'fa-solid fa-gem',
      subtitle: 'Mirror Finish Elegance',
      desc: 'Ultra-glossy scratch-resistant acrylic sheets laminated onto HDMR core with 1mm anti-fingerprint technology for effortless cleaning.',
      highlights: ['Anti-Scratch & UV Resistant', 'Seamless Laser Edge Banding', 'Mirror-Like High Gloss', '50+ Designer Color Options']
    },
    {
      id: 'hardware',
      title: 'Blum & Hettich German Hardware',
      shortTitle: 'Blum Hardware',
      icon: 'fa-solid fa-gears',
      subtitle: 'Soft-Close Precision',
      desc: 'Top-tier German soft-close hinges, quad-rail tandem drawers, and gas lifts tested for over 200,000 open-close cycles.',
      highlights: ['200,000 Cycle Tested', 'Lifetime Hardware Warranty', 'Silent Soft-Close Action', 'Heavy Weight Capacity (Up to 65kg)']
    },
    {
      id: 'quartz',
      title: 'Stain-Proof Quartz & Italian Slabs',
      shortTitle: 'Quartz Surface',
      icon: 'fa-solid fa-cubes',
      subtitle: 'Luxury Counter Surfaces',
      desc: 'Non-porous quartz countertops resistant to turmeric stains, hot pans, and scratches, available in seamless waterfall edge profiles.',
      highlights: ['Non-Porous & Hygienic', 'Stain & Heat Resistant', 'Custom Waterfall Edges', 'Natural Italian Marble Finishes']
    }
  ];

  // Dynamic Filtering & Sorting
  readonly filteredCategories = computed(() => {
    const filter = this.activeFilter();
    const query = this.searchQuery().toLowerCase().trim();
    const budget = this.budgetFilter();
    const sort = this.sortBy();

    let list = this.categories.filter((cat) => {
      const matchesFilter = filter === 'all' || cat.filterTag === filter;
      const matchesQuery = !query || 
        cat.name.toLowerCase().includes(query) || 
        cat.desc.toLowerCase().includes(query) ||
        cat.tagline.toLowerCase().includes(query);

      let matchesBudget = true;
      if (budget === 'under1l') matchesBudget = cat.priceNumeric < 100000;
      else if (budget === '1l-1.5l') matchesBudget = cat.priceNumeric >= 100000 && cat.priceNumeric <= 150000;
      else if (budget === 'above1.5l') matchesBudget = cat.priceNumeric > 150000;

      return matchesFilter && matchesQuery && matchesBudget;
    });

    // Sorting
    if (sort === 'price-low') {
      list = [...list].sort((a, b) => a.priceNumeric - b.priceNumeric);
    } else if (sort === 'price-high') {
      list = [...list].sort((a, b) => b.priceNumeric - a.priceNumeric);
    } else if (sort === 'turnaround') {
      list = [...list].sort((a, b) => a.daysNumeric - b.daysNumeric);
    } else if (sort === 'rating') {
      list = [...list].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    }

    return list;
  });

  // Computed Budget Estimation
  readonly estimatedQuote = computed(() => {
    const room = this.calcRoomType();
    const pkg = this.calcPackage();

    let base = 250000;
    if (room === '1bhk') base = 220000;
    else if (room === '2bhk') base = 380000;
    else if (room === '3bhk') base = 560000;
    else if (room === '4bhk') base = 850000;
    else if (room === 'kitchen') base = 140000;

    let multiplier = 1;
    if (pkg === 'essential') multiplier = 0.85;
    else if (pkg === 'premium') multiplier = 1.0;
    else if (pkg === 'luxury') multiplier = 1.35;

    const total = Math.round(base * multiplier);
    const min = Math.round(total * 0.92);
    const max = Math.round(total * 1.08);

    return {
      min: (min / 100000).toFixed(2),
      max: (max / 100000).toFixed(2),
      display: `₹${(min / 100000).toFixed(2)} - ₹${(max / 100000).toFixed(2)} Lakhs`
    };
  });

  setFilter(filter: string) {
    this.activeFilter.set(filter);
  }

  setMaterialTab(tab: string) {
    this.activeMaterialTab.set(tab);
  }

  setImageIndex(catId: string, idx: number, event: Event) {
    event.stopPropagation();
    this.activeCardImageMap.update((map) => ({ ...map, [catId]: idx }));
  }

  getActiveImage(cat: CategoryDetail): string {
    const idx = this.activeCardImageMap()[cat.id] || 0;
    return cat.images[idx] || cat.images[0];
  }

  openQuickView(cat: CategoryDetail, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.selectedCategoryModal.set(cat);
  }

  closeQuickView() {
    this.selectedCategoryModal.set(null);
  }

  openConsultation(event: Event) {
    event.preventDefault();
    this.closeQuickView();
    this.consultationModalService.open();
  }
}
