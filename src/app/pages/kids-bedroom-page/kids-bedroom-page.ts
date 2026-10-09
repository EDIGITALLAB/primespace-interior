import { Component, OnInit, OnDestroy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConsultationModalService } from '../../services/consultation-modal.service';

export interface KidsRoomItem {
  id: string;
  title: string;
  category: 'bunk-trundle' | 'study-storage' | 'play-montessori' | 'teen-study' | 'theme-rooms';
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
    headboardWall?: string;
    bedStorage: string;
    studyStation: string;
    wardrobeToys: string;
    accessories: string[];
  };
  highlights: { icon: string; title: string; desc: string }[];
}

export interface KidsMaterialOption {
  name: string;
  type: string;
  image: string;
  description: string;
  durability: string;
  badge: string;
}

export interface KidsFaq {
  question: string;
  answer: string;
  isOpen?: boolean;
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

  // Selected kids room item for modal
  readonly selectedRoom = signal<KidsRoomItem | null>(null);
  readonly isDetailModalOpen = signal<boolean>(false);
  readonly modalActiveImage = signal<string>('');

  // Lightbox for gallery images
  readonly lightboxImage = signal<string | null>(null);

  // Kids Room Items Database
  readonly rooms: KidsRoomItem[] = [
    {
      id: 'pastel-modular-bunk-study-suite',
      title: 'Pastel Modular Loft Bunk & Study Suite',
      category: 'bunk-trundle',
      categoryLabel: 'Bunk & Loft Suite',
      shortDesc: 'Dual-tier space-saving loft bunk with integrated storage staircase, ergonomic study desk, and playful pastel anti-scratch shutters.',
      tag: 'Best Seller',
      image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1000&auto=format&fit=crop',
      galleryImages: [
        'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1000&auto=format&fit=crop'
      ],
      startingPrice: '₹1,85,000',
      dimensions: '12ft x 11ft Kids Room (Customizable)',
      finishType: 'Zero-VOC Waterborne Matte PU + Pastel Laminate',
      features: [
        'Solid safety guardrails with rounded child-safe bevels',
        'Staircase with 4 hidden pull-out storage drawers for toys',
        'Under-loft study desk with integrated LED task lighting',
        'Certified non-toxic, lead-free and odorless finishes'
      ],
      materials: ['Century Marine Grade BWP 18mm', 'Non-Toxic Italian Sayerlack PU', 'Blum Soft-Close Dampers', 'High-Density Birch Rungs'],
      internalLayout: {
        bedStorage: 'Upper 3x6ft Loft Bed + Bottom 4x6ft Bed + Staircase Drawer Storage',
        studyStation: '4.5ft Integrated Study Desk with Pinboard & Book Ledges',
        wardrobeToys: 'Full-Height 2-Door Wardrobe with Low Child-Accessible Hanging Rails',
        accessories: ['Magnetic Chalkboard Panel', 'Concealed LED Study Light', 'Soft Foam Edge Bumpers']
      },
      highlights: [
        { icon: 'fa-solid fa-shield-halved', title: 'Child Safe Architecture', desc: '100% rounded corners and safety rails to protect growing kids.' },
        { icon: 'fa-solid fa-shapes', title: 'Dual Sleeping Capacity', desc: 'Accommodates two siblings or sleepovers without crowding the floor.' },
        { icon: 'fa-solid fa-leaf', title: 'Zero VOC Eco-Friendly', desc: 'Odor-free, child-friendly non-toxic Italian waterborne paints.' }
      ]
    },
    {
      id: 'scandinavian-trundle-bed-space-saver',
      title: 'Scandinavian 2-in-1 Trundle & Library Suite',
      category: 'study-storage',
      categoryLabel: 'Space-Saving Trundle',
      shortDesc: 'Clean Nordic single bed with pull-out concealed guest trundle, built-in display book ledge, and modular floating study station.',
      tag: 'Popular Choice',
      image: 'https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?q=80&w=1000&auto=format&fit=crop',
      galleryImages: [
        'https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1000&auto=format&fit=crop'
      ],
      startingPrice: '₹1,45,000',
      dimensions: '11ft x 10ft Room Setup (Customizable)',
      finishType: 'Natural Warm Oak Woodgrain + Matte Ivory',
      features: [
        'Smooth roll-out trundle bed on heavy-duty rubberized wheels',
        'Full-height headboard library with front-facing book ledges',
        'Spacious ergonomic study desk with cable organizer grommet',
        'Wipe-clean anti-stain matte laminates that resist sketch pens'
      ],
      materials: ['Greenply BWP Marine Hardwood Core', 'Anti-Bacterial Synchronized Laminates', 'Hafele Heavy Duty Trundle Rollers'],
      internalLayout: {
        bedStorage: 'Main Single Bed + Bottom Smooth Rolling Trundle Bed with Mattress',
        studyStation: '5ft Ergonomic Study Desk with 3 Drawers and Floating Open Shelves',
        wardrobeToys: '3-Door Multi-Tier Wardrobe with Adjustable Toy Shelves',
        accessories: ['Felt Acoustic Pinboard', 'Bookcase Reading Light Bar']
      },
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
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop',
      galleryImages: [
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000&auto=format&fit=crop'
      ],
      startingPrice: '₹2,20,000',
      dimensions: '14ft x 12ft Room Layout (Customizable)',
      finishType: 'Thermal Matte Graphite + Natural Walnut & Metal Trims',
      features: [
        'Heavy-duty 6ft study and dual-screen workspace with power trunking',
        'Acoustic felt wall slats for noise isolation and sound focus',
        'Hydraulic queen-size storage bed frame with tufted headboard',
        'Smart app-controlled RGB ambient backlighting'
      ],
      materials: ['IS 710 Marine BWP Core', 'PET Acoustic Sound Slats', 'Fenix Matte Anti-Scratch Laminate', 'Blum Soft Glides'],
      internalLayout: {
        bedStorage: 'Queen Size Hydraulic Storage Bed (800L Capacity)',
        studyStation: '6ft Ergonomic Desk + Cable Tray + Magnetic Pegboard Wall',
        wardrobeToys: 'Full-Height Sliding Wardrobe with Smoked Mirror Shutter',
        accessories: ['Smart App Halo RGB Lighting', 'Headphone & Backpack Pegs', 'Integrated Power Hub']
      },
      highlights: [
        { icon: 'fa-solid fa-laptop-code', title: 'Focus Study Hub', desc: 'Engineered for high school studies, online classes, and PC gaming.' },
        { icon: 'fa-solid fa-headphones', title: 'Acoustic Wall Slatting', desc: 'Dampens room echo for study focus and online conversations.' },
        { icon: 'fa-solid fa-bolt', title: 'Built-in Power & Ports', desc: 'Integrated cable management and USB-C fast charging stations.' }
      ]
    },
    {
      id: 'montessori-toddler-play-suite',
      title: 'Montessori Toddler House Bed & Play Suite',
      category: 'play-montessori',
      categoryLabel: 'Montessori & Toddler',
      shortDesc: 'Low-floor wooden house frame bed fostering child independence, low-height open toy cubbies, and integrated soft activity rug zone.',
      tag: 'Toddler Sanctuary',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000&auto=format&fit=crop',
      galleryImages: [
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1000&auto=format&fit=crop'
      ],
      startingPrice: '₹1,60,000',
      dimensions: '12ft x 10ft Play Room (Customizable)',
      finishType: 'Natural Solid Pine & Beechwood + Matte Pastel White',
      features: [
        'Floor-level house bed frame allowing toddlers to safely enter and exit',
        'Low-level toy storage bins allowing self-directed tidy up',
        'Integrated sensory activity board and magnetic chalkboard',
        '100% organic, non-toxic water-based clear wood coats'
      ],
      materials: ['Solid European Pine Wood', 'Eco-Certified Marine Plywood', 'Natural Organic Wax Finish'],
      internalLayout: {
        bedStorage: 'Low Floor House Canopy Bed Frame with Floor Slat Base',
        studyStation: 'Low-Height Toddler Activity Table with 2 Animal Chairs',
        wardrobeToys: 'Open Montessori Low Cubby Storage with Cotton Canvas Bins',
        accessories: ['Wooden Rocking Toy Alcove', 'Magnetic Whiteboard & Drawing Roll']
      },
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
      tag: 'Architectural Style',
      image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=1000&auto=format&fit=crop',
      galleryImages: [
        'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop'
      ],
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
      internalLayout: {
        headboardWall: 'Capsule Pod Headboard with Touch Glow Lighting',
        bedStorage: 'Single Bed with 3-Drawer Sliding Under-Bed Chest',
        studyStation: 'Ergonomic Mission Control Study Station with Storage Hutch',
        wardrobeToys: 'Full Height 3-Door Space Capsule Wardrobe',
        accessories: ['Starry Night Ceiling Panel', 'Constellation Wall Art', 'Space Capsule Display Niche']
      },
      highlights: [
        { icon: 'fa-solid fa-star', title: 'Fiber-Optic Constellations', desc: 'Twinkling starry night ceiling for magical bedtime stories.' },
        { icon: 'fa-solid fa-rocket', title: 'Custom Themed Millwork', desc: 'Sparks boundless imagination and scientific curiosity.' },
        { icon: 'fa-solid fa-shield-halved', title: 'Long-Lasting Durability', desc: 'Built to transition gracefully as the child grows into teens.' }
      ]
    },
    {
      id: 'princess-blush-arch-suite',
      title: 'Blush & Gold Classical Arch Princess Suite',
      category: 'theme-rooms',
      categoryLabel: 'Classical Arch Princess Suite',
      shortDesc: 'Elegantly sculpted blush pink and ivory bedroom with fluted headboard arches, princess vanity mirror with warm Hollywood bulbs, and walk-in closet.',
      tag: 'Luxury Signature',
      image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=1000&auto=format&fit=crop',
      galleryImages: [
        'https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1000&auto=format&fit=crop'
      ],
      startingPrice: '₹2,15,000',
      dimensions: '13ft x 11ft Suite (Customizable)',
      finishType: 'Blush Rose Satin PU + Brushed Champagne Gold Hardware',
      features: [
        'Triple-arch upholstered headboard with soft stain-resistant velvet',
        'Dedicated dressing vanity with illuminated Hollywood bulb mirror',
        'Floor-to-ceiling wardrobe with French boiserie detailing',
        'Under-bed easy lift hydraulic storage system'
      ],
      materials: ['High-Density BWP Marine Core', 'Stain-Proof Soft Velvet', 'Italian PU Satin Coating', 'Solid Brass Handles'],
      internalLayout: {
        headboardWall: 'Triple Arch Moulding Wall with Concealed Backlit Glow',
        bedStorage: 'Single Bed with Hydraulic Lift-Up Mechanism',
        studyStation: 'Combined Vanity & Study Ledge with Rose Gold Details',
        wardrobeToys: 'Full-Height 3-Door Wardrobe with Velvet Lined Drawers',
        accessories: ['Hollywood Bulb Vanity Mirror', 'Arch Bookshelf Niches']
      },
      highlights: [
        { icon: 'fa-solid fa-wand-magic-sparkles', title: 'Fairytale Aesthetics', desc: 'Timeless French arches in soothing blush and cream tones.' },
        { icon: 'fa-solid fa-mirror', title: 'Hollywood Vanity Mirror', desc: 'Warm LED bulbs provide perfect lighting for dressing and study.' },
        { icon: 'fa-solid fa-gem', title: 'Champagne Gold Accents', desc: 'Subtle metallic trims add a delicate touch of luxury.' }
      ]
    }
  ];

  // Category Filter Tabs
  readonly categories = [
    { id: 'all', label: 'All Kids Rooms', icon: 'fa-solid fa-border-all' },
    { id: 'bunk-trundle', label: 'Bunk & Trundle Beds', icon: 'fa-solid fa-shapes' },
    { id: 'study-storage', label: 'Study & Storage', icon: 'fa-solid fa-book-open' },
    { id: 'teen-study', label: 'Teen Bedrooms', icon: 'fa-solid fa-laptop-code' },
    { id: 'play-montessori', label: 'Montessori Toddler', icon: 'fa-solid fa-child-reaching' },
    { id: 'theme-rooms', label: 'Thematic Suites', icon: 'fa-solid fa-star' }
  ];

  // Material Matrix Data
  readonly materials: KidsMaterialOption[] = [
    {
      name: 'IS 710 Marine Grade BWP Plywood',
      type: 'Bed Frame & Loft Carcass',
      image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=600&auto=format&fit=crop',
      description: '100% boiling waterproof marine grade core that withstands heavy climbing, jumping, and liquid spills with zero warping.',
      durability: '25+ Years Lifetime Core',
      badge: 'Unbreakable Core'
    },
    {
      name: 'Zero-VOC Waterborne Italian PU Paints',
      type: 'Child-Safe Non-Toxic Coating',
      image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=600&auto=format&fit=crop',
      description: 'Certified EN71-3 child-safe coatings with zero volatile organic compounds, lead-free and 100% odorless.',
      durability: 'Safe & Odorless',
      badge: 'Certified Child-Safe'
    },
    {
      name: 'Anti-Stain & Anti-Scratch Thermal Laminates',
      type: 'Study Desks & Shutters',
      image: 'https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?q=80&w=600&auto=format&fit=crop',
      description: 'High-durability laminate surfaces that wipe clean with a wet cloth even after permanent marker or watercolor mishaps.',
      durability: 'Stain & Crayon Resistant',
      badge: 'Wipe-Clean'
    },
    {
      name: 'German Blum & Hafele Soft-Close Hardware',
      type: 'Anti-Pinch Hinges & Drawers',
      image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=600&auto=format&fit=crop',
      description: 'Gentle deceleration dampers prevent little fingers from getting pinched when doors or drawers shut quickly.',
      durability: 'Anti-Pinch Safety',
      badge: 'Finger-Safe Damping'
    }
  ];

  // 5-Step Process
  readonly designSteps = [
    {
      number: '01',
      title: 'Growth & Ergonomic Space Planning',
      desc: 'Our designers calculate child height, study posture, and future growth milestones to create a bedroom that adapts from ages 4 to 16.',
      icon: 'fa-solid fa-ruler-combined'
    },
    {
      number: '02',
      title: '3D Thematic Visualisation & Colors',
      desc: 'See photorealistic 3D renders with exact theme wallpapers, study tables, bunk layouts, and certified child-safe materials.',
      icon: 'fa-solid fa-cubes'
    },
    {
      number: '03',
      title: 'German CNC Beveled Edge Fabrication',
      desc: 'All panels and rungs are machined with rounded radii and safety bevels in our robotic factory for maximum child safety.',
      icon: 'fa-solid fa-industry'
    },
    {
      number: '04',
      title: 'Dust-Free On-Site Assembly (2 Days)',
      desc: 'Pre-finished modular units are mounted swiftly with zero on-site painting odor or toxic sawdust.',
      icon: 'fa-solid fa-screwdriver-wrench'
    },
    {
      number: '05',
      title: '10-Year Warranty & Growth Support',
      desc: 'Digital 10-year warranty covering joinery, ladder rungs, hinges, and drawer runners with free annual safety checkups.',
      icon: 'fa-solid fa-shield-halved'
    }
  ];

  // FAQ Accordion
  readonly faqs: KidsFaq[] = [
    {
      question: 'Are the materials and paints used completely safe for kids and toddlers?',
      answer: 'Yes, 100%! We exclusively use certified EN71-3 compliant European waterborne paints and natural wood oils that contain zero VOCs, zero lead, and zero harmful chemicals. Surfaces are completely odorless and non-toxic even if toddlers explore with touch and mouth.',
      isOpen: true
    },
    {
      question: 'Can the room design adapt as my child grows into their teenage years?',
      answer: 'Yes! Our modular furniture features adjustable-height study desks, removable bunk ladders, and modular shelving that can be reconfigured effortlessly as your child transitions into high school.',
      isOpen: false
    },
    {
      question: 'How do you ensure bunk bed and ladder safety?',
      answer: 'Our bunk beds follow international safety standards: 450mm high continuous guardrails, wide anti-slip ladder rungs with recessed hand grips, heavy-duty 250kg weight payload capacity, and rounded corner profiles.',
      isOpen: false
    },
    {
      question: 'Are the study desk and wardrobe surfaces resistant to sketch pens and stains?',
      answer: 'Yes! We use high-pressure thermal laminates and PU finishes that are resistant to crayons, sketch pens, and liquid spills. A simple wipe with a damp microfiber cloth cleans surfaces instantly without discoloration.',
      isOpen: false
    },
    {
      question: 'What is the standard execution timeline for a Kids Bedroom?',
      answer: 'From 3D design approval, factory precision fabrication takes 16-20 days. Clean, dust-free on-site installation is completed in just 2 working days.',
      isOpen: false
    }
  ];

  // Filtered Rooms computed signal
  readonly filteredRooms = computed(() => {
    const cat = this.activeCategory();
    const query = this.searchQuery().trim().toLowerCase();

    return this.rooms.filter(item => {
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

  openDetailModal(item: KidsRoomItem): void {
    this.selectedRoom.set(item);
    this.modalActiveImage.set(item.galleryImages[0] || item.image);
    this.isDetailModalOpen.set(true);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  closeDetailModal(): void {
    this.isDetailModalOpen.set(false);
    this.selectedRoom.set(null);
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
