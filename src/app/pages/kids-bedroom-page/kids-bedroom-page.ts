import { Component, OnInit, OnDestroy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConsultationModalService } from '../../services/consultation-modal.service';

export interface KidsRoomItem {
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
  selector: 'app-kids-bedroom-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './kids-bedroom-page.html',
  styleUrl: './kids-bedroom-page.css'
})
export class KidsBedroomPage implements OnInit, OnDestroy {
  private consultationModalService = inject(ConsultationModalService);

  // Active category filter
  readonly activeCategory = signal<string>('all');
  
  // Search query
  readonly searchQuery = signal<string>('');

  // Selected item for modal
  readonly selectedKidsRoom = signal<KidsRoomItem | null>(null);
  readonly isDetailModalOpen = signal<boolean>(false);
  readonly modalActiveImage = signal<string>('');

  // Lightbox for zoom
  readonly lightboxImage = signal<string | null>(null);

  // Kids Room Database
  readonly kidsRooms: KidsRoomItem[] = [
    {
      id: 'pastel-modular-bunk-study-suite',
      title: 'Pastel Modular Loft Bunk & Study Suite',
      category: 'bunk-loft',
      categoryLabel: 'Bunk & Loft Suite',
      shortDesc: 'Dual-tier space-saving loft bunk with integrated storage staircase, ergonomic study desk, and playful pastel anti-scratch shutters.',
      tag: 'Best Seller',
      image: '/kids/pastel-scandi-loft-kids.jpg',
      galleryImages: ['/kids/pastel-scandi-loft-kids.jpg'],
      startingPrice: '₹1,85,000',
      dimensions: '12ft x 11ft Kids Bedroom (Customizable)',
      finishType: 'Zero-VOC Waterborne Matte PU + Anti-Scratch Pastel Laminate',
      features: [
        'Solid safety guardrails with rounded child-safe bevels',
        'Staircase with 4 hidden pull-out storage drawers for toys',
        'Under-loft study desk with integrated LED task lighting',
        'Certified non-toxic, lead-free and odorless finishes'
      ],
      materials: ['Century Marine Grade BWP 18mm', 'Non-Toxic Italian Sayerlack PU', 'Blum Soft-Close Dampers', 'High-Density Birch Rungs'],
      highlights: [
        { icon: 'fa-solid fa-shield-halved', title: 'Child Safe Architecture', desc: '100% rounded corners and safety rails to protect growing kids.' },
        { icon: 'fa-solid fa-shapes', title: 'Dual Sleeping Capacity', desc: 'Accommodates two siblings or sleepovers without crowding the floor.' },
        { icon: 'fa-solid fa-leaf', title: 'Zero VOC Eco-Friendly', desc: 'Odor-free, child-friendly non-toxic Italian waterborne paints.' }
      ]
    },
    {
      id: 'scandinavian-trundle-bed-space-saver',
      title: 'Scandinavian 2-in-1 Trundle & Library Suite',
      category: 'trundle-storage',
      categoryLabel: 'Space-Saving Trundle',
      shortDesc: 'Clean Nordic single bed with pull-out concealed guest trundle, built-in display book ledge, and modular floating study station.',
      tag: 'Popular Choice',
      image: '/kids/scandi-trundle-library-kids.jpg',
      galleryImages: ['/kids/scandi-trundle-library-kids.jpg'],
      startingPrice: '₹1,45,000',
      dimensions: '11ft x 10ft Room Setup (Customizable)',
      finishType: 'Natural Warm Oak Woodgrain + Matte Ivory',
      features: [
        'Smooth roll-out trundle bed on heavy-duty rubberized wheels',
        'Full-height headboard library with front-facing book ledges',
        'Spacious ergonomic study desk with cable organizer grommet',
        'Wipe-clean anti-stain matte laminates that resist sketch pens'
      ],
      materials: ['Greenply BWP Marine Hardwood Core', 'Anti-Bacterial Synchronized Laminates', 'Hafele Heavy Duty Trundle Rollers', 'German Soft-Close Hinges'],
      highlights: [
        { icon: 'fa-solid fa-arrows-left-right', title: 'Smooth Trundle Rollout', desc: 'Rolls out silently for cousins and sleepover guests in seconds.' },
        { icon: 'fa-solid fa-book-open', title: 'Montessori Book Wall', desc: 'Front-facing covers encourage independent reading habits.' },
        { icon: 'fa-solid fa-brush', title: 'Wipe-Clean Surfaces', desc: 'Resists crayon, water paint, and marker stains effortlessly.' }
      ]
    },
    {
      id: 'modern-teen-ergonomic-study-suite',
      title: 'Modern Teen Ergonomic Study & Gamer Suite',
      category: 'teen-study',
      categoryLabel: 'Teen Study & Gaming',
      shortDesc: 'Designed for teenagers with 6ft dual-monitor study setup, acoustic slate grey wall slats, RGB ambient halo lights, and hydraulic storage bed.',
      tag: 'Modern Teen Luxury',
      image: '/kids/modern-teen-ergonomic-study.jpg',
      galleryImages: ['/kids/modern-teen-ergonomic-study.jpg'],
      startingPrice: '₹2,20,000',
      dimensions: '14ft x 12ft Teen Room (Customizable)',
      finishType: 'Thermal Matte Graphite + Natural Walnut & Metal Trims',
      features: [
        'Heavy-duty 6ft study and dual-screen workspace with power trunking',
        'Acoustic felt wall slats for noise isolation and sound focus',
        'Hydraulic queen-size storage bed frame with tufted headboard',
        'Smart app-controlled RGB ambient backlighting'
      ],
      materials: ['IS 710 Marine BWP Core', 'PET Acoustic Sound Slats', 'Fenix Matte Anti-Scratch Laminate', 'Blum Soft Glides'],
      highlights: [
        { icon: 'fa-solid fa-laptop-code', title: 'Focus Study Hub', desc: 'Engineered for high school studies, online classes, and PC gaming.' },
        { icon: 'fa-solid fa-headphones', title: 'Acoustic Wall Slatting', desc: 'Dampens room echo for study focus and online conversations.' },
        { icon: 'fa-solid fa-bolt', title: 'Built-in Power & Ports', desc: 'Integrated cable management and USB-C fast charging stations.' }
      ]
    },
    {
      id: 'montessori-toddler-play-suite',
      title: 'Montessori Toddler House Bed & Play Suite',
      category: 'montessori',
      categoryLabel: 'Montessori & Toddler',
      shortDesc: 'Low-floor wooden house frame bed fostering child independence, low-height open toy cubbies, and integrated soft activity rug zone.',
      tag: 'Toddler Sanctuary',
      image: '/kids/montessori-natural-wood-suite.jpg',
      galleryImages: ['/kids/montessori-natural-wood-suite.jpg'],
      startingPrice: '₹1,60,000',
      dimensions: '12ft x 10ft Play Room (Customizable)',
      finishType: 'Natural Solid Pine & Beechwood + Matte Pastel White',
      features: [
        'Floor-level house bed frame allowing toddlers to safely enter and exit',
        'Low-level toy storage bins allowing self-directed tidy up',
        'Integrated sensory activity board and magnetic chalkboard',
        '100% organic, non-toxic water-based clear wood coats'
      ],
      materials: ['Solid European Pine Wood', 'Eco-Certified Marine Plywood', 'Natural Organic Wax Finish', 'Non-Toxic Food-Grade Sealers'],
      highlights: [
        { icon: 'fa-solid fa-child-reaching', title: 'Independent Movement', desc: 'Zero fall risk floor bed empowers toddler confidence.' },
        { icon: 'fa-solid fa-cubes', title: 'Organized Toy Access', desc: 'Accessible shelving teaches children how to store and organize toys.' },
        { icon: 'fa-solid fa-tree', title: 'Solid Pine Wood Core', desc: 'Natural solid wood construction with smooth hand-sanded edges.' }
      ]
    },
    {
      id: 'celestial-space-explorer-suite',
      title: 'Celestial Space Explorer Themed Bedroom',
      category: 'theme-rooms',
      categoryLabel: 'Thematic Explorer Suite',
      shortDesc: 'Captivating cosmic midnight navy bedroom with fiber-optic starlight ceiling, rocket capsule headboard, and hidden treasure drawer chest.',
      tag: 'Architect Choice',
      image: '/kids/space-explorer-celestial-suite.jpg',
      galleryImages: ['/kids/space-explorer-celestial-suite.jpg'],
      startingPrice: '₹2,40,000',
      dimensions: '13ft x 12ft Room Layout (Customizable)',
      finishType: 'Midnight Indigo PU Satin + Glow-in-the-Dark Accents',
      features: [
        'Acoustic false ceiling with sparkling fiber-optic constellation stars',
        'Custom spacecraft pod shaped headboard with ambient backlit halo',
        'Modular wardrobe with planet-themed CNC handle cutouts',
        'Integrated telescope viewing alcove and wall bookshelf'
      ],
      materials: ['Century BWP Marine Plywood', 'Fiber Optic Lighting Kit', 'Italian Indigo PU Paint', 'Blum Motion Hinges'],
      highlights: [
        { icon: 'fa-solid fa-star', title: 'Fiber-Optic Constellations', desc: 'Twinkling starry night ceiling for magical bedtime stories.' },
        { icon: 'fa-solid fa-rocket', title: 'Custom Themed Millwork', desc: 'Sparks boundless imagination and scientific curiosity.' },
        { icon: 'fa-solid fa-shield-halved', title: 'Long-Lasting Durability', desc: 'Built to transition gracefully as the child grows into teens.' }
      ]
    },
    {
      id: 'twin-sibling-bunk-wardrobe-ensemble',
      title: 'Twin Sibling Dual Bunk & Wardrobe Ensemble',
      category: 'bunk-loft',
      categoryLabel: 'Twin Bunk & Wardrobe',
      shortDesc: 'Compact twin sibling configuration with reinforced solid bunk system, side study nook, and multi-compartment wardrobe storage.',
      tag: 'New Launch',
      image: '/kids/modular-bunk-study-suite.png',
      galleryImages: ['/kids/modular-bunk-study-suite.png'],
      startingPrice: '₹2,05,000',
      dimensions: '13ft x 11ft Sibling Room (Customizable)',
      finishType: 'Warm White & Soft Olive High-Pressure Laminate',
      features: [
        'Dual individual reading lights and USB points for both bunks',
        'Reinforced heavy-duty metal core internal ladder brackets',
        'Modular under-bed storage drawers with heavy-duty soft slides',
        'Twin study desks with magnetic memo and task boards'
      ],
      materials: ['Boiling Water Resistant Plywood', 'High-Pressure Anti-Fingerprint Laminate', 'Heavy Duty Steel Corner Connectors', 'Low-Noise Ball Bearing Drawers'],
      highlights: [
        { icon: 'fa-solid fa-people-roof', title: 'Twin Sibling Comfort', desc: 'Independent sleeping zones with personalized reading lights.' },
        { icon: 'fa-solid fa-boxes-stacked', title: 'Huge Under-Bed Storage', desc: 'Tucks extra blankets, school bags, and seasonal items neatly.' },
        { icon: 'fa-solid fa-wrench', title: 'Modular Convertible', desc: 'Can be detached into two independent single beds in the future.' }
      ]
    }
  ];

  readonly filteredKidsRooms = computed(() => {
    const cat = this.activeCategory();
    const query = this.searchQuery().toLowerCase().trim();

    return this.kidsRooms.filter(item => {
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

  openDetailModal(item: KidsRoomItem): void {
    this.selectedKidsRoom.set(item);
    this.modalActiveImage.set(item.galleryImages[0] || item.image);
    this.isDetailModalOpen.set(true);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  closeDetailModal(): void {
    this.isDetailModalOpen.set(false);
    this.selectedKidsRoom.set(null);
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
