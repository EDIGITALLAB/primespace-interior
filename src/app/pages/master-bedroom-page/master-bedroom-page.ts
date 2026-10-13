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
      id: 'modern-fluted-beige-master-suite',
      title: 'Modern Fluted Wood & Gloss Wardrobe Master Suite',
      category: 'contemporary',
      categoryLabel: 'Contemporary Luxury Suite',
      shortDesc: 'King platform teak bed with channeled upholstered headboard, vertical fluted wood slat wall, and full-height gloss wardrobes.',
      tag: 'Best Seller',
      image: '/bedrooms/modern-fluted-beige-master-suite.jpg',
      galleryImages: [
        '/bedrooms/modern-fluted-beige-master-suite.jpg',
        '/bedrooms/heritage-walnut-floral-suite.jpg'
      ],
      startingPrice: '₹2,75,000',
      dimensions: '16ft x 14ft Master Suite (Customizable)',
      finishType: 'Channeled Upholstered Headboard + Vertical Teak Slats + High-Gloss Ivory Wardrobe with Walnut Lofts',
      features: [
        'Floor-to-ceiling accent headboard wall with architectural fluted teak louvers and botanical artwork',
        'Custom king platform bed frame in seasoned teak with soft-padded channel tufting',
        'Built-in 6-door high-gloss reflective acrylic wardrobe with top walnut lofts and sleek brass handles',
        'Perimeter gypsum false ceiling with warm indirect 3000K LED cove wash and ceiling fan'
      ],
      materials: ['IS 710 Marine Grade BWP Core Plywood', 'Natural Seasoned Burma Teak Wood', '2mm High-Gloss Senosan Acrylic', 'Stain-Resistant Channeled Velvet Fabric'],
      internalLayout: {
        headboardWall: 'Warm Beige Suede Wall + Vertical Fluted Teak Slats + Double Art Frames',
        bedStorage: 'King Size 78"x72" Solid Teak Platform with Hydraulic Gas-Lift Box',
        vanityTvUnit: 'Floor-to-Ceiling High-Gloss Wardrobe Suite with Overhead Walnut Lofts',
        accessories: ['Matching Teak Bedside Nightstand', 'Textured Area Rug', 'Warm Cove LED Strip']
      },
      highlights: [
        { icon: 'fa-solid fa-bed', title: 'Channeled High-Back Bed', desc: 'Ergonomic plush padded headboard for luxurious resting comfort.' },
        { icon: 'fa-solid fa-tree', title: 'Fluted Teak Louvers', desc: 'Precision vertical wooden slats add organic architectural warmth.' },
        { icon: 'fa-solid fa-door-closed', title: 'Full-Height Gloss Wardrobe', desc: 'Floor-to-ceiling storage with top lofts keeps the master bedroom clutter-free.' }
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
    },
    {
      id: 'dual-tone-teak-cream-bedroom-suite',
      title: 'Dual-Tone Teak & Cream Wardrobe Bedroom Suite',
      category: 'suite-dressing',
      categoryLabel: 'Suite with Dual-Tone Wardrobe & Vanity',
      shortDesc: 'Solid wood bed with floral wallpaper accent wall, dual-tone matte cream & teak wardrobe, and vanity dressing nook.',
      tag: 'Popular Choice',
      image: '/bedrooms/dual-tone-teak-cream-bedroom-suite.jpg',
      galleryImages: [
        '/bedrooms/dual-tone-teak-cream-bedroom-suite.jpg'
      ],
      startingPrice: '₹2,35,000',
      dimensions: '16ft x 13ft Master Bedroom (Customizable)',
      finishType: 'Dual-Tone Cream Matte & Warm Teak Woodgrain + Floral Accent Wallpaper + Sleek Black Bar Pulls',
      features: [
        'Floor-to-ceiling 6-door modular wardrobe featuring modern two-tone matte cream and warm teak woodgrain laminate',
        'Overhead dust-free storage lofts maximizing vertical room height for suitcases and seasonal quilts',
        'Traditional solid teak finish king-size bed with curved wooden arched headboard and matching nightstands',
        'Recessed vanity dressing station with full-length mirror, drawer unit, and ambient warm spotlighting',
        'Botanical floral leaf accent wallpaper creating a serene, inviting bed backdrop'
      ],
      materials: [
        'Century Club IS 710 Marine Grade BWP Plywood',
        'Soft Matte Anti-Fingerprint Laminate in Cream',
        'Warm Natural Teak Woodgrain Textured Laminate',
        'Non-Woven Textured Botanical Accent Wallpaper',
        'Hafele Soft-Close European Hinges & Undermount Drawer Runners'
      ],
      internalLayout: {
        headboardWall: 'Floral Botanical Wallpaper Accent + Solid Teak Arched Headboard + Twin Bedside Lamps',
        bedStorage: 'King Size 78"x72" Solid Wood Frame with Hydraulic Lift-Up Storage Box',
        vanityTvUnit: 'Floor-to-Ceiling Dual-Tone Wardrobe + Niche Dressing Vanity with Mirror & Drawer',
        accessories: ['Contemporary Vertical Bar Pulls', 'Twin Table Lamps with Linen Shades', 'Integrated Vanity Mirror & Planter Shelf']
      },
      highlights: [
        { icon: 'fa-solid fa-door-closed', title: 'Dual-Tone Modular Wardrobe', desc: 'Contrasting cream matte and warm teak laminate creates a stylish contemporary aesthetic.' },
        { icon: 'fa-solid fa-wand-magic-sparkles', title: 'Recessed Dressing Nook', desc: 'Space-saving vanity corner with mirror and storage tucked neatly beside the wardrobe.' },
        { icon: 'fa-solid fa-spa', title: 'Botanical Floral Wallpaper', desc: 'Delicate leaf motif wallpaper adds a tranquil, natural touch to the master suite.' }
      ]
    },
    {
      id: 'calacatta-gold-marble-fluted-master-suite',
      title: 'Calacatta Gold Marble & Fluted Teak Master Suite',
      category: 'contemporary',
      categoryLabel: 'Contemporary Luxury Suite',
      shortDesc: 'Grand master bedroom with bookmatched golden marble slab feature wall, vertical fluted teak louvers, brass inlays, and gloss wardrobe.',
      tag: 'Luxury Signature',
      image: '/bedrooms/calacatta-gold-marble-fluted-master-suite.jpg',
      galleryImages: [
        '/bedrooms/calacatta-gold-marble-fluted-master-suite.jpg'
      ],
      startingPrice: '₹3,45,000',
      dimensions: '18ft x 15ft Master Suite (Customizable)',
      finishType: 'Bookmatched Calacatta Gold Marble Slab + Seasoned Teak Fluted Louvers + Brushed Gold Brass Insets',
      features: [
        'Centerpiece feature wall featuring bookmatched Italian Calacatta Gold marble slab framed by gold T-profiles',
        'Architectural vertical fluted teak wood louvers flanking both sides of the bed',
        'Upholstered channeled velvet king bed with integrated floating dual-drawer nightstands',
        'Full-height reflective gloss ivory wardrobe with contrasting smoked glass accent band and gold bar handles'
      ],
      materials: ['Italian Calacatta Gold Marble Slab', 'IS 710 Marine Grade BWP Plywood Core', 'Burma Teak Hardwood Fluting', 'PVD Gold-Coated Brass Strips', 'Stain-Proof Velvet Fabric'],
      internalLayout: {
        headboardWall: 'Bookmatched Marble Centerpiece + Fluted Teak Louvers + Brushed Brass Dividers',
        bedStorage: 'King Platform Bed with Hydraulic Gas-Lift Storage Box',
        vanityTvUnit: 'Full-Height Gloss Wardrobe with Smoked Glass Band & Bedside Tables',
        accessories: ['Dual Floating Nightstands with Brass Pulls', 'Concealed LED Warm Cove Lighting', 'Custom Textured Floor Rug']
      },
      highlights: [
        { icon: 'fa-solid fa-gem', title: 'Calacatta Marble Feature Wall', desc: 'Dramatic gold veined marble slab creates an authentic luxury hotel ambiance.' },
        { icon: 'fa-solid fa-lines-leaning', title: 'Fluted Teak Woodcraft', desc: 'Precision vertical louvers add organic warmth and acoustic dampening.' },
        { icon: 'fa-solid fa-door-closed', title: 'Designer Gloss Wardrobe', desc: 'Ivory high-gloss wardrobe with tinted glass band maximizes storage and style.' }
      ]
    },
    {
      id: 'arched-halo-emerald-velvet-master-suite',
      title: 'Arched Halo Olive Velvet Master Suite',
      category: 'contemporary',
      categoryLabel: 'Contemporary Halo Arch Suite',
      shortDesc: 'Bespoke bedroom featuring an illuminated arched olive green velvet panel framed in brushed gold, fluted wood accents, and gloss cream wardrobe.',
      tag: 'Trending Design',
      image: '/bedrooms/arched-halo-emerald-velvet-master-suite.jpg',
      galleryImages: [
        '/bedrooms/arched-halo-emerald-velvet-master-suite.jpg'
      ],
      startingPrice: '₹2,95,000',
      dimensions: '16ft x 14ft Master Suite (Customizable)',
      finishType: 'Arched Olive Velvet Acoustic Panel + Brushed Gold Trim + Warm Teak Wainscoting + Glossy Cream Wardrobe',
      features: [
        'Dramatic Roman arch accent headboard upholstered in channel-tufted olive green velvet',
        'Concealed halo LED perimeter lighting casting a soft bedtime warm glow around the arch',
        'Warm teak woodgrain wainscoting with matching floating dual-drawer bedside table',
        '6-door full-height high-gloss cream wardrobe with long brushed gold bar handles'
      ],
      materials: ['IS 710 Marine Grade BWP Plywood', 'Stain-Resistant Olive Green Microfiber Velvet', 'PVD Brass Trim Arc', 'High-Gloss Senosan Acrylic Wardrobe Panels'],
      internalLayout: {
        headboardWall: 'Illuminated Roman Arch Velvet Panel + Teak Lower Wainscoting',
        bedStorage: 'King Platform Hydraulic Bed with Olive Green Bed Runner & Cushions',
        vanityTvUnit: 'Floor-to-Ceiling High-Gloss Cream Wardrobe with Brass Pulls',
        accessories: ['Floating Teak & Cream Nightstands', 'Concealed Halo 3000K LED Strip', 'Geometric Area Rug']
      },
      highlights: [
        { icon: 'fa-solid fa-archway', title: 'Illuminated Halo Arch', desc: 'Curved backlit velvet arch creates a soothing, sanctuary-like bed backdrop.' },
        { icon: 'fa-solid fa-leaf', title: 'Earthy Olive Velvet', desc: 'Rich botanical olive tone brings biophilic calmness to the bedroom.' },
        { icon: 'fa-solid fa-arrows-up-to-line', title: 'Floor-to-Ceiling Closet', desc: 'Seamless 6-door wardrobe utilizes full ceiling height for clutter-free living.' }
      ]
    },
    {
      id: 'smoked-glass-wardrobe-acoustic-master-suite',
      title: 'Smoked Glass Wardrobe & Acoustic Panel Suite',
      category: 'suite-dressing',
      categoryLabel: 'Boutique Dressing Suite',
      shortDesc: 'Ultra-luxurious suite featuring full-height smoked glass wardrobe with profile lighting, fluted teak accents, and acoustic fabric wall.',
      tag: 'Boutique Luxury',
      image: '/bedrooms/smoked-glass-wardrobe-acoustic-master-suite.jpg',
      galleryImages: [
        '/bedrooms/smoked-glass-wardrobe-acoustic-master-suite.jpg'
      ],
      startingPrice: '₹3,60,000',
      dimensions: '17ft x 14ft Master Suite (Customizable)',
      finishType: 'Smoked Black Tinted Glass in Bronze Aluminum Frames + Beige Acoustic Fabric Panels + Fluted Teak',
      features: [
        'Floor-to-ceiling boutique smoked tinted glass wardrobe with integrated warm LED vertical profile lights',
        'Acoustic fabric upholstered wall panels paired with architectural fluted teak columns',
        'Horizontal channel-tufted beige velvet headboard with floating bedside nightstand',
        'Expansive picture window with sheer curtains inviting soft natural ambient daylight'
      ],
      materials: ['Toughened Smoked Black Glass', 'Anodized Bronze Aluminum Extrusions', 'IS 710 Marine Grade BWP Plywood', 'Acoustic Sound-Dampening Felt & Fabric'],
      internalLayout: {
        headboardWall: 'Beige Acoustic Fabric Slabs + Vertical Fluted Teak Columns',
        bedStorage: 'King Platform Bed with Velvet Frame and Under-Bed Gas Lift Storage',
        vanityTvUnit: 'Walk-in Style Smoked Glass Wardrobe with Internal Wardrobe Sensor Lights',
        accessories: ['Bronze Profile LED Sensors', 'Floating Bedside Console', 'Curated Art Rug']
      },
      highlights: [
        { icon: 'fa-solid fa-door-open', title: 'Smoked Glass Boutique Wardrobe', desc: 'Translucent glass doors reveal illuminated clothes and accessories like a high-end boutique.' },
        { icon: 'fa-solid fa-volume-xmark', title: 'Acoustic Wall Panelling', desc: 'Sound-absorbing padded panels ensure quiet, restful, undisturbed sleep.' },
        { icon: 'fa-solid fa-lightbulb', title: 'Sensor Profile Illumination', desc: 'Internal warm LED strips turn on automatically when wardrobe doors open.' }
      ]
    },
    {
      id: 'royal-navy-velvet-fluted-master-suite',
      title: 'Royal Navy Velvet & Teak Master Suite',
      category: 'contemporary',
      categoryLabel: 'Royal Statement Suite',
      shortDesc: 'Stately master bedroom featuring floor-to-ceiling royal navy blue velvet panel headboard, brass trim insets, and fluted teak louvers.',
      tag: 'Executive Choice',
      image: '/bedrooms/royal-navy-velvet-fluted-master-suite.jpg',
      galleryImages: [
        '/bedrooms/royal-navy-velvet-fluted-master-suite.jpg'
      ],
      startingPrice: '₹3,20,000',
      dimensions: '17ft x 14ft Master Suite (Customizable)',
      finishType: 'Royal Navy Velvet Wall Panels + Vertical Fluted Teak Louvers + PVD Brass Inlays + Gloss Cream Wardrobe',
      features: [
        'Dramatic floor-to-ceiling vertical channel headboard upholstered in rich royal navy blue velvet',
        'Warm teak wood fluted side louvers providing a balanced natural wood texture',
        'Gold PVD brass divider strips separating the acoustic fabric and wooden panels',
        'Solid teak bed platform frame with matching dual-drawer floating bedside nightstands'
      ],
      materials: ['High-Density Velvet Fabric in Royal Navy', 'Natural Teak Hardwood Louvers & Bed Frame', 'PVD Coated Gold Brass Profiles', 'Century Club BWP Marine Plywood Core'],
      internalLayout: {
        headboardWall: 'Full-Height Royal Navy Velvet Center + Fluted Teak Louvers + Gold Inlays',
        bedStorage: 'Solid Teak Platform King Bed with Easy-Lift Hydraulic Mechanism',
        vanityTvUnit: 'Full-Height Glossy Cream Wardrobe with Brass Pulls & Bedside Tables',
        accessories: ['Dual Floating Teak Nightstands', 'Velvet Accent Runner & Pillows', 'Warm 3000K Cove Lighting']
      },
      highlights: [
        { icon: 'fa-solid fa-crown', title: 'Royal Navy Feature Wall', desc: 'Deep navy velvet panels make a bold, opulent executive design statement.' },
        { icon: 'fa-solid fa-star', title: 'Brass PVD Inlays', desc: 'Precision gold brass trims elevate the craftsmanship to presidential suite standards.' },
        { icon: 'fa-solid fa-bed', title: 'Solid Teak Platform', desc: 'Heavy-duty solid teak bed base provides lifelong durability and zero squeaking.' }
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
