import { Component, OnInit, OnDestroy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConsultationModalService } from '../../services/consultation-modal.service';

export interface LivingRoomItem {
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
  selector: 'app-living-room-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './living-room-page.html',
  styleUrl: './living-room-page.css'
})
export class LivingRoomPage implements OnInit, OnDestroy {
  private consultationModalService = inject(ConsultationModalService);

  // Active category filter
  readonly activeCategory = signal<string>('all');
  
  // Search query
  readonly searchQuery = signal<string>('');

  // Selected item for modal
  readonly selectedLivingRoom = signal<LivingRoomItem | null>(null);
  readonly isDetailModalOpen = signal<boolean>(false);
  readonly modalActiveImage = signal<string>('');

  // Lightbox for zoom
  readonly lightboxImage = signal<string | null>(null);

  // Living Room Database
  readonly livingRooms: LivingRoomItem[] = [
    {
      id: 'fluted-marble-tv-console',
      title: 'Fluted Charcoal & Marble TV Console',
      category: 'modern-luxury',
      categoryLabel: 'Modern Luxury',
      shortDesc: 'Acoustic fluted charcoal wall with floating marble TV console and warm LED cove backlighting.',
      tag: 'Best Seller',
      image: '/living/fluted-marble-tv-unit-living.jpg',
      galleryImages: ['/living/fluted-marble-tv-unit-living.jpg'],
      startingPrice: '₹1,85,000',
      dimensions: '18ft x 15ft Living Lounge (Customizable)',
      finishType: 'Acoustic Fluted Louvers + Bookmatched Italian Marble Console + Warm 3000K LED',
      features: [
        'Concealed wire management channel for zero-cable clutter',
        'Floating marble drawer console with German Blum soft-close runners',
        'Dual-tone oak and charcoal fluted acoustic paneling',
        'Smart remote-controlled diffused architectural cove lighting'
      ],
      materials: ['Italian Calacatta Marble', 'IS 710 Marine Grade Plywood', 'Blum Soft-Close Hardware', 'High-Density Charcoal Louvers'],
      highlights: [
        { icon: 'fa-solid fa-tv', title: 'Floating Marble Console', desc: 'Sleek floor-free design provides seamless robot vacuum cleaning and visual lightness.' },
        { icon: 'fa-solid fa-lightbulb', title: 'Ambient Cove Backlight', desc: 'Indirect warm LED halo eliminates TV screen glare for movie nights.' },
        { icon: 'fa-solid fa-volume-high', title: 'Acoustic Wall Panels', desc: 'Fluted surface minimizes room echo while adding rich 3D tactile depth.' }
      ]
    },
    {
      id: 'contemporary-minimalist-suite',
      title: 'Contemporary Warm Minimalist Suite',
      category: 'contemporary',
      categoryLabel: 'Contemporary',
      shortDesc: 'Clean low-profile linen sofa with travertine slab table, sheer drapes, and warm oak wall unit.',
      tag: 'Architect Choice',
      image: '/living/contemporary-minimalist-living.jpg',
      galleryImages: ['/living/contemporary-minimalist-living.jpg'],
      startingPrice: '₹1,65,000',
      dimensions: '20ft x 14ft Open Living Area (Customizable)',
      finishType: 'Matte Natural Oak + Textured Roman Plaster + Rough-Edge Travertine',
      features: [
        'Seamless built-in oak display shelving with concealed dimmable spotlights',
        'Ultra-deep low profile sectional sofa in high-durability Belgian linen',
        'Full-height double track sheer drape system for diffused sunlight',
        'Organic monolithic natural stone travertine coffee table'
      ],
      materials: ['European White Oak Veneer', 'Natural Travertine Stone', 'Belgian Stain-Resistant Linen', 'Concealed LED Aluminum Profiles'],
      highlights: [
        { icon: 'fa-solid fa-couch', title: 'Ergonomic Deep Seating', desc: 'Feather-down blend cushions designed for ultimate all-day family relaxation.' },
        { icon: 'fa-solid fa-sun', title: 'Natural Daylight Flow', desc: 'Light neutral tones maximize natural sun illumination across the room.' },
        { icon: 'fa-solid fa-lines-leaning', title: 'Built-in Oak Niche', desc: 'Integrated architectural shelving stores art books and artifacts gracefully.' }
      ]
    },
    {
      id: 'japandi-slatted-wood-lounge',
      title: 'Japandi Slatted Wood Partition Lounge',
      category: 'japandi',
      categoryLabel: 'Japandi Harmony',
      shortDesc: 'Vertical oak divider screen with low platform modular sofa and warm floor wash lighting.',
      tag: 'Trending Design',
      image: '/living/japandi-wood-slat-living.jpg',
      galleryImages: ['/living/japandi-wood-slat-living.jpg'],
      startingPrice: '₹1,45,000',
      dimensions: '16ft x 13ft Living & Foyer (Customizable)',
      finishType: 'Solid Natural Oak Rafters + Oatmeal Textured Bouclé + Walnut Low Table',
      features: [
        'Semi-private architectural slatted partition dividing entrance and living area',
        'Low-slung modular Japanese platform sofa on solid oak base',
        'Organic round solid walnut coffee table with beveled edge profile',
        'Concealed floor-recessed LED channel washing vertical wooden slats'
      ],
      materials: ['Seasoned American White Oak', 'Textured Oatmeal Bouclé Fabric', 'Solid Walnut Hardwood', 'Low-VOC Matte Eco Lacquer'],
      highlights: [
        { icon: 'fa-solid fa-border-none', title: 'Airy Spatial Divider', desc: 'Separates living and foyer spaces without blocking ambient airflow or natural light.' },
        { icon: 'fa-solid fa-spa', title: 'Zen Living Ambiance', desc: 'Minimalist clean horizontal lines induce immediate calm and tranquility.' },
        { icon: 'fa-solid fa-tree', title: 'Sustainable Solid Timber', desc: 'Responsibly harvested hardwood finished in chemical-free protective oils.' }
      ]
    },
    {
      id: 'royal-italian-marble-grandeur',
      title: 'Royal Italian Calacatta Marble Grandeur',
      category: 'modern-luxury',
      categoryLabel: 'High-End Luxury',
      shortDesc: 'Bookmatched Calacatta marble wall with brushed brass gold trim and emerald velvet armchairs.',
      tag: 'Ultra Luxury',
      image: '/living/royal-italian-marble-living.jpg',
      galleryImages: ['/living/royal-italian-marble-living.jpg'],
      startingPrice: '₹2,60,000',
      dimensions: '22ft x 16ft Grand Living Hall (Customizable)',
      finishType: 'Full-Slab Calacatta Marble + Brushed PVD Brass Gold + Velvet Upholstery',
      features: [
        'Symmetrical bookmatched Italian Calacatta marble feature backdrop',
        'Brushed titanium gold PVD coated metal border framing',
        'Curved ivory bouclé statement sofa paired with jewel-toned emerald chairs',
        'Integrated crown molding with multi-layered perimeter cove lighting'
      ],
      materials: ['Imported Calacatta Marble Slabs', 'PVD Gold Stainless Steel Trims', 'High-Resilience Molded Foam', 'Belgian Silk-Touch Velvet'],
      highlights: [
        { icon: 'fa-solid fa-gem', title: 'Bookmatched Marble Art', desc: 'Natural vein symmetry creates a breathtaking one-of-a-kind stone feature wall.' },
        { icon: 'fa-solid fa-crown', title: 'Titanium Brass Trim', desc: 'Scratch-proof PVD gold edging delivers royal distinction and permanence.' },
        { icon: 'fa-solid fa-wand-magic-sparkles', title: 'Curved Geometry', desc: 'Flowing sculptural sofa softens angular rooms for effortless hosting.' }
      ]
    },
    {
      id: 'modern-skyline-panoramic-lounge',
      title: 'Modern Skyline Panoramic Lounge',
      category: 'contemporary',
      categoryLabel: 'Open Concept',
      shortDesc: 'Curved modular sofa with full-span walnut media credenza, under-glow lighting, and balcony connection.',
      tag: 'New Launch',
      image: '/living/modern-skyline-lounge-living.jpg',
      galleryImages: ['/living/modern-skyline-lounge-living.jpg'],
      startingPrice: '₹2,10,000',
      dimensions: '20ft x 16ft Apartment Living (Customizable)',
      finishType: 'Rich American Walnut + Charcoal Suede Texture + Integrated Ambient Glow',
      features: [
        'Full-span 16ft floating walnut media credenza with push-to-open doors',
        'Large semicircular curved sofa designed for panoramic city skyline views',
        'Concealed LED underside illumination creating a floating furniture effect',
        'Custom geometric wool area rug complementing contemporary lines'
      ],
      materials: ['American Walnut Natural Veneer', 'BWP Marine Plywood Framework', 'Stain-Resistant Performance Fabric', 'New Zealand Wool Rug'],
      highlights: [
        { icon: 'fa-solid fa-building', title: 'Panoramic Layout', desc: 'Curved seating orientation captures exterior balcony views effortlessly.' },
        { icon: 'fa-solid fa-bolt', title: 'Continuous Media Unit', desc: 'Provides massive concealed storage for consoles, soundbars, and decors.' },
        { icon: 'fa-solid fa-moon', title: 'Evening Lounge Lighting', desc: 'Under-console glow creates warm, cozy nighttime hotel ambiance.' }
      ]
    },
    {
      id: 'scandinavian-cozy-oak-living',
      title: 'Scandinavian Cozy Oak & Library Living',
      category: 'japandi',
      categoryLabel: 'Scandinavian',
      shortDesc: 'Full-wall illuminated white oak library wall with soft cream bouclé sofa and natural jute rug.',
      tag: 'Cozy Living',
      image: '/living/scandinavian-cozy-living.jpg',
      galleryImages: ['/living/scandinavian-cozy-living.jpg'],
      startingPrice: '₹1,55,000',
      dimensions: '16ft x 14ft Family Living (Customizable)',
      finishType: 'White Oak Natural Grain + Integrated Shelf Warm Glow + Textured Bouclé',
      features: [
        'Floor-to-ceiling custom display bookcase with concealed vertical LED strips',
        'Comfort-focused cloud-soft bouclé 3-seater sofa with lumbar support pillows',
        'Hand-woven natural organic jute floor rug for tactile grounded warmth',
        'Minimalist solid oak central coffee table with smooth rounded child-safe corners'
      ],
      materials: ['European White Oak Hardwood', 'High-Density Acoustic Backing', 'Premium Wool-Bouclé Fabric', 'Natural Organic Jute'],
      highlights: [
        { icon: 'fa-solid fa-book-open', title: 'Integrated Library Wall', desc: 'Displays family memories, curated books, and artifacts with warm lighting.' },
        { icon: 'fa-solid fa-heart', title: 'Inviting Family Comfort', desc: 'Soft bouclé fabrics and natural textures create an irresistibly cozy room.' },
        { icon: 'fa-solid fa-shield-cat', title: 'Pet & Child Friendly', desc: 'Scratch-resistant natural finishes with rounded corner safety.' }
      ]
    }
  ];

  readonly filteredLivingRooms = computed(() => {
    const cat = this.activeCategory();
    const query = this.searchQuery().toLowerCase().trim();

    return this.livingRooms.filter(item => {
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

  openDetailModal(item: LivingRoomItem): void {
    this.selectedLivingRoom.set(item);
    this.modalActiveImage.set(item.galleryImages[0] || item.image);
    this.isDetailModalOpen.set(true);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  closeDetailModal(): void {
    this.isDetailModalOpen.set(false);
    this.selectedLivingRoom.set(null);
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
