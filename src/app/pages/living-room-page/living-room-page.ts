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

  readonly livingRooms: LivingRoomItem[] = [
    {
      id: 'arched-alcove-fluted-oak-living',
      title: 'Mediterranean Arched Alcoves & Fluted Oak Living Room',
      category: 'contemporary',
      categoryLabel: 'Contemporary Boho Living',
      shortDesc: 'Sculptural plaster wall arches with fluted wood center niche, cream modular sectional, round fluted table, and marble TV credenza.',
      tag: 'Trending Design',
      image: '/living/arched-alcove-fluted-oak-living.jpg',
      galleryImages: ['/living/arched-alcove-fluted-oak-living.jpg'],
      startingPrice: '₹2,45,000',
      dimensions: '20ft x 16ft Living Lounge (Customizable)',
      finishType: 'Textured Roman Plaster Arches + Natural Fluted Teak Louvers + Honed Calacatta Marble TV Slab',
      features: [
        'Bespoke triple-arch wall installation with botanical bas-relief plaster carvings and fluted wood insert',
        'Extra-deep modular L-shaped sectional sofa in stain-resistant cream woven linen',
        'Floating full-width white and warm oak TV media credenza under large wall-mounted screen',
        'Dual rounded bouclé swivel armchairs and sculptural fluted oak tamboured coffee table'
      ],
      materials: ['Natural Seasoned Oak Hardwood', 'Stain-Resistant Performance Linen Fabric', 'Textured Roman Mineral Plaster', 'IS 710 Marine Grade BWP Plywood'],
      highlights: [
        { icon: 'fa-solid fa-archway', title: 'Triple Plaster Arches', desc: 'Handcrafted relief botanical wall arches add sculptural depth and artisanal elegance.' },
        { icon: 'fa-solid fa-couch', title: 'Deep Modular Sectional', desc: 'Plush high-resilience foam seating designed for luxury family lounging and entertaining.' },
        { icon: 'fa-solid fa-tv', title: 'Floating Media Credenza', desc: 'Floor-clear floating unit makes cleaning effortless while concealing all wire clutter.' }
      ]
    },
    {
      id: 'traditional-heritage-teak-living',
      title: 'Royal Indian Heritage Teak & Jaali Living Room',
      category: 'classical',
      categoryLabel: 'Traditional Indian Heritage',
      shortDesc: 'Majestic Burma teak carved sofa suite with Tanjore gold foil art, CNC jaali divider screens, brass diyas, and matching TV console.',
      tag: 'Heritage Artistry',
      image: '/living/traditional-heritage-teak-living.jpg',
      galleryImages: ['/living/traditional-heritage-teak-living.jpg'],
      startingPrice: '₹2,95,000',
      dimensions: '22ft x 16ft Grand Living Hall (Customizable)',
      finishType: 'Handcrafted Seasoned Burma Teak + Intricate Wooden Jaali Screens + Gold Brass Artifacts',
      features: [
        'Authentic hand-carved solid teak wood 3-seater and 2-seater sofas with turned spindles and plush cream cushions',
        'Double-tier architectural teak jaali partition screens separating living from foyer or pooja area',
        'Centerpiece Tanjore 24K gold foil framed art piece with dedicated brass picture lighting',
        'Matching carved teak center table and full-length wooden media wall with open display columns'
      ],
      materials: ['100% Solid Seasoned Burma Teak Hardwood', 'High-Density Moulded PU Foam Cushions', 'Traditional Brass Hardware & Diyas', 'Natural Teak Wood Polish with Polyurethane Seal'],
      highlights: [
        { icon: 'fa-solid fa-tree', title: 'Solid Teak Woodcraft', desc: 'Generational heirloom hardwood furniture that only gains value and charm with time.' }
        ,
        { icon: 'fa-solid fa-om', title: 'Heritage Jaali Partition', desc: 'Hand-carved wooden latticework provides semi-private spatial separation.' },
        { icon: 'fa-solid fa-crown', title: '24K Tanjore Artwork Focus', desc: 'Illuminated traditional Indian art piece creates a dignified cultural focal point.' }
      ]
    },
    {
      id: 'blush-botanical-chandelier-luxury-living',
      title: 'Blush Botanical & Branching Chandelier Luxury Lounge',
      category: 'modern-luxury',
      categoryLabel: 'Modern Luxury Suite',
      shortDesc: 'Opulent living lounge with rose gold botanical paneling, statement brass branching chandelier, dusty rose velvet armchairs, and marble TV wall.',
      tag: 'Luxury Signature',
      image: '/living/blush-botanical-chandelier-luxury-living.jpg',
      galleryImages: ['/living/blush-botanical-chandelier-luxury-living.jpg'],
      startingPrice: '₹2,80,000',
      dimensions: '22ft x 15ft Open Living Lounge (Customizable)',
      finishType: 'Bespoke Botanical Wall Panels + PVD Gold Inlays + Calacatta Gold TV Console + Rose Velvet Accents',
      features: [
        'Full-height feature wall with hand-illustrated floral silhouette panels and vertical brass gold T-profiles',
        'Sculptural multi-bulb brass branch Sputnik chandelier serving as an illuminated ceiling statement',
        'Generous cream L-shaped sofa complemented by dual scallop-back dusty rose velvet armchairs',
        'Full-length floating TV entertainment credenza with Calacatta marble wall cladding and open display shelving'
      ],
      materials: ['High-Pressure Decorative Textured Laminate', 'PVD Brass Gold Stainless Steel Inlays', 'Imported Calacatta Gold Marble Slab', 'Stain-Resistant Dusty Rose Velvet'],
      highlights: [
        { icon: 'fa-solid fa-lightbulb', title: 'Branching Chandelier', desc: 'Organic modern lighting fixture casts multi-directional warm ambient glow.' },
        { icon: 'fa-solid fa-palette', title: 'Botanical Gold-Inlay Wall', desc: 'Delicate floral motifs framed with gold inlays create a serene designer backdrop.' },
        { icon: 'fa-solid fa-chair', title: 'Scalloped Velvet Chairs', desc: 'Jewel-toned velvet accent seating adds playful elegance and cozy comfort.' }
      ]
    },
    {
      id: 'terracotta-warm-earthy-living',
      title: 'Warm Terracotta & Linen Modular Living Lounge',
      category: 'contemporary',
      categoryLabel: 'Warm Earthy Minimalist',
      shortDesc: 'Inviting earthy living lounge with burnt terracotta feature wall, linen sectional, woven rattan chandelier, and floating low-line TV credenza.',
      tag: 'Warm & Earthy',
      image: '/living/terracotta-warm-earthy-living.jpg',
      galleryImages: ['/living/terracotta-warm-earthy-living.jpg'],
      startingPrice: '₹1,95,000',
      dimensions: '18ft x 14ft Living Space (Customizable)',
      finishType: 'Burnt Terracotta Matte Wall Finish + Natural Woven Rattan + Oiled Teak Coffee Table',
      features: [
        'Warm burnt terracotta accent wall providing an inviting, sun-baked earth color palette',
        'Hand-woven natural organic rattan pendant light and sheer dual-track linen drapery',
        'Deep modular low-profile cream sofa with rust & burnt amber velvet accent throw pillows',
        'Floating low-line white and oak TV entertainment credenza with open botanical plant shelves'
      ],
      materials: ['Low-VOC Eco-Friendly Mineral Paint', 'Solid Teak Wood Furniture', 'Natural Hand-Woven Rattan Basketry', 'Belgian Natural Linen Upholstery'],
      highlights: [
        { icon: 'fa-solid fa-sun', title: 'Inviting Terracotta Warmth', desc: 'Rich earth tones foster welcoming energy and coziness for family gatherings.' },
        { icon: 'fa-solid fa-feather', title: 'Organic Rattan Fixture', desc: 'Handcrafted woven pendant light creates beautiful geometric shadows at night.' },
        { icon: 'fa-solid fa-seedling', title: 'Biophilic Plant Styling', desc: 'Integrated indoor planters and window greenery bring nature into the living room.' }
      ]
    },
    {
      id: 'biophilic-botanical-oak-living',
      title: 'Biophilic Palm Botanical & Oak Panelling Living Room',
      category: 'contemporary',
      categoryLabel: 'Biophilic Botanical Living',
      shortDesc: 'Nature-immersive living room with tropical palm wallpaper, floating oak display ledges with indoor plants, cream sectional, and fluted TV wall.',
      tag: 'Biophilic Design',
      image: '/living/biophilic-botanical-oak-living.jpg',
      galleryImages: ['/living/biophilic-botanical-oak-living.jpg'],
      startingPrice: '₹2,65,000',
      dimensions: '20ft x 15ft Living Lounge (Customizable)',
      finishType: 'Bespoke Tropical Palm Wall Mural + Natural Oak Wall Panelling & Floating Ledges',
      features: [
        'Full-height custom botanical palm and monstera leaf wallpaper mural with organic earthy tones',
        'Two-tier solid oak floating display ledges adorned with cascading indoor plants and Buddha statue',
        'Generous L-shaped cream woven linen sectional sofa with forest green accent cushions',
        'Full-height vertical natural oak TV wall with integrated long dual-tone white & oak floating console'
      ],
      materials: ['Natural European White Oak Hardwood', 'High-Def Fabric-Backed Wallpaper', 'Stain-Resistant Performance Fabric', 'IS 710 Marine Grade BWP Plywood Core'],
      highlights: [
        { icon: 'fa-solid fa-leaf', title: 'Biophilic Living Wall', desc: 'Lush indoor greenery and botanical murals promote air freshness and relaxation.' },
        { icon: 'fa-solid fa-tv', title: 'Fluted Oak Media Wall', desc: 'Seamless floor-to-ceiling wood panelling creates a high-end architectural TV hub.' },
        { icon: 'fa-solid fa-couch', title: 'Deep Lounging Comfort', desc: 'Spacious corner chaise allows comfortable family gatherings and movie nights.' }
      ]
    },
    {
      id: 'olive-arch-rust-velvet-living',
      title: 'Olive Arch Niche & Rust Velvet Heritage Lounge',
      category: 'classical',
      categoryLabel: 'Arch Niche & Warm Velvet',
      shortDesc: 'Dramatic olive green Roman arch display niche with warm timber ceiling panelling, burnt rust sofa, solid teak coffee table, and marble TV wall.',
      tag: 'Trending Signature',
      image: '/living/olive-arch-rust-velvet-living.jpg',
      galleryImages: ['/living/olive-arch-rust-velvet-living.jpg'],
      startingPrice: '₹2,75,000',
      dimensions: '20ft x 14ft Living Room (Customizable)',
      finishType: 'Olive Green Roman Arch Wall Niche + Solid Teak Ceiling Louvers + Calacatta Marble TV Cladding',
      features: [
        'Recessed Roman arch feature wall in muted olive green with tiered floating wooden display shelves',
        'Warm acoustic slatted timber false ceiling section with integrated modern ceiling fan',
        'Plush 3-seater sofa and matching armchair in stain-proof burnt rust/terracotta velvet',
        'White Calacatta marble slab TV media wall paired with long white and teak floating cabinet'
      ],
      materials: ['Imported Italian Calacatta Marble', 'Solid Seasoned Teak Ceiling Rafters', 'High-Resilience Velvet Fabric', 'Natural Jute Woven Area Rug'],
      highlights: [
        { icon: 'fa-solid fa-archway', title: 'Recessed Roman Arch', desc: 'Architectural wall niche showcases artisanal terracotta pottery and greenery.' },
        { icon: 'fa-solid fa-layer-group', title: 'Timber Slatted Ceiling', desc: 'Natural wood false ceiling adds vertical warmth and acoustic sound absorption.' },
        { icon: 'fa-solid fa-gem', title: 'Marble TV Wall Credenza', desc: 'Luxury marble paneling delivers hotel-grade sophistication to the living space.' }
      ]
    },
    {
      id: 'duplex-double-height-grand-lounge',
      title: 'Duplex Double-Height Villa Grand Lounge',
      category: 'modern-luxury',
      categoryLabel: 'Double-Height Duplex Suite',
      shortDesc: 'Spectacular double-height villa living room with glass railing staircase, multi-globe cluster chandelier, fluted wood walls, and integrated dining area.',
      tag: 'Ultra Luxury',
      image: '/living/duplex-double-height-grand-lounge.jpg',
      galleryImages: ['/living/duplex-double-height-grand-lounge.jpg'],
      startingPrice: '₹4,50,000',
      dimensions: '26ft x 20ft Double-Height Hall (Customizable)',
      finishType: 'Double-Height Fluted Teak Acoustic Louvers + Toughened Glass Balustrades + Marble Steps',
      features: [
        'Cathedral double-height ceiling anchored by a cascade multi-globe glass sphere chandelier',
        'Cantilevered floating marble staircase with frameless toughened glass railing and teak handrail',
        'Architectural fluted teak double-height wall with curved arch niche and integrated indoor ficus tree',
        'Seamless visual flow into integrated mezzanine dining zone with 8-seater solid wood table'
      ],
      materials: ['Toughened Laminated Architectural Glass', 'Imported Botticino Marble Flooring', 'High-Density Acoustic Teak Louvers', 'Stainless Steel Concealed Glass Standoffs'],
      highlights: [
        { icon: 'fa-solid fa-building', title: 'Double-Height Grandeur', desc: 'Expansive vertical volume creates an awe-inspiring architectural luxury entrance.' },
        { icon: 'fa-solid fa-stairs', title: 'Floating Glass Staircase', desc: 'Minimalist cantilevered staircase allows light to flow unimpeded between floors.' },
        { icon: 'fa-solid fa-champagne-glasses', title: 'Unified Open Plan', desc: 'Effortlessly connects formal lounging, dining, and upper mezzanine living.' }
      ]
    },
    {
      id: 'mustard-emerald-color-block-living',
      title: 'Mustard Yellow & Emerald Color-Block Modern Living',
      category: 'contemporary',
      categoryLabel: 'Contemporary Color-Block',
      shortDesc: 'Vibrant living room with sunny mustard yellow chaise sectional, emerald green TV feature wall, vertical plant tower, and tribal kilim rug.',
      tag: 'Vibrant & Bold',
      image: '/living/mustard-emerald-color-block-living.jpg',
      galleryImages: ['/living/mustard-emerald-color-block-living.jpg'],
      startingPrice: '₹2,20,000',
      dimensions: '18ft x 14ft Contemporary Lounge (Customizable)',
      finishType: 'Matte Emerald Green & Warm Mustard Acrylic Wall Panels + Rich Walnut TV Credenza',
      features: [
        'High-impact dual-tone color blocking: Warm sunny mustard accent wall paired with rich forest emerald TV wall',
        'Spacious L-shaped chaise sectional sofa in premium durable mustard velvet upholstery',
        'Full-length wall-mounted walnut media credenza with multi-tier open vertical plant display tower',
        'Traditional tribal geometric pattern kilim wool rug grounding the vibrant color scheme'
      ],
      materials: ['Century BWP Marine Plywood Framework', 'Anti-Fingerprint Matte Acrylic Wall Cladding', 'Stain-Resistant High-Durability Velvet', 'Authentic Woven Kilim Rug'],
      highlights: [
        { icon: 'fa-solid fa-palette', title: 'Vibrant Color Harmony', desc: 'Energizing mustard and forest emerald combination inspires creativity and warmth.' },
        { icon: 'fa-solid fa-tv', title: 'Full-Span Walnut Credenza', desc: '14ft floating TV unit with ample closed drawers for entertainment accessories.' },
        { icon: 'fa-solid fa-seedling', title: 'Vertical Plant Tower', desc: 'Integrated wooden display column for air-purifying indoor plants and pottery.' }
      ]
    },
    {
      id: 'terracotta-fluted-marble-lounge',
      title: 'Terracotta & Fluted Marble Luxury Lounge',
      category: 'modern-luxury',
      categoryLabel: 'Modern Luxury Lounge',
      shortDesc: 'High-end conversation lounge with dual facing sofas, Calacatta marble TV wall, fluted teak louvers, rattan bell chandeliers, and terracotta accents.',
      tag: 'Architectural Elegance',
      image: '/living/terracotta-fluted-marble-lounge.jpg',
      galleryImages: ['/living/terracotta-fluted-marble-lounge.jpg'],
      startingPrice: '₹3,10,000',
      dimensions: '24ft x 16ft Formal Living Lounge (Customizable)',
      finishType: 'Calacatta Gold Marble Slab + Vertical Fluted Teak Louvers + Rattan Bell Chandelier Cluster',
      features: [
        'Dual-sofa conversational layout with L-sectional and facing 3-seater sofa for generous hosting',
        'Full-height Calacatta Gold marble TV wall flanked by warm architectural fluted teak louvers',
        'Trio cluster of suspended hand-woven organic rattan bell chandeliers with warm dimmable filament glow',
        'Round fluted oak coffee table with Italian white marble top and terracotta geometric area rug'
      ],
      materials: ['Bookmatched Calacatta Gold Marble Slab', 'Seasoned Teak Acoustic Slats', 'Natural Hand-Woven Rattan', 'IS 710 Marine Grade BWP Plywood Core'],
      highlights: [
        { icon: 'fa-solid fa-comments', title: 'Conversation Layout', desc: 'Facing dual sofas foster meaningful connection and comfortable family entertainment.' },
        { icon: 'fa-solid fa-gem', title: 'Marble & Fluted Wood Wall', desc: 'Timeless combination of Italian stone and natural wood creates rich tactile depth.' },
        { icon: 'fa-solid fa-lightbulb', title: 'Cluster Rattan Pendants', desc: 'Artisanal woven bell lights cast soft, decorative shadow patterns across the room.' }
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
