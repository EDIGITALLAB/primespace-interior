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
    { id: 'bathroom', label: 'Luxury Bathroom', icon: 'fa-solid fa-bath' }
  ];

  // Design Spaces Database
  readonly designSpaces: DesignSpace[] = [
    {
      id: 'modular-kitchen',
      name: 'Modular Kitchen',
      category: 'kitchen',
      designCount: '8 Designs',
      routeLink: '/explore-design-ideas/modular-kitchen',
      heroImage: '/kitchens/magenta-gloss-l-shaped-kitchen.jpg',
      galleryImages: [
        '/kitchens/magenta-gloss-l-shaped-kitchen.jpg',
        '/kitchens/charcoal-champagne-parallel-galley-kitchen.jpg',
        '/kitchens/moroccan-teal-mediterranean-kitchen.jpg',
        '/kitchens/slate-grey-walnut-l-kitchen.jpg',
        '/kitchens/dusty-rose-glass-l-kitchen.jpg',
        '/kitchens/charcoal-cream-gloss-balcony-kitchen.jpg',
        '/kitchens/matte-cappuccino-walnut-l-shaped-kitchen.jpg',
        '/kitchens/sage-green-butcher-block-kitchen.jpg'
      ],
      tag: 'Most Popular',
      shortDescription: 'Ergonomically engineered modular kitchens with waterproof BWP plywood, high-gloss acrylic finishes, Moroccan tile accents, and German soft-close fittings.',
      keyHighlights: ['Parallel & L-Shaped Layouts', 'Tandembox Soft-Close Drawers', 'Moroccan Tile & Quartz Backsplashes', 'Built-in Appliance Columns'],
      popularStyles: ['Magenta Gloss L-Kitchen', 'Parallel Galley Kitchen', 'Moroccan Teal Mediterranean', 'Slate Grey & Walnut', 'Dusty Rose Glass Showcase'],
      estimatedRange: '₹2.1 Lakhs - ₹6.5 Lakhs'
    },
    {
      id: 'master-bedroom',
      name: 'Master Bedroom',
      category: 'bedroom',
      designCount: '9 Designs',
      routeLink: '/explore-design-ideas/master-bedroom',
      heroImage: '/bedrooms/modern-fluted-beige-master-suite.jpg',
      galleryImages: [
        '/bedrooms/modern-fluted-beige-master-suite.jpg',
        '/bedrooms/calacatta-gold-marble-fluted-master-suite.jpg',
        '/bedrooms/arched-halo-emerald-velvet-master-suite.jpg',
        '/bedrooms/smoked-glass-wardrobe-acoustic-master-suite.jpg',
        '/bedrooms/royal-navy-velvet-fluted-master-suite.jpg',
        '/bedrooms/heritage-walnut-floral-suite.jpg',
        '/bedrooms/dual-tone-teak-cream-bedroom-suite.jpg'
      ],
      tag: 'Sanctuary Suite',
      shortDescription: 'Serene master bedrooms featuring bookmatched Italian marble walls, architectural fluted teak louvers, boutique smoked glass wardrobes, and arched halo velvet headboards.',
      keyHighlights: ['Calacatta Gold Marble Slab Walls', 'Boutique Smoked Glass Wardrobes', 'Arched Halo Velvet Headboards', 'Vertical Fluted Teak Louvers'],
      popularStyles: ['Calacatta Gold & Fluted Teak', 'Arched Halo Olive Velvet', 'Smoked Glass Boutique Dressing', 'Royal Navy Velvet Suite', 'Heritage Walnut Classical'],
      estimatedRange: '₹1.8 Lakhs - ₹6.5 Lakhs'
    },
    {
      id: 'living-room',
      name: 'Living Room',
      category: 'living',
      designCount: '9 Designs',
      routeLink: '/explore-design-ideas/living-room',
      heroImage: '/living/arched-alcove-fluted-oak-living.jpg',
      galleryImages: [
        '/living/arched-alcove-fluted-oak-living.jpg',
        '/living/biophilic-botanical-oak-living.jpg',
        '/living/duplex-double-height-grand-lounge.jpg',
        '/living/traditional-heritage-teak-living.jpg',
        '/living/blush-botanical-chandelier-luxury-living.jpg',
        '/living/olive-arch-rust-velvet-living.jpg',
        '/living/terracotta-fluted-marble-lounge.jpg',
        '/living/mustard-emerald-color-block-living.jpg'
      ],
      tag: 'Family Centerpiece',
      shortDescription: 'Signature living rooms featuring double-height duplex lounges, biophilic palm murals, Roman arch wall niches, handcrafted Burma teak, and marble TV walls.',
      keyHighlights: ['Double-Height Duplex Lounges', 'Biophilic Palm Living Walls', 'Sculptured Triple Wall Arches', 'Handcrafted Solid Teak & Jaali'],
      popularStyles: ['Double-Height Duplex Suite', 'Biophilic Botanical Living', 'Mediterranean Arched Boho', 'Royal Teak Heritage & Jaali', 'Terracotta Fluted Marble'],
      estimatedRange: '₹1.95 Lakhs - ₹7.5 Lakhs'
    },
    {
      id: 'designer-wardrobes',
      name: 'Wardrobes & Closets',
      category: 'wardrobe',
      designCount: '11 Designs',
      routeLink: '/explore-design-ideas/wardrobe-designs',
      heroImage: '/wardrobes/sage-green-glass-boutique-wardrobe.jpg',
      galleryImages: [
        '/wardrobes/sage-green-glass-boutique-wardrobe.jpg',
        '/wardrobes/cashmere-vanity-alcove-wardrobe.jpg',
        '/wardrobes/corner-l-shaped-walkin-glass-vanity-wardrobe.jpg',
        '/wardrobes/prussian-blue-gold-loft-wardrobe.jpg',
        '/wardrobes/cashmere-smoked-glass-hybrid-wardrobe.jpg',
        '/wardrobes/dusty-rose-mirror-center-wardrobe.jpg',
        '/wardrobes/smoked-glass-boutique-wardrobe.jpg'
      ],
      tag: 'Bespoke Storage',
      shortDescription: 'Floor-to-ceiling glass boutique wardrobes, full-height lofts, and central vanity dressing suites customized with velvet matrix drawers and sensor lighting.',
      keyHighlights: ['Clear & Smoked Glass Boutique Doors', 'Central Oak Vanity Alcoves', 'Full-Height Overhead Lofts', 'Velvet Jewellery Matrix Drawers'],
      popularStyles: ['Glass Boutique Suite', 'Cashmere Vanity Alcove', 'Corner Walk-in Vanity', 'Prussian Blue Loft Wardrobe', 'Cashmere Hybrid Glass'],
      estimatedRange: '₹1.1 Lakhs - ₹3.8 Lakhs'
    },
    {
      id: 'false-ceiling',
      name: 'False Ceiling & Lighting',
      category: 'ceiling',
      designCount: '12 Designs',
      routeLink: '/explore-design-ideas/false-ceiling',
      heroImage: '/ceilings/floral-petal-chandelier-ceiling.jpg',
      galleryImages: [
        '/ceilings/floral-petal-chandelier-ceiling.jpg',
        '/ceilings/curved-wood-rafter-wave-ceiling.jpg',
        '/ceilings/honeycomb-hexagon-cove-ceiling.jpg',
        '/ceilings/overlapping-rings-pendant-ceiling.jpg',
        '/ceilings/geometric-nested-squares-ceiling.jpg',
        '/ceilings/nested-pyramid-tray-cove-ceiling.jpg'
      ],
      tag: 'Illuminated Ambience',
      shortDescription: 'Architectural gypsum false ceilings featuring sculptural floral petals, curved wood rafters, honeycomb hexagons, crystal chandeliers, and warm cove lighting.',
      keyHighlights: ['Zero Crack Gypsum Boards', 'Bespoke S-Curve & Honeycomb Profiles', 'Warm 3000K Diffused Cove', 'Smart Automation Compatible'],
      popularStyles: ['Floral Petal Chandelier', 'S-Curve Wood Rafters', 'Honeycomb Backlit', 'Concentric Halo Rings', 'Magnetic Track Modern'],
      estimatedRange: '₹60,000 - ₹2.5 Lakhs'
    },
    {
      id: 'luxury-bathroom',
      name: 'Luxury Bathroom',
      category: 'bathroom',
      designCount: '8 Designs',
      routeLink: '/explore-design-ideas/luxury-bathroom',
      heroImage: '/bathrooms/modern-walnut-marble-ensuite-bathroom.jpg',
      galleryImages: [
        '/bathrooms/modern-walnut-marble-ensuite-bathroom.jpg',
        '/bathrooms/ocean-blue-marble-fluted-bathroom.jpg',
        '/bathrooms/statuario-marble-soaking-tub-bathroom.jpg',
        '/bathrooms/biophilic-courtyard-patterned-bathroom.jpg',
        '/bathrooms/charcoal-quartz-walnut-bathroom.jpg',
        '/bathrooms/brushed-gold-terrazzo-beige-bathroom.jpg',
        '/bathrooms/sage-green-fluted-spa-bathroom.jpg',
        '/bathrooms/terracotta-terrazzo-designer-bathroom.jpg'
      ],
      tag: 'Spa Experience',
      shortDescription: 'Hotel-inspired spa bathrooms with floating timber and marble vanities, freestanding soaking tubs, open atrium biophilic lightwells, and artisan terrazzo feature walls.',
      keyHighlights: ['Waterproof Solid Wood Vanity', 'Touch Sensor Smart Mirror', 'Toughened Glass Cubicles', 'Anti-Skid Matte Flooring'],
      popularStyles: ['Ocean Blue Marble', 'Statuario Spa Bathtub', 'Biophilic Atrium', 'Charcoal & Walnut', 'Brushed Gold Terrazzo'],
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
      designCount: '9 Designs',
      routeLink: '/explore-design-ideas/dining-room',
      heroImage: '/dining/emerald-velvet-brass-statuario-dining.jpg',
      galleryImages: [
        '/dining/emerald-velvet-brass-statuario-dining.jpg',
        '/dining/calacatta-marble-dual-halo-dining.jpg',
        '/dining/walnut-linear-chandelier-dining.jpg',
        '/dining/garden-patio-live-edge-dining.jpg',
        '/dining/architectural-staircase-teak-dining.jpg',
        '/dining/japandi-natural-oak-bench-dining.jpg',
        '/dining/solid-teak-arched-mirror-dining.jpg',
        '/dining/architectural-fluted-partition-dining.jpg',
        '/dining/heritage-oak-round-table-dining.jpg'
      ],
      tag: 'Entertaining Hub',
      shortDescription: 'Grand dining suites featuring Italian Statuario marble, brushed brass Sputnik chandeliers, architectural staircase integration, and live-edge patio layouts.',
      keyHighlights: ['Italian Marble & Brass Bases', 'Architectural Fluted Partitions', 'Designer Halo & Sputnik Chandeliers', 'Seasoned Solid Hardwood'],
      popularStyles: ['Italian Marble & Emerald Velvet', 'Calacatta Dual-Halo Suite', 'Live-Edge Garden Dining', 'Walnut Linear Chandelier', 'Duplex Staircase Suite'],
      estimatedRange: '₹1.2 Lakhs - ₹4.5 Lakhs'
    },
    {
      id: 'kids-bedroom',
      name: 'Kids & Teen Bedroom',
      category: 'kids',
      designCount: '13 Designs',
      routeLink: '/explore-design-ideas/kids-bedroom',
      heroImage: '/kids/sky-blue-loft-bunk-study-suite.jpg',
      galleryImages: [
        '/kids/sky-blue-loft-bunk-study-suite.jpg',
        '/kids/blossom-pink-arch-princess-suite.jpg',
        '/kids/sibling-harmony-pink-teal-twin-suite.jpg',
        '/kids/botanical-palm-sage-teen-suite.jpg',
        '/kids/warm-oak-vanilla-teen-study-suite.jpg',
        '/kids/sunny-yellow-teen-study-suite.jpg',
        '/kids/cosmic-astronaut-space-explorer-suite.jpg',
        '/kids/pastel-rainbow-cloud-daybed-suite.jpg'
      ],
      tag: 'Playful & Functional',
      shortDescription: 'Dynamic kids and teen bedrooms featuring architectural loft bunk beds, sunlit corner study suites, princess arch wardrobes, and sibling twin suites.',
      keyHighlights: ['Multi-Level Loft Bunk Beds', 'Integrated Corner Study Desks', 'Princess Arched Wardrobes & Twin Suites', 'Child-Safe Rounded Edges'],
      popularStyles: ['Loft Bunk & Study Suite', 'Princess Arch Wardrobe', 'Sibling Harmony Twin Suite', 'Sunny Teen Study', 'Biophilic Palm Teen Suite'],
      estimatedRange: '₹1.4 Lakhs - ₹4.5 Lakhs'
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
      this.router.navigate(['/explore-design-ideas']);
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
