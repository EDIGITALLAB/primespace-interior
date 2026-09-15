import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { getApiBaseUrl, API_CONFIG } from '../config/api.config';

export interface BlockPhoto {
  id: string;
  url: string;
  caption: string;
  category: string;
}

export interface AdminBlock {
  id: string;
  name: string;
  homeCount: number;
  completionPercentage: number;
  selectedImageIndex: number;
  gallery?: string[];
  photos?: BlockPhoto[];
  categories?: string[];
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
  videoUrl?: string;
  videoUrls?: string[];
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
  isFeatured?: boolean;
  status?: 'ACTIVE' | 'INACTIVE' | string;
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
  formspreeFormId?: string;
}

export interface OfficeLocation {
  locationId?: number;
  branchName: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  email: string;
  whatsapp?: string;
  googleMapUrl?: string;
  openingTime?: string;
  closingTime?: string;
  workingDays?: string;
  isHeadOffice?: boolean;
  displayOrder?: number;
  status?: 'ACTIVE' | 'INACTIVE';
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminStats {
  totalProjects: number;
  completedProjects: number;
  ongoingSites: number;
  totalPhotos: number;
  totalLeads: number;
  newLeads: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminDataService {
  private http = inject(HttpClient);
  private get apiUrl(): string {
    return getApiBaseUrl();
  }
  private readonly STORAGE_PREFIX = 'primespace_admin_';
  private readonly SESSION_DURATION_MS = 24 * 60 * 60 * 1000; // 24 Hours Expiry

  // Auth State
  readonly isAuthenticated = signal<boolean>(this.loadAuthFromStorage());

  // Projects State with Apartment -> Block -> Room Photos Hierarchy
  readonly projects = signal<AdminProject[]>([]);

  // Categories State
  readonly categories = signal<AdminCategory[]>([]);

  // Office Locations State
  readonly officeLocations = signal<OfficeLocation[]>([]);

  // Leads State
  readonly leads = signal<AdminLead[]>([]);

  // Testimonials State
  readonly testimonials = signal<AdminTestimonial[]>([]);

  // Team State
  readonly teamMembers = signal<AdminTeamMember[]>([]);

  // Settings State
  readonly settings = signal<AdminSettings>(this.getInitialSettings());

  // Global Toast Notification State
  readonly toast = signal<{ message: string; type: 'success' | 'danger' | 'info' } | null>(null);
  private toastTimer: any = null;

  showToast(message: string, type: 'success' | 'danger' | 'info' = 'success') {
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }
    this.toast.set({ message, type });
    this.toastTimer = setTimeout(() => {
      this.toast.set(null);
    }, 3500);
  }

  closeToast() {
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }
    this.toast.set(null);
  }

  constructor() {
    // Fetch projects, categories, locations, leads & testimonials from backend on service init
    this.loadProjectsFromBackend().subscribe();
    this.loadCategoriesFromBackend().subscribe();
    this.loadOfficeLocationsFromBackend().subscribe();
    this.loadLeadsFromBackend().subscribe();
    this.loadTestimonialsFromBackend().subscribe();
    this.loadSettingsFromBackend().subscribe();

    // Clear any residual cached data keys from localStorage
    if (typeof localStorage !== 'undefined') {
      const dataKeys = ['projects', 'categories', 'officeLocations', 'leads', 'testimonials', 'team', 'settings', 'appointments'];
      dataKeys.forEach(k => localStorage.removeItem(this.STORAGE_PREFIX + k));
    }

    effect(() => localStorage.setItem(this.STORAGE_PREFIX + 'auth', String(this.isAuthenticated())));
  }

  // Dashboard Computed Metrics
  readonly stats = computed<AdminStats>(() => {
    const proj = this.projects();
    const lds = this.leads();

    let totalPhotos = 0;
    proj.forEach(p => p.blocks.forEach(b => totalPhotos += (b.photos?.length || 0)));

    return {
      totalProjects: proj.length,
      completedProjects: proj.filter(p => p.status === 'completed').length,
      ongoingSites: proj.filter(p => p.status === 'ongoing').length,
      totalPhotos,
      totalLeads: lds.length,
      newLeads: lds.filter(l => l.status === 'NEW' || l.status === 'New').length
    };
  });

  // Auth Methods
  login(email: string, pass: string): Observable<{ success: boolean; message?: string }> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, { email, password: pass }).pipe(
      tap((res) => {
        if (res && res.token) {
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem(this.STORAGE_PREFIX + 'token', res.token);
            localStorage.setItem(this.STORAGE_PREFIX + 'login_time', String(Date.now()));
            if (res.admin) {
              localStorage.setItem(this.STORAGE_PREFIX + 'admin', JSON.stringify(res.admin));
            }
          }
          this.isAuthenticated.set(true);
        }
      }),
      map(() => ({ success: true })),
      catchError((err) => {
        console.warn('Backend login attempt error:', err);
        const backendMsg = err?.error?.message || err?.error?.error || (err.status === 0 ? 'Backend server (http://localhost:8084) is not reachable.' : 'Invalid admin email or password.');
        return of({ success: false, message: backendMsg });
      })
    );
  }

  logout() {
    this.isAuthenticated.set(false);
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.STORAGE_PREFIX + 'token');
      localStorage.removeItem(this.STORAGE_PREFIX + 'admin');
      localStorage.removeItem(this.STORAGE_PREFIX + 'auth');
      localStorage.removeItem(this.STORAGE_PREFIX + 'login_time');
    }
  }

  changePassword(oldPassword: string, newPassword: string): Observable<{ success: boolean; message: string }> {
    const payload = { oldPassword, newPassword };
    return this.http.put<any>(`${this.apiUrl}/auth/change-password`, payload, { headers: this.getAuthHeaders() }).pipe(
      map(res => ({ success: true, message: res?.message || 'Password changed successfully!' })),
      catchError(err => {
        const backendMsg = err?.error?.message || err?.error?.error || 'Failed to change password. Please verify old password.';
        return of({ success: false, message: backendMsg });
      })
    );
  }

  forgotPassword(email: string): Observable<{ success: boolean; message: string }> {
    return this.http.post<any>(`${this.apiUrl}/auth/forgot-password`, { email }).pipe(
      map(res => ({ success: true, message: res?.message || 'OTP sent successfully to your email.' })),
      catchError(err => {
        const msg = err?.error?.message || err?.error?.error || 'Failed to send OTP. Please verify email address.';
        return of({ success: false, message: msg });
      })
    );
  }

  resetPassword(dto: { email: string; otp: string; newPassword: string; confirmPassword: string }): Observable<{ success: boolean; message: string }> {
    return this.http.put<any>(`${this.apiUrl}/auth/reset-password`, dto).pipe(
      map(res => ({ success: true, message: res?.message || 'Password reset successfully!' })),
      catchError(err => {
        const msg = err?.error?.message || err?.error?.error || 'Failed to reset password. Please check OTP and try again.';
        return of({ success: false, message: msg });
      })
    );
  }

  private loadAuthFromStorage(): boolean {
    if (typeof localStorage === 'undefined') return false;
    const isAuth = localStorage.getItem(this.STORAGE_PREFIX + 'auth') === 'true';
    if (!isAuth) return false;

    const loginTimeStr = localStorage.getItem(this.STORAGE_PREFIX + 'login_time');
    if (!loginTimeStr) {
      localStorage.setItem(this.STORAGE_PREFIX + 'login_time', String(Date.now()));
      return true;
    }

    const loginTime = Number(loginTimeStr);
    const elapsedTime = Date.now() - loginTime;

    if (elapsedTime > this.SESSION_DURATION_MS) {
      console.warn('Admin login session expired after 24 hours. Logging out...');
      this.logout();
      return false;
    }

    return true;
  }



  // Projects Backend Mapping & Backend Integration
  private mapBackendToAdminProject(bp: any): AdminProject {
    const isCompleted = (bp.status || '').toUpperCase() === 'COMPLETED';
    const status: 'completed' | 'ongoing' = isCompleted ? 'completed' : 'ongoing';
    const statusLabel = isCompleted ? 'Completed & Handed Over' : 'Live Construction Site';

    const blocks: AdminBlock[] = (bp.blocks || []).map((b: any) => {
      const photos: BlockPhoto[] = [];
      const gallery: string[] = [];
      const blockCategories: string[] = [];

      if (b.categories) {
        b.categories.forEach((cat: any) => {
          const rawCatName = cat.name || 'Living Room';
          const formattedCatName = rawCatName.split(' ')
            .map((w: string) => w ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : '')
            .join(' ');

          if (formattedCatName && !blockCategories.includes(formattedCatName)) {
            blockCategories.push(formattedCatName);
          }

          if (cat.images) {
            cat.images.forEach((img: any) => {
              const imgUrl = this.formatImageUrl(img.imageUrl || (img.fileName ? `/uploads/${img.fileName}` : ''));
              if (imgUrl) {
                photos.push({
                  id: (img.imageId || img.id || Date.now()).toString(),
                  url: imgUrl,
                  caption: img.caption || cat.name || 'Project Photo',
                  category: formattedCatName
                });
                gallery.push(imgUrl);
              }
            });
          }
        });
      }

      return {
        id: (b.blockId || b.id).toString(),
        name: b.name || 'Block A',
        homeCount: 0,
        completionPercentage: 100,
        selectedImageIndex: 0,
        gallery: gallery.length > 0 ? gallery : (bp.coverImage ? [this.formatImageUrl(bp.coverImage)] : []),
        photos: photos,
        categories: blockCategories
      };
    });

    let parsedVideoUrls: string[] = [];
    if (bp.videoUrls) {
      if (Array.isArray(bp.videoUrls)) {
        parsedVideoUrls = bp.videoUrls.map((u: string) => this.formatImageUrl(u)).filter(Boolean);
      } else if (typeof bp.videoUrls === 'string') {
        const rawStr = bp.videoUrls.trim();
        if (rawStr.startsWith('[')) {
          try {
            const arr = JSON.parse(rawStr);
            if (Array.isArray(arr)) {
              parsedVideoUrls = arr.map((u: string) => this.formatImageUrl(u)).filter(Boolean);
            }
          } catch {
            parsedVideoUrls = rawStr.split(',').map((s: string) => this.formatImageUrl(s.trim())).filter(Boolean);
          }
        } else {
          parsedVideoUrls = rawStr.split(',').map((s: string) => this.formatImageUrl(s.trim())).filter(Boolean);
        }
      }
    }
    if (bp.videoUrl) {
      const formattedSingle = this.formatImageUrl(bp.videoUrl);
      if (formattedSingle && !parsedVideoUrls.includes(formattedSingle)) {
        parsedVideoUrls.unshift(formattedSingle);
      }
    }

    return {
      id: (bp.projectId || bp.id).toString(),
      title: bp.name || bp.title || '',
      subtitle: bp.subtitle || '',
      location: bp.location || '',
      city: bp.city || 'Bangalore',
      apartmentName: bp.name || '',
      status: status,
      statusLabel: statusLabel,
      projectType: bp.propertyType ? (bp.propertyType.charAt(0).toUpperCase() + bp.propertyType.slice(1).toLowerCase()) : 'Apartment',
      homeCount: bp.totalBlocks || blocks.length || 0,
      coverImage: bp.coverImage ? this.formatImageUrl(bp.coverImage) : '',
      videoUrl: bp.videoUrl ? this.formatImageUrl(bp.videoUrl) : (parsedVideoUrls[0] || ''),
      videoUrls: parsedVideoUrls,
      description: bp.description || '',
      blocks: blocks
    };
  }

  loadProjectsFromBackend(): Observable<AdminProject[]> {
    return this.http.get<any[]>(`${this.apiUrl}/projects`).pipe(
      map(list => {
        if (list && list.length > 0) {
          const mapped = list.map(bp => this.mapBackendToAdminProject(bp));
          this.projects.set(mapped);
          return mapped;
        }
        return this.projects();
      }),
      catchError(err => {
        console.warn('Failed to load projects from backend:', err);
        return of(this.projects());
      })
    );
  }

  loadOfficeLocationsFromBackend(): Observable<OfficeLocation[]> {
    return this.http.get<OfficeLocation[]>(`${this.apiUrl}/locations`).pipe(
      tap(list => {
        if (list && list.length > 0) {
          this.officeLocations.set(list);
        }
      }),
      catchError(err => {
        console.warn('Error loading office locations from backend:', err);
        return of(this.officeLocations());
      })
    );
  }

  addOfficeLocation(loc: OfficeLocation) {
    const payload = {
      branchName: loc.branchName,
      city: loc.city,
      state: loc.state,
      address: loc.address,
      phone: loc.phone,
      email: loc.email,
      whatsapp: loc.whatsapp || '',
      googleMapUrl: loc.googleMapUrl || '',
      openingTime: loc.openingTime || '09:30 AM',
      closingTime: loc.closingTime || '07:30 PM',
      workingDays: loc.workingDays || 'Monday - Saturday',
      isHeadOffice: loc.isHeadOffice || false,
      displayOrder: loc.displayOrder || 1,
      status: loc.status || 'ACTIVE'
    };

    this.http.post<any>(`${this.apiUrl}/locations`, payload, { headers: this.getAuthHeaders() }).pipe(
      catchError(err => {
        console.error('Error adding office location:', err);
        return of(null);
      })
    ).subscribe(res => {
      this.loadOfficeLocationsFromBackend().subscribe();
    });
  }

  updateOfficeLocation(id: number, loc: Partial<OfficeLocation>) {
    this.http.put<any>(`${this.apiUrl}/locations/${id}`, loc, { headers: this.getAuthHeaders() }).pipe(
      catchError(err => {
        console.error('Error updating office location:', err);
        return of(null);
      })
    ).subscribe(res => {
      this.loadOfficeLocationsFromBackend().subscribe();
    });
  }

  deleteOfficeLocation(id: number) {
    this.http.delete<any>(`${this.apiUrl}/locations/${id}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(err => {
        console.error('Error deleting office location:', err);
        return of(null);
      })
    ).subscribe(res => {
      this.loadOfficeLocationsFromBackend().subscribe();
    });
  }

  loadSettingsFromBackend(): Observable<AdminSettings> {
    return this.http.get<AdminSettings>(`${this.apiUrl}/settings`).pipe(
      tap(res => {
        if (res) {
          this.settings.set(res);
        }
      }),
      catchError(err => {
        console.warn('Error loading settings from backend:', err);
        return of(this.settings());
      })
    );
  }

  private ensureProtocol(url?: string): string | undefined {
    if (!url || !url.trim()) return url;
    const trimmed = url.trim();
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('//')) {
      return trimmed;
    }
    return `https://${trimmed}`;
  }

  updateSettings(s: Partial<AdminSettings>) {
    const formatted = { ...s };
    if (formatted.facebookUrl) formatted.facebookUrl = this.ensureProtocol(formatted.facebookUrl);
    if (formatted.instagramUrl) formatted.instagramUrl = this.ensureProtocol(formatted.instagramUrl);
    if (formatted.youtubeUrl) formatted.youtubeUrl = this.ensureProtocol(formatted.youtubeUrl);

    const updated = { ...this.settings(), ...formatted };
    this.settings.set(updated);
    this.http.put<any>(`${this.apiUrl}/settings`, updated, { headers: this.getAuthHeaders() }).pipe(
      catchError(err => {
        console.error('Error updating settings in backend:', err);
        return of(null);
      })
    ).subscribe(res => {
      if (res) {
        this.settings.set(res);
      }
    });
  }

  // Projects CRUD
  async addProject(project: Omit<AdminProject, 'id'>) {
    let finalCoverImage = project.coverImage || '';

    if (finalCoverImage.startsWith('data:image/')) {
      try {
        const fileToUpload = await this.urlToFile(finalCoverImage, `cover_${Date.now()}.jpg`);
        if (fileToUpload && fileToUpload.size > 0) {
          const formData = new FormData();
          formData.append('file', fileToUpload);
          const res = await this.http.post<any>(`${this.apiUrl}/images/upload`, formData, { headers: this.getAuthHeaders() }).toPromise();
          if (res && res.imageUrl) {
            finalCoverImage = res.imageUrl;
          }
        }
      } catch (e) {
        console.warn('Failed to upload cover image file, storing original URL string:', e);
      }
    }

    const rawVideoUrls = project.videoUrls && project.videoUrls.length > 0
      ? project.videoUrls
      : (project.videoUrl ? [project.videoUrl] : []);

    const finalVideoUrls: string[] = [];
    for (const vUrl of rawVideoUrls) {
      if (!vUrl || !vUrl.trim()) continue;
      if (vUrl.startsWith('data:video/')) {
        try {
          const fileToUpload = await this.urlToFile(vUrl, `video_${Date.now()}_${Math.random().toString(36).substring(2, 6)}.mp4`);
          if (fileToUpload && fileToUpload.size > 0) {
            const formData = new FormData();
            formData.append('file', fileToUpload);
            const res = await this.http.post<any>(`${this.apiUrl}/images/upload`, formData, { headers: this.getAuthHeaders() }).toPromise();
            if (res && res.imageUrl) {
              finalVideoUrls.push(res.imageUrl);
            } else {
              finalVideoUrls.push(vUrl);
            }
          } else {
            finalVideoUrls.push(vUrl);
          }
        } catch (e) {
          console.warn('Failed to upload video file, keeping string:', e);
          finalVideoUrls.push(vUrl);
        }
      } else {
        finalVideoUrls.push(vUrl);
      }
    }
    const finalVideoUrl = finalVideoUrls[0] || project.videoUrl || '';

    const payload = {
      name: project.title,
      slug: project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      subtitle: project.subtitle,
      propertyType: (project.projectType || 'APARTMENT').toUpperCase(),
      description: project.description,
      location: project.location,
      city: project.city,
      coverImage: finalCoverImage,
      videoUrl: finalVideoUrl,
      videoUrls: finalVideoUrls.join(','),
      status: project.status === 'completed' ? 'COMPLETED' : 'ONGOING',
      totalBlocks: project.blocks ? project.blocks.length : 0
    };

    this.http.post<any>(`${this.apiUrl}/projects`, payload, { headers: this.getAuthHeaders() }).pipe(
      catchError(err => {
        console.error('Error adding project to backend:', err);
        return of(null);
      })
    ).subscribe(res => {
      if (res) {
        this.loadProjectsFromBackend().subscribe();
      } else {
        const newProject: AdminProject = {
          ...project,
          coverImage: finalCoverImage,
          videoUrl: finalVideoUrl,
          videoUrls: finalVideoUrls,
          id: 'proj_' + Date.now()
        };
        this.projects.update(list => [newProject, ...list]);
      }
    });
  }

  async updateProject(id: string, updated: Partial<AdminProject>) {
    const numericId = parseInt(id, 10);
    const existing = this.projects().find(p => p.id === id);
    const updatedProj = { ...existing, ...updated } as AdminProject;

    let finalCoverImage = updatedProj.coverImage || '';
    if (finalCoverImage.startsWith('data:image/')) {
      try {
        const fileToUpload = await this.urlToFile(finalCoverImage, `cover_${Date.now()}.jpg`);
        if (fileToUpload && fileToUpload.size > 0) {
          const formData = new FormData();
          formData.append('file', fileToUpload);
          const res = await this.http.post<any>(`${this.apiUrl}/images/upload`, formData, { headers: this.getAuthHeaders() }).toPromise();
          if (res && res.imageUrl) {
            finalCoverImage = res.imageUrl;
          }
        }
      } catch (e) {
        console.warn('Failed to upload cover image file in update, keeping string:', e);
      }
    }
    updatedProj.coverImage = finalCoverImage;

    const rawVideoUrls = updatedProj.videoUrls && updatedProj.videoUrls.length > 0
      ? updatedProj.videoUrls
      : (updatedProj.videoUrl ? [updatedProj.videoUrl] : []);

    const finalVideoUrls: string[] = [];
    for (const vUrl of rawVideoUrls) {
      if (!vUrl || !vUrl.trim()) continue;
      if (vUrl.startsWith('data:video/')) {
        try {
          const fileToUpload = await this.urlToFile(vUrl, `video_${Date.now()}_${Math.random().toString(36).substring(2, 6)}.mp4`);
          if (fileToUpload && fileToUpload.size > 0) {
            const formData = new FormData();
            formData.append('file', fileToUpload);
            const res = await this.http.post<any>(`${this.apiUrl}/images/upload`, formData, { headers: this.getAuthHeaders() }).toPromise();
            if (res && res.imageUrl) {
              finalVideoUrls.push(res.imageUrl);
            } else {
              finalVideoUrls.push(vUrl);
            }
          } else {
            finalVideoUrls.push(vUrl);
          }
        } catch (e) {
          console.warn('Failed to upload video file in update, keeping string:', e);
          finalVideoUrls.push(vUrl);
        }
      } else {
        finalVideoUrls.push(vUrl);
      }
    }
    const finalVideoUrl = finalVideoUrls[0] || updatedProj.videoUrl || '';
    updatedProj.videoUrl = finalVideoUrl;
    updatedProj.videoUrls = finalVideoUrls;

    if (!isNaN(numericId)) {
      const payload = {
        projectId: numericId,
        name: updatedProj.title,
        slug: updatedProj.title ? updatedProj.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : undefined,
        subtitle: updatedProj.subtitle,
        propertyType: updatedProj.projectType ? updatedProj.projectType.toUpperCase() : undefined,
        description: updatedProj.description,
        location: updatedProj.location,
        city: updatedProj.city,
        coverImage: finalCoverImage,
        videoUrl: finalVideoUrl,
        videoUrls: finalVideoUrls.join(','),
        status: updatedProj.status === 'completed' ? 'COMPLETED' : 'ONGOING',
        totalBlocks: updatedProj.blocks ? updatedProj.blocks.length : undefined
      };

      this.http.put<any>(`${this.apiUrl}/projects/${numericId}`, payload, { headers: this.getAuthHeaders() }).pipe(
        catchError(err => {
          console.error('Error updating project on backend:', err);
          return of(null);
        })
      ).subscribe(res => {
        if (res) {
          this.loadProjectsFromBackend().subscribe();
        } else {
          this.projects.update(list => list.map(p => p.id === id ? { ...p, ...updated, coverImage: finalCoverImage, videoUrl: finalVideoUrl, videoUrls: finalVideoUrls } : p));
        }
      });
    } else {
      this.projects.update(list => list.map(p => p.id === id ? { ...p, ...updated, coverImage: finalCoverImage, videoUrl: finalVideoUrl, videoUrls: finalVideoUrls } : p));
    }
  }

  deleteProject(id: string) {
    const numericId = parseInt(id, 10);
    if (!isNaN(numericId)) {
      this.http.delete<any>(`${this.apiUrl}/projects/${numericId}`, { headers: this.getAuthHeaders() }).pipe(
        catchError(err => {
          console.error('Error deleting project from backend:', err);
          return of(null);
        })
      ).subscribe(() => {
        this.loadProjectsFromBackend().subscribe();
      });
    } else {
      this.projects.update(list => list.filter(p => p.id !== id));
    }
  }

  // Apartment Block & Photo Management

  private async getOrCreateCategoryId(numericBlockId: number, categoryName: string): Promise<number | null> {
    try {
      const existingCategories = await this.http.get<any[]>(`${this.apiUrl}/blocks/${numericBlockId}/categories`, { headers: this.getAuthHeaders() }).toPromise();
      const normTarget = (categoryName || '').toLowerCase().trim();

      const found = existingCategories?.find(c => {
        const cName = (c.name || '').toLowerCase().trim();
        return cName === normTarget || cName.includes(normTarget) || normTarget.includes(cName);
      });
      if (found && found.categoryId) {
        return found.categoryId;
      }

      const created = await this.http.post<any>(`${this.apiUrl}/blocks/${numericBlockId}/categories`, { name: categoryName.toLowerCase() }, { headers: this.getAuthHeaders() }).toPromise();
      return created?.categoryId || null;
    } catch (e) {
      console.warn('Error fetching or creating category for block, trying direct creation:', e);
      try {
        const created = await this.http.post<any>(`${this.apiUrl}/blocks/${numericBlockId}/categories`, { name: categoryName.toLowerCase() }, { headers: this.getAuthHeaders() }).toPromise();
        return created?.categoryId || null;
      } catch (err2) {
        console.error('Failed to create category on backend fallback:', err2);
        return null;
      }
    }
  }

  private base64ToFile(base64Data: string, filename: string): File {
    try {
      const arr = base64Data.split(',');
      const mimeMatch = arr[0].match(/:(.*?);/);
      const mime = mimeMatch ? mimeMatch[1] : 'image/jpeg';
      const cleanBase64 = (arr[1] || arr[0]).trim().replace(/\s/g, '');
      const bstr = atob(cleanBase64);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    } catch (e) {
      console.error('Error converting base64 to file:', e);
      return new File([new Uint8Array(0)], filename, { type: 'image/jpeg' });
    }
  }

  private async urlToFile(url: string, filename: string): Promise<File> {
    if (!url || !url.trim()) {
      return new File([new Uint8Array(0)], filename, { type: 'image/jpeg' });
    }

    try {
      let fullUrl = url;
      if (!url.startsWith('data:') && url.startsWith('/')) {
        fullUrl = `${this.apiUrl.replace('/api', '')}${url}`;
      }
      const res = await fetch(fullUrl);
      const blob = await res.blob();
      const mime = blob.type || 'image/jpeg';
      return new File([blob], filename, { type: mime });
    } catch (err) {
      console.warn('Native fetch failed for url, using base64ToFile fallback:', err);
      if (url.startsWith('data:image/') || url.startsWith('data:video/')) {
        return this.base64ToFile(url, filename);
      }
      return new File([new Uint8Array(0)], filename, { type: 'image/jpeg' });
    }
  }

  async uploadPhotoToBackend(numericBlockId: number, photo: Omit<BlockPhoto, 'id'>): Promise<any> {
    try {
      const categoryId = await this.getOrCreateCategoryId(numericBlockId, photo.category);
      if (!categoryId) {
        console.error('No categoryId obtained for block', numericBlockId, photo.category);
        return null;
      }

      // Case 1: Base64 Data URL (from local file selection)
      if (photo.url.startsWith('data:image/')) {
        const ext = photo.url.substring(photo.url.indexOf('/') + 1, photo.url.indexOf(';')) || 'jpg';
        const fileToUpload = this.base64ToFile(photo.url, `photo_${Date.now()}.${ext}`);

        if (!fileToUpload || fileToUpload.size === 0) {
          console.error('Base64 conversion yielded 0 bytes!');
          return null;
        }

        const formData = new FormData();
        formData.append('file', fileToUpload);
        formData.append('categoryId', categoryId.toString());
        if (photo.caption) {
          formData.append('caption', photo.caption);
        }

        const res = await this.http.post<any>(`${this.apiUrl}/images/upload`, formData, { headers: this.getAuthHeaders() }).toPromise();
        console.log('Successfully uploaded file image to backend:', res);
        return res;
      }

      // Case 2: Image URL / Path (http://, https://, /hero_...) -> call POST /api/images/upload-url
      let params = new HttpParams()
        .set('imageUrl', photo.url)
        .set('categoryId', categoryId.toString());

      if (photo.caption) {
        params = params.set('caption', photo.caption);
      }

      const res = await this.http.post<any>(`${this.apiUrl}/images/upload-url`, null, {
        params,
        headers: this.getAuthHeaders()
      }).toPromise();
      console.log('Successfully uploaded image URL to backend:', res);
      return res;

    } catch (err) {
      console.error('uploadPhotoToBackend failed:', err);
      return null;
    }
  }

  addPhotoToBlock(projectId: string, blockId: string, photo: Omit<BlockPhoto, 'id'>) {
    this.addMultiplePhotosToBlock(projectId, blockId, [photo]);
  }

  async addMultiplePhotosToBlock(projectId: string, blockId: string, photos: Omit<BlockPhoto, 'id'>[]) {
    const numericBlockId = parseInt(blockId, 10);

    if (!isNaN(numericBlockId)) {
      // Instantly update local signal for immediate UI response
      const tempPhotos: BlockPhoto[] = photos.map((p, idx) => ({
        ...p,
        id: 'img_temp_' + Date.now() + '_' + idx
      }));
      this.projects.update(list => list.map(p => {
        if (p.id === projectId) {
          const updatedBlocks = p.blocks.map(b => {
            if (b.id === blockId) {
              return { ...b, photos: [...tempPhotos, ...(b.photos || [])] };
            }
            return b;
          });
          return { ...p, blocks: updatedBlocks };
        }
        return p;
      }));

      // Upload photos to backend sequentially one by one to avoid category race conditions
      try {
        for (const photo of photos) {
          await this.uploadPhotoToBackend(numericBlockId, photo);
        }
      } catch (err) {
        console.error('Error uploading photos sequentially to backend:', err);
      } finally {
        this.loadProjectsFromBackend().subscribe();
      }
    } else {
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
  }

  deletePhotoFromBlock(projectId: string, blockId: string, photoId: string) {
    const numericPhotoId = parseInt(photoId, 10);
    if (!isNaN(numericPhotoId)) {
      this.http.delete<any>(`${this.apiUrl}/images/${numericPhotoId}`, { headers: this.getAuthHeaders() }).pipe(
        catchError(err => {
          console.error('Error deleting photo from backend:', err);
          return of(null);
        })
      ).subscribe(() => {
        this.loadProjectsFromBackend().subscribe();
      });
    } else {
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
  }

  addBlockToProject(projectId: string, blockName: string, homeCount?: number) {
    const numericProjectId = parseInt(projectId, 10);
    if (!isNaN(numericProjectId)) {
      const payload = {
        name: blockName,
        displayOrder: 1
      };
      this.http.post<any>(`${this.apiUrl}/projects/${numericProjectId}/blocks`, payload, { headers: this.getAuthHeaders() }).pipe(
        catchError(err => {
          console.error('Error adding block to backend:', err);
          return of(null);
        })
      ).subscribe(res => {
        this.loadProjectsFromBackend().subscribe();
      });
    } else {
      const newBlock: AdminBlock = {
        id: 'blk_' + Date.now(),
        name: blockName,
        homeCount: homeCount || 0,
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
  }

  addCategoryToBlock(blockId: string, categoryName: string) {
    const numericBlockId = parseInt(blockId, 10);
    if (!isNaN(numericBlockId) && categoryName.trim()) {
      const payload = { name: categoryName.trim().toLowerCase() };
      this.http.post<any>(`${this.apiUrl}/blocks/${numericBlockId}/categories`, payload, { headers: this.getAuthHeaders() }).pipe(
        catchError(err => {
          console.error('Error adding category to block:', err);
          return of(null);
        })
      ).subscribe(res => {
        this.loadProjectsFromBackend().subscribe();
      });
    }
  }

  deleteBlockFromProject(projectId: string, blockId: string) {
    const numericBlockId = parseInt(blockId, 10);
    if (!isNaN(numericBlockId)) {
      this.http.delete<any>(`${this.apiUrl}/blocks/${numericBlockId}`, { headers: this.getAuthHeaders() }).pipe(
        catchError(err => {
          console.error('Error deleting block from backend:', err);
          return of(null);
        })
      ).subscribe(() => {
        this.loadProjectsFromBackend().subscribe();
      });
    } else {
      this.projects.update(list => list.map(p => {
        if (p.id === projectId) {
          return { ...p, blocks: p.blocks.filter(b => b.id !== blockId) };
        }
        return p;
      }));
    }
  }

  // Helper Headers & Category Backend Mappings
  private getAuthHeaders(): HttpHeaders {
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem(this.STORAGE_PREFIX + 'token') : null;
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  private mapTypeToCategoryType(type: string): string {
    const t = (type || '').toUpperCase().trim();
    if (t.includes('KITCHEN')) return 'KITCHEN';
    if (t.includes('LIVING')) return 'LIVING_ROOM';
    if (t.includes('KIDS') || t.includes('CHILD')) return 'KIDS_ROOM';
    if (t.includes('BEDROOM') || t.includes('BED')) return 'BEDROOM';
    if (t.includes('BATHROOM') || t.includes('BATH')) return 'BATHROOM';
    if (t.includes('DINING')) return 'DINING_ROOM';
    if (t.includes('BALCONY')) return 'BALCONY';
    if (t.includes('WARDROBE')) return 'WARDROBE';
    return 'OTHER';
  }

  private mapCategoryTypeToDisplay(catType?: string): string {
    if (!catType) return 'Kitchen';
    const ct = catType.toUpperCase();
    if (ct === 'KITCHEN') return 'Kitchen';
    if (ct === 'LIVING_ROOM') return 'Living Room';
    if (ct === 'BEDROOM') return 'Bedroom';
    if (ct === 'KIDS_ROOM') return 'Kids Bedroom';
    if (ct === 'BATHROOM') return 'Luxury Bathrooms';
    if (ct === 'DINING_ROOM') return 'Dining';
    if (ct === 'BALCONY') return 'Balcony Decks';
    if (ct === 'WARDROBE') return 'Modular Wardrobes';
    return catType;
  }

  formatImageUrl(path?: string): string {
    if (!path || !path.trim()) return '';
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    if (path.startsWith('data:image')) return path;
    if (path.startsWith('/uploads/')) return `${API_CONFIG.baseUrl}${path}`;
    if (path.startsWith('uploads/')) return `${API_CONFIG.baseUrl}/${path}`;
    if (path.startsWith('/')) return path;
    if (path.includes('avatar') || path.endsWith('.webp') || path.endsWith('.png') || path.endsWith('.jpg')) {
      return `/${path}`;
    }
    return `${API_CONFIG.baseUrl}/uploads/${path}`;
  }

  mapDetailCategoryToAdminCategory(dto: any, index: number): AdminCategory {
    const rawImages: string[] = dto.images || [];
    const formattedImages = rawImages.map(img => this.formatImageUrl(img));
    const coverImage = formattedImages.length > 0 ? formattedImages[0] : '/hero_kitchen.png';

    return {
      id: dto.detailCategoryId ? dto.detailCategoryId.toString() : (dto.slug || `cat_${index}`),
      num: String(dto.displayOrder || index + 1).padStart(2, '0'),
      name: dto.title || 'Category',
      slug: dto.slug || '',
      subtitle: dto.subtitle || '',
      type: this.mapCategoryTypeToDisplay(dto.categoryType),
      priceStarting: '₹1.4 Lakhs',
      deliveryTime: dto.duration || '45 Days',
      image: coverImage,
      galleryImages: formattedImages.length > 0 ? formattedImages : [coverImage],
      description: dto.description || '',
      features: dto.keyHighlights || [],
      itemCount: 15
    };
  }

  loadCategoriesFromBackend(): Observable<AdminCategory[]> {
    return this.http.get<any[]>(`${this.apiUrl}/detail-categories`).pipe(
      map(list => {
        if (list && list.length > 0) {
          const mapped = list.map((item, idx) => this.mapDetailCategoryToAdminCategory(item, idx));
          this.categories.set(mapped);
          return mapped;
        }
        this.categories.set([]);
        return [];
      }),
      catchError(err => {
        console.warn('Failed to load categories from backend:', err);
        this.categories.set([]);
        return of([]);
      })
    );
  }

  // Categories CRUD
  addCategory(category: Omit<AdminCategory, 'id'>) {
    const body = {
      title: category.name,
      slug: category.slug || category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      categoryType: this.mapTypeToCategoryType(category.type),
      subtitle: category.subtitle,
      description: category.description,
      duration: category.deliveryTime,
      keyHighlights: category.features || [],
      images: category.galleryImages || (category.image ? [category.image] : [])
    };

    this.http.post<any>(`${this.apiUrl}/detail-categories`, body, { headers: this.getAuthHeaders() }).pipe(
      catchError(err => {
        console.error('Error adding category to backend:', err);
        return of(null);
      })
    ).subscribe(res => {
      if (res) {
        this.loadCategoriesFromBackend().subscribe();
      } else {
        const newCategory: AdminCategory = { ...category, id: 'cat_' + Date.now() };
        this.categories.update(list => [newCategory, ...list]);
      }
    });
  }

  updateCategory(id: string, updated: Partial<AdminCategory>) {
    const numericId = parseInt(id, 10);
    const existing = this.categories().find(c => c.id === id);
    const updatedCategory = { ...existing, ...updated } as AdminCategory;

    const body = {
      detailCategoryId: isNaN(numericId) ? null : numericId,
      title: updatedCategory.name,
      slug: updatedCategory.slug || updatedCategory.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      categoryType: this.mapTypeToCategoryType(updatedCategory.type),
      subtitle: updatedCategory.subtitle,
      description: updatedCategory.description,
      duration: updatedCategory.deliveryTime,
      keyHighlights: updatedCategory.features || [],
      images: updatedCategory.galleryImages || (updatedCategory.image ? [updatedCategory.image] : [])
    };

    if (!isNaN(numericId)) {
      this.http.put<any>(`${this.apiUrl}/detail-categories/${numericId}`, body, { headers: this.getAuthHeaders() }).pipe(
        catchError(err => {
          console.error('Error updating category on backend:', err);
          return of(null);
        })
      ).subscribe(res => {
        if (res) {
          this.loadCategoriesFromBackend().subscribe();
        } else {
          this.categories.update(list => list.map(c => c.id === id ? { ...c, ...updated } : c));
        }
      });
    } else {
      this.categories.update(list => list.map(c => c.id === id ? { ...c, ...updated } : c));
    }
  }

  deleteCategory(id: string) {
    const numericId = parseInt(id, 10);
    if (!isNaN(numericId)) {
      this.http.delete<any>(`${this.apiUrl}/detail-categories/${numericId}`, { headers: this.getAuthHeaders() }).pipe(
        catchError(err => {
          console.error('Error deleting category from backend:', err);
          return of(null);
        })
      ).subscribe(() => {
        this.loadCategoriesFromBackend().subscribe();
      });
    } else {
      this.categories.update(list => list.filter(c => c.id !== id));
    }
  }

  // Leads Methods & Backend Integration
  loadLeadsFromBackend(): Observable<AdminLead[]> {
    return this.http.get<any>(`${this.apiUrl}/consultations?size=100`, { headers: this.getAuthHeaders() }).pipe(
      map(res => {
        const content = res?.content || (Array.isArray(res) ? res : []);
        if (content && content.length > 0) {
          const mapped: AdminLead[] = content.map((c: any) => ({
            id: c.consultationId ? c.consultationId.toString() : 'ld_' + Date.now(),
            name: c.fullName || 'Anonymous Client',
            email: c.email || '',
            phone: c.phone || '',
            city: c.location || 'Bangalore',
            projectType: 'Free Consultation',
            budget: 'Turnkey Project',
            message: c.message || 'Consultation Inquiry',
            date: c.createdAt ? new Date(c.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Today',
            status: c.status || 'NEW',
            notes: c.notes || ''
          }));
          this.leads.set(mapped);
          return mapped;
        }
        return this.leads();
      }),
      catchError(err => {
        console.warn('Failed to load consultations/leads from backend:', err);
        return of(this.leads());
      })
    );
  }

  updateLeadStatus(id: string, status: AdminLead['status']) {
    const numericId = parseInt(id, 10);
    const upperStatus = (status || 'NEW').toUpperCase().replace(/\s+/g, '_');

    if (!isNaN(numericId)) {
      this.http.put<any>(`${this.apiUrl}/consultations/${numericId}/status`, { status: upperStatus }, { headers: this.getAuthHeaders() }).pipe(
        catchError(err => {
          console.error('Error updating consultation status on backend:', err);
          return of(null);
        })
      ).subscribe(res => {
        if (res) {
          this.loadLeadsFromBackend().subscribe();
        } else {
          this.leads.update(list => list.map(l => l.id === id ? { ...l, status } : l));
        }
      });
    } else {
      this.leads.update(list => list.map(l => l.id === id ? { ...l, status } : l));
    }
  }

  updateLeadNotes(id: string, notes: string) {
    const numericId = parseInt(id, 10);
    if (!isNaN(numericId)) {
      this.http.put<any>(`${this.apiUrl}/consultations/${numericId}/notes`, { notes }, { headers: this.getAuthHeaders() }).pipe(
        catchError(err => {
          console.error('Error updating consultation notes on backend:', err);
          return of(null);
        })
      ).subscribe(res => {
        if (res) {
          this.loadLeadsFromBackend().subscribe();
        } else {
          this.leads.update(list => list.map(l => l.id === id ? { ...l, notes } : l));
        }
      });
    } else {
      this.leads.update(list => list.map(l => l.id === id ? { ...l, notes } : l));
    }
  }

  deleteLead(id: string) {
    const numericId = parseInt(id, 10);
    if (!isNaN(numericId)) {
      this.http.delete<any>(`${this.apiUrl}/consultations/${numericId}`, { headers: this.getAuthHeaders() }).pipe(
        catchError(err => {
          console.error('Error deleting consultation from backend:', err);
          return of(null);
        })
      ).subscribe(() => {
        this.loadLeadsFromBackend().subscribe();
      });
    } else {
      this.leads.update(list => list.filter(l => l.id !== id));
    }
  }


  // Testimonials CRUD & Backend Integration
  loadTestimonialsFromBackend(): Observable<AdminTestimonial[]> {
    return this.http.get<any>(`${this.apiUrl}/testimonials?activeOnly=false&size=100`).pipe(
      map(res => {
        const content = res?.content || (Array.isArray(res) ? res : []);
        if (content && content.length > 0) {
          const mapped: AdminTestimonial[] = content.map((t: any) => ({
            id: t.testimonialId ? t.testimonialId.toString() : 't_' + Date.now(),
            name: t.clientName || 'Homeowner Client',
            role: t.isFeatured ? 'Featured Homeowner' : 'Villa Owner',
            project: t.projectTitle || 'Turnkey Project',
            location: t.location || 'Bangalore',
            rating: t.rating != null ? Number(t.rating) : 5,
            comment: t.review || '',
            avatar: this.formatImageUrl(t.clientImage),
            isVerified: true,
            isFeatured: t.isFeatured ?? true,
            status: t.status || 'ACTIVE'
          }));
          this.testimonials.set(mapped);
          return mapped;
        }
        this.testimonials.set([]);
        return [];
      }),
      catchError(err => {
        console.warn('Failed to load testimonials from backend:', err);
        this.testimonials.set([]);
        return of([]);
      })
    );
  }

  addTestimonial(t: Omit<AdminTestimonial, 'id'>) {
    const body = {
      clientName: t.name,
      location: t.location,
      projectTitle: t.project,
      review: t.comment,
      rating: Number(t.rating) || 5,
      clientImage: t.avatar,
      isFeatured: t.isFeatured ?? true,
      status: t.status || 'ACTIVE'
    };

    this.http.post<any>(`${this.apiUrl}/testimonials`, body, { headers: this.getAuthHeaders() }).pipe(
      catchError(err => {
        console.error('Error adding testimonial to backend:', err);
        return of(null);
      })
    ).subscribe(res => {
      if (res) {
        this.loadTestimonialsFromBackend().subscribe();
      } else {
        const newT: AdminTestimonial = { ...t, id: 'testi_' + Date.now() };
        this.testimonials.update(list => [newT, ...list]);
      }
    });
  }

  updateTestimonial(id: string, updated: Partial<AdminTestimonial>) {
    const numericId = parseInt(id, 10);
    const existing = this.testimonials().find(t => t.id === id);
    const full = { ...existing, ...updated } as AdminTestimonial;

    const body = {
      clientName: full.name,
      location: full.location,
      projectTitle: full.project,
      review: full.comment,
      rating: Number(full.rating) || 5,
      clientImage: full.avatar,
      isFeatured: full.isFeatured ?? true,
      status: full.status || 'ACTIVE'
    };

    if (!isNaN(numericId)) {
      this.http.put<any>(`${this.apiUrl}/testimonials/${numericId}`, body, { headers: this.getAuthHeaders() }).pipe(
        catchError(err => {
          console.error('Error updating testimonial on backend:', err);
          return of(null);
        })
      ).subscribe(res => {
        if (res) {
          this.loadTestimonialsFromBackend().subscribe();
        } else {
          this.testimonials.update(list => list.map(item => item.id === id ? { ...item, ...updated } : item));
        }
      });
    } else {
      this.testimonials.update(list => list.map(item => item.id === id ? { ...item, ...updated } : item));
    }
  }

  deleteTestimonial(id: string) {
    const numericId = parseInt(id, 10);
    if (!isNaN(numericId)) {
      this.http.delete<any>(`${this.apiUrl}/testimonials/${numericId}`, { headers: this.getAuthHeaders() }).pipe(
        catchError(err => {
          console.error('Error deleting testimonial from backend:', err);
          return of(null);
        })
      ).subscribe(() => {
        this.loadTestimonialsFromBackend().subscribe();
      });
    } else {
      this.testimonials.update(list => list.filter(t => t.id !== id));
    }
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

  // Initial Seed Data Generators
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
      youtubeUrl: 'https://youtube.com',
      formspreeFormId: 'moeabqjp'
    };
  }
}
