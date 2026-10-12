import { Component, OnInit, OnDestroy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConsultationModalService } from '../../services/consultation-modal.service';

export interface BathroomItem {
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
  selector: 'app-luxury-bathroom-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './luxury-bathroom-page.html',
  styleUrl: './luxury-bathroom-page.css'
})
export class LuxuryBathroomPage implements OnInit, OnDestroy {
  private consultationModalService = inject(ConsultationModalService);

  // Active category filter
  readonly activeCategory = signal<string>('all');
  
  // Search query
  readonly searchQuery = signal<string>('');

  // Selected item for modal
  readonly selectedBathroom = signal<BathroomItem | null>(null);
  readonly isDetailModalOpen = signal<boolean>(false);
  readonly modalActiveImage = signal<string>('');

  // Lightbox for zoom
  readonly lightboxImage = signal<string | null>(null);

  // Luxury Bathroom Database
  readonly bathrooms: BathroomItem[] = [
    {
      id: 'floating-quartz-double-vanity',
      title: 'Floating Quartz Double Vanity Suite',
      category: 'modern-vanity',
      categoryLabel: 'Modern Quartz Vanity',
      shortDesc: 'Floating dual-sink quartz vanity with fluted oak drawers, LED backlit mirrors, and brass fixtures.',
      tag: 'Best Seller',
      image: '/bathrooms/floating-quartz-vanity-bathroom.jpg',
      galleryImages: ['/bathrooms/floating-quartz-vanity-bathroom.jpg'],
      startingPrice: '₹1,25,000',
      dimensions: '10ft x 8ft Master Bathroom (Customizable)',
      finishType: 'Nano-Sealed Calacatta Quartz Counter + Waterproof BWP Plywood + Brushed Gold Fixtures',
      features: [
        'Non-porous stain resistant Calacatta quartz integrated countertop',
        'Dual soft-close drawers with water-resistant interior organizers',
        'Touch-sensor de-fogger circular LED mirrors with warm 3000K halo glow',
        'Concealed plumbing and wall-hung toilet cistern integration'
      ],
      materials: ['Engineered Quartz Stone', 'IS 710 Marine Grade BWP Plywood', 'Blum Soft-Close Runners', 'PVD Champagne Brass Faucets'],
      highlights: [
        { icon: 'fa-solid fa-sink', title: 'Seamless Double Basins', desc: 'Saves busy morning rush time with dedicated his-and-hers grooming zones.' },
        { icon: 'fa-solid fa-water', title: '100% Waterproof Core', desc: 'Marine-grade IS 710 boiling water proof plywood prevents swelling and rot.' },
        { icon: 'fa-solid fa-lightbulb', title: 'Smart Halo Lighting', desc: 'Warm 3000K shadow-free vanity lighting ideal for skincare and grooming.' }
      ]
    },
    {
      id: 'italian-marble-spa-sanctuary',
      title: 'Italian Statuario Marble Spa Sanctuary',
      category: 'marble-spa',
      categoryLabel: 'Italian Marble Spa',
      shortDesc: 'Full Statuario marble wall cladding with freestanding soaking bathtub and walk-in rain shower.',
      tag: 'Ultra Luxury',
      image: '/bathrooms/italian-marble-spa-bathroom.jpg',
      galleryImages: ['/bathrooms/italian-marble-spa-bathroom.jpg'],
      startingPrice: '₹2,10,000',
      dimensions: '12ft x 10ft Luxury Suite (Customizable)',
      finishType: 'Imported Statuario Marble Slab + 12mm Toughened Glass + Thermostatic Rain Shower',
      features: [
        'Full-height bookmatched Italian marble wall panels with waterproof membrane',
        'Freestanding acrylic composite soaking tub with floor-mounted mixer tap',
        '12mm frameless toughened glass walk-in shower partition with anti-limescale seal',
        'Concealed linear floor drain with zero ponding slope engineering'
      ],
      materials: ['Imported Italian Statuario Marble', '12mm Saint-Gobain Toughened Glass', 'Thermostatic Brass Diverters', 'Anti-Skid Honed Stone Floor'],
      highlights: [
        { icon: 'fa-solid fa-bath', title: 'Architectural Soaking Tub', desc: 'Ergonomic double-ended soaking bath creates an authentic 5-star hotel retreat.' },
        { icon: 'fa-solid fa-gem', title: 'Bookmatched Vein Cladding', desc: 'Premium natural stone slabs add unmatched luxury permanence to master suites.' },
        { icon: 'fa-solid fa-shower', title: 'Raindrop Shower Niche', desc: 'Thermostatic ceiling rain head delivers gentle, pressure-balanced hydrotherapy.' }
      ]
    },
    {
      id: 'scandinavian-white-oak-vanity',
      title: 'Scandinavian White Oak & Fluted Vanity',
      category: 'scandinavian',
      categoryLabel: 'Scandinavian Spa',
      shortDesc: 'Natural European white oak vanity with fluted ceramic basins, ambient cove niches, and frameless glass.',
      tag: 'Trending Design',
      image: '/bathrooms/scandinavian-white-oak-bathroom.jpg',
      galleryImages: ['/bathrooms/scandinavian-white-oak-bathroom.jpg'],
      startingPrice: '₹95,000',
      dimensions: '8ft x 7ft Compact Luxury Bath (Customizable)',
      finishType: 'Natural White Oak Hardwood Veneer + High-Luster Ceramic + Matte Black Trims',
      features: [
        'Natural European white oak vanity finished in marine polyurethane clear coat',
        'Above-counter matte fluted artisan ceramic vessel sink',
        'Illuminated shampoo niche shelf with warm waterproof IP67 LED strip',
        'Space-efficient floating vanity design maximizing visible floor area'
      ],
      materials: ['European White Oak Hardwood Veneer', 'Vitreous China Ceramic Vessel', 'IP67 Waterproof LED Strips', 'Matte Black Brassware'],
      highlights: [
        { icon: 'fa-solid fa-tree', title: 'Natural Warm Oak', desc: 'Brings organic Scandinavian warmth into cool tiled bathroom spaces.' },
        { icon: 'fa-solid fa-cube', title: 'Illuminated Shower Niche', desc: 'Built-in recessed wall box keeps toiletries clean and within easy arm reach.' },
        { icon: 'fa-solid fa-shield-halved', title: 'Polyurethane Moisture Shield', desc: 'Multiple water-repellent sealer coats protect natural wood from high humidity.' }
      ]
    },
    {
      id: 'freestanding-tub-terrazzo-suite',
      title: 'Freestanding Tub & Terrazzo Master Suite',
      category: 'terrazzo-modern',
      categoryLabel: 'Contemporary Terrazzo',
      shortDesc: 'Organic stone terrazzo feature wall with architectural soaking tub and warm recessed shelf wash.',
      tag: 'Architect Choice',
      image: '/bathrooms/freestanding-tub-terrazzo-bathroom.jpg',
      galleryImages: ['/bathrooms/freestanding-tub-terrazzo-bathroom.jpg'],
      startingPrice: '₹1,75,000',
      dimensions: '11ft x 9ft Master Bath (Customizable)',
      finishType: 'Honed Venetian Terrazzo Slabs + Matte Stone Tub + Champagne Gold Fixtures',
      features: [
        'Honed Venetian terrazzo stone accent wall featuring micro-marble aggregates',
        'Seamless curved matte stone-resin bathtub with integrated overflow',
        'Brushed champagne gold floor-standing bath mixer with handheld sprayer',
        'Warm backlit floating ledge for candles, diffusers, and luxury bath amenities'
      ],
      materials: ['Italian Venetian Terrazzo', 'Mineral Stone-Resin Casting', 'Solid Forged Brass Fixtures', 'Anti-Microbial Epoxy Grouting'],
      highlights: [
        { icon: 'fa-solid fa-wand-magic-sparkles', title: 'Artisan Terrazzo Wall', desc: 'Playful yet sophisticated multi-stone pattern resistant to stains and water drops.' },
        { icon: 'fa-solid fa-temperature-arrow-up', title: 'Heat Retentive Tub', desc: 'Stone composite retains hot water temperature 30% longer than standard acrylic.' },
        { icon: 'fa-solid fa-sparkles', title: 'Champagne PVD Metal', desc: 'Tarnish-free luxury finish that repels hard water spots and fingerprints.' }
      ]
    },
    {
      id: 'minimalist-concrete-wabisabi-bath',
      title: 'Minimalist Concrete & Wabi-Sabi Spa',
      category: 'wabi-sabi',
      categoryLabel: 'Minimalist Wabi-Sabi',
      shortDesc: 'Monolithic micro-cement waterproof walls with floating concrete basin and teak wood slatted floor accents.',
      tag: 'Zen Modern',
      image: '/bathrooms/minimalist-concrete-spa-bathroom.jpg',
      galleryImages: ['/bathrooms/minimalist-concrete-spa-bathroom.jpg'],
      startingPrice: '₹1,40,000',
      dimensions: '9ft x 8ft Modern Bathroom (Customizable)',
      finishType: 'Seamless Micro-Cement Plaster + Teak Deck Accents + Gunmetal Wall-Mounted Taps',
      features: [
        'Grout-free continuous micro-cement wall and floor finish with zero mold lines',
        'Custom cast-in-place concrete washbasin with concealed slotted drain',
        'Removable seasoned teak slat mat for natural foot warmth in shower zone',
        'Concealed warm perimeter cove lighting grazing textured mineral walls'
      ],
      materials: ['Hydrophobic Micro-Cement Topcoat', 'Seasoned Burma Teak Decking', 'Gunmetal Matte Stainless Steel', 'Continuous Water Membrane'],
      highlights: [
        { icon: 'fa-solid fa-layer-group', title: 'Grout-Free Seamless Walls', desc: 'Eliminates dirty tile grout lines completely for effortless wipe-down cleaning.' },
        { icon: 'fa-solid fa-shoe-prints', title: 'Teak Foot Comfort', desc: 'Natural warm wood slats offer slip-free, warm tactile feeling underfoot.' },
        { icon: 'fa-solid fa-moon', title: 'Textured Light Grazing', desc: 'Hidden ceiling coves highlight the handcrafted, organic mineral texture.' }
      ]
    },
    {
      id: 'contemporary-backlit-vanity-suite',
      title: 'Contemporary Smart Backlit Vanity Suite',
      category: 'modern-vanity',
      categoryLabel: 'Smart Vanity Suite',
      shortDesc: 'Wall-hung dual drawer cabinet with smart touch de-mister mirror and anti-skid charcoal tile floor.',
      tag: 'New Launch',
      image: '/bathrooms/contemporary-backlit-vanity-bathroom.jpg',
      galleryImages: ['/bathrooms/contemporary-backlit-vanity-bathroom.jpg'],
      startingPrice: '₹1,15,000',
      dimensions: '10ft x 7ft Ensuite Bathroom (Customizable)',
      finishType: 'Anti-Fingerprint Acrylic Vanity + Touch Sensor De-fogger Mirror + Concealed Cistern',
      features: [
        'Dual drawer vanity with push-to-open sensor LED interior lighting',
        'High-definition mirror with smart color-temperature switching (3000K to 4500K)',
        'Built-in internal 230V razor & toothbrush charging dock in upper drawer',
        'Anti-skid R10 rated matte charcoal porcelain floor tiles for family safety'
      ],
      materials: ['Matte Acrylic Laminate', 'IS 710 BWP Plywood', 'Copper-Free Silver Mirror', 'High-Traffic Porcelain Floor Tiles'],
      highlights: [
        { icon: 'fa-solid fa-plug', title: 'Integrated In-Drawer Charging', desc: 'Charge trimmers, electric toothbrushes, and dryers with zero counter clutter.' },
        { icon: 'fa-solid fa-circle-notch', title: 'Smart Anti-Fog Demister', desc: 'Heating pad keeps mirror completely crystal-clear even after steaming hot showers.' },
        { icon: 'fa-solid fa-person-falling', title: 'Anti-Skid Safe Flooring', desc: 'R10 rated slip-resistant porcelain tiles protect toddlers and elderly family members.' }
      ]
    }
  ];

  readonly filteredBathrooms = computed(() => {
    const cat = this.activeCategory();
    const query = this.searchQuery().toLowerCase().trim();

    return this.bathrooms.filter(item => {
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

  openDetailModal(item: BathroomItem): void {
    this.selectedBathroom.set(item);
    this.modalActiveImage.set(item.galleryImages[0] || item.image);
    this.isDetailModalOpen.set(true);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  closeDetailModal(): void {
    this.isDetailModalOpen.set(false);
    this.selectedBathroom.set(null);
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
