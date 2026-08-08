import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ConsultationModalService } from '../../services/consultation-modal.service';

export interface Milestone {
  name: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  dateText?: string;
}

export interface CompletedProject {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  city: string;
  blocksCount: string;
  homesCount: string;
  heroImage: string;
  projectType: string;
  buttonStyle: 'solid' | 'outline';
  gallery: string[];
  clientName: string;
  areaSqft: string;
  completedDate: string;
  materialsUsed?: string[];
  scopeOfWork: string[];
  description: string;
}

export interface LiveSiteProject {
  id: string;
  title: string;
  subtitle?: string;
  blockName: string;
  location: string;
  city: string;
  heroImage: string;
  progressPercentage: number;
  projectType: string;
  currentPhase: string;
  expectedHandover: string;
  gallery: string[];
  clientName: string;
  areaSqft: string;
  materialsUsed?: string[];
  milestones?: Milestone[];
  scopeOfWork: string[];
  description: string;
}

export type ProjectItem = CompletedProject | LiveSiteProject;

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './projects-page.html',
  styleUrl: './projects-page.css',
})
export class ProjectsPage {
  readonly searchQuery = signal<string>('');
  readonly selectedCity = signal<string>('all');
  readonly selectedApartment = signal<string>('all');
  readonly selectedStatus = signal<string>('all');
  readonly selectedProjectType = signal<string>('all');

  readonly selectedProjectModal = signal<CompletedProject | LiveSiteProject | null>(null);
  readonly activeModalImageIndex = signal<number>(0);
  readonly activeModalTab = signal<'gallery' | 'materials' | 'milestones'>('gallery');

  constructor(
    private router: Router,
    public consultationModalService: ConsultationModalService
  ) { }

  readonly completedProjects: CompletedProject[] = [
    {
      id: 'royale-villa',
      title: 'Royale Villa',
      subtitle: 'Bespoke Contemporary Luxury Residence',
      location: 'Indiranagar, Bangalore',
      city: 'Bangalore',
      blocksCount: '3 Blocks',
      homesCount: '10 Homes',
      projectType: 'Villa',
      buttonStyle: 'solid',
      heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1400&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1400&auto=format&fit=crop'
      ],
      clientName: 'Dr. R. K. Verma',
      areaSqft: '4,200 sq.ft.',
      completedDate: 'Dec 2025',
      materialsUsed: ['Italian Botticino Marble', 'BWP Marine Plywood', 'Blum Soft-Close Hydraulics', 'Veneer Finish'],
      scopeOfWork: ['Turnkey Architecture', 'Italian Marble TV Wall', 'German Acrylic Kitchen', 'Walk-in Closets'],
      description: 'A grand luxury villa featuring floor-to-ceiling glass wardrobes, Italian marble TV console backdrop, acoustic ceilings, and smart mood lighting.'
    },
    {
      id: 'skyline-residency',
      title: 'Skyline Residency',
      subtitle: 'Panoramic Sky Lounge & High-Gloss Suite',
      location: 'HSR Layout, Bangalore',
      city: 'Bangalore',
      blocksCount: '2 Blocks',
      homesCount: '8 Homes',
      projectType: 'Penthouse',
      buttonStyle: 'solid',
      heroImage: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=1400&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1400&auto=format&fit=crop'
      ],
      clientName: 'S. Mohanty',
      areaSqft: '3,600 sq.ft.',
      completedDate: 'Nov 2025',
      materialsUsed: ['Imported Quartz Slabs', 'Boiling Water Proof Core', 'Hettich Tandem Drawers'],
      scopeOfWork: ['Duplex Space Planning', 'Double-Height TV Wall', 'Acrylic Kitchen', 'Balcony Deck'],
      description: 'Panoramic penthouse suite designed with warm veneer wall paneling, floating marble staircase lighting, and weather-proof WPC outdoor balcony decking.'
    },
    {
      id: 'greenfield-apartments',
      title: 'Greenfield Apartments',
      subtitle: 'Minimalist Scandinavian Luxury Home',
      location: 'Whitefield, Bangalore',
      city: 'Bangalore',
      blocksCount: '3 Blocks',
      homesCount: '12 Homes',
      projectType: 'Apartment',
      buttonStyle: 'solid',
      heroImage: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?q=80&w=1400&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1400&auto=format&fit=crop'
      ],
      clientName: 'A. Nair & Family',
      areaSqft: '2,800 sq.ft.',
      completedDate: 'Jan 2026',
      materialsUsed: ['Oak Veneer Boards', 'Soft-Touch Matte Laminate', 'Sensor Strip LED Profiles'],
      scopeOfWork: ['3BHK Open-Plan Layout', 'Blum Modular Fittings', 'Fluted Glass Partitions'],
      description: 'Clean minimalist Scandinavian luxury concept with soft beige tones, hidden storage units, sensor LED closets, and high-gloss quartz counters.'
    },
    {
      id: 'urban-nest',
      title: 'Urban Nest',
      subtitle: 'Bespoke Modern Apartments & Suites',
      location: 'Jayanagar, Bangalore',
      city: 'Bangalore',
      blocksCount: '2 Blocks',
      homesCount: '9 Homes',
      projectType: 'Apartment',
      buttonStyle: 'solid',
      heroImage: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=1400&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1400&auto=format&fit=crop'
      ],
      clientName: 'K. S. Reddy',
      areaSqft: '3,400 sq.ft.',
      completedDate: 'Feb 2026',
      materialsUsed: ['Teak Veneer', 'Custom Quartz Countertops', 'Laufen Sanitaryware'],
      scopeOfWork: ['Full Interior Architecture', 'Custom Joinery', 'Smart Home Integration'],
      description: 'Contemporary high-rise living space featuring floor-to-ceiling glass paneling and acoustic false ceilings.'
    },
    {
      id: 'serene-heights',
      title: 'Serene Heights',
      subtitle: 'Ultra-Modern Architectural Residence',
      location: 'Marathahalli, Bangalore',
      city: 'Bangalore',
      blocksCount: '2 Blocks',
      homesCount: '7 Homes',
      projectType: 'Duplex',
      buttonStyle: 'outline',
      heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1400&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1400&auto=format&fit=crop'
      ],
      clientName: 'R. Sharma',
      areaSqft: '3,800 sq.ft.',
      completedDate: 'Dec 2025',
      materialsUsed: ['Italian Travertine', 'Hafele Fittings', 'BWP Ply'],
      scopeOfWork: ['Modular Kitchen', 'Master Suite Wardrobes', 'Terrace Garden'],
      description: 'Luxury residential project with terrace garden lounge and Italian travertine marble TV console.'
    },
    {
      id: 'utkal-royal-tower',
      title: 'Utkal Royal Tower',
      subtitle: 'Luxury High-Rise Residence & Modular Interior',
      location: 'Janpath, Bhubaneswar',
      city: 'Bhubaneswar',
      blocksCount: '3 Blocks',
      homesCount: '15 Homes',
      projectType: 'Apartment',
      buttonStyle: 'outline',
      heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1400&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1400&auto=format&fit=crop'
      ],
      clientName: 'Er. B. C. Patnaik',
      areaSqft: '3,200 sq.ft.',
      completedDate: 'Jan 2026',
      materialsUsed: ['Teak Veneer', 'Hafele Soft-Close Fittings', 'BWP Marine Plywood'],
      scopeOfWork: ['Modular Acrylic Kitchen', 'Master Bedroom Paneling', 'TV Console Wall'],
      description: 'A grand 3BHK luxury apartment featuring German soft-close hydraulics, acrylic kitchen cabinetry, and fluted acoustic wall paneling.'
    },
    {
      id: 'kalinga-grand-residency',
      title: 'Kalinga Grand Residency',
      subtitle: 'Bespoke Executive Suites & Sky Balcony',
      location: 'Jaydev Vihar, Bhubaneswar',
      city: 'Bhubaneswar',
      blocksCount: '2 Blocks',
      homesCount: '11 Homes',
      projectType: 'Penthouse',
      buttonStyle: 'outline',
      heroImage: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=1400&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=1400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1400&auto=format&fit=crop'
      ],
      clientName: 'S. K. Tripathy',
      areaSqft: '3,800 sq.ft.',
      completedDate: 'Dec 2025',
      materialsUsed: ['Italian Botticino Marble', 'Blum Soft-Close Hydraulics', 'Sensor Profile LEDs'],
      scopeOfWork: ['Duplex Interior', 'Terrace Garden Deck', 'Walk-in Closets'],
      description: 'Luxury duplex penthouse featuring floor-to-ceiling glass closets, Italian marble TV console backdrop, and weather-proof terrace lounge deck.'
    }
  ];

  readonly liveSiteProjects: LiveSiteProject[] = [
    {
      id: 'royale-villa-block-b',
      title: 'Royale Villa - Block B',
      blockName: 'Block B',
      location: 'Indiranagar, Bangalore',
      city: 'Bangalore',
      heroImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1400&auto=format&fit=crop',
      progressPercentage: 65,
      projectType: 'Villa',
      currentPhase: 'Modular Furniture & Woodwork Assembly',
      expectedHandover: 'April 2026',
      gallery: [
        'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=1400&auto=format&fit=crop'
      ],
      clientName: 'V. Sharma',
      areaSqft: '4,500 sq.ft.',
      materialsUsed: ['BWP Plywood Grade 710', 'Hafele Soft Close', 'Merino Charcoal Louvers'],
      milestones: [
        { name: 'Civil Modifications & MEP Wiring', status: 'completed', dateText: 'Jan 15' },
        { name: 'Laser Tile Leveling & Grouting', status: 'completed', dateText: 'Feb 01' },
        { name: 'German Modular Joinery Fitting', status: 'in-progress', dateText: 'Active' },
        { name: 'Final Handover', status: 'upcoming', dateText: 'April 2026' }
      ],
      scopeOfWork: ['Structural Woodwork', 'Italian Tile Laying', 'Smart Automation Conduits'],
      description: 'Live site currently undergoing modular carcass alignment, soft-close Blum hardware installation, and profile LED routing.'
    },
    {
      id: 'skyline-residency-block-a',
      title: 'Skyline Residency - Block A',
      blockName: 'Block A',
      location: 'HSR Layout, Bangalore',
      city: 'Bangalore',
      heroImage: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1400&auto=format&fit=crop',
      progressPercentage: 40,
      projectType: 'Penthouse',
      currentPhase: 'Gypsum Ceiling & Concealed MEP Wiring',
      expectedHandover: 'May 2026',
      gallery: [
        'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1400&auto=format&fit=crop'
      ],
      clientName: 'P. K. Das',
      areaSqft: '3,800 sq.ft.',
      materialsUsed: ['Saint Gobain Gypsum', 'Finolex Copper Wiring', 'Dr Fixit Coating'],
      milestones: [
        { name: 'Demolition & Wall Alterations', status: 'completed', dateText: 'Jan 20' },
        { name: 'Concealed MEP Piping', status: 'in-progress', dateText: 'Active' },
        { name: 'False Ceiling Framing', status: 'upcoming', dateText: 'March 2026' }
      ],
      scopeOfWork: ['Concealed Wiring', 'Gypsum Ceiling', 'Plumbing Infrastructure'],
      description: 'Concealed copper wiring and plumbing leak test verified by site engineers. Gypsum ceiling framework in progress.'
    },
    {
      id: 'greenfield-apartments-block-c',
      title: 'Greenfield Apartments - Block C',
      blockName: 'Block C',
      location: 'Whitefield, Bangalore',
      city: 'Bangalore',
      heroImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1400&auto=format&fit=crop',
      progressPercentage: 25,
      projectType: 'Apartment',
      currentPhase: 'Civil Wall Demolition & Chipping',
      expectedHandover: 'June 2026',
      gallery: [
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1400&auto=format&fit=crop'
      ],
      clientName: 'M. Mehta',
      areaSqft: '2,900 sq.ft.',
      materialsUsed: ['IS 710 BWP Core', 'Schneider Automation Switches'],
      milestones: [
        { name: 'Civil Chipping & Layout Marking', status: 'in-progress', dateText: 'Active' },
        { name: 'MEP Electrical Piping', status: 'upcoming', dateText: 'March 2026' }
      ],
      scopeOfWork: ['Civil Alterations', 'Electrical Blueprint Marking', 'Plumbing Routing'],
      description: 'Initial site preparation stage: wall chipping and electrical conduit marking underway as per approved 2D drawings.'
    },
    {
      id: 'urban-nest-block-b',
      title: 'Urban Nest - Block B',
      blockName: 'Block B',
      location: 'Jayanagar, Bangalore',
      city: 'Bangalore',
      heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1400&auto=format&fit=crop',
      progressPercentage: 70,
      projectType: 'Apartment',
      currentPhase: 'Italian Marble Laying & Wall Paneling',
      expectedHandover: 'March 2026',
      gallery: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1400&auto=format&fit=crop'
      ],
      clientName: 'S. K. Mohapatra',
      areaSqft: '3,400 sq.ft.',
      materialsUsed: ['Italian Botticino Marble', 'Laufen Sanitaryware', 'Hafele Hardware'],
      milestones: [
        { name: 'Civil Alterations', status: 'completed', dateText: 'Dec 15' },
        { name: 'MEP Electrical & Plumbing', status: 'completed', dateText: 'Jan 10' },
        { name: 'Italian Marble Floor Polish', status: 'in-progress', dateText: 'Active' },
        { name: 'Final Move-in Handover', status: 'upcoming', dateText: 'March 2026' }
      ],
      scopeOfWork: ['Italian Marble Flooring', 'Veneer Paneling', 'Modular Wardrobes'],
      description: 'Italian marble floor polishing phase active along with master suite veneer wall paneling.'
    }
  ];

  readonly apartmentOptions = [
    'All Apartments',
    'Royale Villa',
    'Skyline Residency',
    'Greenfield Apartments',
    'Urban Nest',
    'Serene Heights',
    'Utkal Royal Tower',
    'Kalinga Grand Residency'
  ];

  readonly filteredCompletedProjects = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const city = this.selectedCity();
    const apartment = this.selectedApartment();
    const status = this.selectedStatus();
    const type = this.selectedProjectType();

    if (status === 'ongoing') return [];

    return this.completedProjects.filter(p => {
      const matchQuery = !query || p.title.toLowerCase().includes(query) || p.location.toLowerCase().includes(query) || p.city.toLowerCase().includes(query);
      const matchCity = city === 'all' || p.city.toLowerCase() === city.toLowerCase();
      const matchApartment = apartment === 'all' || p.title.toLowerCase().includes(apartment.toLowerCase());
      const matchType = type === 'all' || p.projectType.toLowerCase() === type.toLowerCase();
      return matchQuery && matchCity && matchApartment && matchType;
    });
  });

  readonly filteredLiveSiteProjects = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const city = this.selectedCity();
    const apartment = this.selectedApartment();
    const status = this.selectedStatus();
    const type = this.selectedProjectType();

    if (status === 'completed') return [];

    return this.liveSiteProjects.filter(p => {
      const matchQuery = !query || p.title.toLowerCase().includes(query) || p.location.toLowerCase().includes(query) || p.city.toLowerCase().includes(query);
      const matchCity = city === 'all' || p.city.toLowerCase() === city.toLowerCase();
      const matchApartment = apartment === 'all' || p.title.toLowerCase().includes(apartment.toLowerCase());
      const matchType = type === 'all' || p.projectType.toLowerCase() === type.toLowerCase();
      return matchQuery && matchCity && matchApartment && matchType;
    });
  });

  readonly hasActiveFilters = computed(() => {
    return this.searchQuery().trim() !== '' ||
      this.selectedCity() !== 'all' ||
      this.selectedApartment() !== 'all' ||
      this.selectedStatus() !== 'all' ||
      this.selectedProjectType() !== 'all';
  });

  resetFilter() {
    this.searchQuery.set('');
    this.selectedCity.set('all');
    this.selectedApartment.set('all');
    this.selectedStatus.set('all');
    this.selectedProjectType.set('all');
  }

  applyFilter() {
    // Triggers computed re-evaluations automatically
  }

  openProjectModal(proj: CompletedProject | LiveSiteProject, event?: Event) {
    if (event) event.preventDefault();
    this.router.navigate(['/projects', proj.id]);
  }

  openProjectDetails(proj: CompletedProject | LiveSiteProject, event?: Event) {
    if (event) event.preventDefault();
    this.router.navigate(['/projects', proj.id]);
  }

  closeProjectModal() {
    this.selectedProjectModal.set(null);
  }

  setModalImage(index: number) {
    this.activeModalImageIndex.set(index);
  }

  setModalTab(tab: 'gallery' | 'materials' | 'milestones') {
    this.activeModalTab.set(tab);
  }

  openConsultation(event: Event) {
    event.preventDefault();
    this.closeProjectModal();
    this.consultationModalService.open();
  }

  onSearchChange(val: string) {
    this.searchQuery.set(val || '');
  }

  onCityChange(val: string) {
    this.selectedCity.set(val || 'all');
  }

  onApartmentChange(val: string) {
    this.selectedApartment.set(val || 'all');
  }

  onStatusChange(val: string) {
    this.selectedStatus.set(val || 'all');
  }

  onProjectTypeChange(val: string) {
    this.selectedProjectType.set(val || 'all');
  }

  getProgressPercentage(proj: CompletedProject | LiveSiteProject | null): number {
    if (!proj) return 0;
    return 'progressPercentage' in proj && proj.progressPercentage ? proj.progressPercentage : 0;
  }

  getTimelineText(proj: CompletedProject | LiveSiteProject | null): string {
    if (!proj) return '';
    if ('expectedHandover' in proj && proj.expectedHandover) {
      return proj.expectedHandover;
    }
    if ('completedDate' in proj && proj.completedDate) {
      return proj.completedDate;
    }
    return '';
  }

  getMilestones(proj: CompletedProject | LiveSiteProject | null): Milestone[] | undefined {
    if (!proj) return undefined;
    return 'milestones' in proj ? proj.milestones : undefined;
  }

  getMilestoneText(ms: Milestone): string {
    if (ms.status === 'completed') {
      return 'Milestone Passed (' + (ms.dateText || '') + ')';
    }
    if (ms.status === 'in-progress') {
      return 'Active Site Execution';
    }
    return 'Scheduled Phase';
  }

  isLiveSite(proj: any): proj is LiveSiteProject {
    return proj && typeof proj === 'object' && 'progressPercentage' in proj;
  }
}
