import { Component, OnInit, OnDestroy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ConsultationModalService } from '../../services/consultation-modal.service';

export interface DesignSpace {
  id: string;
  name: string;
  category: string;
  designCount: string;
  heroImage: string;
  galleryImages: string[];
  tag: string;
  shortDescription: string;
  keyHighlights: string[];
  popularStyles: string[];
  estimatedRange: string;
  routeLink?: string;
}

@Component({
  selector: 'app-explore-design-ideas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './explore-design-ideas.html',
  styleUrl: './explore-design-ideas.css'
})
export class ExploreDesignIdeas implements OnInit, OnDestroy {
  private consultationModalService = inject(ConsultationModalService);
  private router = inject(Router);

  // Read more toggle for header editorial intro
  readonly isReadMoreExpanded = signal<boolean>(false);

  // Active category filter
  readonly activeCategory = signal<string>('all');

  // Search input
  readonly searchQuery = signal<string>('');

  // Filter Categories
  readonly categories = [
    { id: 'all', label: 'All Spaces', icon: 'fa-solid fa-border-all' },
    { id: 'kitchen', label: 'Modular Kitchen', icon: 'fa-solid fa-kitchen-set' },
    { id: 'bedroom', label: 'Master Bedroom', icon: 'fa-solid fa-bed' },
    { id: 'living', label: 'Living Room', icon: 'fa-solid fa-couch' },
    { id: 'wardrobe', label: 'Wardrobes', icon: 'fa-solid fa-door-closed' },
    { id: 'ceiling', label: 'False Ceiling', icon: 'fa-solid fa-lightbulb' },
    { id: 'pooja', label: 'Pooja Room', icon: 'fa-solid fa-om' },
    { id: 'dining', label: 'Dining & Bar', icon: 'fa-solid fa-utensils' },
    { id: 'kids', label: 'Kids Bedroom', icon: 'fa-solid fa-shapes' },
    { id: 'bathroom', label: 'Luxury Bathroom', icon: 'fa-solid fa-bath' },
    { id: 'balcony', label: 'Balcony & Foyer', icon: 'fa-solid fa-plant-wilt' }
  ];

  // Design Spaces Database
  readonly designSpaces: DesignSpace[] = [
    {
      id: 'modular-kitchen',
      name: 'Modular Kitchen',
      category: 'kitchen',
      designCount: '20 Designs',
      routeLink: '/explore-design-ideas/modular-kitchen',
      heroImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1000&auto=format&fit=crop',
      galleryImages: [
        'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1000&auto=format&fit=crop'
      ],
      tag: 'Most Popular',
      shortDescription: 'Ergonomically engineered modular kitchens with waterproof BWP plywood, anti-scratch acrylic finishes, and German soft-close fittings.',
      keyHighlights: ['Island & Parallel Layouts', 'Tandembox Drawers', 'Corner Carousel Pullouts', 'Granite & Quartz Countertops'],
      popularStyles: ['Island Kitchen', 'Parallel Kitchen', 'L-Shaped', 'U-Shaped', 'Minimalist Acrylic'],
      estimatedRange: '₹1.5 Lakhs - ₹6.5 Lakhs'
    },
    {
      id: 'master-bedroom',
      name: 'Master Bedroom',
      category: 'bedroom',
      designCount: '5 Designs',
      routeLink: '/explore-design-ideas/master-bedroom',
      heroImage: '/bedroom_cat.png',
      galleryImages: [
        '/bedroom_cat.png'
      ],
      tag: 'Sanctuary Suite',
      shortDescription: 'Serene master bedrooms featuring architectural gold inlay headboard panels, ambient cove lighting, and solid teak platform beds.',
      keyHighlights: ['Gold Brass Inlay Panelling', 'Concealed LED Warm Strips', 'Teak Bedside Consoles', 'Integrated False Ceiling Coves'],
      popularStyles: ['Warm Contemporary Luxury', 'Minimalist Scandinavian', 'Japandi Harmony', 'Modern Classical'],
      estimatedRange: '₹1.8 Lakhs - ₹5.5 Lakhs'
    },
    {
      id: 'living-room',
      name: 'Living Room',
      category: 'living',
      designCount: '16 Designs',
      heroImage: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=1000&auto=format&fit=crop',
      galleryImages: [
        'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000&auto=format&fit=crop'
      ],
      tag: 'Family Centerpiece',
      shortDescription: 'Statement living rooms with custom marble-accent TV entertainment walls, acoustic louver panelling, and customized sectional seating.',
      keyHighlights: ['Marble Backlit TV Wall', 'Fluted Louvers & CNC Trims', 'Custom False Ceiling Profile', 'Ergonomic Open Floor Plan'],
      popularStyles: ['High-End Luxury', 'Warm Bohemian Chic', 'Mid-Century Modern', 'Open-Concept Studio'],
      estimatedRange: '₹2.2 Lakhs - ₹7.0 Lakhs'
    },
    {
      id: 'designer-wardrobes',
      name: 'Wardrobes & Closets',
      category: 'wardrobe',
      designCount: '18 Designs',
      routeLink: '/explore-design-ideas/wardrobe-designs',
      heroImage: '/wardrobe_cat.png',
      galleryImages: [
        '/wardrobe_cat.png',
        'https://images.unsplash.com/photo-1558882224-dda166733046?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1558997519-83ea9252edf8?q=80&w=1000&auto=format&fit=crop'
      ],
      tag: 'Bespoke Storage',
      shortDescription: 'Floor-to-ceiling sliding, tinted fluted glass profile, and walk-in dressing wardrobes customized to your wardrobe inventory.',
      keyHighlights: ['German Soft Dampers', 'Velvet Jewellery Trays', 'Sensor LED Light Bars', 'Anti-Fingerprint Thermal Matte'],
      popularStyles: ['Fluted Tinted Glass', 'Sliding Door Wardrobes', 'Walk-In Dressing Rooms', 'L-Shaped Corner'],
      estimatedRange: '₹95,000 - ₹3.5 Lakhs'
    },
    {
      id: 'false-ceiling',
      name: 'False Ceiling & Lighting',
      category: 'ceiling',
      designCount: '14 Designs',
      heroImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop',
      galleryImages: [
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1000&auto=format&fit=crop'
      ],
      tag: 'Illuminated Ambience',
      shortDescription: 'Architectural gypsum false ceilings featuring magnetic track lights, recessed ambient cove channels, and natural wooden rafters.',
      keyHighlights: ['Zero Crack Gypsum Boards', 'Magnetic Track Spots', 'Warm 3000K Diffused Cove', 'Smart Automation Compatible'],
      popularStyles: ['Minimalist Peripheral', 'Magnetic Track Modern', 'Wooden Rafter Ceiling', 'Coffered Chandelier Niche'],
      estimatedRange: '₹60,000 - ₹2.2 Lakhs'
    },
    {
      id: 'luxury-bathroom',
      name: 'Luxury Bathroom',
      category: 'bathroom',
      designCount: '12 Designs',
      heroImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop',
      galleryImages: [
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=1000&auto=format&fit=crop'
      ],
      tag: 'Spa Experience',
      shortDescription: 'Hotel-inspired spa bathrooms with floating quartz vanities, LED smart touch mirrors, and walk-in rain showers.',
      keyHighlights: ['Waterproof Solid Wood Vanity', 'Touch Sensor Smart Mirror', 'Toughened Glass Cubicles', 'Anti-Skid Matte Flooring'],
      popularStyles: ['Scandinavian White & Oak', 'Dark Anthracite Luxury', 'Monochrome Terrazzo', 'Gold Brass Accents'],
      estimatedRange: '₹80,000 - ₹3.0 Lakhs'
    },
    {
      id: 'pooja-room',
      name: 'Pooja Room & Mandir',
      category: 'pooja',
      designCount: '7 Designs',
      routeLink: '/explore-design-ideas/pooja-room',
      heroImage: '/pooja_room_mandir.jpg',
      galleryImages: [
        '/pooja_room_mandir.jpg'
      ],
      tag: 'Sacred Sanctuary',
      shortDescription: 'Divine mandir spaces designed with intricate hand-carved teak pilasters, warm backlit stone, brass bells, and samagri drawers.',
      keyHighlights: ['Hand-Carved Burma Teak', 'Translucent Backlit Wall', 'Concealed Diya Drawer Trays', 'Vastu Compliant Orientations'],
      popularStyles: ['Traditional Teak Wood', 'Backlit Onyx Marble', 'Modern Minimalist Alcove', 'Laser Cut Corian'],
      estimatedRange: '₹45,000 - ₹2.5 Lakhs'
    },
    {
      id: 'dining-room',
      name: 'Dining Room & Bar',
      category: 'dining',
      designCount: '12 Designs',
      heroImage: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=1000&auto=format&fit=crop',
      galleryImages: [
        'https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=1000&auto=format&fit=crop'
      ],
      tag: 'Entertaining Hub',
      shortDescription: 'Elegant dining arrangements paired with bespoke fluted bar units, ambient wine display racks, and chandelier focal points.',
      keyHighlights: ['Italian Marble Dining Table', 'Integrated Glass Bar Cabinet', 'Modern Pendant Lighting', 'Cushioned Ergonomic Chairs'],
      popularStyles: ['Contemporary Marble', 'Boutique Lounge Bar', 'Warm Wooden Dining', 'Minimalist Scandinavian'],
      estimatedRange: '₹1.2 Lakhs - ₹4.5 Lakhs'
    },
    {
      id: 'kids-bedroom',
      name: 'Kids & Teen Bedroom',
      category: 'kids',
      designCount: '16 Designs',
      routeLink: '/explore-design-ideas/kids-bedroom',
      heroImage: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1000&auto=format&fit=crop',
      galleryImages: [
        'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1000&auto=format&fit=crop'
      ],
      tag: 'Playful & Functional',
      shortDescription: 'Vibrant and modular children bedrooms featuring space-saving study stations, integrated storage beds, and durable wipe-clean surfaces.',
      keyHighlights: ['Modular Study Table & Shelf', 'Space-Saving Trundle Beds', 'Rounded Child-Safe Corners', 'Chalkboard Accent Walls'],
      popularStyles: ['Playful Pastel Theme', 'Space Explorer Boy Room', 'Boho Dream Girl Room', 'Teen Minimalist Study'],
      estimatedRange: '₹1.2 Lakhs - ₹3.8 Lakhs'
    },
    {
      id: 'balcony-foyer',
      name: 'Balcony & Foyer Entry',
      category: 'balcony',
      designCount: '10 Designs',
      heroImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop',
      galleryImages: [
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop'
      ],
      tag: 'First Impressions',
      shortDescription: 'Inviting home entrances and leisure balconies featuring vertical green walls, wooden deck tiles, and designer shoe consoles.',
      keyHighlights: ['Vertical Plant Garden Wall', 'Weatherproof Deck Flooring', 'Shoe Cabinet with Seating', 'Warm Entryway Sconces'],
      popularStyles: ['Zen Green Garden Balcony', 'Chic Entryway Foyer', 'Outdoor Breakfast Nook', 'Bohemian Swing Corner'],
      estimatedRange: '₹35,000 - ₹1.8 Lakhs'
    }
  ];

  // Selected space for Quick Explore Detail Modal
  readonly selectedSpace = signal<DesignSpace | null>(null);
  readonly isSpaceModalOpen = signal<boolean>(false);
  readonly modalActiveImg = signal<string>('');

  // Interactive Style Finder Wizard state
  readonly styleQuizStep = signal<number>(1);
  readonly selectedRoomType = signal<string>('kitchen');
  readonly selectedVibe = signal<string>('modern-luxury');
  readonly selectedBudget = signal<string>('standard');
  readonly isQuizSubmitted = signal<boolean>(false);

  // Filtered design spaces
  readonly filteredSpaces = computed(() => {
    const cat = this.activeCategory();
    const query = this.searchQuery().trim().toLowerCase();

    return this.designSpaces.filter(space => {
      const matchCat = cat === 'all' || space.category === cat;
      const matchQuery = !query ||
        space.name.toLowerCase().includes(query) ||
        space.shortDescription.toLowerCase().includes(query) ||
        space.popularStyles.some(s => s.toLowerCase().includes(query));
      return matchCat && matchQuery;
    });
  });

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  toggleReadMore(): void {
    this.isReadMoreExpanded.set(!this.isReadMoreExpanded());
  }

  setCategory(cat: string): void {
    this.activeCategory.set(cat);
  }

  navigateToSpace(space: DesignSpace): void {
    if (space.routeLink) {
      this.router.navigateByUrl(space.routeLink);
    } else {
      this.router.navigate(['/categories'], { queryParams: { category: space.category } });
    }
  }

  openSpaceModal(space: DesignSpace): void {
    this.selectedSpace.set(space);
    this.modalActiveImg.set(space.galleryImages[0] || space.heroImage);
    this.isSpaceModalOpen.set(true);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  closeSpaceModal(): void {
    this.isSpaceModalOpen.set(false);
    this.selectedSpace.set(null);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  setModalImg(img: string): void {
    this.modalActiveImg.set(img);
  }

  openConsultation(e?: Event): void {
    if (e) e.preventDefault();
    this.consultationModalService.open();
  }

  setQuizRoom(room: string): void {
    this.selectedRoomType.set(room);
    this.styleQuizStep.set(2);
  }

  setQuizVibe(vibe: string): void {
    this.selectedVibe.set(vibe);
    this.styleQuizStep.set(3);
  }

  submitQuiz(budget: string): void {
    this.selectedBudget.set(budget);
    this.isQuizSubmitted.set(true);
  }

  resetQuiz(): void {
    this.styleQuizStep.set(1);
    this.isQuizSubmitted.set(false);
  }

  ngOnDestroy(): void {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }
}
