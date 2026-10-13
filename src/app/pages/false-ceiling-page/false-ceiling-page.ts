import { Component, OnInit, OnDestroy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConsultationModalService } from '../../services/consultation-modal.service';

export interface CeilingItem {
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
  selector: 'app-false-ceiling-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './false-ceiling-page.html',
  styleUrl: './false-ceiling-page.css'
})
export class FalseCeilingPage implements OnInit, OnDestroy {
  private consultationModalService = inject(ConsultationModalService);

  // Active category filter
  readonly activeCategory = signal<string>('all');
  
  // Search query
  readonly searchQuery = signal<string>('');

  // Selected ceiling item for modal
  readonly selectedCeiling = signal<CeilingItem | null>(null);
  readonly isDetailModalOpen = signal<boolean>(false);
  readonly modalActiveImage = signal<string>('');

  // Lightbox for zoom
  readonly lightboxImage = signal<string | null>(null);

  // False Ceiling Database
  readonly ceilings: CeilingItem[] = [
    {
      id: 'floral-petal-chandelier-ceiling',
      title: 'Floral Petal & Chandelier Ceiling',
      category: 'modern-sculptural',
      categoryLabel: 'Sculptural Floral & Cove',
      shortDesc: 'Sculptural multi-petal floral cove false ceiling with tiered crystal chandelier and warm ambient halo.',
      tag: 'Luxury Signature',
      image: '/ceilings/floral-petal-chandelier-ceiling.jpg',
      galleryImages: ['/ceilings/floral-petal-chandelier-ceiling.jpg'],
      startingPrice: '₹89,000',
      dimensions: '16ft x 14ft Living Room (Customizable)',
      finishType: 'Saint-Gobain Gyproc Floral Petals + Crystal Chandelier + Dual Cove LED',
      features: [
        'Sculptural petal motif false ceiling with high-precision CNC curved gypsum profiles',
        'Concealed dual-perimeter warm 3000K cove backlighting each floral petal layer',
        'Reinforced central suspension base for tiered multi-level crystal chandelier',
        'Peripheral recessed anti-glare COB spotlights and smart dimmer control'
      ],
      materials: ['Saint-Gobain Gyproc 12.5mm Boards', 'Tiered Crystal Chandelier Base', 'Philips 3000K LED Strips', 'Rust-Proof GI Channel Framework'],
      highlights: [
        { icon: 'fa-solid fa-fan', title: 'Bespoke Petal Architecture', desc: 'Custom multi-leaf floral design transforms flat ceilings into breathtaking sculpture.' },
        { icon: 'fa-solid fa-gem', title: 'Crystal Chandelier Accent', desc: 'Central crystal lighting focal point with soft refractive radiance.' },
        { icon: 'fa-solid fa-sun', title: 'Dual-Layer Cove Wash', desc: 'Concealed ambient backlights cast warm glare-free halos around each petal.' }
      ]
    },
    {
      id: 'curved-wood-rafter-wave-ceiling',
      title: 'S-Curve Wave & Fluted Wood Ceiling',
      category: 'wooden-rafter',
      categoryLabel: 'Curved Wood Rafters & Linear Light',
      shortDesc: 'Dramatic S-curved wave gypsum ceiling with natural teak fluted louvers and recessed linear LED channels.',
      tag: 'Trending Design',
      image: '/ceilings/curved-wood-rafter-wave-ceiling.jpg',
      galleryImages: ['/ceilings/curved-wood-rafter-wave-ceiling.jpg'],
      startingPrice: '₹98,000',
      dimensions: '18ft x 14ft Living & TV Lounge (Customizable)',
      finishType: 'S-Curved Gypsum Bulkhead + Natural Teak Fluted Louvers + Inset Linear LED Strips',
      features: [
        'Flowing S-curve architectural boundary separating living and entertainment zones',
        'Natural wood fluted louvers with inset continuous anti-glare linear profile lights',
        'Concealed double perimeter cove casting warm diffused 3000K ambient wash',
        'Seamless integration for central high-efficiency BLDC matte black ceiling fan'
      ],
      materials: ['Grade-A Natural Teak Louvers', 'Flexible Saint-Gobain Gyproc Curved Board', 'High-CRI Linear Profile LEDs', 'Heavy-Gauge GI Framing Framework'],
      highlights: [
        { icon: 'fa-solid fa-water', title: 'Flowing S-Curve Geometry', desc: 'Organic curved architecture provides captivating visual flow across open floor plans.' },
        { icon: 'fa-solid fa-tree', title: 'Fluted Teak Inset', desc: 'Acoustic-grade solid teak wood louvers add rich organic warmth.' },
        { icon: 'fa-solid fa-lines-leaning', title: 'Embedded Light Channels', desc: 'Sleek embedded linear LED strips provide modern shadow-free downward illumination.' }
      ]
    },
    {
      id: 'honeycomb-hexagon-cove-ceiling',
      title: 'Honeycomb Hexagon Backlit Ceiling',
      category: 'modern-sculptural',
      categoryLabel: 'Hexagonal 3D Acoustic Modules',
      shortDesc: 'Geometric 3D floating hexagonal gypsum modules with warm golden 3000K backlight halo illumination.',
      tag: 'Architectural Showstopper',
      image: '/ceilings/honeycomb-hexagon-cove-ceiling.jpg',
      galleryImages: ['/ceilings/honeycomb-hexagon-cove-ceiling.jpg'],
      startingPrice: '₹1,05,000',
      dimensions: '18ft x 15ft Contemporary Living Hall (Customizable)',
      finishType: 'Modular Gypsum Hexagons + Concealed Amber Cove LEDs + Recessed Micro-Spots',
      features: [
        'Interlocking cluster of floating 3D hexagonal panels at varied architectural elevations',
        'Concealed warm golden amber LED backlighting washing every individual geometric edge',
        'Acoustically engineered core dampening hall reverberation and entertainment audio echo',
        'Smart dual-circuit switching allowing independent control of ambient halo and task spots'
      ],
      materials: ['CNC Precision-Cut Gypsum Hexagonal Panels', 'High-Density 3000K Flexible LED Ribbons', 'Sound-Absorbing Mineral Fiber Core', 'Concealed Heavy-Load Ceiling Mounts'],
      highlights: [
        { icon: 'fa-solid fa-shapes', title: 'Honeycomb 3D Cluster', desc: 'Unique polygonal sculpture transforms ceiling into an illuminated modern art installation.' },
        { icon: 'fa-solid fa-fire', title: 'Amber Halo Backlight', desc: 'Deep warm indirect glow radiates outward from behind each hexagonal module.' },
        { icon: 'fa-solid fa-volume-high', title: 'Acoustic Balancing', desc: 'Engineered multi-depth planes break up sound waves to improve home-theater acoustics.' }
      ]
    },
    {
      id: 'overlapping-rings-pendant-ceiling',
      title: 'Concentric Halo Rings & Pendant Ceiling',
      category: 'modern-sculptural',
      categoryLabel: 'Circular Halo & Pendant Drops',
      shortDesc: 'Overlapping circular gypsum coves with warm ambient halo lighting and 3-tier frosted globe pendant chandelier.',
      tag: 'Bespoke Luxury',
      image: '/ceilings/overlapping-rings-pendant-ceiling.jpg',
      galleryImages: ['/ceilings/overlapping-rings-pendant-ceiling.jpg'],
      startingPrice: '₹92,000',
      dimensions: '16ft x 14ft Luxury Lounge (Customizable)',
      finishType: 'Dual Overlapping Circular Bulkheads + Continuous Halo Cove + Triple Globe Chandelier',
      features: [
        'Architectural interlocking dual circles creating dynamic radial focal points',
        'Concealed high-lumen 3000K warm LED ribbons projecting soft ambient circular haloes',
        'Suspended cluster of three frosted orb pendant luminaires with brushed bronze hardware',
        'Peripheral anti-glare circular COB recessed spotlights highlighting perimeter walls'
      ],
      materials: ['Saint-Gobain Gyproc Precision Circular Formwork', 'Brushed Bronze 3-Drop Pendant Set', 'Seamless High-Efficiency LED Strips', 'Galvanized Zinc Anti-Rust Grid'],
      highlights: [
        { icon: 'fa-solid fa-circle-nodes', title: 'Interlocking Radial Coves', desc: 'Concentric circles create gentle fluid lines that soften angular rectangular rooms.' },
        { icon: 'fa-solid fa-lightbulb', title: 'Globe Cluster Chandelier', desc: 'Three-tiered frosted luminous spheres anchor the conversation lounge.' },
        { icon: 'fa-solid fa-sun', title: 'Diffused Halo Wash', desc: 'Continuous circular cove wash reflects downward with zero eye-level glare.' }
      ]
    },
    {
      id: 'geometric-nested-squares-ceiling',
      title: 'Geometric Nested Squares Tray Ceiling',
      category: 'cove-tray',
      categoryLabel: 'Nested Square Tray & Spotlights',
      shortDesc: 'Multi-tiered geometric nested floating squares with concealed perimeter cove lighting and central fan provision.',
      tag: 'Contemporary Modern',
      image: '/ceilings/geometric-nested-squares-ceiling.jpg',
      galleryImages: ['/ceilings/geometric-nested-squares-ceiling.jpg'],
      startingPrice: '₹78,000',
      dimensions: '16ft x 14ft Living Room (Customizable)',
      finishType: 'Multi-Step Floating Square Gypsum Trays + Perimeter Cove + Anti-Glare COB Downlights',
      features: [
        'Nested concentric floating square trays creating layered geometric visual depth',
        'Concealed indirect LED cove strips lighting both inner and outer architectural tiers',
        'Reinforced central ceiling anchor for high-performance aerodynamic ceiling fan',
        'Strategically aligned square grid of recessed COB spotlights providing uniform illumination'
      ],
      materials: ['Saint-Gobain Gypboard 12.5mm Moisture Resistant', 'Heavy-Duty Ceiling Fan Anchor Fasteners', 'Philips Deep Recessed COB Downlights', 'High-Efficiency 3000K Cove Drivers'],
      highlights: [
        { icon: 'fa-solid fa-square', title: 'Nested Geometric Layers', desc: 'Multi-tier floating squares lend structured modern architectural elegance.' },
        { icon: 'fa-solid fa-fan', title: 'Central Fan Mount Hub', desc: 'Dedicated structural junction box supports heavy ceiling fans without vibration.' },
        { icon: 'fa-solid fa-layer-group', title: 'Dual Cove Lighting', desc: 'Separate inner and outer coves create dramatic multi-level ambient lighting options.' }
      ]
    },
    {
      id: 'nested-pyramid-tray-cove-ceiling',
      title: 'Stepped Pyramid Tray Golden Cove Ceiling',
      category: 'cove-tray',
      categoryLabel: 'Stepped Tray & Golden Cove',
      shortDesc: 'Architectural inverted step-pyramid false ceiling with rich golden 3000K ambient cove wash and central fan hub.',
      tag: 'Best Seller',
      image: '/ceilings/nested-pyramid-tray-cove-ceiling.jpg',
      galleryImages: ['/ceilings/nested-pyramid-tray-cove-ceiling.jpg'],
      startingPrice: '₹72,000',
      dimensions: '16ft x 14ft Living Room (Customizable)',
      finishType: 'Inverted Stepped Gypsum Tray + Golden Warm Cove LED + Recessed Corner Downlights',
      features: [
        'Classic inverted step tray design creating an optical illusion of greater room height',
        'Continuous high-lumen 3000K warm golden LED cove bathing the entire ceiling in soft light',
        'Sturdy central mounting fixture designed for large-sweep luxury ceiling fans',
        'Concealed curtain pelmet along exterior window wall for hidden motorized drapery tracks'
      ],
      materials: ['Saint-Gobain Gyproc 12.5mm Elite Board', 'Anti-Sag Heavy GI Channel Grid', 'High-Output Warm Golden LED Strip', 'Fiberglass Mesh Anti-Crack Tape'],
      highlights: [
        { icon: 'fa-solid fa-arrows-up-to-line', title: 'Height Enhancing Tray', desc: 'Inverted stepped profile visually elevates ceiling height for a spacious airy feel.' },
        { icon: 'fa-solid fa-sun', title: 'Golden Warm Ambient Glow', desc: 'Rich 3000K tungsten-tone cove wash creates a cozy, inviting family atmosphere.' },
        { icon: 'fa-solid fa-scroll', title: 'Integrated Curtain Pelmet', desc: 'Seamlessly conceals curtain rods and motorized drapery tracks along window spans.' }
      ]
    },
    {
      id: 'magnetic-track-cove-ceiling',
      title: 'Magnetic Track & Cove Ceiling',
      category: 'magnetic-track',
      categoryLabel: 'Magnetic Track & Cove',
      shortDesc: 'Modern false ceiling with black magnetic track lights and warm perimeter cove.',
      tag: 'Best Seller',
      image: '/ceilings/magnetic-track-minimalist-ceiling.jpg',
      galleryImages: ['/ceilings/magnetic-track-minimalist-ceiling.jpg'],
      startingPrice: '₹75,000',
      dimensions: '16ft x 14ft Living Room (Customizable)',
      finishType: 'Saint-Gobain Gypsum + Black Magnetic Aluminum Tracks + 3000K Cove LED',
      features: [
        'Recessed magnetic tracks allowing repositionable spotlights and linear diffused fixtures',
        'Concealed double perimeter cove casting warm glare-free ambient lighting',
        'Zero-crack Saint-Gobain moisture-resistant gypsum plasterboard installation',
        'Smart automation integration compatible with Alexa and Google Home dimming'
      ],
      materials: ['Saint-Gobain Gyproc 12.5mm Boards', 'Heavy-Duty GI Framing Channel', 'Philips 3000K LED Drivers', 'Anodized Black Magnetic Tracks'],
      highlights: [
        { icon: 'fa-solid fa-lightbulb', title: 'Modular Magnetic Tracks', desc: 'Add or slide spotlights anywhere along the track with magnetic click.' },
        { icon: 'fa-solid fa-sun', title: 'Diffused Cove Wash', desc: 'Indirect warm ambient glow makes ceilings appear higher and grander.' },
        { icon: 'fa-solid fa-shield-halved', title: 'Zero-Sag GI Framing', desc: 'Rust-proof zinc-coated galvanized iron grid ensures lifetime structural stability.' }
      ]
    },
    {
      id: 'wooden-rafter-dining-ceiling',
      title: 'Wooden Rafters & Dining Cove Ceiling',
      category: 'wooden-rafter',
      categoryLabel: 'Wooden Rafter Ceiling',
      shortDesc: 'Teak finish wooden rafters with diffused cove wash and hanging pendant lights.',
      tag: 'Trending Design',
      image: '/ceilings/wooden-rafter-cove-ceiling.jpg',
      galleryImages: ['/ceilings/wooden-rafter-cove-ceiling.jpg'],
      startingPrice: '₹88,000',
      dimensions: '14ft x 12ft Dining & Living Space (Customizable)',
      finishType: 'Natural Teak Finish Rafters + Seamless Gypsum Perimeter + Pendant Drops',
      features: [
        'Synchronized hardwood rafters creating a warm, organic architectural canopy',
        'Integrated drop amber glass pendant lights positioned perfectly over dining table',
        'Perimeter recessed warm LED strip washing outer gypsum border',
        'Concealed electrical routing for ceiling fan and AC duct integration'
      ],
      materials: ['Seasoned Teak Woodgrain Finish Rafters', 'IS 710 BWP Plywood Core Framing', 'High-Lumen Cove LED Strips', 'Amber Glass Pendant Lamps'],
      highlights: [
        { icon: 'fa-solid fa-tree', title: 'Warm Woodgrain Accents', desc: 'Real wood aesthetic brings nature-inspired luxury to dining and family spaces.' },
        { icon: 'fa-solid fa-gem', title: 'Dining Pendant Focus', desc: 'Dedicated drop pendants create intimate, warm illumination during meals.' },
        { icon: 'fa-solid fa-layer-group', title: 'Dual-Layer Architecture', desc: 'Wood rafters set inside recessed gypsum well add striking 3D visual depth.' }
      ]
    },
    {
      id: 'step-tray-bedroom-ceiling',
      title: 'Step Tray Master Bedroom Ceiling',
      category: 'cove-tray',
      categoryLabel: 'Step Tray & Chandelier',
      shortDesc: 'Multi-step tray ceiling with warm ambient cove and central gold ring light.',
      tag: 'Popular Choice',
      image: '/ceilings/step-tray-cove-ceiling.jpg',
      galleryImages: ['/ceilings/step-tray-cove-ceiling.jpg'],
      startingPrice: '₹68,000',
      dimensions: '15ft x 13ft Master Bedroom (Customizable)',
      finishType: 'Multi-Step Gyproc Gypsum Tray + Concealed Warm Strip + Ring Chandelier',
      features: [
        'Two-tier stepped tray design elevating room ceiling perception and bedroom luxury',
        'Continuous soft 3000K warm cove perimeter wash eliminating harsh direct glare',
        'Central mounting reinforcement for modern circular LED ring chandelier and fan',
        'Recessed edge spotlights positioned for wardrobe and reading zones'
      ],
      materials: ['Saint-Gobain Gypboard Elite 12.5mm', 'Powder-Coated Gold Chandelier Fitting', 'Tungsten Warm High-CRI LED Strips', 'Anti-Crack Joint Tape'],
      highlights: [
        { icon: 'fa-solid fa-bed', title: 'Restful Sleep Ambiance', desc: 'Indirect cove reflection eliminates ceiling bulb glare while lying in bed.' },
        { icon: 'fa-solid fa-arrows-up-to-line', title: 'Height Maximizer', desc: 'Central recessed recess makes room appear significantly taller.' },
        { icon: 'fa-solid fa-crown', title: 'Designer Ring Centerpiece', desc: 'Modern minimal gold rings provide elegant bedroom focal point.' }
      ]
    },
    {
      id: 'curved-organic-wave-ceiling',
      title: 'Curved Organic Wave Ceiling',
      category: 'modern-sculptural',
      categoryLabel: 'Organic Curved Ceiling',
      shortDesc: 'Sculptural organic fluid curve false ceiling with warm indirect illumination.',
      tag: 'Luxury Signature',
      image: '/ceilings/curved-organic-cove-ceiling.jpg',
      galleryImages: ['/ceilings/curved-organic-cove-ceiling.jpg'],
      startingPrice: '₹95,000',
      dimensions: '18ft x 15ft Grand Living Hall (Customizable)',
      finishType: 'CNC Precision Curved Gypsum Profiles + Dual-Layer Warm LED Glow',
      features: [
        'Bespoke fluid organic curves sculpted to create a high-end luxury hotel statement',
        'Two concentric wave cove tiers with concealed dimmable LED strip channels',
        'Zero-seam jointing using fiberglass mesh for an immaculate porcelain-smooth finish',
        'Acoustic sound dampening properties reducing hall reverberation'
      ],
      materials: ['Flexible Gypsum Curved Board', 'Precision Laser-Cut Framing Templates', 'Continuous Seamless LED Strip', 'Acoustic Sound Core'],
      highlights: [
        { icon: 'fa-solid fa-wand-magic-sparkles', title: 'Fluid Sculptural Form', desc: 'Bespoke curved architecture transforms flat ceiling into artwork.' },
        { icon: 'fa-solid fa-water', title: 'Concentric Wave Cove', desc: 'Dual-tier illumination generates hypnotic soft glow across the entire lounge.' },
        { icon: 'fa-solid fa-volume-xmark', title: 'Acoustic Dampening', desc: 'Reduces echo in large open-plan living and dining areas.' }
      ]
    },
    {
      id: 'geometric-profile-light-ceiling',
      title: 'Geometric Profile Light Ceiling',
      category: 'profile-lights',
      categoryLabel: 'Linear Profile Ceiling',
      shortDesc: 'Architectural geometric aluminum profile light channels with wood accents.',
      tag: 'Modern Minimalist',
      image: '/ceilings/geometric-profile-light-ceiling.jpg',
      galleryImages: ['/ceilings/geometric-profile-light-ceiling.jpg'],
      startingPrice: '₹82,000',
      dimensions: '16ft x 14ft Entertainment Lounge (Customizable)',
      finishType: 'Recessed Aluminum LED Profile Channels + Smoked Walnut Accents',
      features: [
        'Flawless geometric intersecting linear light channels embedded flush with plasterboard',
        'Dotless frosted silicon diffusers ensuring continuous uniform illumination without hot spots',
        'Integrated smoked walnut woodgrain border panel connecting ceiling to TV wall',
        'Micro-aperture anti-glare downlights for balanced task illumination'
      ],
      materials: ['Anodized Aluminum Profile Channels', 'High-Density Dotless LED Strips', 'Smoked Walnut Veneer Accent Band', 'Saint-Gobain Gypsum Base'],
      highlights: [
        { icon: 'fa-solid fa-draw-polygon', title: 'Flush Embedded Profiles', desc: 'Zero protrusions: light channels sit perfectly flush with gypsum plane.' },
        { icon: 'fa-solid fa-eye', title: 'Dotless Frost Diffusion', desc: 'No visible LED dots: pure architectural light lines.' },
        { icon: 'fa-solid fa-tv', title: 'Entertainment Integration', desc: 'Seamlessly flows into feature TV back paneling for holistic modern styling.' }
      ]
    },
    {
      id: 'perimeter-cove-spotlight-ceiling',
      title: 'Perimeter Cove & Spotlight Ceiling',
      category: 'cove-tray',
      categoryLabel: 'Minimalist Perimeter Cove',
      shortDesc: 'Minimalist bedroom ceiling with warm perimeter cove and anti-glare downlights.',
      tag: 'Budget Friendly',
      image: '/ceilings/perimeter-cove-spotlight-ceiling.jpg',
      galleryImages: ['/ceilings/perimeter-cove-spotlight-ceiling.jpg'],
      startingPrice: '₹58,000',
      dimensions: '14ft x 12ft Bedroom / Guest Room (Customizable)',
      finishType: 'Minimalist Gypsum Perimeter Pelmet + Anti-Glare Warm COB Downlights',
      features: [
        'Clean edge perimeter drop preserving maximum central ceiling slab height',
        'Concealed pelmet provision for automated blackout and sheer curtain track concealment',
        'Arranged circular warm COB spotlights for balanced non-intrusive illumination',
        'Quick 3-day dustless installation with ready pre-engineered GI framing'
      ],
      materials: ['Moisture-Resistant Gypsum Board', 'Concealed Curtain Pelmet Channel', 'High-Efficiency 3000K COB Spotlights', 'Anti-Sag Ceiling Hangers'],
      highlights: [
        { icon: 'fa-solid fa-ruler-combined', title: 'Retains Maximum Height', desc: 'Only drops 5 inches along walls, keeping 90% of the ceiling at full height.' },
        { icon: 'fa-solid fa-scroll', title: 'Hidden Curtain Pelmet', desc: 'Curtain rods and tracks are completely invisible from below.' },
        { icon: 'fa-solid fa-bolt', title: 'Fast 3-Day Execution', desc: 'Fast turnaround installation with zero mess or structural disturbance.' }
      ]
    }
  ];

  // Category Filter Tabs
  readonly categories = [
    { id: 'all', label: 'All Ceilings', icon: 'fa-solid fa-border-all' },
    { id: 'cove-tray', label: 'Cove & Tray Ceilings', icon: 'fa-solid fa-layer-group' },
    { id: 'magnetic-track', label: 'Magnetic Track & Spots', icon: 'fa-solid fa-lightbulb' },
    { id: 'wooden-rafter', label: 'Wooden Rafter Ceilings', icon: 'fa-solid fa-tree' },
    { id: 'modern-sculptural', label: 'Sculptural & Profile', icon: 'fa-solid fa-wand-magic-sparkles' }
  ];

  // Filtered Ceilings computed signal
  readonly filteredCeilings = computed(() => {
    const cat = this.activeCategory();
    const query = this.searchQuery().trim().toLowerCase();

    return this.ceilings.filter(item => {
      const matchCat = cat === 'all' || 
        item.category === cat ||
        (cat === 'modern-sculptural' && (item.category === 'profile-lights' || item.category === 'modern-sculptural'));
      const matchQuery = !query || 
        item.title.toLowerCase().includes(query) ||
        item.shortDesc.toLowerCase().includes(query) ||
        item.finishType.toLowerCase().includes(query) ||
        item.categoryLabel.toLowerCase().includes(query);
      return matchCat && matchQuery;
    });
  });

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  setCategory(cat: string): void {
    this.activeCategory.set(cat);
  }

  openConsultationModal(e?: Event): void {
    if (e) e.preventDefault();
    this.consultationModalService.open();
  }

  openDetailModal(item: CeilingItem): void {
    this.selectedCeiling.set(item);
    this.modalActiveImage.set(item.galleryImages[0] || item.image);
    this.isDetailModalOpen.set(true);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  closeDetailModal(): void {
    this.isDetailModalOpen.set(false);
    this.selectedCeiling.set(null);
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
