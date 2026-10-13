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
      id: 'walnut-linear-chandelier-suite',
      title: 'Contemporary Walnut & Linear Chandelier Dining Suite',
      category: 'contemporary',
      categoryLabel: 'Contemporary Walnut',
      shortDesc: 'Solid American walnut dining table with black steel U-trestles, cream linen chairs, linear dome chandelier, and fluted credenza sideboard.',
      tag: 'Featured Suite',
      image: '/dining/walnut-linear-chandelier-dining.jpg',
      galleryImages: ['/dining/walnut-linear-chandelier-dining.jpg'],
      startingPrice: '₹1,95,000',
      dimensions: '15ft x 13ft Dining Hall (Customizable)',
      finishType: 'Solid American Walnut + Matte Black Powder Coated Steel + Brushed Brass Pendant',
      features: [
        'Solid kiln-dried American walnut tabletop with beveled organic chamfer edges',
        'Heavy-duty industrial matte black steel U-trestle leg support',
        'Curved ergonomic cream linen upholstered chairs with tapered timber legs',
        'Matching fluted walnut buffet sideboard credenza with push-to-open doors'
      ],
      materials: ['Grade-A American Walnut Wood', 'Powder-Coated Structural Steel', 'High-Resilience Linen Upholstery', 'Brushed Brass Chandelier'],
      highlights: [
        { icon: 'fa-solid fa-tree', title: 'Solid American Walnut', desc: 'Hand-selected rich continuous wood grain with natural satin protective finish.' },
        { icon: 'fa-solid fa-lightbulb', title: 'Linear Dome Chandelier', desc: 'Suspended 4-dome brass pendant distributes soft glare-free dining light.' },
        { icon: 'fa-solid fa-chair', title: 'Ergonomic Linen Seating', desc: 'High-density molded cushions designed for lingering dinner conversations.' }
      ]
    },
    {
      id: 'japandi-natural-oak-bench-suite',
      title: 'Japandi Natural Oak Dining & Bench Suite',
      category: 'japandi-minimal',
      categoryLabel: 'Japandi Minimal',
      shortDesc: 'Clean European white oak dining table with integrated matching bench seating, woven rattan pendant, and organic minimalist finish.',
      tag: 'Trending Style',
      image: '/dining/japandi-natural-oak-bench-dining.jpg',
      galleryImages: ['/dining/japandi-natural-oak-bench-dining.jpg'],
      startingPrice: '₹1,55,000',
      dimensions: '13ft x 11ft Dining Area (Customizable)',
      finishType: 'European White Oak Hardwood + Natural Hardwax Oil + Organic Woven Rattan',
      features: [
        'Space-efficient matching dining bench tucks neatly under table',
        'Child-friendly rounded tabletop corners and mortise-tenon joints',
        'Artisan hand-woven natural rattan dome pendant light fixture',
        'Non-toxic eco-friendly plant-based matte hardwax oil finish'
      ],
      materials: ['European White Oak Timber', 'Organic Woven Rattan', 'Water-Repellent Textured Bouclé', 'Food-Safe Matte Oil Seal'],
      highlights: [
        { icon: 'fa-solid fa-couch', title: 'Flexible Dining Bench', desc: 'Versatile seating option that opens up room walkways in modern apartments.' },
        { icon: 'fa-solid fa-sun', title: 'Artisan Rattan Shade', desc: 'Warm natural fiber pendant casts soothing textured ambient light.' },
        { icon: 'fa-solid fa-leaf', title: 'Zero-VOC Eco Polish', desc: 'Food-safe organic oils preserve the authentic velvety wood texture.' }
      ]
    },
    {
      id: 'solid-teak-arched-mirror-suite',
      title: 'Solid Burma Teak & Arched Mirror Dining Suite',
      category: 'wooden-classic',
      categoryLabel: 'Heritage Wood Craft',
      shortDesc: 'Seasoned Burma teak dining set with curved tub chairs, full-height white fluted paneling, arched mirror, and trio pendant luminaires.',
      tag: 'Heritage Craft',
      image: '/dining/solid-teak-arched-mirror-dining.jpg',
      galleryImages: ['/dining/solid-teak-arched-mirror-dining.jpg'],
      startingPrice: '₹1,85,000',
      dimensions: '14ft x 12ft Dining Room (Customizable)',
      finishType: 'Seasoned Burma Teak + Fluted Accent Wall + Low-VOC Honey Matte Polish',
      features: [
        '100% seasoned solid Burma teak timber with traditional mortise & tenon joinery',
        'Fluted vertical wall panel backdrop with decorative brass arched hanging mirror',
        'Graduated trio of black and clear fluted glass bell pendant lights',
        'Matching teak sideboard cabinet with spacious cutlery and dishware storage'
      ],
      materials: ['Grade-A Burma Teak Wood', 'Water-Resistant Fluted Wall Panels', 'Clear & Tinted Bell Glass', 'Stain-Resistant Seat Fabric'],
      highlights: [
        { icon: 'fa-solid fa-archway', title: 'Arched Vanity Mirror', desc: 'Brass-rimmed arched mirror reflects daylight and expands room depth.' },
        { icon: 'fa-solid fa-tree', title: 'Burma Teak Longevity', desc: 'Generational durability that develops a warm golden patina over time.' },
        { icon: 'fa-solid fa-gem', title: 'Trio Pendant Cluster', desc: 'Staggered drop pendants illuminate center table arrangements beautifully.' }
      ]
    },
    {
      id: 'architectural-fluted-partition-suite',
      title: 'Architectural Fluted Partition & Dining Suite',
      category: 'crockery-bar',
      categoryLabel: 'Partition & Dining Hub',
      shortDesc: 'Solid wood 6-seater dining table with floor-to-ceiling fluted room divider, warm illuminated display niches, and matte black dome pendants.',
      tag: 'Architect Choice',
      image: '/dining/architectural-fluted-partition-dining.jpg',
      galleryImages: ['/dining/architectural-fluted-partition-dining.jpg'],
      startingPrice: '₹2,15,000',
      dimensions: '16ft x 14ft Open Living & Dining (Customizable)',
      finishType: 'Warm Walnut Veneer + Architectural Fluted Slats + 3000K Diffused LED Niches',
      features: [
        'Floor-to-ceiling slatted room divider defining dining zone from living space',
        'Concealed warm LED cove-lit display niches for sculptures and glassware',
        'Substantial solid walnut 6-seater table with matching cushioned high-back chairs',
        'Trio of matte black and gold-interior pendant lamps centered over table'
      ],
      materials: ['Seasoned American Walnut', 'IS 710 Marine BWP Plywood', 'Aluminum Anodized Channels', 'Matte Black Spun Aluminum'],
      highlights: [
        { icon: 'fa-solid fa-bars', title: 'Fluted Divider Screen', desc: 'Creates subtle zone separation while maintaining airy open-plan sightlines.' },
        { icon: 'fa-solid fa-lightbulb', title: 'Illuminated Niches', desc: 'Warm 3000K concealed LED shelves dramatically showcase decor & plants.' },
        { icon: 'fa-solid fa-users', title: 'Spacious 6-Seater Setup', desc: 'Generous table proportions designed for comfortable everyday family dining.' }
      ]
    },
    {
      id: 'emerald-velvet-brass-statuario-suite',
      title: 'Italian Statuario Marble & Emerald Velvet Suite',
      category: 'marble-luxury',
      categoryLabel: 'Italian Marble Grandeur',
      shortDesc: 'Imported Statuario marble tabletop on brushed brass pedestal, emerald velvet bucket chairs, giant circular backlit halo mirror, and Sputnik brass chandelier.',
      tag: 'Best Seller',
      image: '/dining/emerald-velvet-brass-statuario-dining.jpg',
      galleryImages: ['/dining/emerald-velvet-brass-statuario-dining.jpg'],
      startingPrice: '₹2,65,000',
      dimensions: '16ft x 14ft Luxury Dining Suite (Customizable)',
      finishType: 'Italian Statuario Marble + Titanium PVD Brushed Brass + Velvet Upholstery',
      features: [
        'Nano-sealed imported Italian Statuario marble tabletop with chamfered edge',
        'Dual architectural cylindrical pedestal columns with titanium PVD brass coating',
        'Custom 8-light Sputnik brass chandelier paired with ambient 3000K lighting',
        'Large circular vanity mirror with integrated warm LED halo grazing marble wall'
      ],
      materials: ['Imported Italian Statuario Marble', 'Titanium PVD Coated Brass', 'Stain-Resistant Emerald Velvet', 'Saint-Gobain Mirror'],
      highlights: [
        { icon: 'fa-solid fa-gem', title: 'Statuario Marble Slab', desc: 'Hand-selected Italian marble with rich natural grey and gold veining.' },
        { icon: 'fa-solid fa-circle', title: 'Halo Circle Mirror', desc: 'Oversized backlit mirror expands visual volume and creates a hotel ambiance.' },
        { icon: 'fa-solid fa-chair', title: 'Emerald Velvet Seating', desc: 'Contoured lumbar support chairs upholstered in water-repellent luxury velvet.' }
      ]
    },
    {
      id: 'calacatta-marble-dual-halo-suite',
      title: 'Calacatta Marble & Dual-Halo Chandelier Suite',
      category: 'marble-luxury',
      categoryLabel: 'Modern Calacatta Luxury',
      shortDesc: 'Calacatta marble dining table on twin marble pedestal pillars, suspended dual-ring halo LED chandelier, and illuminated crockery display wall.',
      tag: 'Ultra Luxury',
      image: '/dining/calacatta-marble-dual-halo-dining.jpg',
      galleryImages: ['/dining/calacatta-marble-dual-halo-dining.jpg'],
      startingPrice: '₹2,45,000',
      dimensions: '15ft x 13ft Open Dining & Kitchen (Customizable)',
      finishType: 'Bookmatched Calacatta Marble + Warm Oak Display Shelving + Brushed Gold Halo Rings',
      features: [
        'Full-slab Calacatta marble dining table with solid marble monolithic legs',
        'Sculptural overlapping circular LED ring chandelier suspended in brushed brass',
        'Full-height integrated crockery display unit with warm diffused backlighting',
        'Ergonomic grey tailored upholstered chairs with solid walnut wood legs'
      ],
      materials: ['Calacatta Gold Marble Slab', 'IS 710 Marine Plywood Display', 'Integrated 3000K LED Strips', 'High-Resilience Fabric Cushions'],
      highlights: [
        { icon: 'fa-solid fa-ring', title: 'Dual-Ring Halo Chandelier', desc: 'Concentric warm glowing LED rings cast a modern architectural presence.' },
        { icon: 'fa-solid fa-gem', title: 'Monolithic Marble Legs', desc: 'Sculpted marble pillar legs provide rock-solid stability and clean lines.' },
        { icon: 'fa-solid fa-wine-glass', title: 'Illuminated Crockery Wall', desc: 'Backlit glass shelves showcase crystal stemware and collectible pottery.' }
      ]
    },
    {
      id: 'architectural-staircase-teak-suite',
      title: 'Architectural Duplex Staircase & Teak Suite',
      category: 'contemporary',
      categoryLabel: 'Duplex Architectural Dining',
      shortDesc: 'Solid teakwood dining table beside a floating glass-railing staircase, linear black bar pendant, and cream high-back upholstered dining chairs.',
      tag: 'Duplex Special',
      image: '/dining/architectural-staircase-teak-dining.jpg',
      galleryImages: ['/dining/architectural-staircase-teak-dining.jpg'],
      startingPrice: '₹2,20,000',
      dimensions: '16ft x 14ft Duplex Dining Zone (Customizable)',
      finishType: 'Solid Teakwood Timber + Saint-Gobain Glass Railings + Matte Black Bar Luminaire',
      features: [
        'Positioned seamlessly beside architectural floating open-riser staircase',
        'Substantial solid teak dining tabletop supported by twin structural teak pedestals',
        'Minimalist matte black linear LED pendant offering continuous shadowless light',
        'Six tailored high-back dining chairs with stain-resistant oatmeal upholstery'
      ],
      materials: ['Grade-A Natural Teakwood', '12mm Toughened Glass Balustrades', 'Structural Architectural Steel', 'Oatmeal Linen Fabric'],
      highlights: [
        { icon: 'fa-solid fa-stairs', title: 'Duplex Staircase Harmony', desc: 'Crafted to align with double-height villa staircases and open layouts.' },
        { icon: 'fa-solid fa-grip-lines', title: 'Minimalist Light Bar', desc: 'Slim architectural luminaire illuminates without obstructing line-of-sight.' },
        { icon: 'fa-solid fa-shield-halved', title: 'Heavy Teak Pedestal', desc: 'Solid wood twin-pedestal design maximizes comfortable chair placement.' }
      ]
    },
    {
      id: 'garden-patio-live-edge-suite',
      title: 'Garden Patio Live-Edge Timber & Bench Suite',
      category: 'japandi-minimal',
      categoryLabel: 'Indoor-Outdoor Dining',
      shortDesc: 'Substantial live-edge timber dining table with matching cushioned bench and leather bucket chairs facing garden patio sliding doors.',
      tag: 'Patio Living',
      image: '/dining/garden-patio-live-edge-dining.jpg',
      galleryImages: ['/dining/garden-patio-live-edge-dining.jpg'],
      startingPrice: '₹1,95,000',
      dimensions: '16ft x 12ft Patio View Dining (Customizable)',
      finishType: 'Natural Live-Edge Hardwood + Black Steel Trestles + Leather & Linen Seating',
      features: [
        'Expansive live-edge solid hardwood table with natural bark contours preserved',
        'Full-length matching dining bench with upholstered seat cushion for family seating',
        'Floor-to-ceiling glass sliding door integration capturing garden sunshine',
        'Twin matte black spun aluminum dome pendant lights with gold inner lining'
      ],
      materials: ['Seasoned Live-Edge Hardwood', 'Powder-Coated Steel Trestles', 'Premium Saddle Brown Leatherette', 'Toughened Patio Glass'],
      highlights: [
        { icon: 'fa-solid fa-tree', title: 'Authentic Live-Edge Slab', desc: 'Celebrates raw organic wood grain edges with a silky food-safe polyurethane seal.' },
        { icon: 'fa-solid fa-sun', title: 'Garden Sunlight Access', desc: 'Optimized orientation maximizes scenic green views and fresh airflow.' },
        { icon: 'fa-solid fa-users', title: 'Versatile Bench Seating', desc: 'Cushioned long bench easily seats 3-4 children or guests comfortably.' }
      ]
    },
    {
      id: 'heritage-oak-round-table-suite',
      title: 'Heritage Oak Round Table & Breakfast Bar Suite',
      category: 'wooden-classic',
      categoryLabel: 'Classic Oak Dining',
      shortDesc: 'Round oak dining table with sage leatherette spindle chairs, integrated kitchen bar counter with wine rack storage, and country cottage charm.',
      tag: 'Cozy Family',
      image: '/dining/heritage-oak-round-table-dining.jpg',
      galleryImages: ['/dining/heritage-oak-round-table-dining.jpg'],
      startingPrice: '₹1,60,000',
      dimensions: '13ft x 12ft Kitchen Dining (Customizable)',
      finishType: 'Solid Natural Oak + Sage Green Upholstery + Built-in Wine Grid Counter',
      features: [
        'Space-saving 4-6 seater circular oak dining table with central turned pedestal',
        'Matching solid wood chairs with wipe-clean sage green leatherette seat cushions',
        'Connected kitchen serving counter with integrated 24-bottle horizontal wine grid',
        'Warm recessed ceiling downlights and ambient kitchen cove illumination'
      ],
      materials: ['Solid Seasoned Oak Wood', 'Sage Green Wipe-Clean Leatherette', 'Granite Serving Countertop', 'IS 710 Plywood Base'],
      highlights: [
        { icon: 'fa-solid fa-circle-dot', title: 'Intimate Round Table', desc: 'Facilitates comfortable eye contact and flowing conversations for all diners.' },
        { icon: 'fa-solid fa-wine-bottle', title: 'Integrated Wine Rack', desc: 'Counter-front wine grid keeps vintage bottles properly angled and close at hand.' },
        { icon: 'fa-solid fa-utensils', title: 'Breakfast Bar Transition', desc: 'Direct access between kitchen prep island and dining table for effortless serving.' }
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
