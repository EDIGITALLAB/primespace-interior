import { Component, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ConsultationModalService } from '../../services/consultation-modal.service';
import { ProjectsDataService, ProjectItem as ServiceProjectItem } from '../../services/projects-data.service';

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
export class ProjectsPage implements OnInit {
  readonly searchQuery = signal<string>('');
  readonly selectedCity = signal<string>('all');
  readonly selectedApartment = signal<string>('all');
  readonly selectedStatus = signal<string>('all');
  readonly selectedProjectType = signal<string>('all');

  readonly selectedProjectModal = signal<CompletedProject | LiveSiteProject | null>(null);
  readonly activeModalImageIndex = signal<number>(0);
  readonly activeModalTab = signal<'gallery' | 'materials' | 'milestones'>('gallery');

  readonly completedProjectsList = signal<CompletedProject[]>([]);
  readonly liveSiteProjectsList = signal<LiveSiteProject[]>([]);
  readonly isLoading = signal<boolean>(true);
  readonly errorMessage = signal<string | null>(null);

  constructor(
    private router: Router,
    public consultationModalService: ConsultationModalService,
    private projectsDataService: ProjectsDataService
  ) { }

  ngOnInit(): void {
    this.loadProjectsFromBackend();
  }

  loadProjectsFromBackend(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.projectsDataService.getAllProjectsFromApi().subscribe({
      next: (items) => {
        const completed: CompletedProject[] = [];
        const live: LiveSiteProject[] = [];

        items.forEach(item => {
          if (item.status === 'completed') {
            completed.push({
              id: item.id || item.slug || String(item.projectId),
              title: item.title,
              subtitle: item.subtitle,
              location: item.location,
              city: item.city,
              blocksCount: item.blocksCount || (item.totalBlocks ? `${item.totalBlocks} Blocks` : '1 Block'),
              homesCount: item.totalRooms || '1 Home',
              projectType: item.propertyType || item.category || 'Apartment',
              buttonStyle: 'solid',
              heroImage: item.heroImage,
              gallery: item.gallery && item.gallery.length > 0 ? item.gallery : (item.heroImage ? [item.heroImage] : []),
              clientName: item.clientName || 'PrimeSpace Client',
              areaSqft: item.areaSqft || '3,500 sq.ft.',
              completedDate: item.completedDate || 'Recent',
              materialsUsed: item.materialsUsed || ['Italian Marble', 'Modular Hardware'],
              scopeOfWork: item.scopeOfWork || ['Turnkey Interior Design'],
              description: item.description || ''
            });
          } else {
            live.push({
              id: item.id || item.slug || String(item.projectId),
              title: item.title,
              subtitle: item.subtitle,
              blockName: item.blocksCount || 'Block A',
              location: item.location,
              city: item.city,
              heroImage: item.heroImage,
              progressPercentage: item.progressPercentage || 50,
              projectType: item.propertyType || item.category || 'Apartment',
              currentPhase: item.currentPhase || 'Active Execution',
              expectedHandover: item.expectedHandover || '2026',
              gallery: item.gallery && item.gallery.length > 0 ? item.gallery : (item.heroImage ? [item.heroImage] : []),
              clientName: item.clientName || 'PrimeSpace Client',
              areaSqft: item.areaSqft || '3,500 sq.ft.',
              materialsUsed: item.materialsUsed || ['BWP Plywood', 'Hafele Hardware'],
              milestones: item.milestones,
              scopeOfWork: item.scopeOfWork || ['Structural Woodwork'],
              description: item.description || ''
            });
          }
        });

        this.completedProjectsList.set(completed);
        this.liveSiteProjectsList.set(live);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Backend API request error:', err);
        this.completedProjectsList.set([]);
        this.liveSiteProjectsList.set([]);
        this.errorMessage.set('We are currently unable to reach our server to load the latest projects. Please verify your network connection and try again.');
        this.isLoading.set(false);
      }
    });
  }

  readonly apartmentOptions = computed(() => {
    const list1 = this.completedProjectsList().map(p => p.title);
    const list2 = this.liveSiteProjectsList().map(p => p.title);
    const set = new Set([...list1, ...list2]);
    return ['All Apartments', ...Array.from(set)];
  });

  readonly filteredCompletedProjects = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const city = this.selectedCity();
    const apartment = this.selectedApartment();
    const status = this.selectedStatus();
    const type = this.selectedProjectType();

    if (status === 'ongoing') return [];

    return this.completedProjectsList().filter(p => {
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

    return this.liveSiteProjectsList().filter(p => {
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
