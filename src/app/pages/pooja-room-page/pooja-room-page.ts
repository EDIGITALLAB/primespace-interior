import { Component, OnInit, OnDestroy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConsultationModalService } from '../../services/consultation-modal.service';

export interface PoojaRoomItem {
  id: string;
  title: string;
  category: 'cnc-jaali' | 'teak-wood' | 'marble-onyx' | 'wall-hung' | 'traditional-carved';
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
    mandirSanctum: string;
    storageDiya: string;
    ceilingLighting: string;
    accessories: string[];
  };
  highlights: { icon: string; title: string; desc: string }[];
}

export interface PoojaMaterialOption {
  name: string;
  type: string;
  image: string;
  description: string;
  durability: string;
  badge: string;
}

export interface PoojaFaq {
  question: string;
  answer: string;
  isOpen?: boolean;
}

@Component({
  selector: 'app-pooja-room-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './pooja-room-page.html',
  styleUrl: './pooja-room-page.css'
})
export class PoojaRoomPage implements OnInit, OnDestroy {
  private consultationModalService = inject(ConsultationModalService);

  // Active category filter
  readonly activeCategory = signal<string>('all');
  
  // Search query
  readonly searchQuery = signal<string>('');

  // Selected pooja room item for modal
  readonly selectedPoojaRoom = signal<PoojaRoomItem | null>(null);
  readonly isDetailModalOpen = signal<boolean>(false);
  readonly modalActiveImage = signal<string>('');

  // Lightbox for gallery images
  readonly lightboxImage = signal<string | null>(null);

  // Pooja Room Items Database
  // Pooja Room Items Database
  readonly poojaRooms: PoojaRoomItem[] = [
    {
      id: 'teak-carved-pillar-mandir',
      title: 'Carved Teakwood Temple with Brass Bells',
      category: 'teak-wood',
      categoryLabel: 'Heritage Solid Teakwood',
      shortDesc: 'Solid teakwood mandir with hand-carved pillars, hanging brass bells, and storage drawers.',
      tag: 'Best Seller',
      image: '/pooja/teak-carved-temple.jpg',
      galleryImages: [
        '/pooja/teak-carved-temple.jpg',
        '/pooja/scalloped-arch-niche-mandir.jpg',
        '/pooja/cnc-jaali-shutter-mandir.jpg'
      ],
      startingPrice: '₹1,65,000',
      dimensions: '6ft W x 7.5ft H x 2.2ft D (Customizable)',
      finishType: 'Seasoned Burma Teak + Warm Spotlight Canopy + Cast Brass Temple Bells',
      features: [
        'Solid hand-turned teak pillars with intricate floral capital and arch carvings',
        'Top canopy ceiling with recessed warm spotlights and hanging solid brass bells',
        'Polished marble countertop platform with step-up deity pedestal',
        'Lower storage credenza with 4 soft-close samagri drawers and central cabinet'
      ],
      materials: ['Grade-A Burma Teak Wood', 'White Composite Quartz Countertop', 'Solid Cast Brass Temple Bells', 'Blum Soft-Close Undermount Runners'],
      internalLayout: {
        mandirSanctum: 'Step-Tiered Marble Deity Pedestal with Integrated Spot Illumination',
        storageDiya: 'Pull-out Diya Heat Shield + 4 Soft-Close Samagri Drawers',
        ceilingLighting: '3 Recessed Warm 3000K Spotlights in Carved Wooden Canopy',
        accessories: ['Hanging Solid Brass Bells', 'Carved Floral Gable Arch', 'Brass Pull Handles']
      },
      highlights: [
        { icon: 'fa-solid fa-tree', title: 'Solid Seasoned Teak', desc: 'Handcrafted seasoned hardwood with timeless durability and natural grain.' },
        { icon: 'fa-solid fa-bell', title: 'Hanging Temple Bells', desc: 'Solid brass hanging bells tuned for auspicious resonant tone.' },
        { icon: 'fa-solid fa-boxes-stacked', title: 'Dedicated Samagri Drawers', desc: 'Deep storage drawers for daily pooja oils, wicks, and holy scriptures.' }
      ]
    },
    {
      id: 'scalloped-arch-niche-mandir',
      title: 'Scalloped Arch Niche Mandir with Idol Columns',
      category: 'marble-onyx',
      categoryLabel: 'Backlit Arch Niche & Idol Showcase',
      shortDesc: 'Illuminated temple arch niche with marble wall, side idol display shelves, and base drawers.',
      tag: 'Architectural Style',
      image: '/pooja/scalloped-arch-niche-mandir.jpg',
      galleryImages: [
        '/pooja/scalloped-arch-niche-mandir.jpg',
        '/pooja/teak-carved-temple.jpg',
        '/pooja/cnc-jaali-shutter-mandir.jpg'
      ],
      startingPrice: '₹1,50,000',
      dimensions: '6ft W x 8.5ft H x 2ft D (Customizable)',
      finishType: 'Warm Illuminated Scalloped Arch + Teakwood Frame + Soft White Push Drawers',
      features: [
        'Curved architectural scalloped sanctum arch with soft halo perimeter lighting',
        'Multi-tier side wooden display niches with individual LED spotlights for brass deities',
        'Seamless white marble deity ledge with polished step platform',
        '4 soft-close vanity samagri drawers with brushed gold knobs'
      ],
      materials: ['Italian Veined Marble Slab', 'Natural Teak Wood Showcase Columns', 'White Acrylic PU Drawers', 'Blum Motion Soft Runners'],
      internalLayout: {
        mandirSanctum: 'Recessed Scalloped Arch Sanctum with Backlit Marble Wall',
        storageDiya: '4 Soft-Close Push Drawers + 2 Side Storage Closets',
        ceilingLighting: 'Center Arch Downlight + 6 Showcase Niche Focus Spots',
        accessories: ['Tiered Brass Idol Shelves', 'Brushed Gold Hardware']
      },
      highlights: [
        { icon: 'fa-solid fa-archway', title: 'Scalloped Arch Sanctum', desc: 'Traditional temple gopuram arch illuminated with warm ambient halo light.' },
        { icon: 'fa-solid fa-cubes', title: 'Dedicated Idol Niches', desc: 'Side illuminated shelves proudly display brass murti collection.' },
        { icon: 'fa-solid fa-gem', title: 'Marble Altar Ledge', desc: 'Pristine stone base designed for daily diya and flower offerings.' }
      ]
    },
    {
      id: 'cnc-jaali-shutter-mandir',
      title: 'CNC Jaali Shutter Wardrobe Mandir',
      category: 'cnc-jaali',
      categoryLabel: 'Integrated CNC Jaali Suite',
      shortDesc: 'Bespoke folding white CNC jaali shutters with multi-tier deity shelving and storage cabinets.',
      tag: 'Apartment Favorite',
      image: '/pooja/cnc-jaali-shutter-mandir.jpg',
      galleryImages: [
        '/pooja/cnc-jaali-shutter-mandir.jpg',
        '/pooja/scalloped-arch-niche-mandir.jpg',
        '/pooja/teak-carved-temple.jpg'
      ],
      startingPrice: '₹1,60,000',
      dimensions: '5.5ft W x 9ft H x 2ft D (Customizable)',
      finishType: 'White CNC Floral Jaali Folding Doors + Natural Walnut Carcass + Gold Vertical Pulls',
      features: [
        'Full-height bi-fold CNC laser-cut white lattice shutters providing privacy and airflow',
        '3-tier wooden display step shelves holding full pantheon of brass deities',
        'Integrated overhead storage lofts for festive decorations and large pooja thalis',
        '4-door lower storage credenza with brass hardware and soft dampers'
      ],
      materials: ['IS 710 Marine Grade Plywood', 'High-Density Cast Acrylic Jaali', 'Natural Walnut Veneer', 'Hafele Heavy-Duty Bi-Fold Hinges'],
      internalLayout: {
        mandirSanctum: '3-Tier Step Sanctum Shelves with Warm Ambient Backlight',
        storageDiya: '4 Bottom Storage Cabinets + Overhead Double Lofts',
        ceilingLighting: 'Overhead Canopy Downlights + Internal Shelf Glow',
        accessories: ['Bi-Fold Lattice Shutters', 'Long Brushed Gold Handles']
      },
      highlights: [
        { icon: 'fa-solid fa-door-closed', title: 'Foldable Jaali Shutters', desc: 'Laser-cut perforated doors maintain positive sanctity and privacy.' },
        { icon: 'fa-solid fa-layer-group', title: '3-Tier Deity Display', desc: 'Step shelves offer ample room for framed photos, murtis, and diyas.' },
        { icon: 'fa-solid fa-arrows-up-to-line', title: 'Loft & Base Storage', desc: 'Seamlessly combines sacred temple with functional home storage.' }
      ]
    },
    {
      id: 'sunburst-om-backlit-mandir',
      title: 'Backlit Sunburst OM Mandir with Partition',
      category: 'marble-onyx',
      categoryLabel: 'Backlit Onyx & Louver Partition',
      shortDesc: 'Golden backlit sunburst OM motif with marble wall, wooden partition louvers, and base drawers.',
      tag: 'Modern Luxury',
      image: '/pooja/sunburst-om-backlit-mandir.jpg',
      galleryImages: [
        '/pooja/sunburst-om-backlit-mandir.jpg',
        '/pooja/teak-carved-temple.jpg',
        '/pooja/cnc-om-mandala-fluted-mandir.jpg'
      ],
      startingPrice: '₹1,45,000',
      dimensions: '5.5ft W x 8.5ft H x 2ft D (Customizable)',
      finishType: 'Translucent Backlit Onyx + Solid Teak Louver Partition + Matte White Drawers',
      features: [
        'Radiant warm 3000K backlit sunburst halo with precision CNC brass-accented OM symbol',
        'Integrated vertical wooden rafter divider separating mandir zone with grace',
        'Pristine white quartz countertop ledge with bottom storage drawers and brass knobs',
        'Concealed perimeter LED cove casting a soft celestial aura across the sanctum'
      ],
      materials: ['Translucent Italian Onyx Marble Slab', 'Natural Teak Rafter Louvers', 'Anti-Stain Quartz Altar Top', 'Hafele Soft-Close Drawers'],
      internalLayout: {
        mandirSanctum: 'Seamless White Quartz Altar with Central Illuminated Sunburst OM Backplate',
        storageDiya: '4 Soft-Close Vanity Drawers with Brushed Brass Knobs',
        ceilingLighting: 'Backlit Halo Sunburst + 2 Recessed Warm Ceiling Downlights',
        accessories: ['Floor-to-Ceiling Room Divider Louvers', 'Brass Diya Pedestals']
      },
      highlights: [
        { icon: 'fa-solid fa-sun', title: 'Sunburst OM Backlit Aura', desc: 'Backlit halo creates a serene, meditative focal point in your home.' },
        { icon: 'fa-solid fa-border-all', title: 'Integrated Room Divider', desc: 'Wooden louvers gracefully partition prayer area from living spaces.' },
        { icon: 'fa-solid fa-sparkles', title: 'Stain-Resistant Quartz Top', desc: 'Non-porous stone wipes clean easily from oil and kumkum drops.' }
      ]
    },
    {
      id: 'cnc-om-mandala-fluted-mandir',
      title: 'CNC Mandala OM Backlit Mandir with Fluted Panels',
      category: 'cnc-jaali',
      categoryLabel: 'CNC Mandala & Fluted Wood Suite',
      shortDesc: 'Full-height backlit CNC mandala jaali with vertical fluted teak wood shutters and storage credenza.',
      tag: 'Popular Choice',
      image: '/pooja/cnc-om-mandala-fluted-mandir.jpg',
      galleryImages: [
        '/pooja/cnc-om-mandala-fluted-mandir.jpg',
        '/pooja/sunburst-om-backlit-mandir.jpg',
        '/pooja/walnut-full-height-mandir-suite.jpg'
      ],
      startingPrice: '₹1,55,000',
      dimensions: '6.5ft W x 9ft H x 2ft D (Customizable)',
      finishType: 'High-Density CNC Acrylic Mandala Jaali + Natural Teak Fluted Shutters',
      features: [
        'Full-height architectural laser-cut mandala jaali panel with backlit OM crest',
        'Side vertical fluted wood accent panels providing visual warmth and grandeur',
        'Polished white marble countertop altar with step-tiered brass deity platform',
        'Bottom multi-drawer storage credenza with brass pull handles and soft closers'
      ],
      materials: ['Cast Acrylic CNC Laser Jaali', 'Solid Teak Fluted Accent Millwork', 'IS 710 Marine Grade Core', 'Blum Heavy Slider Hinges'],
      internalLayout: {
        mandirSanctum: 'Solid Quartz Platform with Full Height Backlit Mandala Screen',
        storageDiya: 'Pull-out Diya Heat Guard + 4 Multi-Tier Samagri Drawers',
        ceilingLighting: 'Concealed Perimeter Warm LED Strip + Center Spot',
        accessories: ['Full-Height CNC Fluted Millwork', 'Brass Samai Diya Stands', 'Brass Pull Knobs']
      },
      highlights: [
        { icon: 'fa-solid fa-om', title: 'Intricate Mandala Jaali', desc: 'Precision CNC laser cut pattern casts a divine, sacred shadow glow.' },
        { icon: 'fa-solid fa-bars-staggered', title: 'Architectural Fluting', desc: 'Vertical grooved teak side panels add luxurious modern texture.' },
        { icon: 'fa-solid fa-box-archive', title: 'Ample Puja Storage', desc: 'Deep white soft-close drawers store all prayer items neatly organized.' }
      ]
    },
    {
      id: 'minimalist-fluted-niche-mandir',
      title: 'Minimalist Marble Niche Mandir with Rafters',
      category: 'wall-hung',
      categoryLabel: 'Modern Niche & Acoustic Louver Suite',
      shortDesc: 'Recessed marble slab mandir alcove with vertical fluted wall louvers, brass bells, and base credenza.',
      tag: 'Modern Minimalist',
      image: '/pooja/minimalist-fluted-niche-mandir.jpg',
      galleryImages: [
        '/pooja/minimalist-fluted-niche-mandir.jpg',
        '/pooja/walnut-full-height-mandir-suite.jpg',
        '/pooja/teak-carved-temple.jpg'
      ],
      startingPrice: '₹1,30,000',
      dimensions: '5ft W x 8.5ft H x 2ft D (Customizable)',
      finishType: 'Natural Botticino Marble Slab + Beige Fluted Acoustic Louver + Dual Brass Bells',
      features: [
        'Clean recessed wall alcove with continuous marble slab and perimeter cove lighting',
        'Side vertical fluted acoustic wall panel adding contemporary architectural rhythm',
        'Dual hanging solid brass temple bells suspended on long ornamental link chains',
        'Floating-style bottom credenza cabinet with brushed brass handles'
      ],
      materials: ['Natural Veined Italian Marble Slab', 'Polymer Acoustic Fluted Louvers', 'Cast Brass Bells', 'Hafele Push Hardware'],
      internalLayout: {
        mandirSanctum: 'Integrated Marble Countertop Altar with Raised Wooden Deity Pedestal',
        storageDiya: '3 Wide Base Storage Cabinets with Soft Closing Dampers',
        ceilingLighting: 'Recessed Spotlight Canopy + Concealed Warm 3000K Perimeter Cove',
        accessories: ['Twin Hanging Brass Temple Bells', 'Vertical Fluted Panel Wall']
      },
      highlights: [
        { icon: 'fa-solid fa-gem', title: 'Italian Marble Backdrop', desc: 'Natural veined stone adds cool, peaceful elegance to the sanctum.' },
        { icon: 'fa-solid fa-bell', title: 'Twin Hanging Brass Bells', desc: 'Authentic ceremonial bells bring positive vibrational energy to the home.' },
        { icon: 'fa-solid fa-feather-pointed', title: 'Minimalist Alcove Styling', desc: 'Seamlessly blends into luxury master flats and villa foyers.' }
      ]
    },
    {
      id: 'walnut-full-height-mandir-suite',
      title: 'Full-Height Walnut Mandir Suite with Storage',
      category: 'teak-wood',
      categoryLabel: 'Full-Height Wardrobe & Mandir Integration',
      shortDesc: 'Floor-to-ceiling rich walnut wood mandir with full-height side cupboards, top lofts, and marble backdrop.',
      tag: 'Space Optimizer',
      image: '/pooja/walnut-full-height-mandir-suite.jpg',
      galleryImages: [
        '/pooja/walnut-full-height-mandir-suite.jpg',
        '/pooja/teak-carved-temple.jpg',
        '/pooja/sunburst-om-backlit-mandir.jpg'
      ],
      startingPrice: '₹1,75,000',
      dimensions: '7ft W x 9.5ft H x 2ft D (Customizable)',
      finishType: 'Smoked Walnut Veneer + Overhead Lofts + Marble Backdrop + Long Gold Pulls',
      features: [
        'Floor-to-ceiling cabinetry with overhead lofts and side full-height utility wardrobes',
        'Central illuminated prayer alcove with marble slab wall and dual hanging brass bells',
        'Dual-tone bottom vanity drawers in stone textured finish with brushed gold bar pulls',
        'Side wardrobe doors with CNC floral laser inlays and soft-close European hinges'
      ],
      materials: ['Century Club IS 710 BWP Plywood', 'Natural Smoked Walnut Veneer', 'White Quartz Altar Top', 'Hafele Soft-Close European Hinges'],
      internalLayout: {
        mandirSanctum: 'Central Marble Wall Alcove with Step-Tiered Wooden Deity Pedestal',
        storageDiya: '2 Textured Chest Drawers + 2 Side Shutter Cupboards + Overhead Lofts',
        ceilingLighting: 'Top Spotlight + Concealed Perimeter Warm 3000K Lighting',
        accessories: ['Twin Hanging Brass Bells', 'Full Height Side Wardrobe Cabinets', 'Gold Bar Pulls']
      },
      highlights: [
        { icon: 'fa-solid fa-arrows-up-to-line', title: 'Full-Height Loft Storage', desc: 'Overhead cabinets and side tall wardrobes maximize vertical room space.' },
        { icon: 'fa-solid fa-tree', title: 'Rich Walnut Woodgrain', desc: 'Warm natural veneer brings rich ambiance and warmth to the interior.' },
        { icon: 'fa-solid fa-layer-group', title: 'Dual-Tone Designer Drawers', desc: 'Stone-finish center drawers paired with gold bar handles for modern flair.' }
      ]
    }
  ];

  // Category Filter Tabs
  readonly categories = [
    { id: 'all', label: 'All Mandir Designs', icon: 'fa-solid fa-border-all' },
    { id: 'marble-onyx', label: 'Marble & Onyx', icon: 'fa-solid fa-gem' },
    { id: 'cnc-jaali', label: 'Backlit CNC Jaali', icon: 'fa-solid fa-shapes' },
    { id: 'teak-wood', label: 'Solid Teak Wood', icon: 'fa-solid fa-tree' },
    { id: 'wall-hung', label: 'Wall-Mounted Units', icon: 'fa-solid fa-arrows-up-down-left-right' },
    { id: 'traditional-carved', label: 'Grand Temple Suites', icon: 'fa-solid fa-place-of-worship' }
  ];

  // Material Matrix Data
  readonly materials: PoojaMaterialOption[] = [
    {
      name: 'Pure Makrana & Italian Onyx Marble',
      type: 'Deity Sanctum & Wall Panels',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop',
      description: 'Nano-sealed pure white Makrana marble and backlit translucent onyx that impart ethereal purity and resist oil, kumkum, and heat.',
      durability: 'Lifetime Ageless Stone',
      badge: 'Pristine & Holy'
    },
    {
      name: 'Seasoned Grade-A Burma Teak Wood',
      type: 'Temple Frames & Carved Pillars',
      image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=600&auto=format&fit=crop',
      description: 'Kiln-dried seasoned solid teak with natural high oil content that ensures 100% termite proofing and zero warping over decades.',
      durability: '50+ Years Timber Core',
      badge: 'Pure Solid Teak'
    },
    {
      name: 'Precision CNC Backlit Acrylic & MDF Jaalis',
      type: 'Mandala Backdrops & Foldable Shutters',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=600&auto=format&fit=crop',
      description: 'High-precision laser cut sacred geometric patterns with uniform LED diffusion panels that create a warm, divine golden aura.',
      durability: 'Heat & Fade Resistant',
      badge: 'Laser Precision'
    },
    {
      name: 'Handcrafted Solid Brass Accents & Bells',
      type: 'Hardware, Kalash & Melodic Bells',
      image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=600&auto=format&fit=crop',
      description: 'Real solid cast brass bells, kalash shikharas, and decorative latches coated with anti-tarnish protective lacquer.',
      durability: 'Tarnish-Free Brass',
      badge: 'Pure Brass'
    }
  ];

  // 5-Step Process
  readonly designSteps = [
    {
      number: '01',
      title: 'Vastu Direction & Space Orientation',
      desc: 'Our interior architects analyze your floor plan to optimize the mandir in the auspicious North-East (Ishanya) direction with optimal deity heights.',
      icon: 'fa-solid fa-compass'
    },
    {
      number: '02',
      title: 'Custom 3D Sanctum & Jaali Visualization',
      desc: 'Experience realistic 3D renderings with customized backlighting, sacred shloka engravings, bell canopies, and exact material choices.',
      icon: 'fa-solid fa-cubes'
    },
    {
      number: '03',
      title: 'Artisanal Carving & Precision CNC Milling',
      desc: 'Master woodcarvers and robotic laser-cutting machines fabricate intricate jaalis, solid wood pillars, and nano-sealed marble with perfection.',
      icon: 'fa-solid fa-industry'
    },
    {
      number: '04',
      title: 'Clean On-Site Installation (2 Days)',
      desc: 'Pre-assembled modular sanctum units, wiring, and bell assemblies are installed cleanly with zero messy on-site cutting or heavy dust.',
      icon: 'fa-solid fa-screwdriver-wrench'
    },
    {
      number: '05',
      title: 'Warm Illumination Tuning & 10-Yr Warranty',
      desc: 'We test light dimmers, safety smoke exhausts, heat-resistant diya trays, and hand over your ready-for-puja sacred sanctuary.',
      icon: 'fa-solid fa-shield-halved'
    }
  ];

  // FAQs
  readonly faqs: PoojaFaq[] = [
    {
      question: 'How do you ensure the Pooja Room design follows Vastu Shastra principles?',
      answer: 'Our designers strictly adhere to Vedic Vastu guidelines — placing the temple in the auspicious North-East (Ishanya) or North/East sectors, positioning deity pedestals at ergonomic seated-eye levels, ensuring diya pullouts face east, and incorporating authentic wooden/marble materials.',
      isOpen: true
    },
    {
      question: 'Are the marble and Corian platforms heat-resistant and safe for continuous oil diyas?',
      answer: 'Yes. All our diya preparation drawers and singhasan platforms are crafted using heat-resistant quartz, granite, or nano-sealed marble with specialized thermal backing that prevents heat transfer and allows oil spills or soot to be wiped off effortlessly.',
      isOpen: false
    },
    {
      question: 'Can I customize the sacred motifs, Sanskrit shlokas, and CNC jaali patterns?',
      answer: 'Absolutely! You can choose from Gayatri Mantra, Mahamrityunjaya, Om, Swastik, Radha-Krishna, Ganesha, floral vines, or geometric mandala patterns in your desired scale, gold leafing, and backlight warmth.',
      isOpen: false
    },
    {
      question: 'Can you design a compact mandir for smaller 2BHK or 3BHK apartments?',
      answer: 'Yes, we specialize in space-optimized wall-mounted floating mandirs, niche alcove temples, and foldable CNC jaali mandir cabinets that fit elegantly into living room corners, dining areas, or foyers without taking up floor space.',
      isOpen: false
    },
    {
      question: 'What is the warranty and installation timeline for a custom Mandir?',
      answer: 'Factory fabrication takes 12-18 days, followed by swift, dust-free on-site assembly within 1-2 days. All Prime Space pooja units come with a comprehensive 10-year warranty covering plywood, solid wood, and soft-close hardware.',
      isOpen: false
    }
  ];

  // Computed filtered pooja rooms
  readonly filteredPoojaRooms = computed(() => {
    let list = this.poojaRooms;
    const cat = this.activeCategory();
    const query = this.searchQuery().toLowerCase().trim();

    if (cat !== 'all') {
      list = list.filter(item => item.category === cat);
    }

    if (query) {
      list = list.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.shortDesc.toLowerCase().includes(query) ||
        item.categoryLabel.toLowerCase().includes(query) ||
        item.materials.some(m => m.toLowerCase().includes(query)) ||
        item.features.some(f => f.toLowerCase().includes(query))
      );
    }

    return list;
  });

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  setCategory(category: string): void {
    this.activeCategory.set(category);
  }

  openConsultationModal(e?: Event): void {
    if (e) e.preventDefault();
    this.consultationModalService.open();
  }

  openDetailModal(item: PoojaRoomItem): void {
    this.selectedPoojaRoom.set(item);
    this.modalActiveImage.set(item.galleryImages[0] || item.image);
    this.isDetailModalOpen.set(true);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  closeDetailModal(): void {
    this.isDetailModalOpen.set(false);
    this.selectedPoojaRoom.set(null);
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
    if (this.faqs[index]) {
      this.faqs[index].isOpen = !this.faqs[index].isOpen;
    }
  }
}
