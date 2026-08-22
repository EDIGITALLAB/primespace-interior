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
  name: string;
  slug: string;
  subtitle: string;
  type: string;
  priceStarting: string;
  image: string;
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
  status: 'New' | 'Contacted' | 'In Progress' | 'Closed';
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
      newLeads: lds.filter(l => l.status === 'New').length
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

      return JSON.parse(sanitized);
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
      { id: 'c1', name: 'Living Room Masterpieces', slug: 'living-room', subtitle: 'TV Unit Paneling, Fluted Louvers & Ambient Ceilings', type: 'Living Room', priceStarting: '₹2.85 Lakhs', image: '/hero_living_room.png', itemCount: 42 },
      { id: 'c2', name: 'Modular German Kitchens', slug: 'modular-kitchen', subtitle: 'Acrylic & Quartz Countertops with Blum Hardware', type: 'Kitchen', priceStarting: '₹3.40 Lakhs', image: '/hero_kitchen.png', itemCount: 38 },
      { id: 'c3', name: 'Master Bed Suites & Wardrobes', slug: 'master-bedroom', subtitle: 'Floor-to-Ceiling Tinted Glass Sliding Wardrobes', type: 'Bedroom', priceStarting: '₹2.90 Lakhs', image: '/bedroom_cat.png', itemCount: 35 },
      { id: 'c4', name: 'Balcony & Terrace Lounges', slug: 'balcony-design', subtitle: 'Vertical Gardens, Weatherproof Seating & Outdoor Decking', type: 'Balcony', priceStarting: '₹1.50 Lakhs', image: '/balcony_cat.png', itemCount: 15 }
    ];
  }

  private getInitialLeads(): AdminLead[] {
    return [
      { id: 'ld_1', name: 'Rohan Sharma', email: 'rohan.sharma@example.com', phone: '+91 98765 43210', city: 'Bangalore', projectType: '3BHK Apartment', budget: '₹12 - 15 Lakhs', message: 'Looking for turnkey interior design for my new flat in HSR Layout.', date: '19 Aug 2026', status: 'New' },
      { id: 'ld_2', name: 'Priyanka Mohanty', email: 'p.mohanty@example.com', phone: '+91 94370 11223', city: 'Bhubaneswar', projectType: '4BHK Villa', budget: '₹20+ Lakhs', message: 'Interested in full duplex interior with modular kitchen & VR design.', date: '18 Aug 2026', status: 'In Progress' }
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
