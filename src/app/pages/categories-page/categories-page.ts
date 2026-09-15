import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConsultationModalService } from '../../services/consultation-modal.service';
import { AdminDataService } from '../../services/admin-data.service';
import { ProjectsDataService, BackendDetailCategory } from '../../services/projects-data.service';
import { getApiBaseUrl, API_CONFIG } from '../../config/api.config';

export interface CategoryDetail {
  id: string;
  num: string;
  name: string;
  tagline: string;
  images: string[];
  desc: string;
  startingPrice: string;
  priceNumeric: number;
  turnaround: string;
  daysNumeric: number;
  filterTag: string;
  rating?: number;
  reviewsCount?: number;
  features: string[];
  scopeOfWork: string[];
}

export interface MaterialDetail {
  id: string;
  title: string;
  shortTitle: string;
  icon: string;
  subtitle: string;
  desc: string;
  highlights: string[];
}

@Component({
  selector: 'app-categories-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories-page.html',
  styleUrl: './categories-page.css',
})
export class CategoriesPage implements OnInit {
  readonly activeFilter = signal<string>('all');
  readonly searchQuery = signal<string>('');
  readonly activeMaterialTab = signal<string>('hdmr');
  readonly sortBy = signal<string>('recommended');
  readonly budgetFilter = signal<string>('all');

  // Active image index for each card
  readonly activeCardImageMap = signal<Record<string, number>>({});

  // Selected Category for Quick View Modal
  readonly selectedCategoryModal = signal<CategoryDetail | null>(null);
  readonly showAllModalHighlights = signal<boolean>(false);

  // Budget Calculator Signals
  readonly calcRoomType = signal<string>('2bhk');
  readonly calcPackage = signal<string>('premium');

  constructor(public consultationModalService: ConsultationModalService) { }

  readonly filterOptions = [
    { label: 'All Spaces', value: 'all' },
    { label: 'Kitchen', value: 'kitchen' },
    { label: 'Living Room', value: 'living' },
    { label: 'Bedroom', value: 'bedroom' },
    { label: 'Dining', value: 'dining' },
    { label: 'Wardrobes', value: 'wardrobe' },
    { label: 'Kids Room', value: 'kids' },
    { label: 'Bathroom', value: 'bathroom' },
    { label: 'Balcony', value: 'balcony' }
  ];

  readonly categories: CategoryDetail[] = [];

  readonly materials: MaterialDetail[] = [
    {
      id: 'hdmr',
      title: 'HDMR & Boiling Waterproof Plywood',
      shortTitle: 'HDMR Board',
      icon: 'fa-solid fa-layer-group',
      subtitle: 'Grade A Core Strength',
      desc: 'High-Density Moisture-Resistant (HDMR) boards engineered for maximum screw holding capacity, termite resistance, and zero swelling in humid climates.',
      highlights: ['100% Termite & Borer Proof', '25-Year Warranty', 'Zero Swelling in Water', 'High Screw Holding Strength']
    },
    {
      id: 'acrylic',
      title: 'High-Gloss Premium Acrylic & Veneer',
      shortTitle: 'Premium Acrylic',
      icon: 'fa-solid fa-gem',
      subtitle: 'Mirror Finish Elegance',
      desc: 'Ultra-glossy scratch-resistant acrylic sheets laminated onto HDMR core with 1mm anti-fingerprint technology for effortless cleaning.',
      highlights: ['Anti-Scratch & UV Resistant', 'Seamless Laser Edge Banding', 'Mirror-Like High Gloss', '50+ Designer Color Options']
    },
    {
      id: 'hardware',
      title: 'Blum & Hettich Premium Hardware',
      shortTitle: 'Blum Hardware',
      icon: 'fa-solid fa-gears',
      subtitle: 'Soft-Close Precision',
      desc: 'Top-tier soft-close hinges, quad-rail tandem drawers, and gas lifts tested for over 200,000 open-close cycles.',
      highlights: ['200,000 Cycle Tested', 'Lifetime Hardware Warranty', 'Silent Soft-Close Action', 'Heavy Weight Capacity (Up to 65kg)']
    },
    {
      id: 'quartz',
      title: 'Stain-Proof Quartz & Italian Slabs',
      shortTitle: 'Quartz Surface',
      icon: 'fa-solid fa-cubes',
      subtitle: 'Luxury Counter Surfaces',
      desc: 'Non-porous quartz countertops resistant to turmeric stains, hot pans, and scratches, available in seamless waterfall edge profiles.',
      highlights: ['Non-Porous & Hygienic', 'Stain & Heat Resistant', 'Custom Waterfall Edges', 'Natural Italian Marble Finishes']
    }
  ];

  projectsDataService = inject(ProjectsDataService);
  adminData = inject(AdminDataService);
  private route = inject(ActivatedRoute);

  readonly apiCategories = signal<CategoryDetail[]>([]);
  readonly isBackendLoaded = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const selectedType = params['type'] || params['filter'] || params['category'];
      if (selectedType) {
        const lower = selectedType.toLowerCase();
        const match = this.filterOptions.find(opt => opt.value === lower);
        if (match) {
          this.activeFilter.set(match.value);
        }
      }
    });

    this.loadCategoriesFromBackend();
  }

  loadCategoriesFromBackend() {
    this.isBackendLoaded.set(false);
    this.errorMessage.set(null);

    this.projectsDataService.getDetailCategoriesFromApi().subscribe({
      next: (backendList) => {
        const mapped = (backendList || []).map((b, idx) => this.mapBackendDetailCategoryToCategoryDetail(b, idx));
        this.apiCategories.set(mapped);
        this.isBackendLoaded.set(true);
      },
      error: (err) => {
        console.error('Backend detail categories fetch error:', err);
        this.apiCategories.set([]);
        this.errorMessage.set('We are currently unable to reach our server to load design categories. Please check your network connection and try again.');
        this.isBackendLoaded.set(true);
      }
    });
  }

  onImgError(event: Event) {
    const img = event.target as HTMLImageElement;
    if (img) {
      // Fallback to real uploaded image from Spring Boot backend
      img.src = `${API_CONFIG.baseUrl}/uploads/1340a24a-882e-4f3f-9cfe-9aa64c59d36f.avif`;
    }
  }

  private mapBackendDetailCategoryToCategoryDetail(b: BackendDetailCategory, idx: number): CategoryDetail {
    const defaultBackendImage = `${API_CONFIG.baseUrl}/uploads/1340a24a-882e-4f3f-9cfe-9aa64c59d36f.avif`;

    const images = (b.images && b.images.length > 0)
      ? b.images.map(img => this.projectsDataService.formatImageUrl(img))
      : [defaultBackendImage];

    const catType = (b.categoryType || 'all').toLowerCase();
    let filterTag = catType;
    if (catType.includes('kitchen')) filterTag = 'kitchen';
    else if (catType.includes('living')) filterTag = 'living';
    else if (catType.includes('kid') || catType.includes('child')) filterTag = 'kids';
    else if (catType.includes('bedroom') || catType.includes('bed')) filterTag = 'bedroom';
    else if (catType.includes('dining')) filterTag = 'dining';
    else if (catType.includes('wardrobe')) filterTag = 'wardrobe';
    else if (catType.includes('bath')) filterTag = 'bathroom';
    else if (catType.includes('balcony')) filterTag = 'balcony';

    return {
      id: b.slug || `cat-${b.detailCategoryId}`,
      num: String(b.displayOrder || (idx + 1)).padStart(2, '0'),
      name: b.title || 'Interior Category',
      tagline: b.subtitle || 'Bespoke Luxury & Modular Architecture',
      images: images,
      desc: b.description || '',
      startingPrice: '₹1.4 Lakhs',
      priceNumeric: 140000,
      turnaround: b.duration || '15-20 Days',
      daysNumeric: parseInt(b.duration || '20') || 20,
      filterTag: filterTag,
      rating: 4.9,
      reviewsCount: 184,
      features: (b.keyHighlights && b.keyHighlights.length > 0) ? b.keyHighlights : [],
      scopeOfWork: ['Turnkey Design', 'Material Selection', 'On-Site Execution', 'Quality Testing']
    };
  }

  get allCategoriesList(): CategoryDetail[] {
    return this.apiCategories();
  }

  // Dynamic Filtering & Sorting
  readonly filteredCategories = computed(() => {
    const filter = this.activeFilter();
    const query = this.searchQuery().toLowerCase().trim();
    const budget = this.budgetFilter();
    const sort = this.sortBy();

    let list = this.allCategoriesList.filter((cat) => {
      const matchesFilter = filter === 'all' || cat.filterTag === filter;
      const matchesQuery = !query ||
        cat.name.toLowerCase().includes(query) ||
        cat.desc.toLowerCase().includes(query) ||
        cat.tagline.toLowerCase().includes(query);

      let matchesBudget = true;
      if (budget === 'under1l') matchesBudget = cat.priceNumeric < 100000;
      else if (budget === '1l-1.5l') matchesBudget = cat.priceNumeric >= 100000 && cat.priceNumeric <= 150000;
      else if (budget === 'above1.5l') matchesBudget = cat.priceNumeric > 150000;

      return matchesFilter && matchesQuery && matchesBudget;
    });

    // Sorting
    if (sort === 'rating') {
      list = [...list].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    } else if (sort === 'popular') {
      list = [...list].sort((a, b) => (b.reviewsCount ?? 0) - (a.reviewsCount ?? 0));
    } else if (sort === 'turnaround') {
      list = [...list].sort((a, b) => a.daysNumeric - b.daysNumeric);
    } else if (sort === 'name-az') {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  });

  // Computed Budget Estimation
  readonly estimatedQuote = computed(() => {
    const room = this.calcRoomType();
    const pkg = this.calcPackage();

    let base = 250000;
    if (room === '1bhk') base = 220000;
    else if (room === '2bhk') base = 380000;
    else if (room === '3bhk') base = 560000;
    else if (room === '4bhk') base = 850000;
    else if (room === 'kitchen') base = 140000;

    let multiplier = 1;
    if (pkg === 'essential') multiplier = 0.85;
    else if (pkg === 'premium') multiplier = 1.0;
    else if (pkg === 'luxury') multiplier = 1.35;

    const total = Math.round(base * multiplier);
    const min = Math.round(total * 0.92);
    const max = Math.round(total * 1.08);

    return {
      min: (min / 100000).toFixed(2),
      max: (max / 100000).toFixed(2),
      display: `₹${(min / 100000).toFixed(2)} - ₹${(max / 100000).toFixed(2)} Lakhs`
    };
  });

  setFilter(filter: string) {
    this.activeFilter.set(filter);
  }

  setMaterialTab(tab: string) {
    this.activeMaterialTab.set(tab);
  }

  setImageIndex(catId: string, idx: number, event: Event) {
    event.stopPropagation();
    this.activeCardImageMap.update((map) => ({ ...map, [catId]: idx }));
  }

  getActiveImage(cat: CategoryDetail | null): string {
    if (!cat || !cat.images || cat.images.length === 0) {
      return `${API_CONFIG.baseUrl}/uploads/1340a24a-882e-4f3f-9cfe-9aa64c59d36f.avif`;
    }
    const idx = this.activeCardImageMap()[cat.id] || 0;
    return cat.images[idx] || cat.images[0];
  }

  openQuickView(cat: CategoryDetail, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.showAllModalHighlights.set(false);
    this.selectedCategoryModal.set(cat);
  }

  closeQuickView() {
    this.showAllModalHighlights.set(false);
    this.selectedCategoryModal.set(null);
  }

  toggleModalHighlights() {
    this.showAllModalHighlights.update(v => !v);
  }

  openConsultation(event: Event) {
    event.preventDefault();
    this.closeQuickView();
    this.consultationModalService.open();
  }
}
