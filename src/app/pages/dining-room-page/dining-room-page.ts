import { Component, OnInit, OnDestroy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConsultationModalService } from '../../services/consultation-modal.service';

export interface DiningRoomItem {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  shortDesc: string;
  tag: string;
  image: string;
  galleryImages: string[];
  startingPrice: string;
  dimensions: string;
  finishType: string;
  features: string[];
  materials: string[];
  highlights: { icon: string; title: string; desc: string }[];
}

@Component({
  selector: 'app-dining-room-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dining-room-page.html',
  styleUrl: './dining-room-page.css'
})
export class DiningRoomPage implements OnInit, OnDestroy {
  private consultationModalService = inject(ConsultationModalService);

  // Active category filter
  readonly activeCategory = signal<string>('all');
  
  // Search query
  readonly searchQuery = signal<string>('');

  // Selected item for modal
  readonly selectedDiningRoom = signal<DiningRoomItem | null>(null);
  readonly isDetailModalOpen = signal<boolean>(false);
  readonly modalActiveImage = signal<string>('');

  // Lightbox for zoom
  readonly lightboxImage = signal<string | null>(null);

  // Dining Room Database
  readonly diningRooms: DiningRoomItem[] = [
    {
      id: 'italian-marble-dining-suite',
      title: 'Italian Marble 6-Seater Dining Suite',
      category: 'marble-luxury',
      categoryLabel: 'Italian Luxury',
      shortDesc: 'Statuario marble tabletop with brushed brass fluted base and ergonomically contoured velvet chairs.',
      tag: 'Best Seller',
      image: '/dining/italian-marble-dining-suite.jpg',
      galleryImages: ['/dining/italian-marble-dining-suite.jpg'],
      startingPrice: '₹2,10,000',
      dimensions: '14ft x 12ft Dining Hall (Customizable)',
      finishType: 'Polished Italian Statuario Marble + PVD Brushed Brass Base + Velvet Upholstery',
      features: [
        'Sealed non-porous stain-resistant Italian marble surface coating',
        'Heavy-duty titanium PVD coated brass pedestal base',
        'Ergonomically contoured chairs with high-density molded foam',
        'Concealed floor edge protection for marble and hardwood floors'
      ],
      materials: ['Statuario Italian Marble', 'PVD Brass Coated Stainless Steel', 'Premium Stain-Resistant Velvet', 'Teak Wood Internal Frame'],
      highlights: [
        { icon: 'fa-solid fa-gem', title: 'Statuario Marble Slab', desc: 'Hand-selected Italian marble with rich natural grey veining.' },
        { icon: 'fa-solid fa-shield-halved', title: 'Nano-Sealed Surface', desc: 'Resistant to food stains, heat, and daily household spills.' },
        { icon: 'fa-solid fa-chair', title: 'Ergonomic Velvet Seating', desc: 'Supreme lumbar support designed for relaxed dinner conversations.' }
      ]
    },
    {
      id: 'teak-wood-warm-dining-suite',
      title: 'Solid Burma Teak 8-Seater Dining Suite',
      category: 'wooden-classic',
      categoryLabel: 'Heritage Wood',
      shortDesc: 'Solid seasoned Burma teak wood dining table with hand-carved edge details and matching cushioned dining chairs.',
      tag: 'Heritage Craft',
      image: '/dining/teak-wood-warm-dining-suite.jpg',
      galleryImages: ['/dining/teak-wood-warm-dining-suite.jpg'],
      startingPrice: '₹1,85,000',
      dimensions: '16ft x 13ft Dining Hall (Customizable)',
      finishType: 'Natural Honey Teak Grain + Stain-Resistant Bouclé Cushions + Low-VOC Matte Polish',
      features: [
        '100% seasoned solid Burma teak timber with natural grain pattern',
        'Mortise and tenon joinery for multi-generational durability',
        'Stain-resistant textured bouclé upholstered seat cushions',
        'Protective clear polyurethane matte lacquer finish'
      ],
      materials: ['Grade-A Burma Teak Wood', 'Water-Repellent Bouclé Fabric', 'High-Resilience HR Foam', 'Eco Matte PU Finish'],
      highlights: [
        { icon: 'fa-solid fa-tree', title: '100% Solid Burma Teak', desc: 'Seasoned natural timber that ages gracefully over decades.' },
        { icon: 'fa-solid fa-users', title: 'Grand 8-Seater Layout', desc: 'Comfortable family hosting with ample elbow and leg space.' },
        { icon: 'fa-solid fa-shield', title: 'Stain-Resistant Fabric', desc: 'Upholstered seats designed for quick wipe-down cleanups.' }
      ]
    },
    {
      id: 'japandi-natural-oak-dining',
      title: 'Japandi Natural Oak Dining & Bench Set',
      category: 'japandi-minimal',
      categoryLabel: 'Japandi Minimal',
      shortDesc: 'Clean minimalist European white oak table with floating bench seating and sculptural pendant light fixture.',
      tag: 'Trending Style',
      image: '/dining/japandi-natural-oak-dining.jpg',
      galleryImages: ['/dining/japandi-natural-oak-dining.jpg'],
      startingPrice: '₹1,45,000',
      dimensions: '13ft x 11ft Dining Area (Customizable)',
      finishType: 'European White Oak Veneer + Matte Hardwax Oil + Organic Linen Fabric',
      features: [
        'Space-optimizing matching dining bench for casual and family seating',
        'Soft rounded corners safe for toddlers and pets',
        'Organic natural wood grain with anti-yellowing UV protection',
        'Minimalist seamless aesthetic that blends into modern open layouts'
      ],
      materials: ['European White Oak Hardwood', 'Natural Hardwax Oil Finish', 'Organic Belgian Linen Fabric', 'Solid Beechwood Joinery'],
      highlights: [
        { icon: 'fa-solid fa-spa', title: 'Zen Minimalist Geometry', desc: 'Uncluttered organic lines inspire a calm and grounded dining space.' },
        { icon: 'fa-solid fa-couch', title: 'Versatile Dining Bench', desc: 'Tucks neatly under table to maximize walkway space in compact apartments.' },
        { icon: 'fa-solid fa-leaf', title: 'Non-Toxic Eco Finishes', desc: 'Zero VOC food-safe oils and plant-based wax coatings.' }
      ]
    },
    {
      id: 'round-marble-family-dining',
      title: 'Round Calacatta Marble Dining with Lazy Susan',
      category: 'marble-luxury',
      categoryLabel: 'Modern Grandeur',
      shortDesc: 'Circular Italian marble dining centerpiece with integrated rotating turntable and curved tub chairs.',
      tag: 'Architect Choice',
      image: '/dining/round-marble-family-dining.jpg',
      galleryImages: ['/dining/round-marble-family-dining.jpg'],
      startingPrice: '₹2,35,000',
      dimensions: '15ft x 15ft Square Dining Area (Customizable)',
      finishType: 'Bookmatched Calacatta Gold Marble + Fluted Wooden Pedestal + High-Resilience Foam',
      features: [
        'Integrated ultra-smooth rotating marble Lazy Susan turntable',
        'Solid fluted cylindrical pedestal base ensuring zero leg obstruction',
        'Wrap-around curved tub chairs for supreme comfort during long feasts',
        'Beveled chamfered edge profile preventing accidental bumps'
      ],
      materials: ['Calacatta Gold Italian Marble', 'Fluted Marine Plywood Column', 'Smooth Ball-Bearing Turntable', 'Premium Nubuck Leatherette'],
      highlights: [
        { icon: 'fa-solid fa-rotate', title: 'Integrated Lazy Susan', desc: 'Effortlessly share dishes across all seats with smooth silent rotation.' },
        { icon: 'fa-solid fa-circle-dot', title: 'Zero Leg Obstruction', desc: 'Center pedestal column provides complete 360-degree leg freedom.' },
        { icon: 'fa-solid fa-comments', title: 'Face-to-Face Dining', desc: 'Round layout fosters intimate conversation with all guests.' }
      ]
    },
    {
      id: 'luxury-crockery-bar-dining',
      title: 'Bespoke Glass Crockery & Bar Console Suite',
      category: 'crockery-bar',
      categoryLabel: 'Bar & Crockery',
      shortDesc: 'Full-height fluted glass crockery cabinet with integrated wine rack, quartz counter, and ambient warm LED backlighting.',
      tag: 'Entertaining Hub',
      image: '/dining/luxury-crockery-bar-dining.jpg',
      galleryImages: ['/dining/luxury-crockery-bar-dining.jpg'],
      startingPrice: '₹1,95,000',
      dimensions: '14ft x 12ft Open Dining & Bar (Customizable)',
      finishType: 'Anodized Black Aluminum Profiles + Fluted Tempered Glass + 3000K Diffused LED',
      features: [
        'Full-height fluted glass shutter bar with integrated stemware hanging rails',
        'Solid quartz serving counter for hot dishes and cocktail preparation',
        'Touch-sensor concealed LED cove lighting with step dimming',
        'Soft-close German Blum hinges with integrated dampening'
      ],
      materials: ['Toughened Fluted Glass', 'Anodized Aluminum Framing', 'Engineered Quartz Slab', 'Blum Clip-Top BLUMOTION Hinges'],
      highlights: [
        { icon: 'fa-solid fa-wine-glass', title: 'Integrated Wine & Bar Unit', desc: 'Dedicated stemware hangers and horizontal bottle storage shelves.' },
        { icon: 'fa-solid fa-lightbulb', title: 'Illuminated Glass Display', desc: 'Warm 3000K lighting showcases fine china and glassware dramatically.' },
        { icon: 'fa-solid fa-kitchen-set', title: 'Quartz Serving Counter', desc: 'Heat-resistant buffet counter for hot serving dishes during dinner parties.' }
      ]
    },
    {
      id: 'modern-pendant-dining-area',
      title: 'Contemporary Linear Pendant Dining Area',
      category: 'contemporary',
      categoryLabel: 'Contemporary',
      shortDesc: 'Sleek architectural dining ensemble with linear brass chandelier, fluted wood panel accent, and designer seating.',
      tag: 'New Launch',
      image: '/dining/modern-pendant-dining-area.png',
      galleryImages: ['/dining/modern-pendant-dining-area.png'],
      startingPrice: '₹1,65,000',
      dimensions: '14ft x 12ft Open Concept (Customizable)',
      finishType: 'Engineered Quartz Stone Tabletop + Matte Charcoal Louver Wall + Designer Brass Chandelier',
      features: [
        'Scratch-resistant engineered quartz tabletop with matte stone texture',
        'Acoustic fluted charcoal wall paneling behind dining sideboard',
        'Modern sculptural linear brass pendant lighting fixture included',
        'High-density comfortable upholstered chairs with sleek tapered black legs'
      ],
      materials: ['Engineered Quartz Surface', 'Acoustic Charcoal Louvers', 'Brushed Brass Light Fixture', 'High-Density Sponge Foam'],
      highlights: [
        { icon: 'fa-solid fa-sun', title: 'Linear Statement Lighting', desc: 'Spreads evenly diffused warm illumination along the entire table length.' },
        { icon: 'fa-solid fa-wand-magic-sparkles', title: 'Scratch-Proof Quartz', desc: 'Stands up to everyday hot pots, cutlery, and family dining activities.' },
        { icon: 'fa-solid fa-border-all', title: 'Acoustic Feature Wall', desc: 'Minimizes dinner clatter echo while adding rich contemporary texture.' }
      ]
    }
  ];

  readonly filteredDiningRooms = computed(() => {
    const cat = this.activeCategory();
    const query = this.searchQuery().toLowerCase().trim();

    return this.diningRooms.filter(item => {
      const matchesCategory = (cat === 'all' || item.category === cat);
      const matchesQuery = !query || 
        item.title.toLowerCase().includes(query) ||
        item.shortDesc.toLowerCase().includes(query) ||
        item.categoryLabel.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
  });

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }

  setCategory(cat: string): void {
    this.activeCategory.set(cat);
  }

  openConsultationModal(e?: Event): void {
    if (e) e.preventDefault();
    this.consultationModalService.open();
  }

  openDetailModal(item: DiningRoomItem): void {
    this.selectedDiningRoom.set(item);
    this.modalActiveImage.set(item.galleryImages[0] || item.image);
    this.isDetailModalOpen.set(true);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  closeDetailModal(): void {
    this.isDetailModalOpen.set(false);
    this.selectedDiningRoom.set(null);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  setModalActiveImage(img: string): void {
    this.modalActiveImage.set(img);
  }

  openLightbox(img: string, e?: Event): void {
    if (e) e.stopPropagation();
    this.lightboxImage.set(img);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  closeLightbox(): void {
    this.lightboxImage.set(null);
    if (typeof document !== 'undefined' && !this.isDetailModalOpen()) {
      document.body.style.overflow = '';
    }
  }

  ngOnDestroy(): void {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }
}
