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
      id: 'champagne-fluted-island-suite',
      title: 'Champagne Fluted Island Kitchen Suite',
      category: 'island',
      categoryLabel: 'Island Luxury Kitchen',
      shortDesc: 'Floor-to-ceiling ultra-modern island layout with waterfall Calacatta gold quartz, fluted champagne profiles, and integrated breakfast counter bar.',
      tag: 'Best Seller',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1000&auto=format&fit=crop',
      galleryImages: [
        'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1000&auto=format&fit=crop'
      ],
      startingPrice: '₹3,85,000',
      dimensions: '14ft x 12ft Open Island Layout (Customizable)',
      finishType: 'Anti-Fingerprint Super Matte + Champagne Metallic Flutes',
      features: [
        'Central cooking island with waterfall quartz breakfast bar',
        'Automated proximity sensor under-cabinet LED strip lighting',
        'Dual-tier motorized Blum Aventos bi-fold lift-up wall cabinets',
        'Anti-scratch nano-thermal matte polymer surface'
      ],
      materials: ['IS 710 Marine Grade BWP Core', '15mm Calacatta Quartz Countertop', 'Blum Legrabox Soft-Close Drawers', 'Hafele Lift-Up Hardware'],
      internalLayout: {
        baseCabinets: '8 Blum Tandembox Deep Storage Drawers + Sink Base Unit',
        wallCabinets: '6 Bi-Fold Aventos Lift-Up Glass Profile Cabinets with Warm LED',
        tallUnits: 'Full-Height Dual Oven & Microwave Tower + 6-Layer Pantry Pullout',
        accessories: ['Velvet Cutlery Tray', 'Under-sink Waste Sorter Bins', 'Magic Corner Carousel', 'Pull-out Spice Rack']
      },
      highlights: [
        { icon: 'fa-solid fa-water', title: '100% Boiling Waterproof', desc: 'IS 710 marine plywood base withstands moisture and daily steam.' },
        { icon: 'fa-solid fa-wand-magic-sparkles', title: 'Waterfall Quartz Island', desc: 'Seamless 45° mitered stone edge for a sleek luxury finish.' },
        { icon: 'fa-solid fa-gem', title: 'Champagne Gola Profile', desc: 'Handleless ergonomic J-pull and C-channel aluminum trims.' }
      ]
    },
    {
      id: 'charcoal-matte-l-shaped',
      title: 'Charcoal Matte Sleek L-Shaped Kitchen',
      category: 'l-shaped',
      categoryLabel: 'L-Shaped Modular Kitchen',
      shortDesc: 'Ergonomically engineered L-shaped modular suite with matte graphite anti-scratch thermal laminate and warm under-cabinet sensor illumination.',
      tag: 'Luxury Signature',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
      galleryImages: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1000&auto=format&fit=crop'
      ],
      startingPrice: '₹2,45,000',
      dimensions: '10ft x 8ft L-Layout (Customizable)',
      finishType: 'Fenix NTM Thermal Matte + Smoked Glass',
      features: [
        'Optimized golden cooking triangle for effortless workflow',
        'Smart blind-corner swing tray unit (LeMans carousel)',
        'Concealed German soft-close tandem runners rated for 40kg',
        'Seamless quartz backsplash with zero grout lines'
      ],
      materials: ['Century Club Marine Plywood 18mm', 'German Fenix Matte Laminate', 'Kesseböhmer LeMans Corner Mechanism', 'Hettich Sensys Hinges'],
      internalLayout: {
        baseCabinets: '6 Heavy-Duty Thali & Cutlery Tandem Drawers + Corner Pull-Out',
        wallCabinets: '4 Hydraulic Lift-Up Fluted Smoked Glass Storage Modules',
        tallUnits: 'Concealed Refrigerator Enclosure with Top Loft Storage',
        accessories: ['LeMans II Corner Carousel', 'Telescopic Dish Drainer Rack', 'Built-in Detergent Pullout']
      },
      highlights: [
        { icon: 'fa-solid fa-hand', title: 'Anti-Fingerprint', desc: 'Silky smooth matte finish that resists oil, heat, and smudges.' },
        { icon: 'fa-solid fa-arrows-spin', title: 'Zero Dead Corners', desc: 'German corner pull-out glides all stored items out effortlessly.' },
        { icon: 'fa-solid fa-shield-halved', title: '10-Year Hardware Warranty', desc: 'Tested for 200,000+ open-close cycles with lifetime peace of mind.' }
      ]
    },
    {
      id: 'cashmere-gloss-acrylic-parallel',
      title: 'Cashmere Gloss Acrylic Parallel Kitchen',
      category: 'parallel',
      categoryLabel: 'Parallel Chef Suite',
      shortDesc: 'Dual-galley high-efficiency parallel layout featuring scratch-resistant mirror acrylic finish, seamless Gola profiles, and nano-coated quartz.',
      tag: 'Popular Choice',
      image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1000&auto=format&fit=crop',
      galleryImages: [
        'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1000&auto=format&fit=crop'
      ],
      startingPrice: '₹1,95,000',
      dimensions: '11ft x 7ft Dual Counters (Customizable)',
      finishType: '2mm Senosan High Gloss Acrylic + Champagne Gola Profile',
      features: [
        'Segregated wet prep zone and dry cooking / serving zone',
        'Mirror high-gloss finish reflects light to double visual room size',
        'Soft-close Gola handleless aluminum channel system',
        'Integrated granite composite double-bowl undermount sink'
      ],
      materials: ['Greenply BWP Marine Hardwood Plywood', 'Austrian 2mm Senosan Acrylic', 'Anodized Champagne Gola Profiles', 'Blum Soft-Close Glides'],
      internalLayout: {
        baseCabinets: '10 Soft-Damped Modular Base Drawers with Anti-Slip Mats',
        wallCabinets: '8 High-Gloss Overhead Cabinets with Concealed Push Latches',
        tallUnits: 'Dedicated 6-Tier Pull-Out Tall Pantry Larder',
        accessories: ['Stainless Steel Plate & Thali Organiser', 'Oil Bottle Pullout Basket', 'Grain Trolley']
      },
      highlights: [
        { icon: 'fa-solid fa-sparkles', title: 'High Gloss Mirror Acrylic', desc: 'Ultra-reflective finish gives an expansive, luminous feel.' },
        { icon: 'fa-solid fa-sink', title: 'Dual Chef Counters', desc: 'Two parallel 2ft-deep counters provide unmatched prep area.' },
        { icon: 'fa-solid fa-fire-burner', title: 'Heat & Steam Resistant', desc: 'Built to withstand high-flame cooking and spices easily.' }
      ]
    },
    {
      id: 'emerald-gold-u-shaped',
      title: 'Grand Emerald & Brushed Gold U-Shaped Suite',
      category: 'u-shaped',
      categoryLabel: 'U-Shaped Modular Kitchen',
      shortDesc: 'Expansive 3-wall U-shaped layout maximizing cooking triangle with deep emerald Italian PU satin cabinetry, fluted glass displays, and gold bar pulls.',
      tag: 'Architectural Style',
      image: 'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?q=80&w=1000&auto=format&fit=crop',
      galleryImages: [
        'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop'
      ],
      startingPrice: '₹3,40,000',
      dimensions: '12ft x 10ft x 8ft U-Format (Customizable)',
      finishType: 'Italian Sayerlack PU Satin Finish + Brushed Brass Accents',
      features: [
        'Complete 3-wall continuous seamless counter space',
        'Dual corner carousels ensuring zero space wastage',
        'Built-in appliance garage with tambour rolling shutter',
        'Full-height backlit display cabinets with fluted toughened glass'
      ],
      materials: ['High Density BWP Hardwood Core', 'Italian PU Satin Lacquer', 'Sintered Stone Heatproof Counter', 'Hafele Magic Corner Units'],
      internalLayout: {
        baseCabinets: '12 Soft-Close Tandem Drawers + Dual Corner Pivot Systems',
        wallCabinets: '8 Backlit Fluted Glass Overhead Display Units with Sensor LEDs',
        tallUnits: 'Dual Tall Units: Built-in Oven Unit & 6-Shelf Rolling Pantry',
        accessories: ['Tambour Rolling Appliance Garage', 'Double Tier Pull-Out Spice Racks', 'Built-in Microwave Frame']
      },
      highlights: [
        { icon: 'fa-solid fa-brush', title: 'Italian Sayerlack PU', desc: 'Multi-coat hand-finished satin PU with anti-yellowing UV barrier.' },
        { icon: 'fa-solid fa-kitchen-set', title: 'Maximum Storage Capacity', desc: '3-wall perimeter provides the largest counter and cubic storage.' },
        { icon: 'fa-solid fa-lightbulb', title: 'Smart Ambience Lighting', desc: 'Integrated warm lighting in glass cabinets and toe-kick profiles.' }
      ]
    },
    {
      id: 'minimalist-white-quartz-handleless',
      title: 'Handleless White Quartz Minimalist Kitchen',
      category: 'acrylic-pu',
      categoryLabel: 'Handleless Acrylic & PU',
      shortDesc: 'Seamless Nordic minimalist kitchen with pure white anti-stain acrylic shutters, aluminum recessed J-pull channels, and pure white crystalline stone.',
      tag: 'Modern Minimalist',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1000&auto=format&fit=crop',
      galleryImages: [
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop'
      ],
      startingPrice: '₹2,15,000',
      dimensions: '9ft x 9ft L-Configuration (Customizable)',
      finishType: 'High-Gloss Anti-Yellowing Pure White Acrylic',
      features: [
        'Zero external handles for a clean uninterrupted visual plane',
        'Crystalline pure white quartz counter with seamless undermount sink',
        'Integrated cutlery and seasoning organization tiers',
        'Silent German push-to-open and soft-closing drawer glides'
      ],
      materials: ['Century Marine Grade BWP Plywood', '2mm Anti-Yellowing Acrylic', 'Caesarstone Engineered Quartz', 'Blum Movento Runners'],
      internalLayout: {
        baseCabinets: '8 Ergonomic Tandem Drawers with Dynamic 50kg Load Rating',
        wallCabinets: '6 Push-to-Open Overhead Lift-Up Cabinets with LED Channels',
        tallUnits: 'Integrated Refrigerator Cabinet + Overhead Bulk Storage',
        accessories: ['Stainless Steel Utensil Partition', 'Under-Sink Drip Tray Guard', 'Hidden Detergent Rack']
      },
      highlights: [
        { icon: 'fa-solid fa-cube', title: 'Seamless Handleless', desc: 'Continuous Gola channels create pristine, uninterrupted kitchen walls.' },
        { icon: 'fa-solid fa-droplet-slash', title: 'Stain-Proof Quartz', desc: 'Non-porous quartz top resists turmeric, wine, oil, and acid spills.' },
        { icon: 'fa-solid fa-sun', title: 'UV Anti-Yellowing', desc: 'Specially treated surface stays brilliant white for decades.' }
      ]
    },
    {
      id: 'walnut-smoked-glass-open-island',
      title: 'Modern Walnut & Smoked Glass Island Kitchen',
      category: 'island',
      categoryLabel: 'Island Luxury Kitchen',
      shortDesc: 'Warm American walnut synchronized grain with integrated central island prep sink, hydraulic breakfast ledge, and smoked bronze glass upper units.',
      tag: 'Chef Grade Signature',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1000&auto=format&fit=crop',
      galleryImages: [
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1000&auto=format&fit=crop'
      ],
      startingPrice: '₹4,10,000',
      dimensions: '15ft x 11ft Open Concept (Customizable)',
      finishType: 'Smoked American Walnut Veneer + Italian Matte PU',
      features: [
        'Expansive 8ft multi-functional island with integrated dining bar',
        'Smoked bronze toughened glass cabinets with warm vertical LED rails',
        'Custom built-in bar counter and wine glass hanging rack',
        'Heavy duty 65kg payload tandembox organizers'
      ],
      materials: ['Smoked Natural Walnut Veneer', 'IS 710 Marine Hardwood Core', 'Nero Marquina Black Marble Finish Top', 'Hafele Matrix Box Sliders'],
      internalLayout: {
        baseCabinets: '10 Soft-Damped Wood Veneer Base Drawers + Island Storage Units',
        wallCabinets: '6 Illuminated Smoked Glass Overhead Cabinets',
        tallUnits: 'Full Height Double Oven Wall + Glass-Door Wine & Glass Pantry',
        accessories: ['Island Prep Faucet & Bar Sink', 'Motorized Pop-Up Power Grommets', 'Velvet Cutlery Insert']
      },
      highlights: [
        { icon: 'fa-solid fa-tree', title: 'Natural Walnut Grain', desc: 'Synchronized real wood veneer with organic warmth and rich texture.' },
        { icon: 'fa-solid fa-wine-glass', title: 'Integrated Wine & Bar Unit', desc: 'Dedicated stemware rack and climate-ready beverage alcove.' },
        { icon: 'fa-solid fa-plug', title: 'Smart Island Power', desc: 'Concealed motorized pop-up electric sockets for small appliances.' }
      ]
    },
    {
      id: 'scandinavian-sage-l-shaped',
      title: 'Scandinavian Sage Green L-Shaped Kitchen',
      category: 'l-shaped',
      categoryLabel: 'L-Shaped Modular Kitchen',
      shortDesc: 'Subtle muted sage green shaker panels paired with warm butcher-block oak accents and premium Silestone quartz for a serene, organic aesthetic.',
      tag: 'Trending Aesthetic',
      image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1000&auto=format&fit=crop',
      galleryImages: [
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1000&auto=format&fit=crop'
      ],
      startingPrice: '₹2,60,000',
      dimensions: '10ft x 9ft L-Configuration (Customizable)',
      finishType: 'Matte Sage PU Lacquer + Natural Oak Accents',
      features: [
        'Modern shaker profile doors with subtle beveled detailing',
        'Integrated open shelving for cookbooks and artisanal ceramics',
        'Soft-closing brushed brass cup handles and knobs',
        'Deep farmhouse fireclay sink configuration'
      ],
      materials: ['Greenply BWP Marine Plywood Core', 'Matte Sage Italian PU Coating', 'Silestone Engineered Stone', 'Blum Soft-Close Dampers'],
      internalLayout: {
        baseCabinets: '7 Shaker Base Cabinets + Heavy Thali & Cookware Bins',
        wallCabinets: '5 Upper Shaker Cabinets + 2 Solid Oak Open Display Niches',
        tallUnits: 'Compact Larder Pantry with 5 Adjustable Wooden Trays',
        accessories: ['Corner D-Carousel Pullout', 'Under-Sink Organizer System', 'Spice Jar Tiered Rack']
      },
      highlights: [
        { icon: 'fa-solid fa-leaf', title: 'Serene Biophilic Palette', desc: 'Calming sage green hue inspired by natural Nordic botanical tones.' },
        { icon: 'fa-solid fa-shapes', title: 'Modern Shaker Detail', desc: 'Timeless architectural frame profiles crafted with CNC precision.' },
        { icon: 'fa-solid fa-recycle', title: 'Eco-Friendly Materials', desc: 'Zero VOC non-toxic Italian coatings safe for family food prep.' }
      ]
    },
    {
      id: 'monochrome-urban-parallel',
      title: 'Monochrome Urban Parallel Chef Kitchen',
      category: 'parallel',
      categoryLabel: 'Parallel Chef Suite',
      shortDesc: 'Two parallel high-efficiency workstations separating wet cooking and dry preparation zones, with dual-tone obsidian and snow white finishes.',
      tag: 'Chef\'s Delight',
      image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?q=80&w=1000&auto=format&fit=crop',
      galleryImages: [
        'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1000&auto=format&fit=crop'
      ],
      startingPrice: '₹2,25,000',
      dimensions: '12ft x 8ft Parallel Corridor (Customizable)',
      finishType: 'Zero-Scratch Ceramic Slate + Snow Acrylic',
      features: [
        'Split-zone workflow ensuring two people can cook simultaneously',
        'Ultra-durable sintered stone countertops resistant to hot pans up to 800°C',
        'Black matte anodized aluminum profiles with concealed soft-damping',
        'High-power 1400m3/hr chimney hood integration unit'
      ],
      materials: ['IS 710 Marine Grade BWP Hardwood', 'Matte Ceramic Slate Polymer', 'Sintered Stone Countertop', 'Hettich Atira Runners'],
      internalLayout: {
        baseCabinets: '11 High-Depth Base Drawers with Soft-Closing Dampers',
        wallCabinets: '7 Push-to-Open Matte Overhead Storage Modules',
        tallUnits: 'Tall Pantry Unit with Integrated Microwave & Espresso Niche',
        accessories: ['Wicker Vegetable Storage Baskets', 'Knife Block Insert', 'Pullout Saree & Cloth Rods']
      },
      highlights: [
        { icon: 'fa-solid fa-fire', title: 'Direct Heat Resistant', desc: 'Place hot pots directly on sintered stone counter with zero damage.' },
        { icon: 'fa-solid fa-users', title: 'Dual Chef Friendly', desc: 'Wide 4ft central walkway allows multi-cook teamwork effortlessly.' },
        { icon: 'fa-solid fa-circle-check', title: 'Zero Maintenance', desc: 'Non-staining, scratch-proof surfaces clean easily with a wet cloth.' }
      ]
    },
    {
      id: 'royale-cappuccino-u-shaped',
      title: 'Royale Cappuccino & Gold U-Shaped Kitchen',
      category: 'u-shaped',
      categoryLabel: 'U-Shaped Modular Kitchen',
      shortDesc: 'Rich warm cappuccino tones with rose gold trim, integrated rolling shutter appliance garage, corner carousel pullouts, and ceiling pot rack.',
      tag: 'Premium Deluxe',
      image: 'https://images.unsplash.com/photo-1565183997392-2f6f122e5912?q=80&w=1000&auto=format&fit=crop',
      galleryImages: [
        'https://images.unsplash.com/photo-1565183997392-2f6f122e5912?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?q=80&w=1000&auto=format&fit=crop'
      ],
      startingPrice: '₹3,15,000',
      dimensions: '11ft x 10ft x 8.5ft U-Layout (Customizable)',
      finishType: 'Lacquered Glass + Rose Gold Aluminum Framing',
      features: [
        'Sleek back-painted lacquered glass shutters in rich cappuccino',
        'Rose gold brushed aluminum handleless Gola channels',
        'Smart sensor motorized lift-up overhead units',
        'Built-in dishwasher module with matching cabinet fascia'
      ],
      materials: ['Century Marine Grade BWP 18mm', 'Back-Painted Toughened Glass', 'Quartz Countertop with 40mm Bullnose', 'Hafele Grass Dynapro Runners'],
      internalLayout: {
        baseCabinets: '9 Heavy Tandem Drawers + Dishwasher Niche + Sink Unit',
        wallCabinets: '6 Motorized Touch-to-Open Overhead Glass Cabinets',
        tallUnits: 'Full Height Double Appliance Tower + 6-Layer Pullout Larder',
        accessories: ['Tambour Appliance Garage', 'Double Dustbin Drawer', 'Concealed Spice Pullout']
      },
      highlights: [
        { icon: 'fa-solid fa-glasses', title: 'Toughened Back-Painted Glass', desc: 'Seamless high-gloss glass facings that never fade or discolor.' },
        { icon: 'fa-solid fa-shield', title: 'Pest & Termite Immune', desc: 'Treated marine plywood core impervious to borer and termites.' },
        { icon: 'fa-solid fa-crown', title: 'Rose Gold Metallic Accents', desc: 'Bespoke anodized hardware giving warm luxury sophistication.' }
      ]
    }
  ];

  // Category Filter Tabs
  readonly categories = [
    { id: 'all', label: 'All Kitchens', icon: 'fa-solid fa-border-all' },
    { id: 'island', label: 'Island Kitchens', icon: 'fa-solid fa-water' },
    { id: 'l-shaped', label: 'L-Shaped Kitchens', icon: 'fa-solid fa-shapes' },
    { id: 'parallel', label: 'Parallel Kitchens', icon: 'fa-solid fa-arrows-left-right' },
    { id: 'u-shaped', label: 'U-Shaped Kitchens', icon: 'fa-solid fa-cube' },
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
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=600&auto=format&fit=crop',
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
