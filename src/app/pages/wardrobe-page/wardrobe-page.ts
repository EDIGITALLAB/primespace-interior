import { Component, OnInit, OnDestroy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConsultationModalService } from '../../services/consultation-modal.service';

export interface WardrobeItem {
  id: string;
  title: string;
  category: 'sliding' | 'hinged' | 'glass' | 'walk-in' | 'corner';
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
    shelves: string;
    hangingRails: string;
    drawers: string;
    accessories: string[];
  };
  highlights: { icon: string; title: string; desc: string }[];
}

export interface MaterialOption {
  name: string;
  type: string;
  image: string;
  description: string;
  durability: string;
  badge: string;
}

export interface WardrobeFaq {
  question: string;
  answer: string;
  isOpen?: boolean;
}

@Component({
  selector: 'app-wardrobe-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './wardrobe-page.html',
  styleUrl: './wardrobe-page.css'
})
export class WardrobePage implements OnInit, OnDestroy {
  private consultationModalService = inject(ConsultationModalService);

  // Active category filter
  readonly activeCategory = signal<string>('all');
  
  // Search query
  readonly searchQuery = signal<string>('');

  // Selected wardrobe item for modal
  readonly selectedWardrobe = signal<WardrobeItem | null>(null);
  readonly isDetailModalOpen = signal<boolean>(false);
  readonly modalActiveImage = signal<string>('');

  // Lightbox for gallery images
  readonly lightboxImage = signal<string | null>(null);

  // Wardrobe Items Database
  readonly wardrobes: WardrobeItem[] = [
    {
      id: 'hydraulic-loft-smart-wardrobe',
      title: 'Hydraulic Gas-Lift Loft Wardrobe',
      category: 'hinged',
      categoryLabel: 'Hydraulic Loft Suite',
      shortDesc: 'Smart overhead gas-lift storage with sensor LED strip for blankets and luggage.',
      tag: 'Smart Storage',
      image: '/wardrobes/hydraulic-loft-storage.jpg',
      galleryImages: [
        '/wardrobes/hydraulic-loft-storage.jpg',
        '/wardrobes/teal-geometric-wardrobe.jpg',
        '/wardrobes/walnut-internal-anatomy.jpg'
      ],
      startingPrice: '₹1,40,000',
      dimensions: '10ft W x 10ft H x 2ft D (Customizable)',
      finishType: 'Natural Smoked Oak + German Pneumatic Struts + Warm 3000K Diffused LED',
      features: [
        'Heavy-duty German hydraulic gas-spring stays allowing effortless one-finger upward opening',
        'Concealed warm 3000K diffused LED light strip automatically illuminating upon opening',
        'Dust-proof silicone perimeter seals protecting winter duvets, blankets, and travel suitcases',
        'Soft-cushioned stay mechanism holds flap securely open at any angle without falling'
      ],
      materials: ['Century Club BWP Marine Core', 'Natural Light Oak Veneer', 'German Suspa Gas Struts', 'Hafele Loox Linear LED Strip'],
      internalLayout: {
        shelves: '4 High-Capacity Deep Loft Bays with Heavy Load Reinforcement',
        hangingRails: '3 Full-Length Stainless Steel Formals Hanging Rods',
        drawers: '4 Soft-Close Velvet Matrix Chest Drawers',
        accessories: ['Hydraulic Gas-Lift Flap Stays', 'Integrated Linear Sensor Light', 'Silent Soft-Close Dampers']
      },
      highlights: [
        { icon: 'fa-solid fa-arrows-up-down', title: 'Effortless Gas-Lift Access', desc: 'Pneumatic gas shock absorbers lift heavy wooden loft flaps with zero effort.' },
        { icon: 'fa-solid fa-lightbulb', title: 'Automatic Loft Illumination', desc: 'Integrated LED light bar eliminates dark corners when accessing top storage.' },
        { icon: 'fa-solid fa-box-archive', title: 'Deep Blanket Storage', desc: 'Optimized internal depth stores heavy winter quilts, duvets, and luggage safely.' }
      ]
    },
    {
      id: 'nordic-teal-geometric-wardrobe',
      title: 'Nordic Teal & Oak Wardrobe',
      category: 'hinged',
      categoryLabel: 'Geometric Shutter & Oak Niche',
      shortDesc: 'Matte ocean teal geometric shutters with warm illuminated oak display niche.',
      tag: 'Best Seller',
      image: '/wardrobes/teal-geometric-wardrobe.jpg',
      galleryImages: [
        '/wardrobes/teal-geometric-wardrobe.jpg',
        '/wardrobes/hydraulic-loft-storage.jpg',
        '/wardrobes/walnut-internal-anatomy.jpg'
      ],
      startingPrice: '₹1,35,000',
      dimensions: '10ft W x 9.5ft H x 2ft D (Customizable)',
      finishType: 'Super Matte Ocean Teal + Natural Oak Veneer Niche + Gold Pulls',
      features: [
        '6-door floor-to-ceiling geometric grooved shutters with seamless loft integration',
        'Open oak display shelving with warm vertical 3000K LED light strip',
        '3 soft-close samagri & accessory drawers with brushed brass handles',
        'Durable BWP marine plywood carcass with anti-scratch matte coat'
      ],
      materials: ['Century Club BWP Plywood Carcass', 'High-Density MR Geometric Routed Panels', 'Natural European Oak Veneer', 'Hafele Soft-Close European Hinges'],
      internalLayout: {
        shelves: '10 Modular Storage Cubbies + Illuminated Oak Open Shelves',
        hangingRails: '3 Full-Length Gold Hanging Rods for Formals and Dresses',
        drawers: '3 External Oak Drawers + 2 Concealed Inner Velvet Trays',
        accessories: ['Integrated LED Niche Strip', 'Brushed Gold T-Bar Handles', 'Soft-Close Concealed Hinges']
      },
      highlights: [
        { icon: 'fa-solid fa-shapes', title: 'Geometric CNC Grooving', desc: 'Precision CNC routed angular lines create a modern designer statement.' },
        { icon: 'fa-solid fa-lightbulb', title: 'Illuminated Open Niche', desc: 'Warm LED backlit oak shelves perfect for plants, decor, and daily essentials.' },
        { icon: 'fa-solid fa-gem', title: 'Brushed Gold Accents', desc: 'Premium metallic long T-bar handles with scratch-resistant anodized finish.' }
      ]
    },
    {
      id: 'champagne-matte-sliding-wardrobe',
      title: 'Champagne Matte Sliding Wardrobe',
      category: 'sliding',
      categoryLabel: 'Sliding Door Wardrobe',
      shortDesc: '3-door sliding wardrobe with tinted bronze mirror accent and gold edge handles.',
      tag: 'Luxury Signature',
      image: '/wardrobes/champagne-sliding-wardrobe.jpg',
      galleryImages: [
        '/wardrobes/champagne-sliding-wardrobe.jpg',
        '/wardrobes/hydraulic-loft-storage.jpg',
        '/wardrobes/walnut-internal-anatomy.jpg'
      ],
      startingPrice: '₹1,45,000',
      dimensions: '9ft W x 9.5ft H x 2.2ft D (Customizable)',
      finishType: 'Champagne Beige Thermal Matte + Tinted Bronze Mirror + Anodized Gold Handles',
      features: [
        'Heavy-duty top & bottom running silent sliding system with dual soft-dampers',
        'Center horizontal bronze tinted reflective mirror band creating spacious bedroom depth',
        'Overhead flush loft cabinetry for extra bedding and large suitcases',
        'Scratch-resistant and smudge-proof ultra-matte laminate surface'
      ],
      materials: ['IS 710 Marine Grade BWP Core', 'Thermal Matte Anti-Fingerprint Surface', '5mm Toughened Bronze Mirror', 'Hettich TopLine Heavy Slider'],
      internalLayout: {
        shelves: '12 Deep Heavy-Duty Modular Storage Shelves',
        hangingRails: '3 Brushed Nickel Oval Hanging Rails',
        drawers: '4 Soft-Close Push-to-Open Drawers with Locks',
        accessories: ['Integrated Bronze Accent Mirror', 'Full-Length Vertical Edge Pulls', 'Dual-Way Soft Closers']
      },
      highlights: [
        { icon: 'fa-solid fa-arrows-left-right', title: 'Silent Soft Glide', desc: 'German heavy-duty sliding rollers with dual-direction soft damping.' },
        { icon: 'fa-solid fa-eye', title: 'Bronze Mirror Accent', desc: 'Tinted bronze mirror band visually doubles bedroom roominess without glare.' },
        { icon: 'fa-solid fa-shield-halved', title: 'Anti-Smudge Matte', desc: 'Fingerprint-resistant thermal surface keeps doors clean and pristine.' }
      ]
    },
    {
      id: 'walnut-internal-modular-wardrobe',
      title: 'Smoked Walnut Modular Wardrobe',
      category: 'hinged',
      categoryLabel: 'Modular Internal Storage Suite',
      shortDesc: 'Natural walnut interior with built-in chest drawers and hanging sections.',
      tag: 'Architectural Style',
      image: '/wardrobes/walnut-internal-anatomy.jpg',
      galleryImages: [
        '/wardrobes/walnut-internal-anatomy.jpg',
        '/wardrobes/hydraulic-loft-storage.jpg',
        '/wardrobes/jewellery-organizer-drawer.jpg'
      ],
      startingPrice: '₹1,20,000',
      dimensions: '8ft W x 9ft H x 2ft D (Customizable)',
      finishType: 'Natural Smoked Walnut Grain + Soft Grey PU Drawer Fronts',
      features: [
        'Ergonomic internal layout with 6 soft-sliding chest drawers in matte grey',
        'Dedicated upper and mid hanging sections for suits, sarees, and coats',
        'Deep vertical shelf stack for folded clothing, bedding, and organizers',
        '180-degree wide opening European soft-close hinges for unobstructed access'
      ],
      materials: ['Greenply BWP Marine Plywood 18mm', 'Smoked Natural Walnut Veneer Texture', 'Blum Soft-Close Concealed Undermount Runners'],
      internalLayout: {
        shelves: '8 Extra-Deep Heavy-Load Storage Compartments',
        hangingRails: '2 Stainless Steel Heavy-Duty Clothes Rails',
        drawers: '6 Wide Dual-Column Modular Drawers with Concealed Undermount Slides',
        accessories: ['Full-Opening 180° Hinges', 'Dust-Proof Silicone Edge Gaskets', 'Reinforced Drawer Bottoms']
      },
      highlights: [
        { icon: 'fa-solid fa-boxes-stacked', title: '6 Chest Drawers Built-in', desc: 'Built-in multi-drawer dresser eliminates need for external furniture.' },
        { icon: 'fa-solid fa-tree', title: 'Smoked Walnut Core', desc: 'Rich organic woodgrain texture that elevates luxury bedroom warmth.' },
        { icon: 'fa-solid fa-maximize', title: '180° Full Visibility', desc: 'Wide-swinging hinges allow complete visual access across all storage bays.' }
      ]
    },
    {
      id: 'jewellery-organizer-wardrobe',
      title: 'Velvet Jewellery & Watch Drawer',
      category: 'hinged',
      categoryLabel: 'Custom Velvet Drawer Suite',
      shortDesc: 'Custom velvet matrix pull-out tray for luxury watches, rings, and accessories.',
      tag: 'Luxury Organizer',
      image: '/wardrobes/jewellery-organizer-drawer.jpg',
      galleryImages: [
        '/wardrobes/jewellery-organizer-drawer.jpg',
        '/wardrobes/hydraulic-loft-storage.jpg',
        '/wardrobes/cream-dresser-organizer-wardrobe.jpg'
      ],
      startingPrice: '₹1,15,000',
      dimensions: 'Custom Fit to any Wardrobe Bay',
      finishType: 'Microfiber Velvet Interior + German Undermount Soft-Slide',
      features: [
        'Precision compartmentalized velvet matrix trays designed for watches, chains, rings, and earrings',
        'Full-extension concealed Blum undermount slide runners with gentle soft-closing action',
        'Integrated glass top shutter option for effortless visual selection before pulling out',
        'Anti-tarnish soft velvet fabric preventing scratches and wear on valuable precious metals'
      ],
      materials: ['IS 710 Marine Grade BWP Carcass', 'High-Density Velvet Microfiber Lining', 'Blum Movento Undermount Runners', 'Toughened Fluted Glass Face'],
      internalLayout: {
        shelves: '8 Velvet Ring Slots + 12 Watch Pillows + 6 Sunglass Bays',
        hangingRails: 'Optional Side Pullout Scarf & Tie Hanger Rod',
        drawers: 'Full Extension 450mm Depth Velvet Multi-Grid Tray',
        accessories: ['Integrated Biometric Fingerprint Drawer Lock', 'Microfiber Watch Cushions', 'Soft Push Ejector']
      },
      highlights: [
        { icon: 'fa-solid fa-ring', title: 'Velvet Ring & Watch Slots', desc: 'Tailor-made cushions hold luxury wristwatches, rings, and cufflinks securely.' },
        { icon: 'fa-solid fa-gem', title: 'Anti-Tarnish Fabric', desc: 'Specialized fabric prevents oxidation and scratches on fine jewellery.' },
        { icon: 'fa-solid fa-sliders', title: 'Smooth Full Extension', desc: '100% full-extension undermount slides give instant visibility to rear items.' }
      ]
    },
    {
      id: 'cream-oak-dresser-wardrobe',
      title: 'Cream & Oak Vanity Wardrobe',
      category: 'walk-in',
      categoryLabel: 'Vanity & Organizer Wardrobe',
      shortDesc: 'Modular bedroom wardrobe with integrated dressing desk, mirror, and drawers.',
      tag: 'Popular Choice',
      image: '/wardrobes/cream-dresser-organizer-wardrobe.jpg',
      galleryImages: [
        '/wardrobes/cream-dresser-organizer-wardrobe.jpg',
        '/wardrobes/hydraulic-loft-storage.jpg',
        '/wardrobes/jewellery-organizer-drawer.jpg'
      ],
      startingPrice: '₹1,65,000',
      dimensions: '12ft W x 9.5ft H x 2ft D (Customizable)',
      finishType: 'Soft Cream Matte + Warm European Oak + Matte Black Modern Pulls',
      features: [
        'Integrated dressing nook with makeup desk, mirror, and side open display shelves',
        'Multi-grid velvet partitioned organizer drawers for jewellery, watches, and accessories',
        'Floor-to-ceiling modular cabinetry with full overhead storage lofts',
        'Ergonomic full-extension soft-close undermount drawer slides'
      ],
      materials: ['Century Marine Grade BWP Plywood', 'Soft Cream Anti-Scratch Laminate', 'Natural Oak Finish Interior', 'Ebco Matrix Slider Mechanisms'],
      internalLayout: {
        shelves: '12 Adjustable Oak Finish Storage Shelves + Vanity Open Shelving',
        hangingRails: '3 Full-Height Heavy-Duty Aluminum Hanging Rods',
        drawers: '6 Velvet-Lined Matrix Organizer Drawers + Vanity Storage Unit',
        accessories: ['Integrated Makeup Vanity Station', 'Watch & Ring Matrix Organizers', 'Matte Black Architectural Pulls']
      },
      highlights: [
        { icon: 'fa-solid fa-wand-magic-sparkles', title: 'Built-in Dressing Station', desc: 'Complete grooming station seamlessly merged within wardrobe framework.' },
        { icon: 'fa-solid fa-ring', title: 'Jewellery Matrix Drawers', desc: 'Velvet compartmentalized trays keep rings, watches & jewellery organized.' },
        { icon: 'fa-solid fa-arrows-up-to-line', title: 'Full Ceiling Lofting', desc: 'Overhead cabinets offer dust-proof space for extra duvets and suitcases.' }
      ]
    },
    {
      id: 'beige-walnut-loft-wardrobe',
      title: 'Beige & Walnut Accent Wardrobe',
      category: 'hinged',
      categoryLabel: 'Floor-to-Ceiling Loft & Display Niche',
      shortDesc: 'Floor-to-ceiling 6-door wardrobe with walnut accent band and side open shelf.',
      tag: 'Architectural Style',
      image: '/wardrobes/sage-green-loft-wardrobe.jpg',
      galleryImages: [
        '/wardrobes/sage-green-loft-wardrobe.jpg',
        '/wardrobes/hydraulic-loft-storage.jpg',
        '/wardrobes/walnut-internal-anatomy.jpg'
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
        shelves: '14 Flexible Modular Storage Cubbies + 3 Open Display Shelves',
        hangingRails: '4 Double-Deck Stainless Steel Hanging Rods for Formals and Dresses',
        drawers: '3 External Walnut Chest Drawers + 2 Concealed Inner Velvet Trays',
        accessories: ['High-Capacity Double Loft Cabinets', 'Integrated Open Niche Shelves', 'Full-Length Matte Black Bar Handles']
      },
      highlights: [
        { icon: 'fa-solid fa-layer-group', title: 'Walnut Accent Mid-Band', desc: 'Contrasting woodgrain horizontal band adds sophisticated warmth to modern bedrooms.' },
        { icon: 'fa-solid fa-book-open', title: 'Open Display Column', desc: 'Vertical open shelving perfect for indoor planters, decor, and daily bedside essentials.' },
        { icon: 'fa-solid fa-arrows-up-to-line', title: 'Full Ceiling Lofts', desc: 'Overhead cabinets offer dust-proof space for extra duvets and suitcases.' }
      ]
    },
    {
      id: 'smoked-black-glass-wardrobe',
      title: 'Smoked Glass Boutique Wardrobe',
      category: 'glass',
      categoryLabel: 'Smoked Glass & Aluminium Profile',
      shortDesc: 'Luxury tinted glass wardrobe with black profile and integrated LED shelf lights.',
      tag: 'Modern Luxury',
      image: '/wardrobes/smoked-glass-boutique-wardrobe.jpg',
      galleryImages: [
        '/wardrobes/smoked-glass-boutique-wardrobe.jpg',
        '/wardrobes/hydraulic-loft-storage.jpg',
        '/wardrobes/jewellery-organizer-drawer.jpg'
      ],
      startingPrice: '₹1,75,000',
      dimensions: '11ft W x 9.5ft H x 2ft D (Customizable)',
      finishType: 'Smoked Toughened Glass + Matte Black Anodized Aluminium + Warm Integrated LEDs',
      features: [
        'Semi-transparent smoked glass provides privacy with ambient illuminated internal glow',
        'Horizontal continuous warm LED shelf channels and formal blazer hanging section',
        'Multi-level display shelves for luxury bags, footwear, and accessories',
        'Magnetic push-to-open soft hinges with concealed black framework'
      ],
      materials: ['IS 710 BWP Plywood Carcass in Dark Anthracite', '5mm Smoked Grey Toughened Glass', 'Matte Black Anodized Aluminium', 'Hafele Loox LED Strips'],
      internalLayout: {
        shelves: '10 Smoked Glass Shelves with Aluminum Reinforcements',
        hangingRails: '3 Matte Black Oval LED Light Rods for Suits & Shirts',
        drawers: '4 Anthracite Velvet Jewellery & Watch Trays',
        accessories: ['Integrated LED Footwear Shelves', 'Full-Height Smoked Shutter System', 'Concealed Cable Tracks']
      },
      highlights: [
        { icon: 'fa-solid fa-moon', title: 'Moody Boutique Vibe', desc: 'Transforms master bedroom into a 5-star hotel luxury walk-in closet.' },
        { icon: 'fa-solid fa-eye', title: 'Subtle Transparency', desc: 'Reflective smoked glass shows interior items softly with warm backlighting.' },
        { icon: 'fa-solid fa-lightbulb', title: 'Perimeter LED Channels', desc: 'Embedded lighting illuminates suits, dresses & accessories effortlessly.' }
      ]
    },
    {
      id: 'terracotta-fluted-vanity-wardrobe',
      title: 'Terracotta Fluted Vanity Wardrobe',
      category: 'hinged',
      categoryLabel: 'Fluted Wood & Integrated Vanity',
      shortDesc: 'Earthy terracotta finish with vertical fluted shutters and backlit halo mirror.',
      tag: 'Architectural Style',
      image: '/wardrobes/terracotta-fluted-vanity-wardrobe.jpg',
      galleryImages: [
        '/wardrobes/terracotta-fluted-vanity-wardrobe.jpg',
        '/wardrobes/hydraulic-loft-storage.jpg',
        '/wardrobes/jewellery-organizer-drawer.jpg'
      ],
      startingPrice: '₹1,60,000',
      dimensions: '12ft W x 9.5ft H x 2ft D (Customizable)',
      finishType: 'Terracotta Matte PU + Natural Fluted Oak Veneer + Backlit Round Mirror',
      features: [
        'Integrated vanity grooming table with circular LED halo mirror and plush ottoman niche',
        'CNC routered vertical fluted wooden accent shutters on main wardrobe bay',
        'Double-height overhead lofts with magnetic push-open hinges for extra storage',
        'Long matte black architectural handles with soft-closing door dampers'
      ],
      materials: ['Century Marine Grade BWP Core', 'Sayerlack Terracotta PU Lacquer', 'Natural Smoked Oak Fluted Wood', 'Blum Soft-Close Hinges'],
      internalLayout: {
        shelves: '12 Modular Oak Storage Shelves + Vanity Table Storage',
        hangingRails: '3 Full-Height Heavy-Duty Hanging Sections',
        drawers: '4 Velvet Drawer Organizers + 1 Vanity Table Drawer',
        accessories: ['Circular Backlit Vanity Mirror', 'Vertical CNC Fluted Millwork', 'Double-Tier Overhead Lofts']
      },
      highlights: [
        { icon: 'fa-solid fa-wand-magic-sparkles', title: 'Built-in Vanity Nook', desc: 'Integrated grooming table with glowing round mirror saves bedroom space.' },
        { icon: 'fa-solid fa-layer-group', title: 'CNC Fluted Woodcraft', desc: 'Vertical grooved timber adds rich tactile texture to modern bedrooms.' },
        { icon: 'fa-solid fa-palette', title: 'Warm Earthy Terracotta', desc: 'Rich terracotta tone brings cozy warmth and unique contemporary flair.' }
      ]
    },
    {
      id: 'master-craft-precision-wardrobe',
      title: 'Master Carpenter Installation',
      category: 'hinged',
      categoryLabel: 'Certified Assembly & Leveling',
      shortDesc: 'Precision modular carcass assembly with laser leveling and soft-close hardware.',
      tag: 'Craftsmanship',
      image: '/wardrobes/carpenter-installation.jpg',
      galleryImages: [
        '/wardrobes/carpenter-installation.jpg',
        '/wardrobes/hydraulic-loft-storage.jpg',
        '/wardrobes/walnut-internal-anatomy.jpg'
      ],
      startingPrice: '₹1,30,000',
      dimensions: 'Custom Site Specifications',
      finishType: 'Laser Alignment + Dual Anchored Dowels + Dust-Free Assembly',
      features: [
        'Factory calibrated pre-machined joinery assembled on-site with zero dust & zero vibrations',
        'Precision optical laser leveling guaranteeing 100% horizontal alignment and no shutter drag',
        'Heavy-duty wall anchor fixings preventing cabinet leaning or tipping under full load',
        'Final micro-adjustment of all soft-close hinges and drawer runners for whisper-silent operation'
      ],
      materials: ['Century Club IS 710 Plywood', 'German Hafele Connectors & Minifix', 'Laser Calibrated Screws', 'Industrial Edge Banding'],
      internalLayout: {
        shelves: 'Custom Reinforced Carcass Modules & Loft Bays',
        hangingRails: 'Flange-Anchored Stainless Steel Rods',
        drawers: 'Full-Depth Undermount Calibrated Slides',
        accessories: ['Laser Level Guarantee', 'Dust-Free On-Site Polish', 'Final 50-Point QA Signoff']
      },
      highlights: [
        { icon: 'fa-solid fa-hammer', title: 'Master Carpenter Skill', desc: 'Trained craftsmen ensure precision joinery and zero gaps against walls and ceilings.' },
        { icon: 'fa-solid fa-crosshairs', title: 'Laser-Level Alignment', desc: 'Optical laser measurement prevents shutter sagging and uneven gaps permanently.' },
        { icon: 'fa-solid fa-certificate', title: '10-Year Quality Signoff', desc: 'Full carcass inspection and load testing before handing over keys.' }
      ]
    }
  ];

  // Materials & Finishes Data
  readonly materialOptions: MaterialOption[] = [
    {
      name: 'BWP Marine Grade Plywood',
      type: 'Core Carcass Body',
      image: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?q=80&w=600&auto=format&fit=crop',
      description: '100% boiling waterproof hardwood core bonded with synthetic phenolic resin (IS 710 certified). 100% borer and termite resistant.',
      durability: '25+ Years Lifespan',
      badge: 'Gold Standard'
    },
    {
      name: 'Smoked & Tinted Glass',
      type: 'Shutter Option',
      image: '/wardrobes/smoked-glass-boutique-wardrobe.jpg',
      description: '5mm architectural toughened glass in bronze, smoked grey, and fluted textures with aerospace-grade aluminum frames.',
      durability: 'Scratch & Shatter Proof',
      badge: 'Trending Design'
    },
    {
      name: 'Super Matte Anti-Fingerprint',
      type: 'Shutter Option',
      image: '/wardrobes/teal-geometric-wardrobe.jpg',
      description: 'Soft-touch thermal surface with low light reflectivity, ultra-smooth texture, and zero fingerprint smudging technology.',
      durability: 'Thermal Healing Tech',
      badge: 'Low Maintenance'
    },
    {
      name: 'Natural Wood Veneer + PU',
      type: 'Shutter Option',
      image: '/wardrobes/walnut-internal-anatomy.jpg',
      description: 'Hand-selected genuine American Walnut, Smoked Oak, and Teak veneers finished with non-yellowing Italian polyurethane coatings.',
      durability: 'Timeless Luxury',
      badge: 'Ultra Premium'
    }
  ];

  // Smart Storage Internal Features
  readonly storageFeatures = [
    {
      icon: 'fa-solid fa-ring',
      title: 'Velvet Jewellery & Watch Trays',
      desc: 'Custom compartment organizers lined in soft microfiber velvet for fine jewelry, luxury watches, cufflinks, and accessories.'
    },
    {
      icon: 'fa-solid fa-arrows-up-down',
      title: 'Hydraulic Loft Lift Down Rail',
      desc: 'Heavy-duty gas lift mechanism allows effortless pull-down access to seasonal clothes stored in high ceiling lofts.'
    },
    {
      icon: 'fa-solid fa-lightbulb',
      title: 'Integrated Sensor Strip LEDs',
      desc: 'Warm 3000K diffused LED light bars automatically illuminate when wardrobe shutters glide or swing open.'
    },
    {
      icon: 'fa-solid fa-person-dress',
      title: 'Pullout Saree & Trouser Racks',
      desc: 'Anti-slip rubber coated cascading rods to keep multiple sarees and pressed trousers wrinkle-free.'
    },
    {
      icon: 'fa-solid fa-lock',
      title: 'Biometric Smart Digital Locker',
      desc: 'Concealed steel safe with fingerprint and passcode sensor seamlessly integrated inside wardrobe drawers.'
    },
    {
      icon: 'fa-solid fa-gears',
      title: 'Blum / Hafele Soft-Close Hardware',
      desc: 'German certified tandem drawer runners and hinges tested for 2,00,000 opening cycles without sagging.'
    }
  ];

  // FAQs
  readonly faqs: WardrobeFaq[] = [
    {
      question: 'Which is better for my bedroom: Sliding door or Hinged door wardrobe?',
      answer: 'Sliding door wardrobes are ideal for compact to medium-sized bedrooms as they do not require extra clearance space in front of the bed to open. Hinged (swing) door wardrobes are best when you have ample walking space and prefer 100% full visual access to your entire closet at once, plus the ability to mount accessories on the inner door surface.',
      isOpen: true
    },
    {
      question: 'What core material is used for Prime Space wardrobe carcasses?',
      answer: 'We exclusively use IS 710 certified BWP (Boiling Waterproof) Marine Grade Hardwood Plywood for all wardrobe carcass structures. Unlike cheap particle board (MDF/HDF) used by mass retailers, our BWP plywood is 100% moisture-proof, termite-resistant, and will never sag or bubble over decades.',
      isOpen: false
    },
    {
      question: 'Can I customize internal drawer partitions and organizer layouts?',
      answer: 'Yes, 100%! Every Prime Space wardrobe is tailor-made to your specific wardrobe inventory. You can customize the ratio of long hanging coats, short shirts, shoe racks, pullout velvet trays, foldable saree shelves, and internal biometric lockers based on your daily routine.',
      isOpen: false
    },
    {
      question: 'How long does the design, manufacturing, and installation process take?',
      answer: 'After initial laser measurements and 3D VR design finalization, precision CNC factory manufacturing takes approximately 15 to 20 business days. Final dust-free on-site assembly by our trained master carpenters takes only 24 to 48 hours.',
      isOpen: false
    },
    {
      question: 'What warranty is provided on Prime Space wardrobes?',
      answer: 'We provide a 10-Year Comprehensive Structural & Hardware Warranty covering the BWP carcass against termites/moisture, along with official manufacturer warranty on German Hafele, Blum, and Hettich hardware mechanisms.',
      isOpen: false
    }
  ];

  // Filtered wardrobes computation
  readonly filteredWardrobes = computed(() => {
    const cat = this.activeCategory();
    const query = this.searchQuery().trim().toLowerCase();

    return this.wardrobes.filter(item => {
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

  openDetailModal(item: WardrobeItem): void {
    this.selectedWardrobe.set(item);
    this.modalActiveImage.set(item.galleryImages[0] || item.image);
    this.isDetailModalOpen.set(true);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  closeDetailModal(): void {
    this.isDetailModalOpen.set(false);
    this.selectedWardrobe.set(null);
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
