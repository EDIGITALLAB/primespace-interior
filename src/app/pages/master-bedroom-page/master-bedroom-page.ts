import { Component, OnInit, OnDestroy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConsultationModalService } from '../../services/consultation-modal.service';

export interface BedroomItem {
  id: string;
  title: string;
  category: 'contemporary' | 'minimalist' | 'classical' | 'boho-warm' | 'suite-dressing';
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
  internalLayout: {
    headboardWall: string;
    bedStorage: string;
    vanityTvUnit: string;
    accessories: string[];
  };
  highlights: { icon: string; title: string; desc: string }[];
}

export interface BedroomMaterialOption {
  name: string;
  type: string;
  image: string;
  description: string;
  durability: string;
  badge: string;
}

export interface BedroomFaq {
  question: string;
  answer: string;
  isOpen?: boolean;
}

@Component({
  selector: 'app-master-bedroom-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './master-bedroom-page.html',
  styleUrl: './master-bedroom-page.css'
})
export class MasterBedroomPage implements OnInit, OnDestroy {
  private consultationModalService = inject(ConsultationModalService);

  // Active category filter
  readonly activeCategory = signal<string>('all');
  
  // Search query
  readonly searchQuery = signal<string>('');

  // Selected bedroom item for modal
  readonly selectedBedroom = signal<BedroomItem | null>(null);
  readonly isDetailModalOpen = signal<boolean>(false);
  readonly modalActiveImage = signal<string>('');

  // Lightbox for gallery images
  readonly lightboxImage = signal<string | null>(null);

  // Bedroom Items Database
  readonly bedrooms: BedroomItem[] = [
    {
      id: 'warm-oak-gold-panelling-suite',
      title: 'Warm Teak & Textured Gold Panelling Suite',
      category: 'contemporary',
      categoryLabel: 'Contemporary Luxury Suite',
      shortDesc: 'Solid teakwood bed with textured headboard paneling, gold brass inlays, bench, and warm pendant lights.',
      tag: 'Best Seller',
      image: '/bedrooms/warm-teak-gold-panelling-suite.jpg',
      galleryImages: [
        '/bedrooms/warm-teak-gold-panelling-suite.jpg',
        '/bedrooms/fluted-beige-upholstered-suite.jpg',
        '/bedrooms/travertine-marble-tv-console.jpg'
      ],
      startingPrice: '₹2,65,000',
      dimensions: '16ft x 14ft Master Suite (Customizable)',
      finishType: 'Textured Fabric Panelling + Brushed Gold Inlays + Natural Teak Wood & Warm Cove Lights',
      features: [
        'Floor-to-ceiling 10ft bespoke textured headboard wall with vertical brushed brass T-profiles',
        'Solid seasoned teak king-size bed frame with cushioned leatherette backrest',
        'Twin bedside wooden nightstands with amber glass hanging pendant lamps',
        'Multi-level false ceiling cove with warm 3000K diffused indirect LED perimeter lighting'
      ],
      materials: ['Century Club IS 710 Marine Grade BWP Core', 'Natural Seasoned Burma Teak Wood', 'Brushed Anodized Gold Brass Inlays', 'Textured Acoustic Wall Fabric'],
      internalLayout: {
        headboardWall: '10ft CNC Panelled Wall + Metallic Brass Strips + Concealed Ambient LED Cove',
        bedStorage: 'King Size 78"x72" Solid Teak Frame with Under-Bed Storage Drawers',
        vanityTvUnit: 'Matching Teak Dressing Console + Floor-to-Ceiling Sheer & Blackout Drapes',
        accessories: ['Dual Amber Glass Pendant Lights', 'Upholstered Bedside Bench', 'Solid Teak Nightstands']
      },
      highlights: [
        { icon: 'fa-solid fa-gem', title: 'Brushed Brass Inlays', desc: 'Precision metallic gold vertical trims elevate modern bedroom warmth.' },
        { icon: 'fa-solid fa-tree', title: 'Solid Seasoned Teak', desc: 'Durable teakwood bed frame and matching bench crafted for longevity.' },
        { icon: 'fa-solid fa-lightbulb', title: 'Layered Ambient Lighting', desc: 'Ceiling coves and pendant lamps create a cozy 5-star hotel retreat.' }
      ]
    },
    {
      id: 'fluted-beige-upholstered-suite',
      title: 'Plush Vertical Fluted Headboard Suite',
      category: 'contemporary',
      categoryLabel: 'Plush Upholstered Suite',
      shortDesc: 'Full-height beige vertical upholstered headboard wall with gold trim, wooden nightstands, and cove lighting.',
      tag: 'Luxury Signature',
      image: '/bedrooms/fluted-beige-upholstered-suite.jpg',
      galleryImages: [
        '/bedrooms/fluted-beige-upholstered-suite.jpg',
        '/bedrooms/warm-teak-gold-panelling-suite.jpg',
        '/bedrooms/travertine-marble-tv-console.jpg'
      ],
      startingPrice: '₹2,45,000',
      dimensions: '15ft x 13ft Room Layout (Customizable)',
      finishType: 'Plush Beige Velvet Upholstery + Brushed Gold Brass Trim + Natural Teak Nightstands',
      features: [
        'Floor-to-ceiling 10ft high-back upholstered velvet headboard panels with acoustic foam core',
        'Minimalist king size platform bed upholstered in stain-proof textured cream linen',
        'Drop hanging cone pendant lights paired with bedside table lamps',
        'Warm indirect false ceiling cove wash highlighting wall texture'
      ],
      materials: ['High-Density Acoustic Foam Cushioning', 'Italian Stain-Resistant Velvet Fabric', 'Anodized Gold Brass Framing', 'Solid Teak Nightstand Units'],
      internalLayout: {
        headboardWall: 'Full-Height 10ft Vertical Padded Velvet Fluted Wall with Gold Border',
        bedStorage: 'King Size Platform Bed with Hydraulic Gas Lift Box',
        vanityTvUnit: 'Teakwood Bedside Tables + Built-in Wireless Fast Charging',
        accessories: ['Twin Cone Pendant Lights', 'Indirect LED Ceiling Cove', 'Floor Sheer Curtains']
      },
      highlights: [
        { icon: 'fa-solid fa-volume-xmark', title: 'Acoustic Sound Absorption', desc: 'Plush foam panels create an ultra-quiet, restful bedroom sanctuary.' },
        { icon: 'fa-solid fa-bed', title: 'High-Back Comfort', desc: 'Ergonomic cushioned headboard provides ultimate support for late-night reading.' },
        { icon: 'fa-solid fa-gem', title: 'Gold Brass Framing', desc: 'Gold metallic perimeter trims frame the upholstered wall elegantly.' }
      ]
    },
    {
      id: 'heritage-walnut-floral-suite',
      title: 'Heritage Walnut & Floral Wallpaper Suite',
      category: 'classical',
      categoryLabel: 'Heritage Classical & Wardrobe Suite',
      shortDesc: 'Solid carved walnut bed with floral wallpaper accent wall, side wooden paneling, and built-in wardrobe.',
      tag: 'Heritage Artistry',
      image: '/bedrooms/heritage-walnut-floral-suite.jpg',
      galleryImages: [
        '/bedrooms/heritage-walnut-floral-suite.jpg',
        '/bedrooms/beige-walnut-loft-wardrobe.jpg',
        '/bedrooms/travertine-marble-tv-console.jpg'
      ],
      startingPrice: '₹2,85,000',
      dimensions: '16ft x 14ft Full Room Layout (Customizable)',
      finishType: 'Handcrafted Solid American Walnut + Classical Floral Motif Wallpaper + Matte Black Handles',
      features: [
        'Traditional master-crafted solid walnut wooden bed with floral carved arch crest',
        'Center accent wall featuring textured classical damask floral wallpaper framed in walnut',
        'Seamless integrated floor-to-ceiling 6-door walnut wardrobe with overhead storage lofts',
        'Matching walnut bedside nightstand with drop filament Edison bulb pendant lights'
      ],
      materials: ['Solid American Walnut Hardwood', 'Textured Non-Woven Floral Wallpaper', 'IS 710 Marine Grade Plywood', 'Soft-Close European Dampers'],
      internalLayout: {
        headboardWall: 'Walnut Side Panelling + Center Floral Wallpaper + Hanging Edison Lights',
        bedStorage: 'Carved Solid Walnut Bed with Deep Under-Bed Pullout Drawers',
        vanityTvUnit: 'Full-Height Built-in Walnut Wardrobe Suite with Overhead Lofts',
        accessories: ['Carved Wood Gable Arch', 'Edison Filament Lamps', 'Matching Walnut Nightstands']
      },
      highlights: [
        { icon: 'fa-solid fa-tree', title: 'Solid Walnut Woodcraft', desc: 'Handcrafted generational hardwood bed with rich organic grain and durability.' },
        { icon: 'fa-solid fa-palette', title: 'Floral Wallpaper Accent', desc: 'Subtle textured botanical wallpaper adds timeless European charm.' },
        { icon: 'fa-solid fa-door-closed', title: 'Integrated Wardrobe', desc: 'Full-height matching walnut wardrobe provides complete bedroom storage.' }
      ]
    },
    {
      id: 'travertine-marble-tv-console-suite',
      title: 'Travertine Marble Floating TV Console Suite',
      category: 'minimalist',
      categoryLabel: 'Marble Media Wall & Open Display',
      shortDesc: 'Large travertine stone TV wall with floating walnut media credenza and vertical display shelves.',
      tag: 'Modern Luxury',
      image: '/bedrooms/travertine-marble-tv-console.jpg',
      galleryImages: [
        '/bedrooms/travertine-marble-tv-console.jpg',
        '/bedrooms/warm-teak-gold-panelling-suite.jpg',
        '/bedrooms/fluted-beige-upholstered-suite.jpg'
      ],
      startingPrice: '₹1,95,000',
      dimensions: '12ft W x 9.5ft H Media Wall (Customizable)',
      finishType: 'Honed Italian Travertine Slab + Smoked Walnut Floating Credenza + Open Niche Shelves',
      features: [
        'Full-height honed Italian travertine stone slab wall with concealed wire routing',
        'Heavy-duty cantilevered floating walnut TV credenza with push-to-open drawers',
        'Integrated vertical open wooden niche shelving column for books, planters & decor',
        'Recessed ambient warm perimeter lighting creating a theater-grade media backdrop'
      ],
      materials: ['Honed Italian Travertine Marble Slab', 'Century Marine Grade BWP Plywood', 'Natural Smoked Walnut Veneer', 'Heavy Duty Wall Anchor Brackets'],
      internalLayout: {
        headboardWall: 'Full-Width Stone Wall Panel with Built-In AV Concealed Conduit Channels',
        bedStorage: 'Master Bedroom Media Zone Opposite Bed with Ample Storage',
        vanityTvUnit: 'Floating 10ft TV Console + 4-Tier Open Walnut Display Tower',
        accessories: ['Concealed Wire Trunking', 'Open Showcase Shelving', 'Recessed Downlights']
      },
      highlights: [
        { icon: 'fa-solid fa-tv', title: 'Floating Media Credenza', desc: 'Wall-hung unit provides dust-free floor cleaning and ultra-modern look.' },
        { icon: 'fa-solid fa-gem', title: 'Honed Travertine Slab', desc: 'Natural porous stone texture creates high-end Italian architectural feel.' },
        { icon: 'fa-solid fa-book-open', title: 'Vertical Display Tower', desc: 'Open wood shelves display framed memories, luxury vases, and indoor plants.' }
      ]
    },
    {
      id: 'beige-walnut-wardrobe-suite',
      title: 'Beige Matte & Walnut Bedroom Wardrobe Suite',
      category: 'suite-dressing',
      categoryLabel: 'Floor-to-Ceiling Wardrobe & Display Niche',
      shortDesc: 'Floor-to-ceiling 6-door wardrobe in soft beige matte with walnut horizontal band and side open shelf.',
      tag: 'Space Optimizer',
      image: '/bedrooms/beige-walnut-loft-wardrobe.jpg',
      galleryImages: [
        '/bedrooms/beige-walnut-loft-wardrobe.jpg',
        '/bedrooms/heritage-walnut-floral-suite.jpg',
        '/bedrooms/warm-teak-gold-panelling-suite.jpg'
      ],
      startingPrice: '₹1,55,000',
      dimensions: '12ft W x 10ft H x 2ft D (Customizable)',
      finishType: 'Soft Beige Anti-Fingerprint Matte + American Walnut Accent Band + Matte Black Long Bar Pulls',
      features: [
        'Floor-to-ceiling 6-door wardrobe with full overhead loft cabinetry maximizing ceiling height',
        'Horizontal warm American walnut woodgrain band with vertical black anodized bar pulls',
        'Integrated side walnut open display niche with 3 bottom soft-close storage drawers',
        'Precision soft-close hinges with 110-degree wide opening and heavy load capacity'
      ],
      materials: ['Century Club IS 710 BWP Hardwood Marine Core', 'Thermal Matte Anti-Smudge Laminate', 'Natural Smoked Walnut Veneer', 'Hafele Soft-Close European Hinges'],
      internalLayout: {
        headboardWall: 'Full Bedroom Suite Integration with Bedside Wardrobe System',
        bedStorage: 'Full Loft Cabinetry for Extra Bedding, Quilts, and Suitcases',
        vanityTvUnit: 'Integrated Side Display Bookshelf with 3 Soft-Close Drawers',
        accessories: ['Matte Black Architectural Pulls', 'Overhead Lofts', 'Open Display Shelves']
      },
      highlights: [
        { icon: 'fa-solid fa-layer-group', title: 'Walnut Accent Mid-Band', desc: 'Contrasting woodgrain horizontal band adds sophisticated warmth.' },
        { icon: 'fa-solid fa-book-open', title: 'Open Display Column', desc: 'Vertical open shelving perfect for indoor planters and bedside essentials.' },
        { icon: 'fa-solid fa-arrows-up-to-line', title: 'Full Ceiling Lofts', desc: 'Overhead cabinets offer dust-proof space for extra duvets and suitcases.' }
      ]
    }
  ];

  // Category Filter Tabs
  readonly categories = [
    { id: 'all', label: 'All Master Bedrooms', icon: 'fa-solid fa-border-all' },
    { id: 'contemporary', label: 'Contemporary Luxury', icon: 'fa-solid fa-gem' },
    { id: 'minimalist', label: 'Minimalist & Japandi', icon: 'fa-solid fa-spa' },
    { id: 'suite-dressing', label: 'Suite with Dressing', icon: 'fa-solid fa-door-open' },
    { id: 'classical', label: 'Modern Classical', icon: 'fa-solid fa-shapes' },
    { id: 'boho-warm', label: 'Warm & Earthy', icon: 'fa-solid fa-sun' }
  ];

  // Material Matrix Data
  readonly materials: BedroomMaterialOption[] = [
    {
      name: 'IS 710 Marine Grade BWP Core',
      type: 'Bed Frame & Storage Box Carcass',
      image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=600&auto=format&fit=crop',
      description: 'Heavy duty boiling waterproof marine plywood core that handles heavy hydraulic loads and mattress weight with zero sagging.',
      durability: '25+ Years Lifetime Strength',
      badge: 'Heavy Load Core'
    },
    {
      name: 'Stain-Resistant Italian Velvet & Leatherette',
      type: 'Upholstered Headboards',
      image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=600&auto=format&fit=crop',
      description: 'Plush, breathable, and easy-clean fabrics with water-repellent nanotech coatings to resist coffee and tea spills.',
      durability: 'Easy Clean & Fade Proof',
      badge: 'Luxury Comfort'
    },
    {
      name: 'CNC Fluted Wood & Acoustic Felt Panels',
      type: 'Architectural Wall Treatments',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600&auto=format&fit=crop',
      description: 'Precision-machined vertical slats that dampen ambient room noise and reverberation for serene, undisturbed sleep.',
      durability: 'Acoustic Sound Absorption',
      badge: 'Sound Dampening'
    },
    {
      name: 'German Hydraulic Gas Springs & Soft Sliders',
      type: 'Storage Bed Mechanisms & Hardware',
      image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=600&auto=format&fit=crop',
      description: 'Heavy-duty 1500N gas struts allowing effortless one-handed bed lifting, plus soft-close drawer runners rated for 100,000 cycles.',
      durability: 'Effortless Lift Damping',
      badge: 'German Tested'
    }
  ];

  // 5-Step Process
  readonly designSteps = [
    {
      number: '01',
      title: 'Room Ergonomics & Laser Measurement',
      desc: 'Our interior architects measure room dimensions, window glare angles, and doorway clearances to ensure optimum bed placement and walking flow.',
      icon: 'fa-solid fa-ruler-combined'
    },
    {
      number: '02',
      title: '3D Photorealistic Bedroom Renders',
      desc: 'We render your master bedroom in full 3D showing exact headboard padding, ambient lighting, nightstands, wardrobe integration, and TV walls.',
      icon: 'fa-solid fa-cubes'
    },
    {
      number: '03',
      title: 'Precision Factory Fabrication',
      desc: 'Headboard panels, hydraulic bed frames, and vanity consoles are crafted in our automated facility with zero on-site carpenter mess.',
      icon: 'fa-solid fa-industry'
    },
    {
      number: '04',
      title: 'Clean On-Site Installation (2-3 Days)',
      desc: 'Factory-finished modules and upholstered panels are mounted seamlessly with concealed brackets and clean electrical connections.',
      icon: 'fa-solid fa-screwdriver-wrench'
    },
    {
      number: '05',
      title: '10-Year Warranty & Sleep Assurance',
      desc: 'Receive your 10-year warranty certificate covering bed structure, hydraulic mechanisms, and joinery with lifetime customer support.',
      icon: 'fa-solid fa-shield-halved'
    }
  ];

  // FAQ Accordion
  readonly faqs: BedroomFaq[] = [
    {
      question: 'What is included in a turnkey Master Bedroom interior package?',
      answer: 'Our turnkey master bedroom interior packages include custom full-height headboard wall panelling, hydraulic king/queen size storage bed frame, dual floating nightstands with concealed wiring, false ceiling with ambient LED cove lighting, TV entertainment wall console, and dressing vanity with mirror.',
      isOpen: true
    },
    {
      question: 'How easy is it to lift and use the hydraulic bed storage?',
      answer: 'We install premium heavy-duty 1200N to 1500N gas-lift struts calibrated specifically to your mattress weight. Lifting the bed requires only one hand with gentle upward guidance, and it locks safely in the open position while you access storage.',
      isOpen: false
    },
    {
      question: 'Can you customize the headboard fabric, colors, and textures?',
      answer: 'Yes, 100%! You can choose from over 200+ fabric swatches including velvet, breathable linen, boucle, faux leather, natural oak veneer louvers, and CNC fluted panels. Our designers will bring material swatches directly to your doorstep.',
      isOpen: false
    },
    {
      question: 'How do you handle concealed wiring for reading lights and chargers?',
      answer: 'All electrical conduit channels and back boxes are integrated behind the headboard panels during factory design. You get clean bedside push buttons, two-way master switches, wireless phone charging pads, and USB-C fast ports with zero visible hanging wires.',
      isOpen: false
    },
    {
      question: 'What is the standard execution timeline for a Master Bedroom?',
      answer: 'From final 3D design approval and swatch sign-off, factory fabrication takes 18-21 days. On-site assembly and panelling installation are completed within 2 to 3 working days.',
      isOpen: false
    }
  ];

  // Filtered Bedrooms computed signal
  readonly filteredBedrooms = computed(() => {
    const cat = this.activeCategory();
    const query = this.searchQuery().trim().toLowerCase();

    return this.bedrooms.filter(item => {
      const matchCat = cat === 'all' || item.category === cat;
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

  openDetailModal(item: BedroomItem): void {
    this.selectedBedroom.set(item);
    this.modalActiveImage.set(item.galleryImages[0] || item.image);
    this.isDetailModalOpen.set(true);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  closeDetailModal(): void {
    this.isDetailModalOpen.set(false);
    this.selectedBedroom.set(null);
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

  toggleFaq(index: number): void {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }
}
