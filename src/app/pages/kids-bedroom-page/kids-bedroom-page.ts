import { Component, OnInit, OnDestroy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConsultationModalService } from '../../services/consultation-modal.service';

export interface KidsRoomItem {
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
  selector: 'app-kids-bedroom-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './kids-bedroom-page.html',
  styleUrl: './kids-bedroom-page.css'
})
export class KidsBedroomPage implements OnInit, OnDestroy {
  private consultationModalService = inject(ConsultationModalService);

  // Active category filter
  readonly activeCategory = signal<string>('all');
  
  // Search query
  readonly searchQuery = signal<string>('');

  // Selected item for modal
  readonly selectedKidsRoom = signal<KidsRoomItem | null>(null);
  readonly isDetailModalOpen = signal<boolean>(false);
  readonly modalActiveImage = signal<string>('');

  // Lightbox for zoom
  readonly lightboxImage = signal<string | null>(null);

  // Kids Room Database
  readonly kidsRooms: KidsRoomItem[] = [
    {
      id: 'botanical-safari-kids-suite',
      title: 'Botanical Safari & Study Bedroom Suite',
      category: 'theme-rooms',
      categoryLabel: 'Botanical & Study Suite',
      shortDesc: 'Nature-inspired children bedroom with sage green scalloped headboard, tropical palm mural, ergonomic study station, and illuminated oak wardrobe.',
      tag: 'Featured Design',
      image: '/kids/botanical-safari-kids-suite.jpg',
      galleryImages: ['/kids/botanical-safari-kids-suite.jpg'],
      startingPrice: '₹1,75,000',
      dimensions: '13ft x 11ft Kids Bedroom (Customizable)',
      finishType: 'Natural Teak & Sage Green Laminate + Custom Jungle Wall Mural',
      features: [
        'Upholstered velvet scalloped headboard in calming muted sage green',
        'Custom bespoke tropical palm and wildlife botanical wallpaper mural',
        'Full-height fitted wardrobe with fluted panels and warm LED display alcoves',
        'Ergonomic study desk with floating illuminated bookshelf and storage drawers'
      ],
      materials: ['Century Pro BWP Marine Core Plywood', 'Soft-Touch Matte Sage Green Laminate', 'Non-Toxic Child-Safe Waterborne Lacquer', 'Blum Soft-Close Drawer Runners'],
      highlights: [
        { icon: 'fa-solid fa-seedling', title: 'Nature Inspired Theme', desc: 'Calming botanical tones stimulate focus, creativity, and peaceful sleep.' },
        { icon: 'fa-solid fa-graduation-cap', title: 'Dedicated Study Zone', desc: 'Integrated desk with task lighting and book display shelves.' },
        { icon: 'fa-solid fa-shirt', title: 'Abundant Wardrobe Storage', desc: 'Full-length closets and open display niches keep the room clutter-free.' }
      ]
    },
    {
      id: 'scandinavian-trundle-bed-space-saver',
      title: 'Scandinavian 2-in-1 Trundle & Library Suite',
      category: 'trundle-storage',
      categoryLabel: 'Space-Saving Trundle',
      shortDesc: 'Clean Nordic single bed with pull-out concealed guest trundle, built-in display book ledge, and modular floating study station.',
      tag: 'Popular Choice',
      image: '/kids/scandi-trundle-library-kids.jpg',
      galleryImages: ['/kids/scandi-trundle-library-kids.jpg'],
      startingPrice: '₹1,45,000',
      dimensions: '11ft x 10ft Room Setup (Customizable)',
      finishType: 'Natural Warm Oak Woodgrain + Matte Ivory',
      features: [
        'Smooth roll-out trundle bed on heavy-duty rubberized wheels',
        'Full-height headboard library with front-facing book ledges',
        'Spacious ergonomic study desk with cable organizer grommet',
        'Wipe-clean anti-stain matte laminates that resist sketch pens'
      ],
      materials: ['Greenply BWP Marine Hardwood Core', 'Anti-Bacterial Synchronized Laminates', 'Hafele Heavy Duty Trundle Rollers', 'German Soft-Close Hinges'],
      highlights: [
        { icon: 'fa-solid fa-arrows-left-right', title: 'Smooth Trundle Rollout', desc: 'Rolls out silently for cousins and sleepover guests in seconds.' },
        { icon: 'fa-solid fa-book-open', title: 'Montessori Book Wall', desc: 'Front-facing covers encourage independent reading habits.' },
        { icon: 'fa-solid fa-brush', title: 'Wipe-Clean Surfaces', desc: 'Resists crayon, water paint, and marker stains effortlessly.' }
      ]
    },
    
    {
      id: 'montessori-toddler-play-suite',
      title: 'Montessori Toddler House Bed & Play Suite',
      category: 'montessori',
      categoryLabel: 'Montessori & Toddler',
      shortDesc: 'Low-floor wooden house frame bed fostering child independence, low-height open toy cubbies, and integrated soft activity rug zone.',
      tag: 'Toddler Sanctuary',
      image: '/kids/montessori-natural-wood-suite.jpg',
      galleryImages: ['/kids/montessori-natural-wood-suite.jpg'],
      startingPrice: '₹1,60,000',
      dimensions: '12ft x 10ft Play Room (Customizable)',
      finishType: 'Natural Solid Pine & Beechwood + Matte Pastel White',
      features: [
        'Floor-level house bed frame allowing toddlers to safely enter and exit',
        'Low-level toy storage bins allowing self-directed tidy up',
        'Integrated sensory activity board and magnetic chalkboard',
        '100% organic, non-toxic water-based clear wood coats'
      ],
      materials: ['Solid European Pine Wood', 'Eco-Certified Marine Plywood', 'Natural Organic Wax Finish', 'Non-Toxic Food-Grade Sealers'],
      highlights: [
        { icon: 'fa-solid fa-child-reaching', title: 'Independent Movement', desc: 'Zero fall risk floor bed empowers toddler confidence.' },
        { icon: 'fa-solid fa-cubes', title: 'Organized Toy Access', desc: 'Accessible shelving teaches children how to store and organize toys.' },
        { icon: 'fa-solid fa-tree', title: 'Solid Pine Wood Core', desc: 'Natural solid wood construction with smooth hand-sanded edges.' }
      ]
    },
    {
      id: 'sunny-yellow-teen-study-suite',
      title: 'Sunny Yellow & Grey Teen Study Suite',
      category: 'teen-study',
      categoryLabel: 'Teen Study & Storage',
      shortDesc: 'Vibrant yellow and warm grey teen bedroom with corner wardrobe, illuminated L-shaped study desk, and floating display shelves.',
      tag: 'Trending Design',
      image: '/kids/sunny-yellow-teen-study-suite.jpg',
      galleryImages: ['/kids/sunny-yellow-teen-study-suite.jpg'],
      startingPrice: '₹1,95,000',
      dimensions: '14ft x 12ft Teen Bedroom (Customizable)',
      finishType: 'Matte Mustard Yellow & Light Oak Laminate + Warm LED Cove',
      features: [
        'Floor-to-ceiling corner wardrobe with fluted yellow feature panel',
        'Upholstered grey channeled headboard with warm backlit ambient glow',
        'Extended L-shaped study workstation with integrated storage drawers and ergonomic desk chair',
        'Illuminated open shelving unit displaying books, planters, and collectibles'
      ],
      materials: ['Century Pro Marine BWP Core Plywood', 'Anti-Fingerprint Matte Yellow Laminate', 'Natural Oak Finish Shelving', 'Blum Soft-Close Runners'],
      highlights: [
        { icon: 'fa-solid fa-sun', title: 'Energizing Color Palette', desc: 'Sunny yellow and neutral grey combination inspires creativity and study focus.' },
        { icon: 'fa-solid fa-laptop-code', title: 'L-Shaped Study Hub', desc: 'Spacious corner desk accommodates laptop, textbooks, and art supplies.' },
        { icon: 'fa-solid fa-shirt', title: 'Smart Corner Storage', desc: 'Full-height wardrobe with loft modules maximizes room storage.' }
      ]
    },
    {
      id: 'sky-blue-loft-bunk-study-suite',
      title: 'Sky Blue Multi-Level Loft Bunk & Study Suite',
      category: 'bunk-loft',
      categoryLabel: 'Loft Bunk & Study',
      shortDesc: 'Architectural dual-tier loft bunk bed with built-in storage staircase, lower daybed, under-bed drawers, and window study station.',
      tag: 'Best Seller',
      image: '/kids/sky-blue-loft-bunk-study-suite.jpg',
      galleryImages: ['/kids/sky-blue-loft-bunk-study-suite.jpg'],
      startingPrice: '₹2,35,000',
      dimensions: '14ft x 12ft Sibling Room (Customizable)',
      finishType: 'Sky Blue & Arctic White High-Pressure Laminate + Solid Wood Rungs',
      features: [
        'Dual-level sleeping capacity with sturdy safety guardrails on top bunk',
        'Integrated side staircase where every step doubles as a deep pull-out toy drawer',
        'Under-bed smooth roll-out storage drawers for seasonal bedding',
        'Long study desk positioned by window for natural daylight with overhead book cubbies'
      ],
      materials: ['IS 710 Marine Grade BWP Plywood', 'Anti-Scratch Matte Sky Blue Laminate', 'Heavy-Duty Steel Corner Brackets', 'Child-Safe Non-Toxic Edge Banding'],
      highlights: [
        { icon: 'fa-solid fa-stairs', title: 'Staircase Storage Drawers', desc: 'Safe climbing steps with hidden pull-out storage for toys and clothes.' },
        { icon: 'fa-solid fa-bed', title: 'Dual Sleeping Capacity', desc: 'Ideal for siblings or sleepovers without sacrificing floor play area.' },
        { icon: 'fa-solid fa-book-open', title: 'Integrated Study Nook', desc: 'Full-length window study desk with overhead illuminated library shelves.' }
      ]
    },
    {
      id: 'cosmic-astronaut-space-explorer-suite',
      title: 'Cosmic Astronaut Space Explorer Suite',
      category: 'theme-rooms',
      categoryLabel: 'Space Explorer Theme',
      shortDesc: 'Immersive space adventure bedroom with custom astronaut mural, channel headboard, display library, and planet study zone.',
      tag: 'Kids Favorite',
      image: '/kids/cosmic-astronaut-space-explorer-suite.jpg',
      galleryImages: ['/kids/cosmic-astronaut-space-explorer-suite.jpg'],
      startingPrice: '₹2,10,000',
      dimensions: '13ft x 12ft Explorer Suite (Customizable)',
      finishType: 'Cosmic Navy Blue & Clean White Laminate + Custom Space Wall Mural',
      features: [
        'Large bespoke space explorer wallpaper mural featuring astronauts and orbiting planets',
        'Upholstered plush blue channeled headboard with under-bed hydraulic storage',
        'Floor-to-ceiling tall open toy display bookcase with integrated warm spotlighting',
        'Ergonomic study desk with pegboard organizer and spacious stationery drawers'
      ],
      materials: ['Century BWP Marine Plywood Core', 'Scratch-Proof Matte Navy Laminate', 'Digital High-Def Fabric Wallpaper', 'Soft-Close European Dampers'],
      highlights: [
        { icon: 'fa-solid fa-rocket', title: 'Thematic Space Adventure', desc: 'Sparks curiosity in science, astronomy, and imaginative exploration.' },
        { icon: 'fa-solid fa-globe', title: 'Showcase Display Tower', desc: 'Open display shelves for model rockets, globes, and science books.' },
        { icon: 'fa-solid fa-graduation-cap', title: 'Pegboard Study Desk', desc: 'Customizable pegboard and wide desk surface for school projects.' }
      ]
    },
    {
      id: 'pastel-rainbow-cloud-daybed-suite',
      title: 'Pastel Cloud & Arched Halo Daybed Suite',
      category: 'theme-rooms',
      categoryLabel: 'Pastel Fantasy Suite',
      shortDesc: 'Dreamy pastel bedroom featuring illuminated double-arch halo headboard, cloud wall lights, fluted accents, and bay window bench.',
      tag: 'Luxury Signature',
      image: '/kids/pastel-rainbow-cloud-daybed-suite.jpg',
      galleryImages: ['/kids/pastel-rainbow-cloud-daybed-suite.jpg'],
      startingPrice: '₹2,25,000',
      dimensions: '14ft x 13ft Fantasy Suite (Customizable)',
      finishType: 'Dusty Rose, Terracotta & Soft Sky Blue Acoustic Panelling + Concealed Halo LED',
      features: [
        'Sculptural scalloped velvet headboard set against illuminated dual-tone concentric arches',
        'Ambient glowing cloud wall sconces and decorative golden stars',
        'Cozy bay window storage bench with plush seating cushion and throw pillows',
        'Full-height arched wardrobe and matching study desk with ergonomic peach office chair'
      ],
      materials: ['Acoustic Foam Padded Wall Panelling', 'Stain-Resistant Dusty Rose Velvet', 'IS 710 Marine Grade Plywood', 'Warm 3000K Diffused LED Strips'],
      highlights: [
        { icon: 'fa-solid fa-wand-magic-sparkles', title: 'Illuminated Arch Halo', desc: 'Concealed warm halo cove creates a magical, gentle bedtime nightlight.' },
        { icon: 'fa-solid fa-couch', title: 'Bay Window Daybed Bench', desc: 'Perfect sunlit reading nook with built-in toy storage compartments below.' },
        { icon: 'fa-solid fa-cloud', title: 'Cloud Motif Millwork', desc: 'Whimsical cloud appliques and soft fluted louvers bring fairytale charm.' }
      ]
    },
    {
      id: 'nordic-oak-sage-triple-bunk-suite',
      title: 'Nordic Oak & Sage Green 3-in-1 Trundle Bunk Suite',
      category: 'bunk-loft',
      categoryLabel: 'Triple Bunk & Trundle',
      shortDesc: 'Space-maximizing solid oak bunk bed with smooth roll-out guest trundle, overhead cabinetry, forest mural, and corner study desk.',
      tag: 'Top Innovation',
      image: '/kids/nordic-oak-sage-triple-bunk-suite.jpg',
      galleryImages: ['/kids/nordic-oak-sage-triple-bunk-suite.jpg'],
      startingPrice: '₹2,50,000',
      dimensions: '14ft x 13ft Sibling Room (Customizable)',
      finishType: 'Natural Teak & Sage Green Laminate + Seamless Overhead Storage Lofts',
      features: [
        '3-sleeper configuration: Upper bunk, lower bed, and smooth pull-out bottom trundle bed',
        'Solid hardwood ladder with rounded hand-grips and anti-slip rungs',
        'Full overhead wall bridge cabinets maximizing vertical ceiling storage',
        'Corner study desk with integrated vertical bookshelf and paper lantern pendant lamp'
      ],
      materials: ['European Birch & Seasoned Teak Plywood', 'Anti-Bacterial Sage Green Matte Laminate', 'Heavy-Duty Rubberized Trundle Wheels', 'Hafele Heavy Load Bed Fittings'],
      highlights: [
        { icon: 'fa-solid fa-people-roof', title: 'Accommodates 3 Sleepers', desc: 'Two bunks plus pull-out trundle bed provide ultimate sleepover versatility.' },
        { icon: 'fa-solid fa-boxes-stacked', title: 'Wall-Bridge Overhead Lofts', desc: 'Over-bed cabinets utilize full ceiling height for bulky storage.' },
        { icon: 'fa-solid fa-tree', title: 'Forest Mountain Mural', desc: 'Calming woodland landscape encourages connection with nature.' }
      ]
    },
    {
      id: 'blossom-pink-arch-princess-suite',
      title: 'Blossom Pink & Arch Wardrobe Princess Suite',
      category: 'theme-rooms',
      categoryLabel: 'Princess & Floral Suite',
      shortDesc: 'Charming pastel pink bedroom with dual-tone arched wardrobe, scalloped halo headboard, cherry blossom mural, and corner study workstation.',
      tag: 'Trending Design',
      image: '/kids/blossom-pink-arch-princess-suite.jpg',
      galleryImages: ['/kids/blossom-pink-arch-princess-suite.jpg'],
      startingPrice: '₹2,20,000',
      dimensions: '13ft x 12ft Bedroom (Customizable)',
      finishType: 'Blush Pink & Milk White Matte Laminate + Cherry Blossom Accent Wall',
      features: [
        'Dual-tone floor-to-ceiling wardrobe with elegant white Roman arch inset',
        'Scalloped pink velvet headboard with backlit warm LED halo illumination',
        'Integrated corner study table with illuminated overhead display cabinets and drawers',
        'Hand-painted style cherry blossom wallpaper mural and matching floral upholstery'
      ],
      materials: ['IS 710 Marine Grade BWP Plywood Core', 'Matte Anti-Fingerprint Blush Laminate', 'Stain-Resistant Flocked Velvet Fabric', 'Blum Soft-Close Runners & Hinges'],
      highlights: [
        { icon: 'fa-solid fa-archway', title: 'Roman Arch Wardrobe', desc: 'Bespoke two-tone wardrobe doors create an elegant architectural statement.' },
        { icon: 'fa-solid fa-wand-magic-sparkles', title: 'Halo Scalloped Headboard', desc: 'Backlit curved velvet headboard provides gentle evening reading ambience.' },
        { icon: 'fa-solid fa-pen-ruler', title: 'Window Study Station', desc: 'L-shaped desk positioned beside the window for natural study lighting.' }
      ]
    },
    {
      id: 'blush-sage-floating-desk-suite',
      title: 'Blush Pink & Sage Pastel Study Suite',
      category: 'teen-study',
      categoryLabel: 'Pastel Study & Wall Art',
      shortDesc: 'Modern aesthetic bedroom with wall color-block geometry, floating drawer desk, butterfly halo wall sconces, and fluted sage panelling.',
      tag: 'Modern Aesthetic',
      image: '/kids/blush-sage-floating-desk-suite.jpg',
      galleryImages: ['/kids/blush-sage-floating-desk-suite.jpg'],
      startingPrice: '₹1,85,000',
      dimensions: '12ft x 11ft Bedroom (Customizable)',
      finishType: 'Dusty Rose & Sage Green Acoustic Louvers + Matte Laminates',
      features: [
        'Minimalist wall-mounted cantilever study desk with rose quartz tabletop',
        'Overhead floating closed cabinets and warm-lit open display shelving',
        'Fluted vertical sage wall panelling adorned with glowing butterfly sconces',
        'Cozy channel-stitched pink headboard with side halo illumination'
      ],
      materials: ['Century BWP Plywood Construction', 'Scratch-Proof Matte Pastel Laminates', 'Warm 3000K Diffused LED Accent Lights', 'Heavy-Duty Wall Cantilever Brackets'],
      highlights: [
        { icon: 'fa-solid fa-shapes', title: 'Geometric Color Blocking', desc: 'Concentric circle and arch wall murals add playful modern sophistication.' },
        { icon: 'fa-solid fa-desktop', title: 'Floating Ergonomic Desk', desc: 'Leg-free cantilever study desk ensures effortless cleaning and airy feel.' },
        { icon: 'fa-solid fa-lightbulb', title: 'Glowing Butterfly Sconces', desc: 'Whimsical backlit wall accents provide a comforting nighttime nightlight.' }
      ]
    },
    {
      id: 'sibling-harmony-pink-teal-twin-suite',
      title: 'Sibling Harmony Pink & Teal Twin Bedroom',
      category: 'bunk-loft',
      categoryLabel: 'Sibling Twin Suite',
      shortDesc: 'Symmetrical twin bedroom suite with shared central multi-door wardrobe, individual pink & teal scalloped beds, and classic wall panel moldings.',
      tag: 'Perfect for Siblings',
      image: '/kids/sibling-harmony-pink-teal-twin-suite.jpg',
      galleryImages: ['/kids/sibling-harmony-pink-teal-twin-suite.jpg'],
      startingPrice: '₹2,60,000',
      dimensions: '16ft x 13ft Sibling Suite (Customizable)',
      finishType: 'Dual Rose & Ocean Teal Accent Walls + Off-White Classic Panelled Wardrobe',
      features: [
        'Dual twin-size beds with customized velvet shell-scallop headboards in rose and teal',
        'Central floor-to-ceiling wardrobe with dedicated color-coded bottom drawer units',
        'Dual symmetrical side windows dressed in Roman blinds for balanced daylight',
        'Classic neoclassical wall molding panels with framed inspirational nursery art'
      ],
      materials: ['Greenply Marine Grade BWP Plywood', 'Durable Polyurethane Deco Paint Finish', 'Premium Flocked Velvet Bed Linings', 'Hettich German Drawer Systems'],
      highlights: [
        { icon: 'fa-solid fa-people-arrows', title: 'Balanced Sibling Living', desc: 'Offers personalized color individuality while maintaining cohesive room symmetry.' },
        { icon: 'fa-solid fa-door-closed', title: 'High-Capacity Shared Closet', desc: 'Full-height center wardrobe splits storage equally for both kids.' },
        { icon: 'fa-solid fa-certificate', title: 'Neoclassical Wall Trim', desc: 'Timeless architectural wall mouldings that seamlessly grow with children.' }
      ]
    },
    {
      id: 'botanical-palm-sage-teen-suite',
      title: 'Botanical Palm & Olive Green Teen Suite',
      category: 'teen-study',
      categoryLabel: 'Eco Teen Study Suite',
      shortDesc: 'Nature-inspired teen bedroom featuring botanical banana leaf wall mural, vertical fluted oak accent wall, green velvet bed, and window study desk.',
      tag: 'Biophilic Design',
      image: '/kids/botanical-palm-sage-teen-suite.jpg',
      galleryImages: ['/kids/botanical-palm-sage-teen-suite.jpg'],
      startingPrice: '₹2,15,000',
      dimensions: '14ft x 12ft Teen Suite (Customizable)',
      finishType: 'Olive Green & Natural Teak Fluted Wood + Hand-Painted Leaf Mural',
      features: [
        'Channel-tufted upholstered bed in earthy olive green velvet',
        'Vertical natural oak slatted wall panels paired with biophilic leaf art',
        'Floor-to-ceiling multi-shelf library with warm LED under-shelf strip lighting',
        'Extended ergonomic study desk overlooking the window with matching olive swivel chair'
      ],
      materials: ['Century Ply BWP Core Plywood', 'Natural Oak Wood Veneer Slats', 'Anti-Bacterial Matte Olive Laminate', 'Eco-Friendly Zero-VOC Wall Paint'],
      highlights: [
        { icon: 'fa-solid fa-leaf', title: 'Biophilic Plant Integration', desc: 'Dedicated warm-lit display shelves for indoor air-purifying plants and books.' },
        { icon: 'fa-solid fa-lines-leaning', title: 'Acoustic Wood Slats', desc: 'Natural fluted wood panelling absorbs noise for undisturbed focus and study.' },
        { icon: 'fa-solid fa-laptop', title: 'Sunlit Window Workstation', desc: 'Dual-drawer desk positioned for maximum daylight productivity.' }
      ]
    },
    {
      id: 'warm-oak-vanilla-teen-study-suite',
      title: 'Warm Oak & Vanilla Minimalist Teen Suite',
      category: 'teen-study',
      categoryLabel: 'Nordic Teen Suite',
      shortDesc: 'Japandi-inspired minimalist teen suite with expansive wall-bridge wardrobes, integrated corner bookshelf library, and long study workstation.',
      tag: 'Space Maximizer',
      image: '/kids/warm-oak-vanilla-teen-study-suite.jpg',
      galleryImages: ['/kids/warm-oak-vanilla-teen-study-suite.jpg'],
      startingPrice: '₹2,40,000',
      dimensions: '15ft x 13ft Teen Suite (Customizable)',
      finishType: 'Warm Amber Oak Veneer & Cashmere Vanilla Matte Laminate',
      features: [
        'Full-perimeter bridge wardrobe and overhead lofts optimizing vertical storage',
        'Extensive L-shaped study desk accommodating laptop, secondary monitor, and book organizers',
        'Floor-to-ceiling corner display shelving with ambient warm 3000K LED illumination',
        'Padded upholstered linen bed frame with soft neutral floral bedding'
      ],
      materials: ['IS 710 Boiling Water Proof Hardwood Marine Plywood', 'Synchronized Textured Oak Laminates', 'Blum Soft-Close Dampers', 'Brushed Brass Slim Bar Handles'],
      highlights: [
        { icon: 'fa-solid fa-cubes-stacked', title: 'Full Wall Bridge Storage', desc: 'Seamless floor-to-ceiling cabinetry stores wardrobe, winter wear, and study material.' },
        { icon: 'fa-solid fa-book', title: 'Illuminated Corner Library', desc: 'Corner vertical shelves maximize dead space for books and decorative mementos.' },
        { icon: 'fa-solid fa-spa', title: 'Timeless Japandi Palette', desc: 'Warm oak and cashmere vanilla finish creates a serene study and sleep sanctuary.' }
      ]
    }
  ];

  readonly filteredKidsRooms = computed(() => {
    const cat = this.activeCategory();
    const query = this.searchQuery().toLowerCase().trim();

    return this.kidsRooms.filter(item => {
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

  openDetailModal(item: KidsRoomItem): void {
    this.selectedKidsRoom.set(item);
    this.modalActiveImage.set(item.galleryImages[0] || item.image);
    this.isDetailModalOpen.set(true);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  closeDetailModal(): void {
    this.isDetailModalOpen.set(false);
    this.selectedKidsRoom.set(null);
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
