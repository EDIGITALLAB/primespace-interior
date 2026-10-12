import { Component, OnInit, OnDestroy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConsultationModalService } from '../../services/consultation-modal.service';

export interface KitchenItem {
  id: string;
  title: string;
  category: 'l-shaped' | 'u-shaped' | 'parallel' | 'island' | 'acrylic-pu';
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
    baseCabinets: string;
    wallCabinets: string;
    tallUnits: string;
    accessories: string[];
  };
  highlights: { icon: string; title: string; desc: string }[];
}

export interface KitchenMaterialOption {
  name: string;
  type: string;
  image: string;
  description: string;
  durability: string;
  badge: string;
}

export interface KitchenFaq {
  question: string;
  answer: string;
  isOpen?: boolean;
}

@Component({
  selector: 'app-modular-kitchen-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './modular-kitchen-page.html',
  styleUrl: './modular-kitchen-page.css'
})
export class ModularKitchenPage implements OnInit, OnDestroy {
  private consultationModalService = inject(ConsultationModalService);

  // Active category filter
  readonly activeCategory = signal<string>('all');
  
  // Search query
  readonly searchQuery = signal<string>('');

  // Selected kitchen item for modal
  readonly selectedKitchen = signal<KitchenItem | null>(null);
  readonly isDetailModalOpen = signal<boolean>(false);
  readonly modalActiveImage = signal<string>('');

  // Lightbox for gallery images
  readonly lightboxImage = signal<string | null>(null);

  // Kitchen Items Database
  readonly kitchens: KitchenItem[] = [
    {
      id: 'magenta-white-gloss-l-shaped-suite',
      title: 'Magenta & White Gloss L-Kitchen',
      category: 'acrylic-pu',
      categoryLabel: 'Acrylic & PU Gloss',
      shortDesc: 'Glossy plum magenta & white L-shaped kitchen with built-in oven and cove lighting.',
      tag: 'Trending Signature',
      image: '/kitchens/magenta-gloss-l-shaped-kitchen.jpg',
      galleryImages: [
        '/kitchens/magenta-gloss-l-shaped-kitchen.jpg'
      ],
      startingPrice: '₹2,65,000',
      dimensions: '12ft x 10ft L-Layout (Customizable)',
      finishType: 'High-Gloss Plum Magenta & Arctic White Acrylic + Marble Backsplash',
      features: [
        'Dual-tone gloss magenta and white acrylic cabinets with seamless Gola profile',
        'Full-height integrated appliance column with microwave and convection oven',
        'Built-in modern black angled chimney hood and 3-burner gas hob',
        'Calacatta marble slab backsplash with warm under-cabinet LED task strip'
      ],
      materials: ['IS 710 Marine Grade BWP Plywood', '2mm Austrian High-Gloss Acrylic', 'Calacatta Marble Quartz', 'Blum Soft-Close Runners'],
      internalLayout: {
        baseCabinets: '8 Deep Pot & Pan Soft-Close Drawers + Corner Pullout',
        wallCabinets: '6 Lift-Up Overhead Gloss Cabinets + Open Display Box',
        tallUnits: 'Full Microwave & Convection Oven Tower Unit',
        accessories: ['Cutlery Organizers', 'Corner Carousel', 'Built-in Appliance Dock']
      },
      highlights: [
        { icon: 'fa-solid fa-sparkles', title: 'Mirror Gloss Finish', desc: 'UV-resistant mirror gloss magenta and white acrylic surfaces.' },
        { icon: 'fa-solid fa-shapes', title: 'L-Shaped Triangle', desc: 'Seamless workflow between hob, prep counter, and sink.' },
        { icon: 'fa-solid fa-temperature-arrow-up', title: 'Built-in Oven Tower', desc: 'Ergonomic eye-level built-in microwave and convection oven.' }
      ]
    },
    {
      id: 'gloss-charcoal-champagne-straight-suite',
      title: 'Gloss Charcoal & Champagne Kitchen',
      category: 'acrylic-pu',
      categoryLabel: 'Acrylic & PU Gloss',
      shortDesc: 'Linear kitchen with high-gloss finish, LED lighting, and loft storage.',
      tag: 'Popular Choice',
      image: '/kitchens/gloss-charcoal-champagne-straight-kitchen.jpg',
      galleryImages: [
        '/kitchens/gloss-charcoal-champagne-straight-kitchen.jpg'
      ],
      startingPrice: '₹2,10,000',
      dimensions: '12ft Linear Counter (Customizable)',
      finishType: 'High-Gloss Acrylic + White Quartz Counter',
      features: [
        'Dual-tone acrylic shutters with high-gloss reflective finish',
        'Handleless Gola profile channels for seamless look',
        'Warm LED under-cabinet task lighting',
        'Undermount black quartz sink with gooseneck faucet'
      ],
      materials: ['BWP Marine Grade Plywood', '2mm High-Gloss Acrylic', 'White Nano-Quartz', 'Soft-Close Hardware'],
      internalLayout: {
        baseCabinets: '8 Soft-Close Tandem Drawers + Sink Unit',
        wallCabinets: '6 Lift-Up Overhead Gloss Cabinets',
        tallUnits: 'Compact Microwave & Oven Cabinet Tower',
        accessories: ['Cutlery Trays', 'Spice Pullout', 'Detergent Rack']
      },
      highlights: [
        { icon: 'fa-solid fa-sparkles', title: 'High-Gloss Mirror Finish', desc: 'Ultra-reflective scratch-resistant acrylic surface.' },
        { icon: 'fa-solid fa-lightbulb', title: 'Warm Task Lighting', desc: 'Under-cabinet illumination for effortless prep.' },
        { icon: 'fa-solid fa-sink', title: 'Black Quartz Sink', desc: 'Deep stain-resistant undermount sink.' }
      ]
    },
    {
      id: 'gloss-charcoal-marble-l-shaped-suite',
      title: 'Charcoal & Marble L-Shaped Kitchen',
      category: 'l-shaped',
      categoryLabel: 'L-Shaped Kitchen',
      shortDesc: 'Modern L-shaped layout with glossy cabinets and marble backsplash.',
      tag: 'Best Seller',
      image: '/kitchens/gloss-charcoal-marble-l-shaped-kitchen.jpg',
      galleryImages: [
        '/kitchens/gloss-charcoal-marble-l-shaped-kitchen.jpg'
      ],
      startingPrice: '₹2,55,000',
      dimensions: '11ft x 9ft L-Layout (Customizable)',
      finishType: 'Gloss Charcoal Acrylic + Calacatta Quartz',
      features: [
        'Ergonomic L-shaped workflow between hob, sink, and fridge',
        'Open wooden spice niche with warm recessed lighting',
        'Seamless Calacatta marble slab backsplash',
        'Integrated refrigerator housing with overhead lofts'
      ],
      materials: ['BWP Marine Plywood Core', 'Anti-Yellowing Gloss Acrylic', 'Calacatta Quartz Stone', 'Soft-Close Tandem Runners'],
      internalLayout: {
        baseCabinets: '7 Deep Pot & Pan Drawers + Corner Pullout',
        wallCabinets: '5 Upper Hydraulic Cabinets + Spice Shelf',
        tallUnits: 'Full Refrigerator Enclosure with Top Lofts',
        accessories: ['Corner Carousel', 'Bottle Pullout', 'Cutlery Organizer']
      },
      highlights: [
        { icon: 'fa-solid fa-shapes', title: 'Efficient Work Triangle', desc: 'Smooth movement between cooking zones.' },
        { icon: 'fa-solid fa-box-open', title: 'Illuminated Spice Niche', desc: 'Keeps everyday spices easily accessible.' },
        { icon: 'fa-solid fa-shield-halved', title: 'Quartz Backsplash', desc: 'Stain-proof and easy to clean with a wipe.' }
      ]
    },
    {
      id: 'champagne-mink-acrylic-parallel-suite',
      title: 'Champagne & Mink Parallel Kitchen',
      category: 'parallel',
      categoryLabel: 'Parallel Kitchen',
      shortDesc: 'Dual-counter parallel layout with window view and ample storage.',
      tag: 'Trending Design',
      image: '/kitchens/champagne-mink-acrylic-parallel-kitchen.jpg',
      galleryImages: [
        '/kitchens/champagne-mink-acrylic-parallel-kitchen.jpg'
      ],
      startingPrice: '₹2,40,000',
      dimensions: '13ft x 8ft Dual Corridor (Customizable)',
      finishType: 'Gloss Champagne & Mink Acrylic + Walnut Accents',
      features: [
        'Dual workstation layout separating wet and dry zones',
        'Layout planned around large window for natural daylight',
        'Open wooden accent niches for jars and planters',
        'Built-in refrigerator cabinet with top storage lofts'
      ],
      materials: ['IS 710 Marine Grade Plywood', '2mm High-Gloss Acrylic', 'American Walnut Veneer', 'Blum Soft-Close Runners'],
      internalLayout: {
        baseCabinets: '12 Soft-Damped Modular Base Drawers',
        wallCabinets: '8 Overhead Cabinets + 2 Walnut Display Shelves',
        tallUnits: 'Dedicated Refrigerator Cabinet with Lofts',
        accessories: ['Thali Basket', 'Spice Partition Trays', 'Wicker Baskets']
      },
      highlights: [
        { icon: 'fa-solid fa-arrows-left-right', title: 'Parallel Corridor', desc: 'Wide 4ft walkway allows two people to cook easily.' },
        { icon: 'fa-solid fa-sun', title: 'Natural Daylighting', desc: 'Bright window placement keeps kitchen airy.' },
        { icon: 'fa-solid fa-arrows-up-to-line', title: 'Ceiling Lofts', desc: 'Full-height cabinets maximize vertical space.' }
      ]
    },
    {
      id: 'matte-cappuccino-walnut-l-shaped-suite',
      title: 'Matte Cappuccino Kitchen',
      category: 'l-shaped',
      categoryLabel: 'L-Shaped Kitchen',
      shortDesc: 'L-shaped layout with matte finish, walnut open shelf, and quartz counter.',
      tag: 'Luxury Signature',
      image: '/kitchens/matte-cappuccino-walnut-l-shaped-kitchen.jpg',
      galleryImages: [
        '/kitchens/matte-cappuccino-walnut-l-shaped-kitchen.jpg'
      ],
      startingPrice: '₹2,75,000',
      dimensions: '12ft x 10ft L-Layout (Customizable)',
      finishType: 'Anti-Fingerprint Matte Cappuccino + Walnut Glass Frame',
      features: [
        'Black-framed glass crockery showcase with walnut shelving',
        'Anti-fingerprint matte cappuccino shutters',
        'Handleless J-pull groove design for seamless finish',
        'High-suction black T-box chimney hood over gas hob'
      ],
      materials: ['BWP Marine Grade Plywood', 'Thermal Matte Polymer', 'Walnut Veneer & Fluted Glass', 'Hafele Soft-Close Hinges'],
      internalLayout: {
        baseCabinets: '8 Modular Base Drawers + Corner Pullout',
        wallCabinets: '3 Glass Display Modules + 4 Matte Upper Units',
        tallUnits: 'Corner Wall Storage Units',
        accessories: ['Crockery Shelving', 'Knife Block Unit', 'Waste Bin Sorter']
      },
      highlights: [
        { icon: 'fa-solid fa-wine-glass', title: 'Glass Showcase Unit', desc: 'Elegant display for crockery and glassware.' },
        { icon: 'fa-solid fa-fingerprint', title: 'Anti-Smudge Matte', desc: 'Resists oily fingerprints and cooking steam.' },
        { icon: 'fa-solid fa-fire-burner', title: 'High-Heat Cooking Zone', desc: 'Heat-resistant quartz backsplash and top.' }
      ]
    },
    {
      id: 'slate-grey-moroccan-tile-l-shaped-suite',
      title: 'Slate Grey Moroccan Kitchen',
      category: 'l-shaped',
      categoryLabel: 'L-Shaped Kitchen',
      shortDesc: 'L-shaped kitchen with Moroccan tile backsplash and built-in oven tower.',
      tag: 'Architectural Style',
      image: '/kitchens/slate-grey-moroccan-tile-l-shaped-kitchen.jpg',
      galleryImages: [
        '/kitchens/slate-grey-moroccan-tile-l-shaped-kitchen.jpg'
      ],
      startingPrice: '₹3,20,000',
      dimensions: '13ft x 11ft L-Layout (Customizable)',
      finishType: 'Matte Slate Grey + Moroccan Ceramic Backsplash',
      features: [
        'Handcrafted Moroccan geometric tile backsplash with warm LED',
        'Full-height appliance tower for built-in oven and microwave',
        'Open walnut niche for everyday spices with spotlight',
        'Dual-cooktop setup for both gas hob and induction'
      ],
      materials: ['IS 710 Marine Hardwood Core', 'Matte Anti-Scratch Laminate', 'Glazed Moroccan Ceramic Tiles', 'Soft-Close Tandem Drawers'],
      internalLayout: {
        baseCabinets: '10 Soft-Close Base Drawers + Sink Cabinet',
        wallCabinets: '6 Matte Slate Overhead Units + 2 Spice Boxes',
        tallUnits: 'Full Appliance Tower with Built-in Oven & Microwave',
        accessories: ['Appliance Drawers', 'Dual Hob Setup', 'Corner LeMans Shelf']
      },
      highlights: [
        { icon: 'fa-solid fa-kitchen-set', title: 'Built-in Appliance Tower', desc: 'Eye-level oven and microwave setup.' },
        { icon: 'fa-solid fa-border-all', title: 'Moroccan Tile Wall', desc: 'Artisanal geometric pattern focal point.' },
        { icon: 'fa-solid fa-fire', title: 'Dual Cooking Surface', desc: 'Accommodates gas hob and induction together.' }
      ]
    },
    {
      id: 'sage-green-butcher-block-suite',
      title: 'Sage Green Scandinavian Kitchen',
      category: 'l-shaped',
      categoryLabel: 'L-Shaped Kitchen',
      shortDesc: 'Cozy L-shaped kitchen with sage green cabinets and wooden counter.',
      tag: 'Trending Aesthetic',
      image: '/kitchens/sage-green-butcher-block-kitchen.jpg',
      galleryImages: [
        '/kitchens/sage-green-butcher-block-kitchen.jpg'
      ],
      startingPrice: '₹2,15,000',
      dimensions: '10ft x 8ft L-Layout (Customizable)',
      finishType: 'Matte Sage Green + Natural Oak Butcher-Block Counter',
      features: [
        'Nordic-inspired matte sage green shutters with wooden knob handles',
        'Solid warm oak butcher-block countertop with water-repellent seal',
        'Classic white subway tile backsplash with open spice ledge',
        'Integrated under-counter dishwasher and sleek induction cooktop'
      ],
      materials: ['BWP Marine Grade Plywood Core', 'Matte Sage Green PU Finish', 'Treated Solid Oak Countertop', 'Beveled White Ceramic Subway Tiles'],
      internalLayout: {
        baseCabinets: '6 Modular Base Drawers + Dishwasher Housing + Sink Unit',
        wallCabinets: '4 Matte Sage Overhead Units with Recessed Slim Chimney',
        tallUnits: 'Side Storage Pantry with Adjustable Wooden Shelves',
        accessories: ['Undermount Dishwasher Niche', 'Window Herb Planter Sill', 'Wooden Spice Rack']
      },
      highlights: [
        { icon: 'fa-solid fa-leaf', title: 'Scandinavian Aesthetic', desc: 'Calming sage green palette with natural wooden warmth.' },
        { icon: 'fa-solid fa-tree', title: 'Solid Oak Counter', desc: 'Food-grade oiled butcher-block surface for warm rustic charm.' },
        { icon: 'fa-solid fa-border-all', title: 'Subway Tile Backsplash', desc: 'Timeless beveled subway tiles, easy to wipe clean.' }
      ]
    },
    {
      id: 'glossy-cappuccino-l-shaped-suite',
      title: 'Glossy Cappuccino L-Shaped Kitchen',
      category: 'l-shaped',
      categoryLabel: 'L-Shaped Kitchen',
      shortDesc: 'L-shaped kitchen with glossy cappuccino cabinets and marble wall.',
      tag: 'Popular Choice',
      image: '/kitchens/glossy-cappuccino-l-shaped-kitchen.jpg',
      galleryImages: [
        '/kitchens/glossy-cappuccino-l-shaped-kitchen.jpg'
      ],
      startingPrice: '₹2,65,000',
      dimensions: '11ft x 9ft L-Layout (Customizable)',
      finishType: 'High-Gloss Cappuccino Acrylic + Marble Quartz Backsplash',
      features: [
        'Warm high-gloss cappuccino acrylic shutters reflecting soft ambient light',
        'Continuous warm 3000K LED task strip under wall cabinets',
        'Integrated refrigerator cabinet with contrasting warm walnut lofts',
        'Black angled filterless chimney hood with touch control over 4-burner hob'
      ],
      materials: ['Century Club IS 710 BWP Plywood', '2mm High-Gloss Senosan Acrylic', 'Polished Quartz Marble Slab', 'Soft-Close Tandem Glides'],
      internalLayout: {
        baseCabinets: '8 Soft-Close Base Drawers + Corner Pullout Mechanism',
        wallCabinets: '6 Lift-Up Overhead Gloss Units + Chimney Enclosure',
        tallUnits: 'Full Refrigerator Enclosure with Walnut Lofts',
        accessories: ['Cutlery Organizers', 'Pullout Oil & Sauce Rack', 'Waste Bin Holder']
      },
      highlights: [
        { icon: 'fa-solid fa-sparkles', title: 'High-Gloss Acrylic', desc: 'Reflective mirror finish makes the kitchen feel bright and spacious.' },
        { icon: 'fa-solid fa-lightbulb', title: 'Warm Task LED', desc: 'Diffused counter lighting for comfortable cooking.' },
        { icon: 'fa-solid fa-snowflake', title: 'Integrated Fridge Loft', desc: 'Matching cabinet housing for seamless modern appliance integration.' }
      ]
    }
  ];

  // Category Filter Tabs
  readonly categories = [
    { id: 'all', label: 'All Kitchens', icon: 'fa-solid fa-border-all' },
    { id: 'l-shaped', label: 'L-Shaped Kitchens', icon: 'fa-solid fa-shapes' },
    { id: 'parallel', label: 'Parallel Kitchens', icon: 'fa-solid fa-arrows-left-right' },
    { id: 'acrylic-pu', label: 'Acrylic & PU Gloss', icon: 'fa-solid fa-wand-magic-sparkles' }
  ];

  // Material Matrix Data
  readonly materials: KitchenMaterialOption[] = [
    {
      name: 'IS 710 Marine Grade BWP Plywood',
      type: 'Core Structure / Carcass',
      image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=600&auto=format&fit=crop',
      description: '100% boiling waterproof marine grade core bonded with Phenol Formaldehyde resin. Immune to moisture, steam, and termites.',
      durability: '25+ Years Lifetime Core',
      badge: 'Gold Standard Core'
    },
    {
      name: 'Austrian High-Gloss Acrylic (Senosan)',
      type: 'Shutter & Facade Finish',
      image: '/kitchens/magenta-gloss-l-shaped-kitchen.jpg',
      description: '2mm scratch-resistant high-gloss polymer with mirror reflectivity and anti-yellowing UV barrier.',
      durability: 'Scratch & Stain Resistant',
      badge: 'Mirror High Gloss'
    },
    {
      name: 'Fenix NTM Super Matte Anti-Fingerprint',
      type: 'Thermal Matte Shutter Finish',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop',
      description: 'Silky smooth nanotech thermal matte surface. Fingerprint-resistant, soft to the touch, and micro-scratches heal with thermal treatment.',
      durability: 'Thermal Self-Healing',
      badge: 'Super Matte'
    },
    {
      name: 'German Blum & Hafele Motion Hardware',
      type: 'Fittings & Ergonomics',
      image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=600&auto=format&fit=crop',
      description: 'Ultra-smooth tandembox drawers, bi-fold hydraulic Aventos lifts, and soft-closing dampers tested for 200,000 cycles.',
      durability: 'Lifetime Smooth Damping',
      badge: 'German Engineering'
    }
  ];

  // 5-Step Process
  readonly designSteps = [
    {
      number: '01',
      title: 'Free Laser Site Measurement',
      desc: 'Our interior architects visit your home with precision 3D laser meters to capture exact wall angles, plumbing points, and electrical nodes.',
      icon: 'fa-solid fa-ruler-combined'
    },
    {
      number: '02',
      title: '3D CAD & VR Kitchen Walkthrough',
      desc: 'We map your cooking habits to design custom 3D renders with exact material swatches, appliance placements, and lighting profiles.',
      icon: 'fa-solid fa-cubes'
    },
    {
      number: '03',
      title: 'German CNC Precision Factory Fabrication',
      desc: 'Carcasses, Gola channels, and shutters are machined on automated German CNC lines with zero hand-chipping and waterproof PUR edge-banding.',
      icon: 'fa-solid fa-industry'
    },
    {
      number: '04',
      title: 'Dust-Free On-Site Installation',
      desc: 'Factory-finished modules arrive flat-packed and are installed by certified technicians within 3 to 5 working days with zero mess.',
      icon: 'fa-solid fa-screwdriver-wrench'
    },
    {
      number: '05',
      title: '10-Year Warranty & Lifetime Support',
      desc: 'Receive your digital warranty card covering carcass structure, hinges, runners, and quarterly maintenance checkup support.',
      icon: 'fa-solid fa-shield-halved'
    }
  ];

  // FAQ Accordion
  readonly faqs: KitchenFaq[] = [
    {
      question: 'How much does a bespoke modular kitchen cost with Prime Space?',
      answer: 'Our turnkey modular kitchens start from ₹1.5 Lakhs for standard straight/parallel layouts and range up to ₹6.5+ Lakhs for expansive luxury island suites with premium quartz, German Blum Legrabox fittings, and Italian PU finishes. Every quotation includes 3D design, factory fabrication, hardware, countertop, and installation.',
      isOpen: true
    },
    {
      question: 'What is the best material for kitchen base cabinets against Indian cooking and water exposure?',
      answer: 'We exclusively use IS 710 Marine Grade BWP (Boiling Water Proof) Plywood for all base carcasses and sink modules. Unlike particle board (MDF/HDF) which swells upon water contact, our marine grade plywood is guaranteed 100% waterproof and borer-termite proof.',
      isOpen: false
    },
    {
      question: 'What is the standard turnaround time from design approval to final installation?',
      answer: 'Once 3D designs and material swatches are finalized, factory manufacturing takes 21-25 days. On-site installation is completed in just 3-5 working days with minimal noise and dust.',
      isOpen: false
    },
    {
      question: 'Can I customize internal drawer organizers, carousels, and tall units?',
      answer: 'Yes, 100%! Every kitchen is custom-engineered to your exact cooking habits. You can choose cutlery inserts, spice pullouts, LeMans corner carousels, pantry larder units, wicker vegetable baskets, and built-in appliance garages.',
      isOpen: false
    },
    {
      question: 'Do you provide appliance integration (Hob, Chimney, Oven, Dishwasher)?',
      answer: 'Yes! We coordinate directly with top appliance brands (Hafele, Bosch, Siemens, Faber, Elica) to ensure exact cutouts, heat dissipation clearance, ducting pathways, and electrical wiring during factory manufacturing.',
      isOpen: false
    }
  ];

  // Filtered Kitchens computed signal
  readonly filteredKitchens = computed(() => {
    const cat = this.activeCategory();
    const query = this.searchQuery().trim().toLowerCase();

    return this.kitchens.filter(item => {
      const matchCat = cat === 'all' || 
        item.category === cat ||
        (cat === 'parallel' && item.id.includes('straight')) ||
        (cat === 'acrylic-pu' && item.finishType.toLowerCase().includes('acrylic'));
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

  openDetailModal(item: KitchenItem): void {
    this.selectedKitchen.set(item);
    this.modalActiveImage.set(item.galleryImages[0] || item.image);
    this.isDetailModalOpen.set(true);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  closeDetailModal(): void {
    this.isDetailModalOpen.set(false);
    this.selectedKitchen.set(null);
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
