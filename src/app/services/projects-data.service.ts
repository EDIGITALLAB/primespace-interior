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
      id: 'royale-villa',
      title: 'Royale Villa',
      subtitle: 'Bespoke Contemporary Luxury Villa Residence',
      category: '4BHK Villa',
      status: 'completed',
      statusLabel: 'Completed & Handed Over',
      completedDate: 'Dec 2025',
      executionDuration: 'Over 250d',
      totalRooms: '4 BHK Villa',
      location: 'Indiranagar, Bangalore',
      city: 'Bangalore',
      heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1400&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1400&auto=format&fit=crop'
      ],
      clientName: 'Dr. R. K. Verma',
      areaSqft: '4,200 sq.ft.',
      rating: 5.0,
      reviewQuote: 'Flawless execution! Delivered ahead of schedule with premium Italian finishes.',
      materialsUsed: ['Italian Botticino Marble', 'Marine Plywood Grade 710', 'Blum Soft-Close Hydraulics', 'Royal Touch Natural Veneer'],
      scopeOfWork: ['Turnkey Villa Architecture', 'Italian Marble TV Backdrop', 'German Modular Kitchen', 'Walk-in Closets', 'Cove LED Profiles'],
      description: 'A grand 4BHK luxury villa featuring floor-to-ceiling glass wardrobes, Italian marble TV console backdrop, acoustic ceiling moldings, and smart mood lighting.'
    },
    {
      id: 'skyline-residency',
      title: 'Skyline Residency',
      subtitle: 'Panoramic Sky Lounge & High-Gloss Penthouse Suite',
      category: 'Penthouse',
      status: 'completed',
      statusLabel: 'Completed & Handed Over',
      completedDate: 'Nov 2025',
      executionDuration: 'Over 180d',
      totalRooms: '4 BHK Penthouse',
      location: 'HSR Layout, Bangalore',
      city: 'Bangalore',
      heroImage: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=1400&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=1400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1400&auto=format&fit=crop'
      ],
      clientName: 'S. Mohanty',
      areaSqft: '3,600 sq.ft.',
      rating: 4.9,
      reviewQuote: 'The double-height marble wall and balcony sky deck exceeded all our expectations.',
      materialsUsed: ['Imported Quartz Slabs', 'Boiling Water Proof Core', 'Hettich Tandem Drawers'],
      scopeOfWork: ['Duplex Space Planning', 'Double-Height TV Wall', 'Acrylic Kitchen', 'Terrace Coffee Lounge Deck'],
      description: 'Panoramic penthouse suite designed with warm veneer wall paneling, floating marble staircase lighting, and weather-proof WPC outdoor balcony decking.'
    },
    {
      id: 'greenfield-apartments',
      title: 'Greenfield Apartments',
      subtitle: 'Minimalist Scandinavian Luxury Residence',
      category: 'Apartment',
      status: 'completed',
      statusLabel: 'Completed & Handed Over',
      completedDate: 'Jan 2026',
      executionDuration: 'Over 120d',
      totalRooms: '3 BHK Apartment',
      location: 'Whitefield, Bangalore',
      city: 'Bangalore',
      heroImage: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?q=80&w=1400&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?q=80&w=1400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1400&auto=format&fit=crop'
      ],
      clientName: 'A. Nair & Family',
      areaSqft: '2,800 sq.ft.',
      rating: 4.8,
      reviewQuote: 'Beautiful Scandinavian aesthetic with great spatial optimization.',
      materialsUsed: ['Oak Veneer Boards', 'Soft-Touch Matte Laminate', 'Sensor Strip LED Profiles'],
      scopeOfWork: ['3BHK Open-Plan Layout', 'Blum Modular Fittings', 'Fluted Glass Partitions'],
      description: 'Clean minimalist Scandinavian luxury concept with soft beige tones, hidden storage units, sensor LED closets, and high-gloss quartz counters.'
    },
    {
      id: 'urban-nest',
      title: 'Urban Nest',
      subtitle: 'Bespoke Modern Apartments & Suites',
      category: 'Apartment',
      status: 'completed',
      statusLabel: 'Completed & Handed Over',
      completedDate: 'Feb 2026',
      executionDuration: 'Over 150d',
      totalRooms: '3 BHK Apartment',
      location: 'Jayanagar, Bangalore',
      city: 'Bangalore',
      heroImage: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=1400&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=1400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1400&auto=format&fit=crop'
      ],
      clientName: 'K. S. Reddy',
      areaSqft: '3,400 sq.ft.',
      rating: 4.9,
      reviewQuote: 'Top class modular fittings and modern false ceiling lighting.',
      materialsUsed: ['Italian Botticino Marble', 'Blum Soft-Close Hydraulics', 'Sensor Profile LEDs'],
      scopeOfWork: ['Modern Apartment Interior', 'Fluted Panel Accent Walls', 'Walk-in Closets'],
      description: 'Contemporary high-rise living space featuring floor-to-ceiling glass paneling, acoustic false ceilings, and custom-designed modular furniture.'
    },
    {
      id: 'serene-heights',
      title: 'Serene Heights',
      subtitle: 'Ultra-Modern Architectural Duplex Residence',
      category: 'Duplex',
      status: 'completed',
      statusLabel: 'Completed & Handed Over',
      completedDate: 'Dec 2025',
      executionDuration: 'Over 200d',
      totalRooms: '4 BHK Duplex',
      location: 'Marathahalli, Bangalore',
      city: 'Bangalore',
      heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1400&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1400&auto=format&fit=crop'
      ],
      clientName: 'R. Sharma',
      areaSqft: '3,800 sq.ft.',
      rating: 5.0,
      reviewQuote: 'Stunning terrace lounge deck and custom travertine marble wall.',
      materialsUsed: ['Italian Travertine Marble', 'Marine Plywood Grade 710', 'Hafele Fittings'],
      scopeOfWork: ['Duplex Architecture', 'Terrace Garden Deck', 'Smart Home Automation'],
      description: 'Luxury duplex residence featuring floor-to-ceiling glass closets, Italian travertine marble backdrop, and weather-proof terrace lounge deck.'
    },
    {
      id: 'utkal-royal-tower',
      title: 'Utkal Royal Tower',
      subtitle: 'Luxury High-Rise Residence & Modular Interior',
      category: 'Apartment',
      status: 'completed',
      statusLabel: 'Completed & Handed Over',
      completedDate: 'Jan 2026',
      executionDuration: 'Over 160d',
      totalRooms: '3 BHK Apartment',
      location: 'Janpath, Bhubaneswar',
      city: 'Bhubaneswar',
      heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1400&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1400&auto=format&fit=crop'
      ],
      clientName: 'Er. B. C. Patnaik',
      areaSqft: '3,200 sq.ft.',
      rating: 4.9,
      reviewQuote: 'Extremely professional team, high quality modular joinery.',
      materialsUsed: ['Saint Gobain Gypsum', 'Finolex Copper Wiring', 'Blum Soft Close'],
      scopeOfWork: ['3BHK Premium Modular Interior', 'Acrylic Modular Kitchen', 'Veneer Paneling'],
      description: 'A grand 3BHK luxury apartment featuring German soft-close hydraulics, acrylic kitchen cabinetry, and fluted acoustic wall paneling.'
    },
    {
      id: 'kalinga-grand-residency',
      title: 'Kalinga Grand Residency',
      subtitle: 'Bespoke Executive Suites & Sky Balcony',
      category: 'Penthouse',
      status: 'completed',
      statusLabel: 'Completed & Handed Over',
      completedDate: 'Dec 2025',
      executionDuration: 'Over 190d',
      totalRooms: '4 BHK Penthouse',
      location: 'Jaydev Vihar, Bhubaneswar',
      city: 'Bhubaneswar',
      heroImage: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=1400&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=1400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1400&auto=format&fit=crop'
      ],
      clientName: 'S. K. Tripathy',
      areaSqft: '3,800 sq.ft.',
      rating: 5.0,
      reviewQuote: 'Superb execution of penthouse interior with elegant lighting.',
      materialsUsed: ['Italian Botticino Marble', 'Blum Soft-Close Hydraulics', 'Sensor Profile LEDs'],
      scopeOfWork: ['Duplex Interior', 'Terrace Garden Deck', 'Walk-in Closets'],
      description: 'Luxury duplex penthouse featuring floor-to-ceiling glass closets, Italian marble TV console backdrop, and weather-proof terrace lounge deck.'
    },
    {
      id: 'royale-villa-block-b',
      title: 'Royale Villa - Block B',
      subtitle: 'Active Construction Site Progress',
      category: 'Villa',
      status: 'ongoing',
      statusLabel: 'Live Site • 65% Executed',
      progressPercentage: 65,
      currentPhase: 'Modular Furniture & Woodwork Assembly',
      expectedHandover: 'April 2026',
      executionDuration: 'Live 65%',
      totalRooms: '4 BHK Villa',
      location: 'Indiranagar, Bangalore',
      city: 'Bangalore',
      heroImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1400&auto=format&fit=crop',
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
      subtitle: 'Active Construction Site Progress',
      category: 'Penthouse',
      status: 'ongoing',
      statusLabel: 'Live Site • 40% Executed',
      progressPercentage: 40,
      currentPhase: 'Gypsum Ceiling & Concealed MEP Wiring',
      expectedHandover: 'May 2026',
      executionDuration: 'Live 40%',
      totalRooms: '4 BHK Penthouse',
      location: 'HSR Layout, Bangalore',
      city: 'Bangalore',
      heroImage: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1400&auto=format&fit=crop',
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
      subtitle: 'Active Construction Site Progress',
      category: 'Apartment',
      status: 'ongoing',
      statusLabel: 'Live Site • 25% Executed',
      progressPercentage: 25,
      currentPhase: 'Civil Wall Demolition & Chipping',
      expectedHandover: 'June 2026',
      executionDuration: 'Live 25%',
      totalRooms: '3 BHK Apartment',
      location: 'Whitefield, Bangalore',
      city: 'Bangalore',
      heroImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1400&auto=format&fit=crop',
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
      subtitle: 'Active Construction Site Progress',
      category: 'Apartment',
      status: 'ongoing',
      statusLabel: 'Live Site • 70% Executed',
      progressPercentage: 70,
      currentPhase: 'Italian Marble Laying & Wall Paneling',
      expectedHandover: 'March 2026',
      executionDuration: 'Live 70%',
      totalRooms: '3 BHK Apartment',
      location: 'Jayanagar, Bangalore',
      city: 'Bangalore',
      heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1400&auto=format&fit=crop',
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

  getProjectById(id: string): ProjectItem | undefined {
    if (!id) return this.projects[0];
    const cleanId = id.toLowerCase().trim();

    // 1. Direct ID match
    let found = this.projects.find(p => p.id.toLowerCase() === cleanId);
    if (found) return found;

    // 2. Direct ID match without hyphens
    found = this.projects.find(p => p.id.replace(/-/g, '').toLowerCase() === cleanId.replace(/-/g, ''));
    if (found) return found;

    // 3. Title slug match
    found = this.projects.find(p => p.title.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '').includes(cleanId));
    if (found) return found;

    // 4. Fallback search by cleanId in title
    found = this.projects.find(p => cleanId.includes(p.title.toLowerCase().replace(/ /g, '-')));
    if (found) return found;

    return this.projects[0];
  }
}
