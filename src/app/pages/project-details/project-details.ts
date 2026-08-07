import { Component, OnInit, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProjectsDataService, ProjectItem } from '../../services/projects-data.service';
import { ConsultationModalService } from '../../services/consultation-modal.service';

export interface ProjectBlockItem {
  id: string;
  name: string;
  tag: string;
  specs: string;
  homeCount: number;
  iconClass: string;
  selectedImageIndex: number;
  mainImages: string[];
}

export interface PopupRoomCategory {
  id: string;
  name: string;
  count: number;
  iconClass: string;
}

export interface PopupGalleryPhoto {
  id: number;
  title: string;
  category: string;
  url: string;
}

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './project-details.html',
  styleUrl: './project-details.css'
})
export class ProjectDetails implements OnInit {
  project = signal<ProjectItem | null>(null);
  activeImageIndex = signal<number>(0);
  showLightbox = signal<boolean>(false);

  activeBlockFilter = signal<string>('all');

  // POPUP GALLERY MODAL SIGNALS
  showGalleryModal = signal<boolean>(false);
  selectedModalBlock = signal<ProjectBlockItem | null>(null);
  activeRoomCategory = signal<string>('all');
  modalCurrentPage = signal<number>(1);
  isSlideshowPlaying = signal<boolean>(false);
  private slideshowTimer: any = null;

  // INLINE EXPANDED PHOTO PREVIEW SIGNAL inside Popup Modal
  activeModalPhotoIndex = signal<number>(-1);

  blocks = signal<ProjectBlockItem[]>([
    {
      id: 'block-a',
      name: 'Block A',
      tag: 'Luxury Villa Suites',
      specs: '4 Residences • 3,500 Sq.Ft',
      homeCount: 4,
      iconClass: 'fa-solid fa-building-user',
      selectedImageIndex: 0,
      mainImages: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000&auto=format&fit=crop'
      ]
    },
    {
      id: 'block-b',
      name: 'Block B',
      tag: 'Chef Kitchen & Dining',
      specs: '3 Residences • Modern German Modular',
      homeCount: 3,
      iconClass: 'fa-solid fa-utensils',
      selectedImageIndex: 0,
      mainImages: [
        'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600573472591-ee6c563aaec9?q=80&w=1000&auto=format&fit=crop'
      ]
    },
    {
      id: 'block-c',
      name: 'Block C',
      tag: 'Penthouse & Bed Suites',
      specs: '3 Residences • Italian Marble Finishes',
      homeCount: 3,
      iconClass: 'fa-solid fa-bed',
      selectedImageIndex: 0,
      mainImages: [
        'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000&auto=format&fit=crop'
      ]
    }
  ]);

  roomCategories: PopupRoomCategory[] = [
    { id: 'all', name: 'All Photos', count: 12, iconClass: 'fa-regular fa-images' },
    { id: 'living', name: 'Living Room', count: 2, iconClass: 'fa-solid fa-couch' },
    { id: 'kitchen', name: 'Kitchen', count: 2, iconClass: 'fa-solid fa-utensils' },
    { id: 'master-bed', name: 'Master Bedroom', count: 2, iconClass: 'fa-solid fa-bed' },
    { id: 'bed-2', name: 'Bedroom 2', count: 1, iconClass: 'fa-solid fa-hotel' },
    { id: 'dining', name: 'Dining Area', count: 1, iconClass: 'fa-solid fa-chair' },
    { id: 'balcony', name: 'Balcony', count: 1, iconClass: 'fa-solid fa-city' },
    { id: 'bathrooms', name: 'Bathrooms', count: 1, iconClass: 'fa-solid fa-bath' },
    { id: 'other', name: 'Other Spaces', count: 2, iconClass: 'fa-solid fa-border-all' }
  ];

  modalPhotosList: PopupGalleryPhoto[] = [
    { id: 1, title: 'Open Concept Living Lounge', category: 'living', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop' },
    { id: 2, title: 'German Acrylic Kitchen Island', category: 'kitchen', url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1000&auto=format&fit=crop' },
    { id: 3, title: 'Master Bed Suite & Ambient Ceiling', category: 'master-bed', url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1000&auto=format&fit=crop' },
    { id: 4, title: '8-Seater Marble Dining Table', category: 'dining', url: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=800&auto=format&fit=crop' },
    { id: 5, title: 'Skyline View Balcony Lounge', category: 'balcony', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop' },
    { id: 6, title: 'Italian Marble Master Bathroom', category: 'bathrooms', url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop' },
    { id: 7, title: 'Guest Bedroom & Acoustic Panels', category: 'bed-2', url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=800&auto=format&fit=crop' },
    { id: 8, title: 'Custom TV Backlit Console', category: 'living', url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop' },
    { id: 9, title: 'Chef Modular Kitchen Counter', category: 'kitchen', url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=800&auto=format&fit=crop' },
    { id: 10, title: 'Leather Walk-in Closet Wardrobe', category: 'other', url: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?q=80&w=800&auto=format&fit=crop' },
    { id: 11, title: 'Private Home Office Workspace', category: 'other', url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop' },
    { id: 12, title: 'Luxury Master Bedroom Wall Mouldings', category: 'master-bed', url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop' }
  ];

  constructor(
    private route: ActivatedRoute,
    private projectsDataService: ProjectsDataService,
    public consultationModalService: ConsultationModalService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id') || 'royal-villa-indiranagar';
      const found = this.projectsDataService.getProjectById(id) || this.projectsDataService.projects[0];
      this.project.set(found);
      this.activeImageIndex.set(0);
    });
  }

  setBlockFilter(filter: string) {
    this.activeBlockFilter.set(filter);
  }

  setBlockMainImage(blockId: string, imageIndex: number) {
    this.blocks.update(list =>
      list.map(b => b.id === blockId ? { ...b, selectedImageIndex: imageIndex } : b)
    );
  }

  get filteredBlocks(): ProjectBlockItem[] {
    const filter = this.activeBlockFilter();
    if (filter === 'all') {
      return this.blocks();
    }
    return this.blocks().filter(b => b.id.toLowerCase() === filter.toLowerCase());
  }

  get totalHomesCount(): number {
    return this.blocks().reduce((acc, b) => acc + b.homeCount, 0);
  }

  // POPUP MODAL HANDLERS
  openBlockGalleryModal(block: ProjectBlockItem) {
    this.selectedModalBlock.set(block);
    this.activeRoomCategory.set('all');
    this.modalCurrentPage.set(1);
    this.activeModalPhotoIndex.set(-1);
    this.showGalleryModal.set(true);
  }

  closeBlockGalleryModal() {
    this.showGalleryModal.set(false);
    this.activeModalPhotoIndex.set(-1);
    this.stopSlideshow();
  }

  setRoomCategory(catId: string) {
    this.activeRoomCategory.set(catId);
    this.modalCurrentPage.set(1);
    this.activeModalPhotoIndex.set(-1);
  }

  get filteredModalPhotos(): PopupGalleryPhoto[] {
    const cat = this.activeRoomCategory();
    if (cat === 'all') {
      return this.modalPhotosList;
    }
    return this.modalPhotosList.filter(p => p.category === cat);
  }

  get activeCategoryPhotoCount(): number {
    return this.filteredModalPhotos.length;
  }

  // INLINE POPUP PHOTO PREVIEW METHODS
  openModalPhotoPreview(index: number) {
    this.activeModalPhotoIndex.set(index);
  }

  closeModalPhotoPreview() {
    this.activeModalPhotoIndex.set(-1);
  }

  nextModalPhoto() {
    const list = this.filteredModalPhotos;
    if (list.length === 0) return;
    const current = this.activeModalPhotoIndex();
    const nextIdx = (current + 1) % list.length;
    this.activeModalPhotoIndex.set(nextIdx);
  }

  prevModalPhoto() {
    const list = this.filteredModalPhotos;
    if (list.length === 0) return;
    const current = this.activeModalPhotoIndex();
    const prevIdx = (current - 1 + list.length) % list.length;
    this.activeModalPhotoIndex.set(prevIdx);
  }

  get currentModalPhoto(): PopupGalleryPhoto | null {
    const idx = this.activeModalPhotoIndex();
    const list = this.filteredModalPhotos;
    if (idx >= 0 && idx < list.length) {
      return list[idx];
    }
    return null;
  }

  toggleSlideshow() {
    if (this.isSlideshowPlaying()) {
      this.stopSlideshow();
    } else {
      this.startSlideshow();
    }
  }

  startSlideshow() {
    if (this.activeModalPhotoIndex() === -1) {
      this.activeModalPhotoIndex.set(0);
    }
    this.isSlideshowPlaying.set(true);
    if (this.slideshowTimer) clearInterval(this.slideshowTimer);
    this.slideshowTimer = setInterval(() => {
      this.nextModalPhoto();
    }, 3000);
  }

  stopSlideshow() {
    this.isSlideshowPlaying.set(false);
    if (this.slideshowTimer) {
      clearInterval(this.slideshowTimer);
      this.slideshowTimer = null;
    }
  }

  downloadAllPhotos() {
    alert('Preparing zip download for all 36 high-resolution project photos...');
  }

  setPage(page: number) {
    this.modalCurrentPage.set(page);
  }

  setActiveImage(index: number) {
    this.activeImageIndex.set(index);
  }

  openLightbox(index: number = 0) {
    this.activeImageIndex.set(index);
    this.showLightbox.set(true);
  }

  closeLightbox() {
    this.showLightbox.set(false);
  }

  nextImage() {
    const current = this.project();
    if (current && current.gallery.length > 0) {
      this.activeImageIndex.set((this.activeImageIndex() + 1) % current.gallery.length);
    }
  }

  prevImage() {
    const current = this.project();
    if (current && current.gallery.length > 0) {
      this.activeImageIndex.set((this.activeImageIndex() - 1 + current.gallery.length) % current.gallery.length);
    }
  }

  openConsultation(event: Event) {
    event.preventDefault();
    this.consultationModalService.open();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (this.showGalleryModal()) {
      if (this.activeModalPhotoIndex() !== -1) {
        if (event.key === 'ArrowRight') {
          this.nextModalPhoto();
        } else if (event.key === 'ArrowLeft') {
          this.prevModalPhoto();
        } else if (event.key === 'Escape') {
          this.closeModalPhotoPreview();
        }
      } else if (event.key === 'Escape') {
        this.closeBlockGalleryModal();
      }
    }
  }

  onImgError(event: Event) {
    const imgElem = event.target as HTMLImageElement;
    if (imgElem) {
      imgElem.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop';
    }
  }
}

