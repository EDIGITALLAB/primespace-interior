import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, map, throwError } from 'rxjs';
import { getApiBaseUrl, API_CONFIG } from '../config/api.config';

export interface Milestone {
  name: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  dateText?: string;
}

export interface BackendProjectImage {
  imageId: number;
  fileName: string;
  imageUrl: string;
  caption?: string;
  displayOrder?: number;
  isThumbnail?: boolean;
  fileSize?: number;
  createdAt?: string;
  categoryId?: number;
}

export interface BackendCategory {
  categoryId: number;
  name: string;
  displayOrder?: number;
  blockId?: number;
  images?: BackendProjectImage[];
}

export interface BackendBlock {
  blockId: number;
  name: string;
  displayOrder?: number;
  projectId?: number;
  categories?: BackendCategory[];
}

export interface BackendProject {
  projectId: number;
  name: string;
  slug: string;
  subtitle: string;
  propertyType: string;
  description: string;
  location: string;
  city: string;
  coverImage: string;
  videoUrl?: string;
  videoUrls?: string[] | string;
  status: 'COMPLETED' | 'ONGOING';
  totalBlocks: number;
  createdAt?: string;
  updatedAt?: string;
  blocks?: BackendBlock[];
}

export interface BackendDetailCategory {
  detailCategoryId: number;
  title: string;
  slug: string;
  categoryType: string;
  subtitle: string;
  description: string;
  duration: string;
  keyHighlights: string[];
  images: string[];
  displayOrder?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectItem {
  id: string;
  projectId?: number;
  slug?: string;
  title: string;
  subtitle: string;
  category: string;
  propertyType?: string;
  status: 'completed' | 'ongoing';
  statusLabel: string;
  blocksCount?: string;
  totalBlocks?: number;
  progressPercentage?: number;
  currentPhase?: string;
  expectedHandover?: string;
  completedDate?: string;
  location: string;
  city: string;
  heroImage: string;
  videoUrl?: string;
  videoUrls?: string[];
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
  blocks?: BackendBlock[];
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsDataService {
  private get apiUrl(): string {
    return `${getApiBaseUrl()}/projects`;
  }

  constructor(private http: HttpClient) {}

  readonly projects: ProjectItem[] = [];

  getProjectById(id: string): ProjectItem | undefined {
    return undefined;
  }

  formatImageUrl(url: string | null | undefined): string {
    if (!url || !url.trim()) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    if (url.startsWith('/uploads')) return `${API_CONFIG.baseUrl}${url}`;
    return url;
  }

  mapBackendToProjectItem(bp: BackendProject): ProjectItem {
    const isCompleted = (bp.status || '').toUpperCase() === 'COMPLETED';
    const totalBlocks = bp.totalBlocks ?? bp.blocks?.length ?? 0;
    const blocksCountText = `${totalBlocks} Block${totalBlocks !== 1 ? 's' : ''}`;

    const gallery: string[] = [];
    if (bp.coverImage) {
      const formattedCover = this.formatImageUrl(bp.coverImage);
      if (formattedCover) gallery.push(formattedCover);
    }
    if (bp.blocks) {
      for (const b of bp.blocks) {
        if (b.categories) {
          for (const cat of b.categories) {
            if (cat.images) {
              for (const img of cat.images) {
                if (img.imageUrl) {
                  const formattedImg = this.formatImageUrl(img.imageUrl);
                  if (formattedImg) gallery.push(formattedImg);
                }
              }
            }
          }
        }
      }
    }

    const formattedLocation = bp.location
      ? (bp.city && !bp.location.toLowerCase().includes(bp.city.toLowerCase()) ? `${bp.location}, ${bp.city}` : bp.location)
      : (bp.city || '');

    const coverImgUrl = bp.coverImage ? this.formatImageUrl(bp.coverImage) : '';

    let parsedVideoUrls: string[] = [];
    if (bp.videoUrls) {
      if (Array.isArray(bp.videoUrls)) {
        parsedVideoUrls = bp.videoUrls.map(u => this.formatImageUrl(u)).filter(Boolean);
      } else if (typeof bp.videoUrls === 'string') {
        const rawStr = bp.videoUrls.trim();
        if (rawStr.startsWith('[')) {
          try {
            const arr = JSON.parse(rawStr);
            if (Array.isArray(arr)) {
              parsedVideoUrls = arr.map(u => this.formatImageUrl(u)).filter(Boolean);
            }
          } catch {
            parsedVideoUrls = rawStr.split(',').map(s => this.formatImageUrl(s.trim())).filter(Boolean);
          }
        } else {
          parsedVideoUrls = rawStr.split(',').map(s => this.formatImageUrl(s.trim())).filter(Boolean);
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
      id: bp.slug || bp.projectId.toString(),
      projectId: bp.projectId,
      slug: bp.slug,
      title: bp.name,
      subtitle: bp.subtitle || '',
      category: bp.propertyType || 'Apartment',
      propertyType: bp.propertyType || 'Apartment',
      status: isCompleted ? 'completed' : 'ongoing',
      statusLabel: isCompleted ? 'Completed & Handed Over' : 'Live Site • Ongoing',
      blocksCount: blocksCountText,
      totalBlocks: totalBlocks,
      location: formattedLocation,
      city: bp.city || '',
      heroImage: coverImgUrl,
      videoUrl: bp.videoUrl ? this.formatImageUrl(bp.videoUrl) : (parsedVideoUrls[0] || ''),
      videoUrls: parsedVideoUrls,
      gallery: gallery,
      clientName: 'PrimeSpace Client',
      areaSqft: '3,500 sq.ft.',
      scopeOfWork: ['Turnkey Interior Design', 'Custom Modular Joinery', 'Smart Lighting'],
      description: bp.description || '',
      blocks: bp.blocks || []
    };
  }

  getAllProjectsFromApi(): Observable<ProjectItem[]> {
    return this.http.get<BackendProject[]>(this.apiUrl).pipe(
      map(backendList => backendList.map(bp => this.mapBackendToProjectItem(bp))),
      catchError(err => {
        console.error('Backend API request failed:', err);
        return throwError(() => err);
      })
    );
  }

  getProjectBySlugFromApi(slug: string): Observable<ProjectItem | null> {
    return this.http.get<BackendProject>(`${this.apiUrl}/slug/${slug}`).pipe(
      map(bp => this.mapBackendToProjectItem(bp)),
      catchError(err => {
        console.error(`Backend API getBySlug failed for ${slug}:`, err);
        return throwError(() => err);
      })
    );
  }

  getDetailCategoriesFromApi(): Observable<BackendDetailCategory[]> {
    return this.http.get<BackendDetailCategory[]>(`${getApiBaseUrl()}/detail-categories`).pipe(
      catchError(err => {
        console.error('Backend API request for detail categories failed:', err);
        return throwError(() => err);
      })
    );
  }
}
