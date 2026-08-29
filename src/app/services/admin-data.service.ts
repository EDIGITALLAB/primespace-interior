import { Injectable, signal, computed, effect } from '@angular/core';

export interface BlockPhoto {
  id: string;
  url: string;
  caption: string;
  category: 'Living Room' | 'Kitchen' | 'Bedroom' | 'Bathroom' | 'Balcony' | 'Foyer';
}

export interface AdminBlock {
  id: string;
  name: string;
  homeCount: number;
  completionPercentage: number;
  selectedImageIndex: number;
  gallery?: string[];
  photos?: BlockPhoto[];
}

export interface AdminProject {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  city: string;
  apartmentName: string;
  status: 'completed' | 'ongoing';
  statusLabel: string;
  projectType: string;
  homeCount: number;
  coverImage: string;
  description: string;
  blocks: AdminBlock[];
}

export interface AdminCategory {
  id: string;
  num?: string;
  name: string;
  slug: string;
  subtitle: string;
  type: string;
  priceStarting: string;
  deliveryTime?: string;
  image: string;
  galleryImages?: string[];
  description?: string;
  features?: string[];
  itemCount: number;
}

export interface AdminLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  projectType: string;
  budget: string;
  message: string;
  date: string;
  status: 'NEW' | 'CONTACTED' | 'IN_PROGRESS' | 'COMPLETED' | 'CLOSED' | string;
  notes?: string;
}

export interface AdminAppointment {
  id: string;
  clientName: string;
  phone: string;
  email: string;
  project: string;
  city: string;
  preferredDate: string;
  preferredTime: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  notes?: string;
}

export interface AdminTestimonial {
  id: string;
  name: string;
  role: string;
  project: string;
  location: string;
  rating: number;
  comment: string;
  avatar: string;
  isVerified: boolean;
}

export interface AdminTeamMember {
  id: string;
  name: string;
  role: string;
  experience: string;
  photo: string;
  bio: string;
  specialization: string;
}

export interface AdminSettings {
  companyName: string;
  tagline: string;
  phoneBangalore: string;
  phoneBhubaneswar: string;
  email: string;
  bangaloreAddress: string;
  bhubaneswarAddress: string;
  whatsappNumber: string;
  instagramUrl: string;
  facebookUrl: string;
  youtubeUrl: string;
}

export interface AdminStats {
  totalProjects: number;
  completedProjects: number;
  ongoingSites: number;
  totalPhotos: number;
  totalAppointments: number;
  pendingAppointments: number;
  totalLeads: number;
  newLeads: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminDataService {
  private readonly STORAGE_PREFIX = 'primespace_admin_';

  // Auth State
  readonly isAuthenticated = signal<boolean>(this.loadAuthFromStorage());

  // Projects State with Apartment -> Block -> Room Photos Hierarchy
  readonly projects = signal<AdminProject[]>(this.loadFromStorage('projects', this.getInitialProjects()));

  // Categories State
  readonly categories = signal<AdminCategory[]>(this.loadFromStorage('categories', this.getInitialCategories()));

  // Leads State
  readonly leads = signal<AdminLead[]>(this.loadFromStorage('leads', this.getInitialLeads()));

  // Appointments State
  readonly appointments = signal<AdminAppointment[]>(this.loadFromStorage('appointments', this.getInitialAppointments()));

  // Testimonials State
  readonly testimonials = signal<AdminTestimonial[]>(this.loadFromStorage('testimonials', this.getInitialTestimonials()));

  // Team State
  readonly teamMembers = signal<AdminTeamMember[]>(this.loadFromStorage('team', this.getInitialTeam()));

  // Settings State
  readonly settings = signal<AdminSettings>(this.loadFromStorage('settings', this.getInitialSettings()));

  constructor() {
    // Auto sync state changes to localStorage
    effect(() => this.saveToStorage('projects', this.projects()));
    effect(() => this.saveToStorage('categories', this.categories()));
    effect(() => this.saveToStorage('leads', this.leads()));
    effect(() => this.saveToStorage('appointments', this.appointments()));
    effect(() => this.saveToStorage('testimonials', this.testimonials()));
    effect(() => this.saveToStorage('team', this.teamMembers()));
    effect(() => this.saveToStorage('settings', this.settings()));
    effect(() => localStorage.setItem(this.STORAGE_PREFIX + 'auth', String(this.isAuthenticated())));
  }

  // Dashboard Computed Metrics
  readonly stats = computed<AdminStats>(() => {
    const proj = this.projects();
    const appts = this.appointments();
    const lds = this.leads();

    let totalPhotos = 0;
    proj.forEach(p => p.blocks.forEach(b => totalPhotos += (b.photos?.length || 0)));

    return {
      totalProjects: proj.length,
      completedProjects: proj.filter(p => p.status === 'completed').length,
      ongoingSites: proj.filter(p => p.status === 'ongoing').length,
      totalPhotos,
      totalAppointments: appts.length,
      pendingAppointments: appts.filter(a => a.status === 'Pending').length,
      totalLeads: lds.length,
      newLeads: lds.filter(l => l.status === 'NEW' || l.status === 'New').length
    };
  });

  // Auth Methods
  login(email: string, pass: string): boolean {
    if ((email === 'admin@primespace.com' || email === 'admin') && (pass === 'admin123' || pass === 'admin')) {
      this.isAuthenticated.set(true);
      return true;
    }
    return false;
  }

  logout() {
    this.isAuthenticated.set(false);
  }

  private loadAuthFromStorage(): boolean {
    if (typeof localStorage === 'undefined') return false;
    return localStorage.getItem(this.STORAGE_PREFIX + 'auth') === 'true';
  }

  // Generic Storage Helpers
  private loadFromStorage<T>(key: string, fallback: T): T {
    if (typeof localStorage === 'undefined') return fallback;
    try {
      const data = localStorage.getItem(this.STORAGE_PREFIX + key);
      if (!data) return fallback;
      
      const sanitized = data
        .replace(/\/luxury_living_room_1\.png/g, '/hero_living_room.png')
        .replace(/\/luxury_kitchen_1\.png/g, '/hero_kitchen.png')
        .replace(/\/luxury_bedroom_1\.png/g, '/bedroom_cat.png')
        .replace(/Block A – Home 12/g, 'Block A')
        .replace(/Block B – Home 08/g, 'Block B')
        .replace(/Block C – Sky Penthouse/g, 'Block C')
        .replace(/Tower 1 – Flat 302/g, 'Tower 1')
        .replace(/Tower 2 – Flat 501/g, 'Tower 2')
        .replace(/When Valluvan began planting[^\"]*/g, 'Vertical Gardens, Weatherproof Seating & Outdoor Decking');

      const parsed = JSON.parse(sanitized);

      if (key === 'categories' && Array.isArray(parsed)) {
        if (parsed.some(c => c.id === 'c1' || c.id === 'c2' || c.id === 'c3' || c.id === 'c4')) {
          return fallback;
        }
      }

      return parsed;
    } catch {
      return fallback;
    }
  }

  private saveToStorage(key: string, data: any) {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(this.STORAGE_PREFIX + key, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }

  // Projects CRUD
  addProject(project: Omit<AdminProject, 'id'>) {
    const newProject: AdminProject = {
      ...project,
      id: 'proj_' + Date.now()
    };
    this.projects.update(list => [newProject, ...list]);
  }

  updateProject(id: string, updated: Partial<AdminProject>) {
    this.projects.update(list =>
      list.map(p => p.id === id ? { ...p, ...updated } : p)
    );
  }

  deleteProject(id: string) {
    this.projects.update(list => list.filter(p => p.id !== id));
  }

  // Apartment Block & Photo Management
  addBlockToProject(projectId: string, blockName: string, homeCount: number) {
    const newBlock: AdminBlock = {
      id: 'blk_' + Date.now(),
      name: blockName,
      homeCount,
      completionPercentage: 100,
      selectedImageIndex: 0,
      photos: []
    };

    this.projects.update(list => list.map(p => {
      if (p.id === projectId) {
        return { ...p, blocks: [...p.blocks, newBlock] };
      }
      return p;
    }));
  }

  addPhotoToBlock(projectId: string, blockId: string, photo: Omit<BlockPhoto, 'id'>) {
    const newPhoto: BlockPhoto = {
      ...photo,
      id: 'img_' + Date.now()
    };

    this.projects.update(list => list.map(p => {
      if (p.id === projectId) {
        const updatedBlocks = p.blocks.map(b => {
          if (b.id === blockId) {
            return { ...b, photos: [newPhoto, ...(b.photos || [])] };
          }
          return b;
        });
        return { ...p, blocks: updatedBlocks };
      }
      return p;
    }));
  }

  addMultiplePhotosToBlock(projectId: string, blockId: string, photos: Omit<BlockPhoto, 'id'>[]) {
    const newPhotos: BlockPhoto[] = photos.map((p, idx) => ({
      ...p,
      id: 'img_' + Date.now() + '_' + idx
    }));

    this.projects.update(list => list.map(p => {
      if (p.id === projectId) {
        const updatedBlocks = p.blocks.map(b => {
          if (b.id === blockId) {
            return { ...b, photos: [...newPhotos, ...(b.photos || [])] };
          }
          return b;
        });
        return { ...p, blocks: updatedBlocks };
      }
      return p;
    }));
  }

  deletePhotoFromBlock(projectId: string, blockId: string, photoId: string) {
    this.projects.update(list => list.map(p => {
      if (p.id === projectId) {
        const updatedBlocks = p.blocks.map(b => {
          if (b.id === blockId) {
            return { ...b, photos: (b.photos || []).filter(ph => ph.id !== photoId) };
          }
          return b;
        });
        return { ...p, blocks: updatedBlocks };
      }
      return p;
    }));
  }

  deleteBlockFromProject(projectId: string, blockId: string) {
    this.projects.update(list => list.map(p => {
      if (p.id === projectId) {
        return { ...p, blocks: p.blocks.filter(b => b.id !== blockId) };
      }
      return p;
    }));
  }

  // Categories CRUD
  addCategory(category: Omit<AdminCategory, 'id'>) {
    const newCategory: AdminCategory = { ...category, id: 'cat_' + Date.now() };
    this.categories.update(list => [newCategory, ...list]);
  }

  updateCategory(id: string, updated: Partial<AdminCategory>) {
    this.categories.update(list => list.map(c => c.id === id ? { ...c, ...updated } : c));
  }

  deleteCategory(id: string) {
    this.categories.update(list => list.filter(c => c.id !== id));
  }

  // Leads Methods
  updateLeadStatus(id: string, status: AdminLead['status']) {
    this.leads.update(list => list.map(l => l.id === id ? { ...l, status } : l));
  }

  updateLeadNotes(id: string, notes: string) {
    this.leads.update(list => list.map(l => l.id === id ? { ...l, notes } : l));
  }

  deleteLead(id: string) {
    this.leads.update(list => list.filter(l => l.id !== id));
  }

  // Appointments Methods
  updateAppointmentStatus(id: string, status: AdminAppointment['status']) {
    this.appointments.update(list => list.map(a => a.id === id ? { ...a, status } : a));
  }

  deleteAppointment(id: string) {
    this.appointments.update(list => list.filter(a => a.id !== id));
  }

  addAppointment(appt: Omit<AdminAppointment, 'id' | 'status'>) {
    const newAppt: AdminAppointment = {
      ...appt,
      id: 'appt_' + Date.now(),
      status: 'Pending'
    };
    this.appointments.update(list => [newAppt, ...list]);
  }

  // Testimonials CRUD
  addTestimonial(t: Omit<AdminTestimonial, 'id'>) {
    const newT: AdminTestimonial = { ...t, id: 'testi_' + Date.now() };
    this.testimonials.update(list => [newT, ...list]);
  }

  updateTestimonial(id: string, updated: Partial<AdminTestimonial>) {
    this.testimonials.update(list => list.map(t => t.id === id ? { ...t, ...updated } : t));
  }

  deleteTestimonial(id: string) {
    this.testimonials.update(list => list.filter(t => t.id !== id));
  }

  // Team CRUD
  addTeamMember(m: Omit<AdminTeamMember, 'id'>) {
    const newM: AdminTeamMember = { ...m, id: 'team_' + Date.now() };
    this.teamMembers.update(list => [newM, ...list]);
  }

  updateTeamMember(id: string, updated: Partial<AdminTeamMember>) {
    this.teamMembers.update(list => list.map(m => m.id === id ? { ...m, ...updated } : m));
  }

  deleteTeamMember(id: string) {
    this.teamMembers.update(list => list.filter(m => m.id !== id));
  }

  // Settings Method
  updateSettings(newSettings: Partial<AdminSettings>) {
    this.settings.update(s => ({ ...s, ...newSettings }));
  }

  // Initial Seed Data Generators
  private getInitialProjects(): AdminProject[] {
    return [
      {
        id: 'royale-villa',
        title: 'Royale Villa',
        subtitle: 'Ultra-Luxury 4BHK Villa Interior & Automated Lighting',
        location: 'Indiranagar, Bangalore',
        city: 'Bangalore',
        apartmentName: 'Royale Villa Estate',
        status: 'completed',
        statusLabel: 'Completed & Handed Over',
        projectType: 'Villa',
        homeCount: 12,
        coverImage: '/hero_living_room.png',
        description: 'Exclusive 4BHK duplex villa featuring high-gloss HDMR paneling, Italian marble flooring, zero-edge false ceiling with ambient RGB strip lighting.',
        blocks: [
          {
            id: 'block-a',
            name: 'Block A',
            homeCount: 4,
            completionPercentage: 100,
            selectedImageIndex: 0,
            photos: [
              { id: 'p1', url: '/hero_living_room.png', caption: 'High-Gloss Paneling Living Room', category: 'Living Room' },
              { id: 'p2', url: '/hero_kitchen.png', caption: 'Acrylic Handleless Kitchen Island', category: 'Kitchen' },
              { id: 'p3', url: '/bedroom_cat.png', caption: 'Master Bed Ambient Strip Lighting', category: 'Bedroom' }
            ]
          },
          {
            id: 'block-b',
            name: 'Block B',
            homeCount: 4,
            completionPercentage: 100,
            selectedImageIndex: 0,
            photos: [
              { id: 'p4', url: '/hero_kitchen.png', caption: 'Modular Acrylic Pantry & Countertop', category: 'Kitchen' },
              { id: 'p5', url: '/about_living_room_masterpiece.png', caption: 'Living Lounge & Fluted Louvers', category: 'Living Room' }
            ]
          },
          {
            id: 'block-c',
            name: 'Block C',
            homeCount: 4,
            completionPercentage: 100,
            selectedImageIndex: 0,
            photos: [
              { id: 'p6', url: '/eleganza_bedroom.png', caption: 'Penthouse Glass Wardrobe Suite', category: 'Bedroom' }
            ]
          }
        ]
      },
      {
        id: 'grand-palace',
        title: 'Grand Palace Apartments',
        subtitle: 'Modern 3BHK Modular Kitchen & Master Suite',
        location: 'Saheed Nagar, Bhubaneswar',
        city: 'Bhubaneswar',
        apartmentName: 'Grand Palace Towers',
        status: 'ongoing',
        statusLabel: 'Live Construction Site',
        projectType: 'Apartment',
        homeCount: 18,
        coverImage: '/hero_kitchen.png',
        description: 'State-of-the-art apartment interior featuring acrylic handleless kitchen cabinets, Hafele soft-close hardware, and ambient foyer paneling.',
        blocks: [
          {
            id: 'tower-1',
            name: 'Tower 1',
            homeCount: 9,
            completionPercentage: 85,
            selectedImageIndex: 0,
            photos: [
              { id: 'p7', url: '/eleganza_plus_kitchen.png', caption: 'Hafele Soft-Close Pantry Units', category: 'Kitchen' },
              { id: 'p8', url: '/after_living_room.png', caption: 'TV Console & Quartz Wall', category: 'Living Room' }
            ]
          },
          {
            id: 'tower-2',
            name: 'Tower 2',
            homeCount: 9,
            completionPercentage: 60,
            selectedImageIndex: 0,
            photos: [
              { id: 'p9', url: '/bedroom_cat.png', caption: 'Tinted Glass Sliding Wardrobe', category: 'Bedroom' }
            ]
          }
        ]
      }
    ];
  }

  private getInitialCategories(): AdminCategory[] {
    return [
      {
        id: 'kitchen',
        num: '01',
        name: 'Kitchen Units',
        slug: 'kitchen-units',
        subtitle: 'Culinary Excellence & Modular Utility',
        type: 'kitchen',
        priceStarting: '₹1.4 Lakhs',
        deliveryTime: '45 Days',
        image: '/kitchen_cat.png',
        galleryImages: ['/kitchen_cat.png', '/hero_kitchen.png', '/eleganza_plus_kitchen.png', '/essential_kitchen.png'],
        description: 'Bespoke modular kitchens designed for culinary excellence, featuring intelligent space utilization, island counters, and precision-engineered soft-close fittings.',
        features: [
          'Modular Kitchen Solutions',
          'Custom-Size Cabinets & Units',
          'Premium Plywood & Durable Materials',
          'Tall Units & Utility Storage',
          'Corner & Smart Space Solutions',
          'Drawer & Basket Organizers',
          'Cutlery & Thali Organizers',
          'Bottle & Oil Pullouts',
          'Waste Bin Integration',
          'Under-Sink Storage Solutions',
          'Overhead & Loft Cabinets',
          'Custom Kitchen Island & Breakfast Counters',
          'Integrated Appliance Solutions',
          'Hob, Chimney & Microwave Integration',
          'Water-Resistant & Easy-to-Maintain Options',
          'End-to-End Design & Installation'
        ],
        itemCount: 38
      },
      {
        id: 'living',
        num: '02',
        name: 'Living Room',
        slug: 'living-room',
        subtitle: 'Entertainment & Luxury Lounging',
        type: 'living',
        priceStarting: '₹1.8 Lakhs',
        deliveryTime: '40 Days',
        image: '/living_cat.png',
        galleryImages: ['/living_cat.png', '/hero_living_room.png', '/after_living_room.png'],
        description: 'Sophisticated living rooms crafted for entertainment and luxury relaxation, combining plush seating with custom TV wall panels and ambient lighting.',
        features: [
          'Custom Fluted TV Panels',
          'Made-to-Measure TV Units',
          'Hidden Ambient LED Lighting',
          'Designer Accent Walls',
          'Premium Wall Paneling',
          'Built-in Display & Storage',
          'Floating Cabinets & Shelves',
          'Designer False Ceilings',
          'Plush Custom Seating',
          'Statement Lighting',
          'Smart Home Integration',
          'Custom Furniture & Finishes'
        ],
        itemCount: 42
      },
      {
        id: 'bedroom',
        num: '03',
        name: 'Bedroom Sanctuaries',
        slug: 'bedroom-sanctuaries',
        subtitle: 'Tranquil Retreats & Custom Bedding',
        type: 'bedroom',
        priceStarting: '₹1.2 Lakhs',
        deliveryTime: '35 Days',
        image: '/bedroom_cat.png',
        galleryImages: ['/bedroom_cat.png', '/eleganza_bedroom.png'],
        description: 'Bespoke bedroom sanctuaries crafted to foster tranquil sleep. Includes custom upholstered headboards, side panels, and integrated accent lighting.',
        features: [
          'Full-Height Fabric Headboards',
          'Integrated Side Tables',
          'Study Nooks & Reading Lights',
          'Mood Lighting Profiles'
        ],
        itemCount: 35
      },
      {
        id: 'dining',
        num: '04',
        name: 'Dining Room',
        slug: 'dining-room',
        subtitle: 'Elegant Gathering & Feast Spaces',
        type: 'dining',
        priceStarting: '₹95,000',
        deliveryTime: '30 Days',
        image: '/dining_cat.png',
        galleryImages: ['/dining_cat.png', '/living_cat.png'],
        description: 'Exquisite dining spaces built for memorable gatherings. Features custom marble table installations, designer pendant lights, and crockery bars.',
        features: [
          'Italian Marble Dining Tops',
          'Custom Crockery Display Units',
          'Designer Chandelier Lighting',
          'Wine & Bar Cabinets'
        ],
        itemCount: 28
      },
      {
        id: 'wardrobe',
        num: '05',
        name: 'Modular Wardrobes',
        slug: 'modular-wardrobes',
        subtitle: 'Precision Organization & Glass Closets',
        type: 'wardrobe',
        priceStarting: '₹1.1 Lakhs',
        deliveryTime: '35 Days',
        image: '/wardrobe_cat.png',
        galleryImages: ['/wardrobe_cat.png', '/bedroom_cat.png'],
        description: 'Luxury sliding and walk-in wardrobes with premium leather finishes, smoked glass doors, sensor lighting, and smart modular organizers.',
        features: [
          'Smoked Glass & Aluminum Profiles',
          'Auto-Sensor LED Hanger Rods',
          'Soft-Touch Drawers with Locks',
          'Integrated Vanity Mirrors'
        ],
        itemCount: 30
      },
      {
        id: 'kids',
        num: '06',
        name: 'Kids Bedroom',
        slug: 'kids-bedroom',
        subtitle: 'Vibrant, Safe & Modular Playrooms',
        type: 'kids',
        priceStarting: '₹85,000',
        deliveryTime: '30 Days',
        image: '/kids_cat.png',
        galleryImages: ['/kids_cat.png', '/bedroom_cat.png'],
        description: 'Vibrant, safe, and modular children bedrooms incorporating smart study tables, playful bunk beds, and non-toxic soft-edge storage walls.',
        features: [
          'Rounded Soft-Edge Finishes',
          'Bunk Beds with Drawer Storage',
          'Ergonomic Study Desks',
          'Magnetic Activity Walls'
        ],
        itemCount: 20
      },
      {
        id: 'bathroom',
        num: '07',
        name: 'Luxury Bathrooms',
        slug: 'luxury-bathrooms',
        subtitle: 'Spa-Inspired Vanities & Marble Counters',
        type: 'bathroom',
        priceStarting: '₹65,000',
        deliveryTime: '25 Days',
        image: '/bathroom_cat.png',
        galleryImages: ['/bathroom_cat.png', '/kitchen_cat.png'],
        description: 'Spa-like vanity units and bathroom transformations featuring gold brass fittings, storage cabinets, LED mirrors, and clean marble slab counters.',
        features: [
          'Anti-Fungus Moisture HDMR',
          'Touch-Sensor Defogger Mirrors',
          'Brushed Gold/Rose Hardware',
          'Under-Sink Storage Shelves'
        ],
        itemCount: 18
      },
      {
        id: 'balcony',
        num: '08',
        name: 'Balcony Decks',
        slug: 'balcony-decks',
        subtitle: 'Green Urban Escapes & Coffee Lounges',
        type: 'balcony',
        priceStarting: '₹45,000',
        deliveryTime: '20 Days',
        image: '/balcony_cat.png',
        galleryImages: ['/balcony_cat.png', '/living_cat.png'],
        description: 'Charming green escape spaces with vertical wooden rafters, fake grass flooring, weather-proof swing chairs, and storage coffee decks.',
        features: [
          'All-Weather WPC Decking',
          'Vertical Hydroponic Green Walls',
          'Built-in Seating with Drawers',
          'Ambient String & Solar Lights'
        ],
        itemCount: 15
      }
    ];
  }

  private getInitialLeads(): AdminLead[] {
    return [
      { id: 'ld_1', name: 'Rohan Sharma', email: 'rohan.sharma@example.com', phone: '+91 98765 43210', city: 'Bangalore', projectType: '3BHK Apartment', budget: '₹12 - 15 Lakhs', message: 'Looking for turnkey interior design for my new flat in HSR Layout.', date: '19 Aug 2026', status: 'NEW' },
      { id: 'ld_2', name: 'Priyanka Mohanty', email: 'p.mohanty@example.com', phone: '+91 94370 11223', city: 'Bhubaneswar', projectType: '4BHK Villa', budget: '₹20+ Lakhs', message: 'Interested in full duplex interior with modular kitchen & VR design.', date: '18 Aug 2026', status: 'IN_PROGRESS' }
    ];
  }

  private getInitialAppointments(): AdminAppointment[] {
    return [
      { id: 'ap_1', clientName: 'Amitav & Smita Roy', phone: '+91 98112 33445', email: 'amitav.roy@example.com', project: 'Royale Villa', city: 'Bangalore', preferredDate: '2026-08-24', preferredTime: '11:30 AM', status: 'Confirmed', notes: 'Requires VR studio walkthrough at Indiranagar center.' },
      { id: 'ap_2', clientName: 'Sanjay Patnaik', phone: '+91 99370 55667', email: 'sanjay.p@example.com', project: 'Grand Palace', city: 'Bhubaneswar', preferredDate: '2026-08-26', preferredTime: '04:00 PM', status: 'Pending', notes: 'Interested in German modular kitchen hardware.' }
    ];
  }

  private getInitialTestimonials(): AdminTestimonial[] {
    return [
      { id: 't1', name: 'Vikram & Swati Rao', role: 'Villa Owners', project: 'Royale Villa, Bangalore', location: 'Indiranagar', rating: 5, comment: 'PrimeSpace completed our 4BHK villa within 42 days. The 3D VR preview matched the actual finished home with 100% precision!', avatar: '/about_living_room_masterpiece.png', isVerified: true },
      { id: 't2', name: 'Debashish Das', role: 'Penthouse Owner', project: 'Grand Palace, Bhubaneswar', location: 'Saheed Nagar', rating: 5, comment: 'The acrylic modular kitchen finish and soft-close hardware quality is unmatched in Odisha. Highly recommended!', avatar: '/hero_kitchen.png', isVerified: true }
    ];
  }

  private getInitialTeam(): AdminTeamMember[] {
    return [
      { id: 'tm1', name: 'Ar. Rajesh Malhotra', role: 'Principal Architect & Founder', experience: '16+ Years', photo: '/about_living_room_masterpiece.png', bio: 'Specializes in high-end luxury residential architecture and photorealistic VR spatial planning.', specialization: 'Architectural Design & VR Space Planning' },
      { id: 'tm2', name: 'Ananya Sen', role: 'Lead Interior Stylist', experience: '10+ Years', photo: '/neha_avatar.png', bio: 'Expert in European color palettes, Italian marble paneling, and custom joinery.', specialization: 'Modular Joinery & Luxury Furnishings' }
    ];
  }

  private getInitialSettings(): AdminSettings {
    return {
      companyName: 'PrimeSpace Interior',
      tagline: 'Luxury Turnkey Interiors & Modular Architecture',
      phoneBangalore: '+91 80 4920 1800',
      phoneBhubaneswar: '+91 674 254 9900',
      email: 'contact@primespaceinterior.com',
      bangaloreAddress: '100 Feet Road, Indiranagar, Bengaluru, Karnataka 560038',
      bhubaneswarAddress: 'Janpath Road, Saheed Nagar, Bhubaneswar, Odisha 751007',
      whatsappNumber: '+91 98765 43210',
      instagramUrl: 'https://instagram.com',
      facebookUrl: 'https://facebook.com',
      youtubeUrl: 'https://youtube.com'
    };
  }
}
