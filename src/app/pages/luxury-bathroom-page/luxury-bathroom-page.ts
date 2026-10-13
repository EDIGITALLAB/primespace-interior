import { Component, OnInit, OnDestroy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConsultationModalService } from '../../services/consultation-modal.service';

export interface BathroomItem {
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
  selector: 'app-luxury-bathroom-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './luxury-bathroom-page.html',
  styleUrl: './luxury-bathroom-page.css'
})
export class LuxuryBathroomPage implements OnInit, OnDestroy {
  private consultationModalService = inject(ConsultationModalService);

  // Active category filter
  readonly activeCategory = signal<string>('all');
  
  // Search query
  readonly searchQuery = signal<string>('');

  // Selected item for modal
  readonly selectedBathroom = signal<BathroomItem | null>(null);
  readonly isDetailModalOpen = signal<boolean>(false);
  readonly modalActiveImage = signal<string>('');

  // Lightbox for zoom
  readonly lightboxImage = signal<string | null>(null);

  // Luxury Bathroom Database
  readonly bathrooms: BathroomItem[] = [
    {
      id: 'modern-walnut-marble-ensuite',
      title: 'Modern Walnut & Fluted Marble Ensuite',
      category: 'marble-spa',
      categoryLabel: 'Modern Marble Ensuite',
      shortDesc: 'Warm fluted walnut wall panelling, floating dual-drawer vanity with vessel basin, organic curved black mirror, and walk-in glass shower.',
      tag: 'Featured Design',
      image: '/bathrooms/modern-walnut-marble-ensuite-bathroom.jpg',
      galleryImages: ['/bathrooms/modern-walnut-marble-ensuite-bathroom.jpg'],
      startingPrice: '₹1,65,000',
      dimensions: '10ft x 8ft Ensuite Bathroom (Customizable)',
      finishType: 'Natural Walnut Fluted Panelling + Honed Marble Slabs + Matte Black Trim',
      features: [
        'Curved asymmetrical black-framed vanity mirror with ambient edge lighting',
        'Floating walnut finish vanity with integrated undermount plumbing and marble counter',
        'Walk-in frameless glass shower zone with thermostatic rain head and recessed niches',
        'Wall-hung rimless toilet with concealed dual-flush cistern'
      ],
      materials: ['Honed Natural Marble Tiles', 'Seasoned Walnut Timber', '10mm Saint-Gobain Toughened Glass', 'Matte Black Brassware'],
      highlights: [
        { icon: 'fa-solid fa-gem', title: 'Full Slab Marble Cladding', desc: 'Seamless large-format marble wall and floor tiles for easy maintenance.' },
        { icon: 'fa-solid fa-shower', title: 'Walk-In Shower Partition', desc: 'Frameless glass enclosure with linear concealed drainage.' },
        { icon: 'fa-solid fa-tree', title: 'Fluted Wood Accent Wall', desc: 'Moisture-sealed natural wood vertical fluting adds rich organic warmth.' }
      ]
    },
    {
      id: 'sage-green-fluted-spa',
      title: 'Olive Green & Italian Marble Floating Vanity',
      category: 'modern-vanity',
      categoryLabel: 'Sage & Calacatta Spa',
      shortDesc: 'Floating dual-drawer vanity with Calacatta marble slab, sage green vertical fluted accent wall, pill mirror, and concealed storage niche.',
      tag: 'Trending Style',
      image: '/bathrooms/sage-green-fluted-spa-bathroom.jpg',
      galleryImages: ['/bathrooms/sage-green-fluted-spa-bathroom.jpg'],
      startingPrice: '₹1,45,000',
      dimensions: '9ft x 7ft Master Bathroom (Customizable)',
      finishType: 'Calacatta Veined Quartz + Sage Green Acrylic + Natural Oak Drawer Unit',
      features: [
        'Backlit fluted sage green accent wall with vertical capsule black vanity mirror',
        'Deep-drawer floating timber vanity with heavy-duty Blum soft-close runners',
        'Over-counter vessel sink with tall matte black pillar tap',
        'Built-in shower alcove with LED illuminated shampoo storage niches'
      ],
      materials: ['Calacatta Marble Quartz', 'BWP Marine Grade Plywood', 'Matte Sage Green Laminate', 'Matte Black PVD Hardware'],
      highlights: [
        { icon: 'fa-solid fa-sink', title: 'Artisan Vessel Basin', desc: 'Sleek thin-rim porcelain basin perched on a natural marble quartz top.' },
        { icon: 'fa-solid fa-cube', title: 'Illuminated Recessed Niches', desc: 'Built-in waterproof LED niches for clutter-free toiletry access.' },
        { icon: 'fa-solid fa-leaf', title: 'Sage Green Palette', desc: 'Biophilic natural tones paired with rich wood grains create spa harmony.' }
      ]
    },
    {
      id: 'terracotta-terrazzo-designer',
      title: 'Terracotta & Venetian Terrazzo Designer Suite',
      category: 'terrazzo-modern',
      categoryLabel: 'Artisan Terrazzo Suite',
      shortDesc: 'Warm terracotta fluted tile wall with custom terrazzo vanity slab, arched mirror, recessed backlit arch alcoves, and terrazzo walk-in shower.',
      tag: 'Architect Choice',
      image: '/bathrooms/terracotta-terrazzo-designer-bathroom.jpg',
      galleryImages: ['/bathrooms/terracotta-terrazzo-designer-bathroom.jpg'],
      startingPrice: '₹1,85,000',
      dimensions: '10ft x 8ft Designer Bathroom (Customizable)',
      finishType: 'Venetian Stone Terrazzo + Terracotta Fluted Ceramic + Warm 3000K Cove Lighting',
      features: [
        'Seamless Venetian stone terrazzo countertop with open towel shelf beneath',
        'Terracotta fluted subway tiles paired with soft backlit warm display alcoves',
        'Matching terrazzo feature wall inside the walk-in shower cubicle',
        'Arched black-rim mirror and wall-mounted minimalist matte black tapware'
      ],
      materials: ['Italian Aggregate Terrazzo Slabs', 'Terracotta Glazed Ceramic Tiles', 'Waterproof PU Coated Plywood', 'PVD Matte Black Fixtures'],
      highlights: [
        { icon: 'fa-solid fa-wand-magic-sparkles', title: 'Custom Terrazzo Slab', desc: 'Handcrafted multi-stone aggregate surface that is completely non-porous.' },
        { icon: 'fa-solid fa-lightbulb', title: 'Backlit Display Alcoves', desc: 'Integrated warm LED strips highlight luxury diffusers and bath amenities.' },
        { icon: 'fa-solid fa-palette', title: 'Warm Mediterranean Aesthetic', desc: 'Earthy terracotta hues combined with modern terrazzo for a bold boutique hotel feel.' }
      ]
    },
    {
      id: 'ocean-blue-marble-suite',
      title: 'Ocean Blue Marble & Fluted Vanity Suite',
      category: 'marble-spa',
      categoryLabel: 'Ocean Marble Luxury',
      shortDesc: 'Stunning bookmatched ocean blue veined marble shower, fluted blue vanity backdrop with backlit pill mirror, and floating timber vanity.',
      tag: 'Signature Design',
      image: '/bathrooms/ocean-blue-marble-fluted-bathroom.jpg',
      galleryImages: ['/bathrooms/ocean-blue-marble-fluted-bathroom.jpg'],
      startingPrice: '₹1,95,000',
      dimensions: '10ft x 8ft Ensuite (Customizable)',
      finishType: 'Imported Ocean Blue Marble + Fluted Panel + Calacatta Quartz Vanity',
      features: [
        'Bookmatched ocean blue marble feature wall in shower zone with gold veining',
        'Vertical pill mirror with 360-degree halo warm LED backlighting',
        'Dual-tier floating walnut vanity with open towel niche and marble quartz top',
        'Recessed LED illuminated shower shampoo niche with glass shelving'
      ],
      materials: ['Imported Ocean Blue Marble', 'Marine BWP Plywood', 'Matte Black Brass Diverters', '10mm Toughened Glass'],
      highlights: [
        { icon: 'fa-solid fa-gem', title: 'Ocean Marble Accent', desc: 'Vibrant natural blue stone with gold vein accents delivers an ultra-luxurious feel.' },
        { icon: 'fa-solid fa-lightbulb', title: 'Halo Pill Mirror', desc: 'Warm 3000K diffused LED halo creates soft, shadowless face illumination.' },
        { icon: 'fa-solid fa-shower', title: 'Black Thermostatic Shower', desc: 'Precision digital mixer with ceiling rainfall head and handheld spray.' }
      ]
    },
    {
      id: 'statuario-marble-soaking-tub-suite',
      title: 'Statuario Marble & Freestanding Soaking Tub Suite',
      category: 'marble-spa',
      categoryLabel: 'Grand Spa & Bathtub',
      shortDesc: 'Full Statuario marble cladding, architectural freestanding oval soaking bath, fluted wall panelling, and floating grey vanity with under-glow LED.',
      tag: 'Ultra Luxury',
      image: '/bathrooms/statuario-marble-soaking-tub-bathroom.jpg',
      galleryImages: ['/bathrooms/statuario-marble-soaking-tub-bathroom.jpg'],
      startingPrice: '₹2,40,000',
      dimensions: '12ft x 10ft Master Bathroom (Customizable)',
      finishType: 'Statuario Marble Cladding + Matte Stone Bathtub + Brushed Nickel Fixtures',
      features: [
        'Architectural freestanding acrylic stone-resin soaking tub overlooking window',
        'Soft floating grey dual-shutter vanity with warm floor-grazing night LED',
        'Integrated frameless walk-in rain shower partition with concealed linear drain',
        'Double-tier warm recessed wall niches for luxury toiletries'
      ],
      materials: ['Italian Statuario Marble Slabs', 'Stone Resin Bathtub', 'Brushed Nickel Fixtures', 'Moisture-Sealed Acoustic Fluting'],
      highlights: [
        { icon: 'fa-solid fa-bath', title: 'Freestanding Soaking Tub', desc: 'Ergonomic stone-resin bath retains heat longer for deep therapeutic soaks.' },
        { icon: 'fa-solid fa-expand', title: 'Panoramic Window View', desc: 'Bathtub positioned beside expansive window captures serene daytime light.' },
        { icon: 'fa-solid fa-moon', title: 'Floating Base LED Glow', desc: 'Subtle nightlight below vanity ensures comfort during late-night visits.' }
      ]
    },
    {
      id: 'biophilic-courtyard-atrium-suite',
      title: 'Biophilic Courtyard & Patterned Tile Spa Suite',
      category: 'wabi-sabi',
      categoryLabel: 'Open-Air Biophilic Spa',
      shortDesc: 'Mediterranean patterned geometric shower wall, open pebble-floored lightwell courtyard, round black mirror, and olive fluted vanity.',
      tag: 'Resort Inspired',
      image: '/bathrooms/biophilic-courtyard-patterned-bathroom.jpg',
      galleryImages: ['/bathrooms/biophilic-courtyard-patterned-bathroom.jpg'],
      startingPrice: '₹2,10,000',
      dimensions: '13ft x 9ft Villa Bathroom (Customizable)',
      finishType: 'Geometric Artisan Tiles + Teak Pergola Skylight + Terrazzo Counter',
      features: [
        'Private glass-enclosed indoor garden atrium with white river stones and timber pergola',
        'Artisan Mediterranean geometric ceramic shower wall cladding',
        'Large circular vanity mirror with sage green vertical fluted backing',
        'Custom terrazzo vanity slab with sage green handleless drawer console'
      ],
      materials: ['Hand-Pressed Patterned Tiles', 'Natural White Pebbles', 'Burma Teak Pergola', 'Multi-Aggregate Terrazzo'],
      highlights: [
        { icon: 'fa-solid fa-sun', title: 'Open Atrium Lightwell', desc: 'Pours natural daylight into the bathroom creating a tropical resort ambience.' },
        { icon: 'fa-solid fa-leaf', title: 'Biophilic Indoor Garden', desc: 'Seamless integration of lush greenery and stones enhances mindfulness.' },
        { icon: 'fa-solid fa-shapes', title: 'Artisan Tile Geometry', desc: 'Distinctive Mediterranean pattern brings artisanal character to the shower space.' }
      ]
    },
    {
      id: 'charcoal-quartz-walnut-suite',
      title: 'Charcoal Quartz & Natural Walnut Fluted Suite',
      category: 'modern-vanity',
      categoryLabel: 'Modern Walnut Luxury',
      shortDesc: 'Rich natural walnut fluted accent wall, charcoal marble-textured quartz vanity, circular mirror, and grey stone walk-in shower with illuminated niches.',
      tag: 'Architect Choice',
      image: '/bathrooms/charcoal-quartz-walnut-bathroom.jpg',
      galleryImages: ['/bathrooms/charcoal-quartz-walnut-bathroom.jpg'],
      startingPrice: '₹1,55,000',
      dimensions: '11ft x 8ft Ensuite Bathroom (Customizable)',
      finishType: 'Solid Walnut Fluting + Dark Charcoal Marble Quartz + Matte Black Fittings',
      features: [
        'Full-height natural walnut fluted feature wall with moisture-resistant PU coat',
        'Floating dual-drawer vanity with seamless charcoal quartz stone countertop',
        'Spacious walk-in glass shower enclosure with floor-to-ceiling dark grey stone',
        'Recessed shower wall niche with warm integrated LED lighting'
      ],
      materials: ['Solid American Walnut', 'Charcoal Engineered Quartz', 'Matte Black PVD Hardware', 'Anti-Skid Honed Floor Tiles'],
      highlights: [
        { icon: 'fa-solid fa-circle', title: 'Frameless Circular Mirror', desc: 'Minimalist circle mirror reflects ample daylight from the picture window.' },
        { icon: 'fa-solid fa-water', title: 'Non-Porous Charcoal Top', desc: 'Scratch and stain resistant engineered quartz that stays immaculate.' },
        { icon: 'fa-solid fa-tree', title: 'Warm Timber Contrast', desc: 'Walnut vertical slats break the coolness of grey stone with cozy warmth.' }
      ]
    },
    {
      id: 'brushed-gold-terrazzo-beige-suite',
      title: 'Warm Beige & Brushed Gold Terrazzo Suite',
      category: 'terrazzo-modern',
      categoryLabel: 'Brushed Gold & Terrazzo',
      shortDesc: 'Golden beige vertical tiles, full Venetian terrazzo floor and shower alcove, brushed gold hardware, and arched backlit vanity mirror.',
      tag: 'Boutique Hotel',
      image: '/bathrooms/brushed-gold-terrazzo-beige-bathroom.jpg',
      galleryImages: ['/bathrooms/brushed-gold-terrazzo-beige-bathroom.jpg'],
      startingPrice: '₹1,75,000',
      dimensions: '10ft x 8ft Master Bathroom (Customizable)',
      finishType: 'Venetian Terrazzo + Warm Beige Glazed Tiles + PVD Brushed Brassware',
      features: [
        'Warm golden beige vertical stacked subway tiles with matching arched LED mirror',
        'Continuous Venetian terrazzo flooring flowing smoothly into the walk-in shower',
        'PVD coated brushed gold rainfall shower system and gold basin mixer tap',
        'Floating bleached natural oak drawer vanity with integrated seamless ceramic basin'
      ],
      materials: ['Venetian Terrazzo Slabs', 'Glazed Beige Stacked Tiles', 'Brushed PVD Brassware', 'Bleached Oak Moisture-Resistant Plywood'],
      highlights: [
        { icon: 'fa-solid fa-crown', title: 'PVD Brushed Gold Hardware', desc: 'Premium tarnish-free champagne brass fittings resist water marks and wear.' },
        { icon: 'fa-solid fa-archway', title: 'Arched Halo Vanity Mirror', desc: 'Gentle arch silhouette with warm perimeter glow creates a soothing aura.' },
        { icon: 'fa-solid fa-wand-magic-sparkles', title: 'Continuous Terrazzo Flow', desc: 'Single terrazzo plane from floor to shower eliminates visual breaks.' }
      ]
    }
  ];

  readonly filteredBathrooms = computed(() => {
    const cat = this.activeCategory();
    const query = this.searchQuery().toLowerCase().trim();

    return this.bathrooms.filter(item => {
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

  openDetailModal(item: BathroomItem): void {
    this.selectedBathroom.set(item);
    this.modalActiveImage.set(item.galleryImages[0] || item.image);
    this.isDetailModalOpen.set(true);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  closeDetailModal(): void {
    this.isDetailModalOpen.set(false);
    this.selectedBathroom.set(null);
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
