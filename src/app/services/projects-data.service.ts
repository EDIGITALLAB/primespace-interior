import { Injectable } from '@angular/core';

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
  executionDuration?: string;
  totalRooms?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsDataService {
  readonly projects: ProjectItem[] = [
    {
      id: 'royal-villa-indiranagar',
      title: 'Royal Villa Indiranagar',
      subtitle: 'Complete Interior Design for Multiple Homes & Bespoke Residence',
      category: '4BHK Villa',
      status: 'completed',
      statusLabel: 'Completed & Handed Over',
      completedDate: 'Dec 2025',
      executionDuration: 'Over 250d',
      totalRooms: '4 BHK',
      location: '100ft Road, Indiranagar, Bengaluru',
      city: 'Bengaluru',
      heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1400&auto=format&fit=crop'
      ],
      clientName: 'Dr. R. K. Verma',
      areaSqft: '25,000+ Sq.ft',
      rating: 5.0,
      reviewQuote: 'Flawless execution! Delivered 3 days ahead of schedule with zero defect handover.',
      materialsUsed: ['Italian Botticino Marble', 'Boiling Water Proof Marine Plywood', 'Blum Soft-Close Hydraulics', 'Royal Touch Natural Veneer', 'Acoustic Ceiling Panels'],
      scopeOfWork: ['Turnkey Architecture', 'Italian Marble TV Wall', 'German Acrylic Kitchen', 'Walk-in Leather Closets', 'Cove Profile LEDs', 'Smart Home Automation'],
      description: 'A grand 4BHK luxury villa featuring floor-to-ceiling glass wardrobes, Italian marble TV console backdrop, acoustic ceiling moldings, German modular joinery, and smart mood lighting.'
    },
    {
      id: 'emerald-palms-villa-hsr',
      title: 'Emerald Palms Villa HSR',
      subtitle: 'Ultra-Luxury Smart Duplex Transformation',
      category: 'Independent Villa',
      status: 'ongoing',
      statusLabel: 'Live Site • 85% Executed',
      progressPercentage: 85,
      currentPhase: 'German Modular Joinery & PU Spray Polish',
      expectedHandover: 'March 2026',
      executionDuration: 'Live 85%',
      totalRooms: '5 BHK',
      location: 'Sector 3, HSR Layout, Bengaluru',
      city: 'Bengaluru',
      heroImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1400&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=1400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400&auto=format&fit=crop'
      ],
      clientName: 'Vikram & Swati Sharma',
      areaSqft: '5,100 Sq.ft',
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
      id: 'skyline-penthouse-patia',
      title: 'Skyline Penthouse Patia',
      subtitle: 'Panoramic Sky Lounge & High-Gloss Suite',
      category: 'Penthouse',
      status: 'completed',
      statusLabel: 'Completed & Handed Over',
      completedDate: 'Nov 2025',
      executionDuration: 'Over 180d',
      totalRooms: '4 BHK Penthouse',
      location: 'Patia IT Corridor, Bhubaneswar',
      city: 'Bhubaneswar',
      heroImage: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1400&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1400&auto=format&fit=crop'
      ],
      clientName: 'S. Mohanty',
      areaSqft: '3,600 Sq.ft',
      rating: 4.9,
      reviewQuote: 'The double-height marble wall and sky deck exceeded all our expectations.',
      materialsUsed: ['Imported Quartz Slabs', 'Boiling Water Proof Core', 'Hettich Tandem Drawers'],
      scopeOfWork: ['Duplex Space Planning', 'Double-Height TV Wall', 'Acrylic Kitchen', 'Terrace Coffee Lounge Deck'],
      description: 'Panoramic penthouse suite designed with warm veneer wall paneling, floating marble staircase lighting, and weather-proof WPC outdoor balcony decking.'
    },
    {
      id: 'grand-residency-janpath',
      title: 'Grand Residency Janpath',
      subtitle: 'Premium High-Rise Corporate & Residence',
      category: 'Luxury Residence',
      status: 'ongoing',
      statusLabel: 'Live Site • 60% Executed',
      progressPercentage: 60,
      currentPhase: 'Gypsum Ceiling & Hydronic Waterproofing',
      expectedHandover: 'April 2026',
      executionDuration: 'Live 60%',
      totalRooms: '3 BHK',
      location: 'Janpath Tower, Saheed Nagar, Bhubaneswar',
      city: 'Bhubaneswar',
      heroImage: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1400&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1400&auto=format&fit=crop'
      ],
      clientName: 'P. K. Das',
      areaSqft: '3,100 Sq.ft',
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
    }
  ];

  getProjectById(id: string): ProjectItem | undefined {
    if (!id) return this.projects[0];
    const cleanId = id.toLowerCase().trim();
    const found = this.projects.find(p => p.id === cleanId || p.id.replace(/-/g, '') === cleanId.replace(/-/g, ''));
    if (found) return found;

    // Mapping for proj-01, proj-04, etc.
    if (cleanId === 'proj-01') return this.projects[0];
    if (cleanId === 'proj-04') return this.projects[1];
    if (cleanId === 'proj-02') return this.projects[2];
    if (cleanId === 'proj-05') return this.projects[3];

    // Fallback search by title slug
    return this.projects.find(p => p.title.toLowerCase().replace(/ /g, '-').includes(cleanId)) || this.projects[0];
  }
}
