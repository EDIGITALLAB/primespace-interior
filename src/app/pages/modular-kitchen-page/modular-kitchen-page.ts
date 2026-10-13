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
      id: 'charcoal-champagne-parallel-galley-suite',
      title: 'Charcoal & Champagne Parallel Galley Kitchen',
      category: 'parallel',
      categoryLabel: 'Parallel Kitchen',
      shortDesc: 'Dual-countertop parallel kitchen in gloss charcoal grey & champagne cream with integrated tall refrigerator and central picture window.',
      tag: "Chef's Choice",
      image: '/kitchens/charcoal-champagne-parallel-galley-kitchen.jpg',
      galleryImages: [
        '/kitchens/charcoal-champagne-parallel-galley-kitchen.jpg'
      ],
      startingPrice: '₹3,15,000',
      dimensions: '14ft x 8ft Parallel Layout (Customizable)',
      finishType: 'High-Gloss Charcoal & Champagne Acrylic + Italian Marble Quartz',
      features: [
        'Two parallel running countertops optimizing the golden cooking work triangle',
        'Floor-to-ceiling tall appliance pantry with built-in multi-door stainless steel refrigerator',
        'Black slanted high-suction chimney paired with a 4-burner flush gas hob',
        'Large central picture window flooding the kitchen with natural daylight'
      ],
      materials: ['IS 710 Boiling Water Proof Marine Ply Core', '2mm High-Gloss Senosan Acrylic Shutters', 'Calacatta White Quartz Countertop', 'Blum Tandembox Soft-Close Drawers'],
      internalLayout: {
        baseCabinets: '10 Deep Pots & Pan Pull-Out Tandem Drawers + Bottle Pullout',
        wallCabinets: '8 Lift-Up High-Gloss Overhead Cabinets with Warm Under-Glow',
        tallUnits: 'Integrated Double-Door Refrigerator Housing & Pantry Tower',
        accessories: ['Stainless Steel Cutlery Trays', 'Twin Dustbin Sorter', 'Under-Sink Detergent Pullout']
      },
      highlights: [
        { icon: 'fa-solid fa-arrows-left-right', title: 'Ergonomic Parallel Counters', desc: 'Maximum counter space on both sides for seamless multi-chef meal prep.' },
        { icon: 'fa-solid fa-gem', title: 'Mirror Gloss Acrylic', desc: 'Reflective surfaces enhance room brightness and wipe clean effortlessly.' },
        { icon: 'fa-solid fa-snowflake', title: 'Built-in Refrigerator Alcove', desc: 'Flush integration eliminates appliance protrusion for clean sightlines.' }
      ]
    },
    {
      id: 'moroccan-teal-mediterranean-suite',
      title: 'Mediterranean Moroccan Teal L-Kitchen',
      category: 'l-shaped',
      categoryLabel: 'L-Shaped Kitchen',
      shortDesc: 'Vibrant Mediterranean L-kitchen with deep teal cabinetry, artisanal blue & white Moroccan backsplash tiles, and open natural wood spice ledges.',
      tag: 'Artisanal Charm',
      image: '/kitchens/moroccan-teal-mediterranean-kitchen.jpg',
      galleryImages: [
        '/kitchens/moroccan-teal-mediterranean-kitchen.jpg'
      ],
      startingPrice: '₹2,85,000',
      dimensions: '12ft x 10ft L-Layout (Customizable)',
      finishType: 'Matte Ocean Teal Anti-Scratch PU + Handcrafted Moroccan Ceramic Tiles',
      features: [
        'Hand-glazed Portuguese & Moroccan floral geometric pattern backsplash tiles',
        'Open solid oak floating display ledges for spices, herb planters, and jars',
        'Concealed undermount high-velocity chimney hood with integrated warm LED task lights',
        'Seamless white composite quartz countertop with matte black sink and swan-neck faucet'
      ],
      materials: ['Century Club Prime BWP Marine Core Plywood', 'Anti-Fingerprint Matte Teal PU Coating', 'Glazed Handcrafted Ceramic Tiles', 'Hafele Soft-Close Silent Motion Hinges'],
      internalLayout: {
        baseCabinets: '8 Heavy-Duty Tandem Drawers + LeMans Corner Pullout Unit',
        wallCabinets: '4 Matte Teal Overhead Cabinets + Dual Oak Display Shelves',
        tallUnits: 'Pantry Larder with Wire Baskets',
        accessories: ['Wicker Vegetable Baskets', 'Corner Carousel', 'Hanging Herb Rail']
      },
      highlights: [
        { icon: 'fa-solid fa-palette', title: 'Artisanal Moroccan Tiles', desc: 'Intricate blue-and-white motifs create a vibrant, Mediterranean focal point.' },
        { icon: 'fa-solid fa-seedling', title: 'Open Herb & Spice Ledges', desc: 'Accessible natural oak open shelves for fresh herbs and everyday seasoning.' },
        { icon: 'fa-solid fa-droplet', title: 'Water-Immune Marine Core', desc: 'IS 710 marine plywood carcass completely impervious to water exposure.' }
      ]
    },
    {
      id: 'slate-grey-walnut-l-kitchen-suite',
      title: 'Slate Grey Gloss & Walnut Niche Kitchen',
      category: 'acrylic-pu',
      categoryLabel: 'Acrylic & PU Gloss',
      shortDesc: 'Contemporary L-shaped kitchen featuring slate grey high-gloss shutters, an integrated warm walnut spice niche, and white veined marble backsplash.',
      tag: 'Modern Luxury',
      image: '/kitchens/slate-grey-walnut-l-kitchen.jpg',
      galleryImages: [
        '/kitchens/slate-grey-walnut-l-kitchen.jpg'
      ],
      startingPrice: '₹2,95,000',
      dimensions: '13ft x 11ft L-Layout (Customizable)',
      finishType: 'High-Gloss Slate Grey Acrylic + Natural Walnut Wood Veneer Accent Box',
      features: [
        'Seamless Gola profile handleless slate grey cabinets with mirror-like shine',
        'Built-in open warm walnut display niche breaking the monochrome cabinetry',
        'Bookmatched Calacatta white marble backsplash slab running up to upper cabinets',
        'Flush-mount 4-burner gas hob and angled black glass designer chimney'
      ],
      materials: ['IS 710 Marine Grade BWP Plywood', '2mm UV-Treated Scratch-Resistant Acrylic', 'Engineered Quartz Countertop', 'Blum Aventos Bi-Fold Lift-Up Systems'],
      internalLayout: {
        baseCabinets: '9 Handleless Gola Profile Drawers + Blind Corner Optimizer',
        wallCabinets: '6 Overhead Gloss Cabinets + Integrated Walnut Spice Box',
        tallUnits: 'Appliance Garage & Refrigerator Housing Module',
        accessories: ['Magnetic Knife Strip', 'Cutlery Organizers', 'Pull-Out Waste Sorter']
      },
      highlights: [
        { icon: 'fa-solid fa-gem', title: 'Mirror Acrylic Reflection', desc: 'Ultra-glossy slate grey shutters reflect light, expanding the sense of space.' },
        { icon: 'fa-solid fa-box-open', title: 'Integrated Walnut Niche', desc: 'Warm wood accent box provides quick access to frequently used condiments.' },
        { icon: 'fa-solid fa-wind', title: 'Angled Glass Extraction', desc: 'Slanted black glass chimney provides powerful 1400 m³/hr smoke extraction.' }
      ]
    },
    {
      id: 'dusty-rose-glass-l-kitchen-suite',
      title: 'Dusty Rose & Glass Showcase L-Kitchen',
      category: 'l-shaped',
      categoryLabel: 'L-Shaped Kitchen',
      shortDesc: 'Stunning dusty rose & champagne kitchen with fluted glass crockery displays, black granite countertop, angled chimney, and window sink.',
      tag: 'Bespoke Glamour',
      image: '/kitchens/dusty-rose-glass-l-kitchen.jpg',
      galleryImages: [
        '/kitchens/dusty-rose-glass-l-kitchen.jpg'
      ],
      startingPrice: '₹3,10,000',
      dimensions: '13ft x 12ft L-Layout (Customizable)',
      finishType: 'Glossy Dusty Rose & Cashmere Vanilla Acrylic + Jet Black Granite Counter',
      features: [
        'Illuminated glass-front upper crockery cabinets with warm interior mood lighting',
        'Durable stain-proof jet black granite countertop with beveled anti-drip edge',
        'Dual-bowl stainless steel undermount sink placed under large sunlit window',
        'Modern black glass angled hood, 4-burner hob, and tall refrigerator housing'
      ],
      materials: ['Century BWP Marine Plywood Core', 'High-Gloss Acrylic Shutter Panelling', 'Treated Black Pearl Granite', 'Blum Soft-Close Dampers & Hinges'],
      internalLayout: {
        baseCabinets: '8 Base Drawers with Two-Tone Accent Insets + Corner Carousel',
        wallCabinets: '4 Fluted Glass Display Cabinets + 4 Gloss Overhead Storage Boxes',
        tallUnits: 'Side Tall Refrigerator Cabinet Unit',
        accessories: ['Plate & Crockery Stackers', 'Dual Sink Wire Basket', 'Spice Carousel']
      },
      highlights: [
        { icon: 'fa-solid fa-wine-glass', title: 'Backlit Glass Cabinets', desc: 'Internal LED lights showcase fine dining crockery and glassware beautifully.' },
        { icon: 'fa-solid fa-shield-halved', title: 'Granite Countertop', desc: 'Extreme heat resistance against hot Indian cookware and heavy cooking.' },
        { icon: 'fa-solid fa-sun', title: 'Window-Framed Sink', desc: 'Natural sunlight and fresh ventilation while washing dishes.' }
      ]
    },
    {
      id: 'charcoal-cream-gloss-balcony-suite',
      title: 'Charcoal & Cream Balcony Galley Kitchen',
      category: 'parallel',
      categoryLabel: 'Straight & Galley Layout',
      shortDesc: 'Modern straight/galley kitchen with high-gloss charcoal base units, champagne overhead storage, white quartz counter, and balcony glass doors.',
      tag: 'Urban Chic',
      image: '/kitchens/charcoal-cream-gloss-balcony-kitchen.jpg',
      galleryImages: [
        '/kitchens/charcoal-cream-gloss-balcony-kitchen.jpg'
      ],
      startingPrice: '₹2,50,000',
      dimensions: '12ft x 7ft Straight Layout (Customizable)',
      finishType: 'High-Gloss Charcoal Grey & Champagne Cream Laminate + Marble Backsplash',
      features: [
        'Long continuous cooking and prep counter running toward balcony glass doors',
        'Dual-tone color blocking: Dark charcoal base units with light cream top cabinets',
        'Matte black gooseneck faucet and deep quartz composite sink',
        'Slanted high-efficiency chimney hood centered between high-capacity upper cabinets'
      ],
      materials: ['BWP Marine Grade Plywood Carcass', 'High-Gloss Scratch-Resistant Laminates', 'Pure White Engineered Quartz Top', 'Hafele Full-Extension Runners'],
      internalLayout: {
        baseCabinets: '7 Wide Base Drawers + Gas Cylinder & Detergent Unit',
        wallCabinets: '8 Deep Overhead Storage Cabinets Reaching Ceiling',
        tallUnits: 'Side Pantry Module',
        accessories: ['Bottle Pullout Tray', 'Cutlery Divider Tray', 'Overhead Spice Rack']
      },
      highlights: [
        { icon: 'fa-solid fa-door-open', title: 'Seamless Balcony Access', desc: 'Direct access to utility balcony for effortless ventilation and laundry tasks.' },
        { icon: 'fa-solid fa-maximize', title: 'Vertical Space Optimization', desc: 'Double-row overhead cabinets make use of the full ceiling height.' },
        { icon: 'fa-solid fa-broom', title: 'Easy-Wipe Quartz & Glass', desc: 'Non-porous quartz top and gloss surfaces clean up with a single damp microfiber wipe.' }
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
