import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ConsultationModalService } from '../../services/consultation-modal.service';

export interface Milestone {
  name: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  dateText?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  status: 'completed' | 'ongoing';
  statusLabel: string;
  progressPercentage?: number;
  currentPhase?: string;
  expectedHandover?: string;
  completedDate?: string;
  location: string;
  city: string;
  heroImage: string;
  beforeImage?: string;
  gallery: string[];
  clientName: string;
  areaSqft: string;
  rating?: number;
  reviewQuote?: string;
  materialsUsed?: string[];
  milestones?: Milestone[];
  scopeOfWork: string[];
  description: string;
}

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './projects-page.html',
  styleUrl: './projects-page.css',
})
export class ProjectsPage {
  readonly activeStatusFilter = signal<'all' | 'completed' | 'ongoing'>('all');
  readonly activeCityFilter = signal<string>('all');
  readonly activeViewMode = signal<'grid' | 'split'>('grid');
  readonly selectedProjectModal = signal<ProjectItem | null>(null);
  readonly activeModalImageIndex = signal<number>(0);
  readonly activeModalTab = signal<'gallery' | 'materials' | 'milestones'>('gallery');

  constructor(public consultationModalService: ConsultationModalService) {}

  readonly projects: ProjectItem[] = [
    {
      id: 'proj-01',
      title: 'Royal Villa Indiranagar',
      subtitle: 'Bespoke Contemporary Luxury Residence',
      category: '4BHK Villa',
      status: 'completed',
      statusLabel: 'Completed & Delivered',
      completedDate: 'Dec 2025',
      location: '100ft Road, Indiranagar',
      city: 'Bengaluru',
      heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1400&auto=format&fit=crop'
      ],
      clientName: 'Dr. R. K. Verma',
      areaSqft: '4,200 sq.ft.',
      rating: 5.0,
      reviewQuote: 'Flawless execution! Delivered 3 days ahead of schedule with zero defect handover.',
      materialsUsed: ['Italian Botticino Marble', 'Boiling Water Proof Marine Plywood', 'Blum Soft-Close Hydraulics', 'Royal Touch Natural Veneer'],
      scopeOfWork: ['Turnkey Architecture', 'Italian Marble TV Wall', 'German Acrylic Kitchen', 'Walk-in Leather Closets', 'Cove Profile LEDs'],
      description: 'A grand 4BHK luxury villa featuring floor-to-ceiling glass wardrobes, Italian marble TV console backdrop, acoustic ceiling moldings, and smart mood lighting.'
    },
    {
      id: 'proj-04',
      title: 'Emerald Palms Villa HSR',
      subtitle: 'Ultra-Luxury Smart Duplex Transformation',
      category: 'Independent Villa',
      status: 'ongoing',
      statusLabel: 'Live Site • 85% Executed',
      progressPercentage: 85,
      currentPhase: 'German Modular Joinery & PU Spray Polish',
      expectedHandover: 'March 2026',
      location: 'Sector 3, HSR Layout',
      city: 'Bengaluru',
      heroImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1400&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=1400&auto=format&fit=crop'
      ],
      clientName: 'Vikram & Swati Sharma',
      areaSqft: '5,100 sq.ft.',
      materialsUsed: ['IS:710 Grade BWP Plywood', 'Hafele Lift-up Hardware', 'Merino Charcoal Louvers', 'Laser Level Vitrified Slabs'],
      milestones: [
        { name: 'Civil Demolition & Wall Alterations', status: 'completed', dateText: 'Jan 10' },
        { name: 'Laser Tile Leveling & Grouting', status: 'completed', dateText: 'Jan 22' },
        { name: 'Concealed MEP Copper Wiring', status: 'completed', dateText: 'Feb 02' },
        { name: 'German Modular Joinery Assembly', status: 'in-progress', dateText: 'Active Phase' },
        { name: 'Final Handover & Deep Cleaning', status: 'upcoming', dateText: 'March 2026' }
      ],
      scopeOfWork: ['Structural Modification', 'Italian Laser Tiling', 'Automation Wiring', 'WPC Outdoor Balcony Decking'],
      description: 'Currently undergoing final modular assembly and soft-close hardware alignment. Structural civil modifications and tile laser leveling verified.'
    },
    {
      id: 'proj-02',
      title: 'Skyline Penthouse Patia',
      subtitle: 'Panoramic Sky Lounge & High-Gloss Suite',
      category: 'Penthouse',
      status: 'completed',
      statusLabel: 'Completed & Handed Over',
      completedDate: 'Nov 2025',
      location: 'Patia IT Corridor',
      city: 'Bhubaneswar',
      heroImage: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1400&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1400&auto=format&fit=crop'
      ],
      clientName: 'S. Mohanty',
      areaSqft: '3,600 sq.ft.',
      rating: 4.9,
      reviewQuote: 'The double-height marble wall and sky deck exceeded all our expectations.',
      materialsUsed: ['Imported Quartz Slabs', 'Boiling Water Proof Core', 'Hettich Tandem Drawers'],
      scopeOfWork: ['Duplex Space Planning', 'Double-Height TV Wall', 'Acrylic Kitchen', 'Terrace Coffee Lounge Deck'],
      description: 'Panoramic penthouse suite designed with warm veneer wall paneling, floating marble staircase lighting, and weather-proof WPC outdoor balcony decking.'
    },
    {
      id: 'proj-05',
      title: 'Grand Residency Janpath',
      subtitle: 'Premium High-Rise Corporate & Residence',
      category: 'Luxury Residence',
      status: 'ongoing',
      statusLabel: 'Live Site • 60% Executed',
      progressPercentage: 60,
      currentPhase: 'Gypsum Ceiling & Hydronic Waterproofing',
      expectedHandover: 'April 2026',
      location: 'Janpath Tower, Saheed Nagar',
      city: 'Bhubaneswar',
      heroImage: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1400&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1400&auto=format&fit=crop'
      ],
      clientName: 'P. K. Das',
      areaSqft: '3,100 sq.ft.',
      materialsUsed: ['Dr. Fixit Polymer Waterproof Coating', 'Saint Gobain Gypsum Boards', 'Finolex Flame-Retardant Wires'],
      milestones: [
        { name: 'Plumbing & MEP Piping', status: 'completed', dateText: 'Jan 15' },
        { name: 'Waterproofing 10-Yr Leak Audit', status: 'completed', dateText: 'Jan 28' },
        { name: 'Gypsum False Ceiling Framing', status: 'in-progress', dateText: 'Active Phase' },
        { name: 'Veneer Paneling Installation', status: 'upcoming', dateText: 'March 2026' },
        { name: 'Furniture Fitting & Handover', status: 'upcoming', dateText: 'April 2026' }
      ],
      scopeOfWork: ['Concealed Copper Wiring', 'False Ceiling Gypsum Framework', 'Veneer Panels', 'Bathroom Waterproofing'],
      description: 'Plumbing conduits and concealed copper electrical rewiring verified by site engineers. Waterproofing leak testing completed.'
    },
    {
      id: 'proj-03',
      title: 'Modern Duplex Whitefield',
      subtitle: 'Minimalist Scandinavian Luxury Home',
      category: 'Duplex Home',
      status: 'completed',
      statusLabel: 'Completed & Handed Over',
      completedDate: 'Jan 2026',
      location: 'Prestige Tech Park Road',
      city: 'Bengaluru',
      heroImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1400&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1400&auto=format&fit=crop'
      ],
      clientName: 'A. Nair & Family',
      areaSqft: '2,800 sq.ft.',
      rating: 5.0,
      reviewQuote: 'Scandinavian minimalism done right. Loved the hidden storage and sensor wardrobe lights.',
      materialsUsed: ['Oak Veneer Boards', 'Soft-Touch Matte Laminate', 'Sensor Strip LED Profiles'],
      scopeOfWork: ['3BHK Open-Plan Layout', 'Blum Modular Fittings', 'Fluted Glass Partitions', 'Kids Modular Study Wall'],
      description: 'Clean minimalist Scandinavian luxury concept with soft beige tones, hidden storage units, sensor LED closets, and high-gloss quartz counters.'
    },
    {
      id: 'proj-06',
      title: 'Koramangala Heritage Remodel',
      subtitle: 'Complete 20-Year Old Property Facelift',
      category: 'Full Renovation',
      status: 'ongoing',
      statusLabel: 'Live Site • 40% Executed',
      progressPercentage: 40,
      currentPhase: 'Structural Steel Beam Support & Brickwork',
      expectedHandover: 'May 2026',
      location: '4th Block, Koramangala',
      city: 'Bengaluru',
      heroImage: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=1400&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=1400&auto=format&fit=crop'
      ],
      clientName: 'M. S. Rao',
      areaSqft: '4,500 sq.ft.',
      materialsUsed: ['Heavy Structural I-Beams', '53 Grade ACC Cement', 'Concealed Modular Conduit'],
      milestones: [
        { name: 'Selective Strip-out Demolition', status: 'completed', dateText: 'Jan 05' },
        { name: 'Structural Steel Beam Support', status: 'in-progress', dateText: 'Active Phase' },
        { name: 'BWP Marine Ply Framework', status: 'upcoming', dateText: 'March 2026' },
        { name: 'Electrical & Flooring', status: 'upcoming', dateText: 'April 2026' },
        { name: 'Final Polish & Handover', status: 'upcoming', dateText: 'May 2026' }
      ],
      scopeOfWork: ['Controlled Demolition', 'Steel Reinforcement', 'Open-Plan Kitchen', 'Glass Partitions'],
      description: 'Complete interior renovation of a 20-year old property into a contemporary luxury space with open-plan kitchen and glass partition walls.'
    }
  ];

  readonly filteredProjects = computed(() => {
    const statusFilter = this.activeStatusFilter();
    const cityFilter = this.activeCityFilter();

    return this.projects.filter((p) => {
      const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
      const matchesCity = cityFilter === 'all' || p.city.toLowerCase() === cityFilter.toLowerCase();
      return matchesStatus && matchesCity;
    });
  });

  readonly completedCount = computed(() => this.projects.filter(p => p.status === 'completed').length);
  readonly ongoingCount = computed(() => this.projects.filter(p => p.status === 'ongoing').length);

  setStatusFilter(filter: 'all' | 'completed' | 'ongoing') {
    this.activeStatusFilter.set(filter);
  }

  setCityFilter(city: string) {
    this.activeCityFilter.set(city);
  }

  setViewMode(mode: 'grid' | 'split') {
    this.activeViewMode.set(mode);
  }

  openProjectModal(proj: ProjectItem, event: Event) {
    event.preventDefault();
    this.selectedProjectModal.set(proj);
    this.activeModalImageIndex.set(0);
    this.activeModalTab.set('gallery');
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
}
