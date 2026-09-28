import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ConsultationModalService } from '../../services/consultation-modal.service';

export interface KeyFeature {
  icon: string;
  title: string;
  desc: string;
}

export interface ColorSwatch {
  name: string;
  hex: string;
  isDarkText?: boolean;
  usage: string;
}

export interface MaterialSpec {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  materialType: string;
  durability: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'living' | 'bedroom' | 'kitchen' | 'dining' | 'tv-unit' | 'ceiling' | 'wardrobe' | 'office';
  categoryLabel: string;
  image: string;
  shortDesc: string;
  materialsUsed: string[];
  dimensions: string;
  completionDays: string;
  keyFeatures?: KeyFeature[];
  colorPalette?: ColorSwatch[];
  materials?: MaterialSpec[];
}

export interface CatalogueTheme {
  id: string;
  name: string;
  tagline: string;
  description: string;
  badge: string;
  keyFeatures: KeyFeature[];
  colorPalette: ColorSwatch[];
  materials: MaterialSpec[];
  gallery: GalleryItem[];
}

@Component({
  selector: 'app-catalogue-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './catalogue-page.html',
  styleUrl: './catalogue-page.css'
})
export class CataloguePage implements OnInit {
  private consultationModalService = inject(ConsultationModalService);
  private route = inject(ActivatedRoute);

  // Available Interior Themes with Item-Specific 3-Part Data
  readonly themes: CatalogueTheme[] = [
    {
      id: 'modern',
      name: 'Modern Theme',
      tagline: 'Sleek, Clean & Sophisticated Contemporary Architecture',
      description: 'Explore how the Modern theme transforms different spaces with geometric clarity, warm wood accents, hidden LED coves, and ultra-durable matte finishes.',
      badge: 'Most Popular',
      keyFeatures: [
        { icon: 'fa-solid fa-house-laptop', title: 'Clean & clutter-free design', desc: 'Minimal visual noise with sleek handleless cabinetry and concealed cabling.' },
        { icon: 'fa-solid fa-palette', title: 'Neutral and soothing color palettes', desc: 'Subtle contrast between soft beige, warm grey, taupe, and deep charcoal.' },
        { icon: 'fa-solid fa-border-all', title: 'Smart space utilization', desc: 'Custom storage solutions optimized for high spatial utility.' },
        { icon: 'fa-solid fa-lightbulb', title: 'Modern furniture and lighting', desc: 'Architectural magnetic tracks, cove strip LEDs, and accent pendants.' },
        { icon: 'fa-solid fa-building-user', title: 'Ideal for apartments, villas and offices', desc: 'Versatile design language adapted to all spatial scales.' }
      ],
      colorPalette: [
        { name: 'White', hex: '#FFFFFF', isDarkText: true, usage: 'Ceilings & Walls' },
        { name: 'Beige', hex: '#D7C7B7', isDarkText: true, usage: 'Upholstery & Fabrics' },
        { name: 'Grey', hex: '#9E9E9E', isDarkText: false, usage: 'Wall Paneling' },
        { name: 'Taupe', hex: '#A38F85', isDarkText: false, usage: 'Cabinetry Accent' },
        { name: 'Black', hex: '#1C1C1C', isDarkText: false, usage: 'Hardware & Trims' },
        { name: 'Sage Green', hex: '#698579', isDarkText: false, usage: 'Accent Cushions & Decor' },
        { name: 'Navy Blue', hex: '#1D3557', isDarkText: false, usage: 'Feature Wall' },
        { name: 'Wood Brown', hex: '#8B4513', isDarkText: false, usage: 'Veneers & Furniture' },
        { name: 'Charcoal', hex: '#2B2D42', isDarkText: false, usage: 'TV Backdrops' },
        { name: 'Olive', hex: '#556B2F', isDarkText: false, usage: 'Plant Planters & Art' }
      ],
      materials: [
        {
          id: 'wood-finish',
          title: 'Wood Finish',
          subtitle: 'Walnut & Teak Veneer',
          image: 'https://images.unsplash.com/photo-1546484475-7f7bd55792da?q=80&w=600&auto=format&fit=crop',
          materialType: 'Natural Timber Veneer',
          durability: '15+ Years (Boiling Water Proof)'
        },
        {
          id: 'matte-laminate',
          title: 'Matte Laminate',
          subtitle: 'Anti-Fingerprint Acrylic',
          image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600&auto=format&fit=crop',
          materialType: '1.0mm Super Matte Sheet',
          durability: 'Scratch & Heat Resistant'
        },
        {
          id: 'marble',
          title: 'Marble',
          subtitle: 'Italian Calacatta & Quartz',
          image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop',
          materialType: 'Engineered Quartz Slab',
          durability: 'Stain & Chemical Proof'
        },
        {
          id: 'glass',
          title: 'Glass',
          subtitle: 'Fluted & Tinted Toughened',
          image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=600&auto=format&fit=crop',
          materialType: '8mm Tempered Reeded Glass',
          durability: 'High Impact Safety Rating'
        },
        {
          id: 'metal',
          title: 'Metal',
          subtitle: 'Brushed Brass & PVD Gunmetal',
          image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=600&auto=format&fit=crop',
          materialType: 'Stainless Steel PVD Coat',
          durability: 'Anti-Tarnish & Rust-Free'
        },
        {
          id: 'fabric',
          title: 'Fabric',
          subtitle: 'Boucle & Premium Linen',
          image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=600&auto=format&fit=crop',
          materialType: 'High Martindale Velvet',
          durability: 'Stain Guard Treated'
        }
      ],
      gallery: [
        {
          id: 'mod-tvunit',
          title: 'TV Unit Design',
          category: 'tv-unit',
          categoryLabel: 'TV Unit Design',
          image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1200&auto=format&fit=crop',
          shortDesc: 'Floating media console with backlit marble slab backdrop, concealed wiring channels, and glass display cabinets.',
          materialsUsed: ['Backlit Onyx Marble', 'Tinted Toughened Glass', 'Matte Black Aluminum Trim'],
          dimensions: '12ft Wall Span',
          completionDays: '15 Days',
          keyFeatures: [
            { icon: 'fa-solid fa-tv', title: 'Floating Media Console', desc: 'Sleek wall-mounted storage with hidden cable routing channels.' },
            { icon: 'fa-solid fa-lightbulb', title: 'Backlit Onyx Marble Backdrop', desc: 'Warm 3000K LED glow behind imported Italian marble slab.' },
            { icon: 'fa-solid fa-border-all', title: 'Acoustic Louver Panels', desc: 'Fluted charcoal composite louvers for acoustic dampening.' },
            { icon: 'fa-solid fa-gem', title: 'Tinted Display Cabinets', desc: '8mm Reeded toughened glass shelves with internal spotlighting.' }
          ],
          colorPalette: [
            { name: 'Charcoal Grey', hex: '#2B2D42', isDarkText: false, usage: 'Louver Panel' },
            { name: 'Onyx Black', hex: '#1C1C1C', isDarkText: false, usage: 'Media Console' },
            { name: 'Warm Amber', hex: '#E6C280', isDarkText: true, usage: 'LED Backlight Glow' },
            { name: 'Calacatta White', hex: '#FFFFFF', isDarkText: true, usage: 'Marble Veining' },
            { name: 'Teak Brown', hex: '#8B4513', isDarkText: false, usage: 'Veneer Side Trim' }
          ],
          materials: [
            { id: 'onyx-marble', title: 'Backlit Onyx Marble', subtitle: 'Italian Calacatta Slab', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop', materialType: 'Engineered Translucent Marble', durability: 'Stain & Scratch Resistant' },
            { id: 'tinted-glass', title: 'Tinted Glass', subtitle: '8mm Reeded Toughened', image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=600&auto=format&fit=crop', materialType: 'Tempered Safety Glass', durability: 'High Impact Safety Rating' },
            { id: 'black-aluminum', title: 'Black Aluminum Trim', subtitle: 'Matte Powder Coated', image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=600&auto=format&fit=crop', materialType: 'Anodized Aluminum Profile', durability: 'Rust & Corrosion Proof' },
            { id: 'teak-veneer', title: 'Teak Veneer', subtitle: 'Natural Timber Layer', image: 'https://images.unsplash.com/photo-1546484475-7f7bd55792da?q=80&w=600&auto=format&fit=crop', materialType: 'BWP Marine Ply Veneer', durability: '15+ Years Lifespan' }
          ]
        },
        {
          id: 'mod-ceiling',
          title: 'False Ceiling',
          category: 'ceiling',
          categoryLabel: 'False Ceiling',
          image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop',
          shortDesc: 'Multi-tiered POP architectural ceiling with recessed magnetic track spots and warm indirect peripheral cove light.',
          materialsUsed: ['Saint-Gobain Gypsum Board', 'Magnetic Track Lights', 'Warm White 3000K LED'],
          dimensions: 'Custom Layout',
          completionDays: '10 Days',
          keyFeatures: [
            { icon: 'fa-solid fa-sun', title: 'Indirect Cove Lighting', desc: 'Soft peripheral LED illumination preventing direct glare.' },
            { icon: 'fa-solid fa-sliders', title: 'Recessed Magnetic Tracks', desc: 'Modular linear spots and floodlights repositionable along magnetic channel.' },
            { icon: 'fa-solid fa-layer-group', title: 'Multi-Tier Step Detailing', desc: 'Architectural drop-down ceiling shadow gaps for spatial depth.' },
            { icon: 'fa-solid fa-shield-halved', title: 'Zero-Crack Seamless Finish', desc: 'Saint-Gobain moisture-resistant boards with joint fiber mesh.' }
          ],
          colorPalette: [
            { name: 'Pure Ceiling White', hex: '#FFFFFF', isDarkText: true, usage: 'Gypsum Base Paint' },
            { name: 'Warm LED Amber', hex: '#E6C280', isDarkText: true, usage: 'Cove Light 3000K' },
            { name: 'Matte Track Black', hex: '#1C1C1C', isDarkText: false, usage: 'Magnetic Light Channel' },
            { name: 'Soft Taupe Grey', hex: '#A38F85', isDarkText: false, usage: 'Step Cove Contrast' }
          ],
          materials: [
            { id: 'gypsum-board', title: 'Gypsum Board', subtitle: 'Saint-Gobain 12.5mm', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600&auto=format&fit=crop', materialType: 'Moisture Resistant Gypsum', durability: 'Fire Rated & Crack Free' },
            { id: 'track-lights', title: 'Magnetic Track Spots', subtitle: 'OSRAM LED Chipset', image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=600&auto=format&fit=crop', materialType: 'Extruded Aluminum Channel', durability: '50,000 Working Hours' },
            { id: 'led-cove', title: 'Warm Cove LEDs', subtitle: 'High CRI 90+ Strips', image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=600&auto=format&fit=crop', materialType: 'Flexible Silicone LED Strip', durability: '5 Years Warranty' }
          ]
        },
        {
          id: 'mod-wardrobe',
          title: 'Wardrobe Design',
          category: 'wardrobe',
          categoryLabel: 'Wardrobe Design',
          image: 'https://images.unsplash.com/photo-1558882224-dda166733046?q=80&w=1200&auto=format&fit=crop',
          shortDesc: 'Floor-to-ceiling walk-in glass wardrobe with bronze aluminum profile frame and automated proximity sensor lights.',
          materialsUsed: ['Bronze Tinted Glass', 'Aluminum Profile', 'Velvet Jewelry Drawers', 'German Hydraulics'],
          dimensions: '10ft x 9ft Height',
          completionDays: '18 Days',
          keyFeatures: [
            { icon: 'fa-solid fa-door-open', title: 'Floor-to-Ceiling Walk-In', desc: '10ft maximum height utilization with slim 20mm bronze profile.' },
            { icon: 'fa-solid fa-bolt', title: 'Proximity Sensor Lighting', desc: 'Automated warm LED strips activating smoothly on door opening.' },
            { icon: 'fa-solid fa-gem', title: 'Velvet Jewelry Organizer', desc: 'Anti-tarnish felt drawer slots for watches, rings, and eyewear.' },
            { icon: 'fa-solid fa-shield-cat', title: 'Tinted Safety Glass', desc: '8mm bronze tinted toughened glass with anti-shatter film.' }
          ],
          colorPalette: [
            { name: 'Bronze Gold', hex: '#B8860B', isDarkText: false, usage: 'Aluminum Profile Frame' },
            { name: 'Charcoal Grey', hex: '#2B2D42', isDarkText: false, usage: 'Wardrobe Carcass' },
            { name: 'Rose Velvet', hex: '#C77DFF', isDarkText: true, usage: 'Drawer Organizer' },
            { name: 'Warm Soft Beige', hex: '#D7C7B7', isDarkText: true, usage: 'Internal Backing' }
          ],
          materials: [
            { id: 'bronze-glass', title: 'Bronze Tinted Glass', subtitle: '8mm Tempered Safety Glass', image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=600&auto=format&fit=crop', materialType: 'Tinted Reeded Glass', durability: 'Shatter & Scratch Resistant' },
            { id: 'velvet-drawers', title: 'Velvet Accessories', subtitle: 'Anti-Tarnish Fabric Slot', image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=600&auto=format&fit=crop', materialType: 'High Martindale Velvet', durability: 'Stain Guard Treated' },
            { id: 'hafele-hinge', title: 'German Hydraulics', subtitle: 'Hafele Soft-Close Hinges', image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=600&auto=format&fit=crop', materialType: 'German Engineered Steel', durability: '200,000 Cycle Tested' }
          ]
        },
        {
          id: 'mod-office',
          title: 'Study/Office',
          category: 'office',
          categoryLabel: 'Study/Office',
          image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop',
          shortDesc: 'Ergonomic work-from-home executive study room featuring acoustic wood slatted backdrop and floating bookshelves.',
          materialsUsed: ['Acoustic Felt Slats', 'Solid Oak Wood Desk', 'Concealed Desk Power Hub'],
          dimensions: '12ft x 10ft',
          completionDays: '14 Days',
          keyFeatures: [
            { icon: 'fa-solid fa-laptop-code', title: 'Ergonomic Floating Desk', desc: 'Cantilevered solid oak desktop with concealed wire drop channels.' },
            { icon: 'fa-solid fa-volume-xmark', title: 'Acoustic Slat Backdrop', desc: 'Sound-dampening wood louvers reducing echo for video calls.' },
            { icon: 'fa-solid fa-plug', title: 'Integrated Wireless Power Hub', desc: 'Pop-up multi-plug box with fast USB-C and QI charging pad.' },
            { icon: 'fa-solid fa-book-open', title: 'Under-Shelf Task Lights', desc: 'Diffused LED lights under floating bookshelves for focused reading.' }
          ],
          colorPalette: [
            { name: 'Natural Oak', hex: '#C6A989', isDarkText: true, usage: 'Desktop & Slats' },
            { name: 'Deep Slate', hex: '#2B2D42', isDarkText: false, usage: 'Acoustic Felt Panel' },
            { name: 'Sage Green', hex: '#698579', isDarkText: false, usage: 'Overhead Cabinetry' },
            { name: 'Off White', hex: '#FAF9F6', isDarkText: true, usage: 'Floating Shelves' }
          ],
          materials: [
            { id: 'oak-wood', title: 'Solid Oak Desk', subtitle: 'FSC Certified Oak', image: 'https://images.unsplash.com/photo-1546484475-7f7bd55792da?q=80&w=600&auto=format&fit=crop', materialType: 'Natural Solid Hardwood', durability: 'Natural Eco Sealant' },
            { id: 'acoustic-felt', title: 'Acoustic Felt Slats', subtitle: 'PET Recycled Felt', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600&auto=format&fit=crop', materialType: 'Sound Absorption Composite', durability: 'Flame & Odor Resistant' },
            { id: 'power-hub', title: 'Pop-up Power Hub', subtitle: 'Anodized Aluminum Dock', image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=600&auto=format&fit=crop', materialType: 'Smart Surge Protected Hub', durability: 'Heavy Duty Metal Casing' }
          ]
        },
        {
          id: 'mod-living',
          title: 'Living Room',
          category: 'living',
          categoryLabel: 'Living Room',
          image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop',
          shortDesc: 'Spacious modern living lounge featuring fluted charcoal louvers, Italian marble TV wall, and plush modular seating.',
          materialsUsed: ['Teak Wood Veneer', 'Italian Marble Slab', 'Cove Strip LED', 'Velvet Fabric Sofa'],
          dimensions: '22ft x 16ft',
          completionDays: '35 Days',
          keyFeatures: [
            { icon: 'fa-solid fa-couch', title: 'Plush Modular Seating', desc: 'High-density foam sofa configuration with stain-guard velvet.' },
            { icon: 'fa-solid fa-gem', title: 'Bookmatched Marble Wall', desc: 'Italian Calacatta marble backdrop with recessed brass inlay.' },
            { icon: 'fa-solid fa-bars-staggered', title: 'Fluted Louver Paneling', desc: 'Charcoal textured wooden louvers providing depth & contrast.' },
            { icon: 'fa-solid fa-lightbulb', title: 'Magnetic Spot & Cove LEDs', desc: 'Layered ambient lighting with dimmable track spotlights.' }
          ],
          colorPalette: [
            { name: 'Soft Beige', hex: '#D7C7B7', isDarkText: true, usage: 'Modular Sofa Upholstery' },
            { name: 'Warm Taupe', hex: '#A38F85', isDarkText: false, usage: 'Wall Cabinet Accent' },
            { name: 'Deep Charcoal', hex: '#2B2D42', isDarkText: false, usage: 'Feature Louver Wall' },
            { name: 'Calacatta White', hex: '#FFFFFF', isDarkText: true, usage: 'Marble Flooring' },
            { name: 'Champagne Gold', hex: '#D4AF37', isDarkText: false, usage: 'Metallic Brass Inlay' }
          ],
          materials: [
            { id: 'teak-veneer-living', title: 'Teak Wood Veneer', subtitle: 'Walnut & Teak Layers', image: 'https://images.unsplash.com/photo-1546484475-7f7bd55792da?q=80&w=600&auto=format&fit=crop', materialType: 'Natural Timber Veneer', durability: '15+ Years BWP Grade' },
            { id: 'calacatta-slab', title: 'Italian Marble Slab', subtitle: 'Bookmatched Calacatta', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop', materialType: 'Engineered Italian Quartz', durability: 'Stain & Scratch Proof' },
            { id: 'velvet-sofa', title: 'Velvet Upholstery', subtitle: 'Plush Microfiber Fabric', image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=600&auto=format&fit=crop', materialType: 'High Density 100k Martindale', durability: 'Water Repellent Finish' }
          ]
        },
        {
          id: 'mod-bedroom',
          title: 'Bedroom',
          category: 'bedroom',
          categoryLabel: 'Bedroom',
          image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1200&auto=format&fit=crop',
          shortDesc: 'Serene master bedroom suite with floor-to-ceiling cushioned headboard backdrop and floor-lit glass wardrobe.',
          materialsUsed: ['Fluted Glass Wardrobe', 'Soft Velvet Fabric', 'BWP Marine Plywood', 'Sensor Strip LED'],
          dimensions: '18ft x 14ft',
          completionDays: '28 Days',
          keyFeatures: [
            { icon: 'fa-solid fa-bed', title: 'Tufted Headboard Canopy', desc: 'Floor-to-ceiling cushioned vertical padded headboard panel.' },
            { icon: 'fa-solid fa-moon', title: 'Ambient Floor Nightlights', desc: 'Warm under-bed sensor lighting for gentle night visibility.' },
            { icon: 'fa-solid fa-door-closed', title: 'Fluted Glass Wardrobe', desc: 'Floor-lit glass wardrobe with automated internal spotlights.' },
            { icon: 'fa-solid fa-charging-station', title: 'Wireless Nightstand Hubs', desc: 'Built-in USB-C and QI wireless chargers in nightstands.' }
          ],
          colorPalette: [
            { name: 'Pearl Ivory', hex: '#FAF9F6', isDarkText: true, usage: 'Main Walls' },
            { name: 'Neutral Taupe', hex: '#A38F85', isDarkText: false, usage: 'Tufted Headboard' },
            { name: 'Soft Grey', hex: '#9E9E9E', isDarkText: false, usage: 'Bedding Linen' },
            { name: 'Navy Accent', hex: '#1D3557', isDarkText: false, usage: 'Throw Pillows' }
          ],
          materials: [
            { id: 'velvet-headboard', title: 'Soft Velvet Fabric', subtitle: 'Canopy Headboard Padded', image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=600&auto=format&fit=crop', materialType: 'Flame Retardant Fabric', durability: 'Easy Clean Stain Guard' },
            { id: 'bwp-plywood', title: 'BWP Marine Plywood', subtitle: 'Carass & Cabinet Core', image: 'https://images.unsplash.com/photo-1546484475-7f7bd55792da?q=80&w=600&auto=format&fit=crop', materialType: '100% Waterproof Plywood', durability: 'Termite & Borer Proof' }
          ]
        },
        {
          id: 'mod-kitchen',
          title: 'Kitchen',
          category: 'kitchen',
          categoryLabel: 'Kitchen',
          image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop',
          shortDesc: 'Handleless modular kitchen with quartz counter, anti-fingerprint PU cabinets, and Blum soft-close drawers.',
          materialsUsed: ['Quartz Countertop', 'Anti-Fingerprint Acrylic', 'Blum Hydraulics', 'BWP Plywood'],
          dimensions: '14ft x 12ft',
          completionDays: '25 Days',
          keyFeatures: [
            { icon: 'fa-solid fa-utensils', title: 'Gola Handleless Profile', desc: 'Push-to-open seamless aluminum Gola profile cabinet system.' },
            { icon: 'fa-solid fa-shield', title: 'Stain-Proof Quartz Counter', desc: 'Heavy-duty engineered quartz top with undermount sink cutout.' },
            { icon: 'fa-solid fa-square-caret-up', title: 'Blum Lift-Up Hydraulics', desc: 'Bi-fold upper wall cabinet doors with soft-close motion.' },
            { icon: 'fa-solid fa-lightbulb', title: 'Under-Cabinet Task LEDs', desc: 'Continuous shadow-free LED light strip for food prep counter.' }
          ],
          colorPalette: [
            { name: 'Pure White', hex: '#FFFFFF', isDarkText: true, usage: 'Upper Wall Cabinets' },
            { name: 'Slate Grey', hex: '#9E9E9E', isDarkText: false, usage: 'Base Drawers' },
            { name: 'Charcoal Quartz', hex: '#1C1C1C', isDarkText: false, usage: 'Kitchen Countertop' },
            { name: 'Warm Amber', hex: '#E6C280', isDarkText: true, usage: 'Task LED Light' }
          ],
          materials: [
            { id: 'quartz-top', title: 'Quartz Countertop', subtitle: 'Stain & Heat Resistant', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop', materialType: 'Engineered Quartz Slab', durability: 'Non-Porous Hygienic Surface' },
            { id: 'acrylic-sheet', title: 'Matte Acrylic Laminate', subtitle: '1.0mm Super Matte', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600&auto=format&fit=crop', materialType: 'Anti-Fingerprint Sheet', durability: 'Scratch & Heat Resistant' }
          ]
        },
        {
          id: 'mod-dining',
          title: 'Dining Area',
          category: 'dining',
          categoryLabel: 'Dining Area',
          image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=1200&auto=format&fit=crop',
          shortDesc: 'Sophisticated 6-seater marble top dining table framed with ambient ring pendant chandelier and wooden buffet unit.',
          materialsUsed: ['Natural Calacatta Marble', 'Brushed Brass Metal Legs', 'Veneer Buffet Console'],
          dimensions: '15ft x 12ft',
          completionDays: '20 Days',
          keyFeatures: [
            { icon: 'fa-solid fa-chair', title: 'Natural Marble Dining Table', desc: '6-seater natural Calacatta quartz table top with rounded bevel edges.' },
            { icon: 'fa-solid fa-circle-notch', title: 'Geometric LED Ring Pendant', desc: 'Architectural suspension chandelier casting warm dining ambience.' },
            { icon: 'fa-solid fa-box-archive', title: 'Matching Veneer Buffet Console', desc: 'Sideboard storage with push-latch doors for fine dinnerware.' },
            { icon: 'fa-solid fa-fill-drip', title: 'Stain-Guard Upholstered Chairs', desc: 'Ergonomic dining chairs wrapped in spill-resistant fabric.' }
          ],
          colorPalette: [
            { name: 'Calacatta White', hex: '#FFFFFF', isDarkText: true, usage: 'Dining Table Surface' },
            { name: 'Brushed Brass', hex: '#D4AF37', isDarkText: false, usage: 'Metal Table Legs' },
            { name: 'Walnut Brown', hex: '#8B4513', isDarkText: false, usage: 'Buffet Sideboard' },
            { name: 'Taupe Beige', hex: '#D7C7B7', isDarkText: true, usage: 'Dining Chairs' }
          ],
          materials: [
            { id: 'calacatta-table', title: 'Calacatta Marble Top', subtitle: 'Natural Imported Quartz', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop', materialType: 'Natural Italian Stone', durability: 'High Chemical Resistance' },
            { id: 'brass-legs', title: 'Brushed Brass Metal', subtitle: 'Titanium PVD Coated SS', image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=600&auto=format&fit=crop', materialType: 'SS 304 PVD Coated', durability: 'Anti-Tarnish Lifetime Lock' }
          ]
        }
      ]
    },
    {
      id: 'luxury-royal',
      name: 'Luxury Royal Theme',
      tagline: 'Opulent Stucco Molding, Gold Foil Accents & Italian Elegance',
      description: 'Experience regal grandeur featuring handcrafted neo-classical wall moldings, crystal chandeliers, high-gloss PU lacquers, and pure Italian statuario marble.',
      badge: 'Ultra Luxury',
      keyFeatures: [
        { icon: 'fa-solid fa-crown', title: 'Ornate French wall moldings', desc: 'Handcrafted plaster wainscoting and classical archways.' },
        { icon: 'fa-solid fa-gem', title: 'High-gloss lacquer & gold PVD', desc: 'Mirror-finish PU paint with brushed champagne gold hardware.' },
        { icon: 'fa-solid fa-chess-king', title: 'Statuario marble flooring', desc: 'Bookmatched Italian marble slabs with mirror shine.' },
        { icon: 'fa-solid fa-wand-magic-sparkles', title: 'Custom crystal lighting chandeliers', desc: 'Statement hand-blown glass lighting fixtures.' },
        { icon: 'fa-solid fa-shield-halved', title: 'Heritage hardwood craftsmanship', desc: 'Hand-carved teak wood detailing built to endure for generations.' }
      ],
      colorPalette: [
        { name: 'Royal Ivory', hex: '#FAF9F6', isDarkText: true, usage: 'Walls & Mouldings' },
        { name: 'Champagne Gold', hex: '#D4AF37', isDarkText: false, usage: 'PVD Trims & Hardware' },
        { name: 'Burgundy', hex: '#800020', isDarkText: false, usage: 'Velvet Drapes & Chairs' },
        { name: 'Deep Emerald', hex: '#046307', isDarkText: false, usage: 'Accent Lounge Sofas' },
        { name: 'Onyx Black', hex: '#0F0F0F', isDarkText: false, usage: 'Contrast Inlays' },
        { name: 'Pearl Beige', hex: '#EAE0D5', isDarkText: true, usage: 'Upholstery & Rugs' }
      ],
      materials: [
        {
          id: 'gold-pvd',
          title: 'Gold PVD Steel',
          subtitle: 'Champagne Gold Trim',
          image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop',
          materialType: 'Titanium PVD Coated SS 304',
          durability: 'Lifetime Color Lock'
        },
        {
          id: 'statuario-marble',
          title: 'Italian Statuario',
          subtitle: 'Bookmatched Marble Slab',
          image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600&auto=format&fit=crop',
          materialType: 'Imported Natural Italian Marble',
          durability: 'Diamond Polished Seal'
        },
        {
          id: 'royal-velvet',
          title: 'Royal Velvet',
          subtitle: 'Heavyweight Plush Velvet',
          image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=600&auto=format&fit=crop',
          materialType: '100k Martindale Microfiber Velvet',
          durability: 'High Abrasion Grade'
        },
        {
          id: 'pu-lacquer',
          title: 'PU High Gloss',
          subtitle: 'Polyurethane Piano Finish',
          image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=600&auto=format&fit=crop',
          materialType: 'ICA Italian PU Paint System',
          durability: 'Non-Yellowing UV Resistant'
        }
      ],
      gallery: [
        {
          id: 'lux-living',
          title: 'Grand Living Room',
          category: 'living',
          categoryLabel: 'Living Room',
          image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
          shortDesc: 'Palatial living hall featuring ornate wall moldings, crystal chandelier, and Statuario marble flooring with brass inlay.',
          materialsUsed: ['Bookmatched Statuario Marble', 'French Wall Moldings', 'Gold PVD Trims', 'Crystal Chandelier'],
          dimensions: '28ft x 20ft',
          completionDays: '45 Days',
          keyFeatures: [
            { icon: 'fa-solid fa-crown', title: 'French Wainscoting Moldings', desc: 'Hand-carved classical plaster wainscoting panels.' },
            { icon: 'fa-solid fa-gem', title: 'Statuario Marble Flooring', desc: 'Bookmatched Italian marble with champagne brass inlays.' },
            { icon: 'fa-solid fa-wand-magic-sparkles', title: 'Tiered Crystal Chandelier', desc: 'Custom hand-blown lead crystal chandelier light fixture.' }
          ],
          colorPalette: [
            { name: 'Royal Ivory', hex: '#FAF9F6', isDarkText: true, usage: 'Wainscoting Walls' },
            { name: 'Champagne Gold', hex: '#D4AF37', isDarkText: false, usage: 'PVD Brass Trim' },
            { name: 'Deep Emerald', hex: '#046307', isDarkText: false, usage: 'Chesterfield Sofa' }
          ],
          materials: [
            { id: 'statuario-lux', title: 'Italian Statuario', subtitle: 'Bookmatched Marble', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop', materialType: 'Natural Imported Marble', durability: 'High Gloss Polish' },
            { id: 'gold-pvd-lux', title: 'Gold PVD Steel', subtitle: 'Champagne Gold Inlay', image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=600&auto=format&fit=crop', materialType: 'Titanium PVD SS 304', durability: 'Lifetime Anti-Rust' }
          ]
        },
        {
          id: 'lux-bedroom',
          title: 'Royal Master Suite',
          category: 'bedroom',
          categoryLabel: 'Bedroom',
          image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1200&auto=format&fit=crop',
          shortDesc: 'Bespoke king bedroom featuring tufted velvet headboard canopy, high-gloss PU lacquered nightstands, and gold trims.',
          materialsUsed: ['Tufted Italian Velvet', 'High Gloss PU Paint', 'Champagne Gold Hardware'],
          dimensions: '22ft x 18ft',
          completionDays: '35 Days',
          keyFeatures: [
            { icon: 'fa-solid fa-bed', title: 'Tufted Velvet Headboard', desc: 'Imperial deep-buttoned velvet backdrop with gold mirror frame.' },
            { icon: 'fa-solid fa-star', title: 'High-Gloss Piano Finish PU', desc: 'Mirror finish Italian ICA PU paint system on nightstands.' }
          ],
          colorPalette: [
            { name: 'Burgundy Velvet', hex: '#800020', isDarkText: false, usage: 'Tufted Bed Cushion' },
            { name: 'Pearl Beige', hex: '#EAE0D5', isDarkText: true, usage: 'Wall Silk Cover' },
            { name: 'Champagne Gold', hex: '#D4AF37', isDarkText: false, usage: 'Mirror Framing' }
          ],
          materials: [
            { id: 'royal-velvet-bed', title: 'Royal Velvet', subtitle: 'Heavyweight Velvet', image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=600&auto=format&fit=crop', materialType: 'Italian Silk Velvet', durability: 'Stain Repellent Grade' }
          ]
        },
        {
          id: 'lux-dining',
          title: 'Imperial Dining Room',
          category: 'dining',
          categoryLabel: 'Dining Area',
          image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=1200&auto=format&fit=crop',
          shortDesc: '10-seater onyx marble dining table with carved teak wood legs, mirrored wall arches, and warm crystal lighting.',
          materialsUsed: ['Onyx Marble Top', 'Hand-Carved Teak', 'Beveled Mirror Panels'],
          dimensions: '20ft x 15ft',
          completionDays: '30 Days',
          keyFeatures: [
            { icon: 'fa-solid fa-utensils', title: '10-Seater Onyx Table', desc: 'Translucent onyx marble table with internal ambient edge lighting.' },
            { icon: 'fa-solid fa-border-none', title: 'Beveled Mirror Arches', desc: 'Neo-classical arched mirror wall paneling reflecting grandeur.' }
          ],
          colorPalette: [
            { name: 'Honey Onyx', hex: '#D4AF37', isDarkText: false, usage: 'Onyx Table Slab' },
            { name: 'Onyx Black', hex: '#0F0F0F', isDarkText: false, usage: 'Teak Wood Legs' }
          ],
          materials: [
            { id: 'onyx-table-lux', title: 'Onyx Marble Slab', subtitle: 'Translucent Natural Stone', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop', materialType: 'Imported Honey Onyx', durability: 'Jewelry Polished Seal' }
          ]
        }
      ]
    },
    {
      id: 'japandi-minimalist',
      name: 'Japandi & Minimalist',
      tagline: 'Harmonious Blend of Japanese Zen Simplicity & Nordic Warmth',
      description: 'Subtle aesthetics focusing on natural organic textures, light oak timbers, textured clay lime wash walls, and low-slung functional furniture.',
      badge: 'Trending Design',
      keyFeatures: [
        { icon: 'fa-solid fa-leaf', title: 'Natural organic materials', desc: 'Light natural oak, cane webbing, linen, and raw unglazed ceramics.' },
        { icon: 'fa-solid fa-sun', title: 'Abundant warm ambient light', desc: 'Soft paper shade lighting, sliding Shoji screen accents, and natural daylighting.' },
        { icon: 'fa-solid fa-spa', title: 'Wabi-Sabi textures & limewash', desc: 'Textured microcement and lime plaster walls bringing earthy warmth.' },
        { icon: 'fa-solid fa-compress', title: 'Low-slung minimalist furniture', desc: 'Ergonomic seating positioned closer to ground level for serene openness.' }
      ],
      colorPalette: [
        { name: 'Warm Cream', hex: '#F3EFE0', isDarkText: true, usage: 'Limewash Walls' },
        { name: 'Natural Oak', hex: '#C6A989', isDarkText: true, usage: 'Furniture & Beams' },
        { name: 'Muted Earth', hex: '#A89F91', isDarkText: false, usage: 'Soft Textiles' },
        { name: 'Bamboo Moss', hex: '#7A8B7B', isDarkText: false, usage: 'Accent Planters' },
        { name: 'Soft Charcoal', hex: '#3B3B3B', isDarkText: false, usage: 'Slim Steel Framing' }
      ],
      materials: [
        {
          id: 'oak-timber',
          title: 'White Oak Timber',
          subtitle: 'Matte Oil Finish Oak',
          image: 'https://images.unsplash.com/photo-1546484475-7f7bd55792da?q=80&w=600&auto=format&fit=crop',
          materialType: 'FSC Certified White Oak',
          durability: 'Natural Eco-Sealer'
        },
        {
          id: 'microcement',
          title: 'Microcement',
          subtitle: 'Earthy Lime Plaster',
          image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600&auto=format&fit=crop',
          materialType: 'Mineral Plaster Coating',
          durability: 'Seamless Water Resistant'
        }
      ],
      gallery: [
        {
          id: 'jap-living',
          title: 'Zen Living Lounge',
          category: 'living',
          categoryLabel: 'Living Room',
          image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=1200&auto=format&fit=crop',
          shortDesc: 'Minimalist living area featuring microcement walls, low oak sofa platform, and paper pendant floor lamp.',
          materialsUsed: ['Microcement Plaster', 'White Oak Platform', 'Natural Linen Fabrics'],
          dimensions: '20ft x 15ft',
          completionDays: '25 Days',
          keyFeatures: [
            { icon: 'fa-solid fa-spa', title: 'Wabi-Sabi Lime Wash Walls', desc: 'Textured earthy mineral plaster with raw organic feel.' },
            { icon: 'fa-solid fa-couch', title: 'Low-Slung Oak Sofa Base', desc: 'Japanese inspired solid oak low platform with linen cushions.' }
          ],
          colorPalette: [
            { name: 'Warm Cream', hex: '#F3EFE0', isDarkText: true, usage: 'Limewash Plaster' },
            { name: 'Natural Oak', hex: '#C6A989', isDarkText: true, usage: 'Low Sofa Base' },
            { name: 'Bamboo Moss', hex: '#7A8B7B', isDarkText: false, usage: 'Bonsai & Planter' }
          ],
          materials: [
            { id: 'microcement-jap', title: 'Earthy Microcement', subtitle: 'Mineral Lime Plaster', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600&auto=format&fit=crop', materialType: 'Seamless Wall Coating', durability: 'Water Proof & Breathable' }
          ]
        },
        {
          id: 'jap-bedroom',
          title: 'Minimalist Bed Sanctuary',
          category: 'bedroom',
          categoryLabel: 'Bedroom',
          image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1200&auto=format&fit=crop',
          shortDesc: 'Low Tatami platform bed with woven cane wardrobe doors and warm concealed recessed headboard lighting.',
          materialsUsed: ['Natural Oak Timber', 'Cane Webbing', 'Wabi-Sabi Limewash'],
          dimensions: '16ft x 14ft',
          completionDays: '22 Days',
          keyFeatures: [
            { icon: 'fa-solid fa-bed', title: 'Low Tatami Platform Bed', desc: 'Minimalist ground-level oak frame with embedded recessed LED.' },
            { icon: 'fa-solid fa-border-all', title: 'Natural Rattan Cane Doors', desc: 'Handwoven breathable cane webbing wardrobe fronts.' }
          ],
          colorPalette: [
            { name: 'Light Oak', hex: '#C6A989', isDarkText: true, usage: 'Platform Frame' },
            { name: 'Muted Earth', hex: '#A89F91', isDarkText: false, usage: 'Linen Bedding' }
          ],
          materials: [
            { id: 'cane-webbing', title: 'Natural Cane Webbing', subtitle: 'Handwoven Rattan', image: 'https://images.unsplash.com/photo-1546484475-7f7bd55792da?q=80&w=600&auto=format&fit=crop', materialType: 'Natural Plant Fiber', durability: 'Breathable & Durable' }
          ]
        }
      ]
    }
  ];

  // Signals
  readonly activeThemeId = signal<string>('modern');
  readonly activeCategory = signal<string>('all');
  readonly selectedGalleryItemId = signal<string>('mod-tvunit');

  // Lightbox Modal State
  readonly selectedItem = signal<GalleryItem | null>(null);
  readonly isModalOpen = signal<boolean>(false);

  // Computed Active Theme
  readonly activeTheme = computed(() => {
    return this.themes.find(t => t.id === this.activeThemeId()) || this.themes[0];
  });

  // Filtered gallery items based on active theme & category filter
  readonly filteredGallery = computed(() => {
    const items = this.activeTheme().gallery;
    const cat = this.activeCategory();
    if (cat === 'all') {
      return items;
    }
    return items.filter(item => item.category === cat);
  });

  // Active selected item computed
  readonly selectedGalleryItem = computed(() => {
    const gallery = this.activeTheme().gallery;
    const found = gallery.find(item => item.id === this.selectedGalleryItemId());
    if (found) {
      return found;
    }
    // Fallback to first item in filtered list or first in theme
    const filtered = this.filteredGallery();
    return filtered.length > 0 ? filtered[0] : gallery[0];
  });

  // Dynamic 3-Part Data Computations
  readonly activeKeyFeatures = computed<KeyFeature[]>(() => {
    const item = this.selectedGalleryItem();
    if (item && item.keyFeatures && item.keyFeatures.length > 0) {
      return item.keyFeatures;
    }
    return this.activeTheme().keyFeatures;
  });

  readonly activeColorPalette = computed<ColorSwatch[]>(() => {
    const item = this.selectedGalleryItem();
    if (item && item.colorPalette && item.colorPalette.length > 0) {
      return item.colorPalette;
    }
    return this.activeTheme().colorPalette;
  });

  readonly activeMaterials = computed<MaterialSpec[]>(() => {
    const item = this.selectedGalleryItem();
    if (item && item.materials && item.materials.length > 0) {
      return item.materials;
    }
    return this.activeTheme().materials;
  });

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['theme'] && this.themes.some(t => t.id === params['theme'])) {
        this.activeThemeId.set(params['theme']);
        const firstItem = this.activeTheme().gallery[0];
        if (firstItem) {
          this.selectedGalleryItemId.set(firstItem.id);
        }
      }
      if (params['category']) {
        this.activeCategory.set(params['category']);
      }
    });
  }

  setTheme(themeId: string) {
    this.activeThemeId.set(themeId);
    this.activeCategory.set('all');
    const firstItem = this.activeTheme().gallery[0];
    if (firstItem) {
      this.selectedGalleryItemId.set(firstItem.id);
    }
  }

  setCategory(catId: string) {
    this.activeCategory.set(catId);
    const filtered = this.filteredGallery();
    if (filtered.length > 0) {
      this.selectedGalleryItemId.set(filtered[0].id);
    }
  }

  selectGalleryItem(item: GalleryItem, scroll: boolean = false) {
    this.selectedGalleryItemId.set(item.id);
    if (scroll && typeof document !== 'undefined') {
      const el = document.getElementById('catalogue-specs-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }

  openDesignDetails(item: GalleryItem) {
    this.selectedItem.set(item);
    this.isModalOpen.set(true);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.selectedItem.set(null);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  openConsultation() {
    this.closeModal();
    this.consultationModalService.open();
  }
}
