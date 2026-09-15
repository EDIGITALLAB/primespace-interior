import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ProjectsDataService } from '../../services/projects-data.service';

export interface BackendGalleryItem {
  id: string;
  type: 'IMAGE' | 'VIDEO';
  url: string;
  caption?: string;
}

@Component({
  selector: 'app-gallery-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery-page.html',
  styleUrl: './gallery-page.css',
})
export class GalleryPage implements OnInit {
  private projectsDataService = inject(ProjectsDataService);
  private sanitizer = inject(DomSanitizer);

  readonly galleryImages = signal<BackendGalleryItem[]>([]);
  readonly isLoading = signal<boolean>(true);

  // Media Type Filter ('ALL' | 'IMAGE' | 'VIDEO')
  readonly activeFilter = signal<'ALL' | 'IMAGE' | 'VIDEO'>('ALL');

  // Media counts computed
  readonly totalCount = computed(() => this.galleryImages().length);
  readonly photoCount = computed(() => this.galleryImages().filter(item => item.type === 'IMAGE').length);
  readonly videoCount = computed(() => this.galleryImages().filter(item => item.type === 'VIDEO').length);

  // Filtered gallery items based on activeFilter
  readonly filteredGalleryImages = computed(() => {
    const filter = this.activeFilter();
    const all = this.galleryImages();
    if (filter === 'IMAGE') {
      return all.filter(item => item.type === 'IMAGE');
    }
    if (filter === 'VIDEO') {
      return all.filter(item => item.type === 'VIDEO');
    }
    return all;
  });

  // Pagination / Progressive load state (3 lines initially = 12 items)
  readonly visibleCount = signal<number>(12);
  readonly isLoadingMore = signal<boolean>(false);

  readonly visibleGalleryImages = computed(() => {
    return this.filteredGalleryImages().slice(0, this.visibleCount());
  });

  readonly hasMoreImages = computed(() => {
    return this.visibleCount() < this.filteredGalleryImages().length;
  });

  setFilter(filter: 'ALL' | 'IMAGE' | 'VIDEO') {
    this.activeFilter.set(filter);
    this.visibleCount.set(12);
  }

  // Lightbox modal state
  readonly isLightboxOpen = signal<boolean>(false);
  readonly currentImageIndex = signal<number>(0);

  ngOnInit() {
    this.loadBackendImages();
  }

  isVideoUrl(url: string): boolean {
    if (!url) return false;
    const lower = url.toLowerCase();
    return lower.endsWith('.mp4') || lower.endsWith('.webm') || lower.endsWith('.mov') || 
           lower.includes('video/') || lower.includes('data:video') || 
           lower.includes('youtube.com') || lower.includes('vimeo.com') || lower.includes('youtu.be');
  }

  extractYouTubeId(url: string): string {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : '';
  }

  isYouTubeUrl(url: string): boolean {
    if (!url) return false;
    return url.includes('youtube.com') || url.includes('youtu.be');
  }

  getYouTubeEmbedUrl(url: string): string {
    if (!url) return '';
    const videoId = this.extractYouTubeId(url);
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&enablejsapi=1&rel=0`;
    }
    return url;
  }

  getYouTubeThumbnail(url: string): string {
    const videoId = this.extractYouTubeId(url);
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }
    return 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1400&auto=format&fit=crop';
  }

  getSafeYouTubeUrl(url: string): SafeResourceUrl {
    const embedUrl = this.getYouTubeEmbedUrl(url);
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  onVideoError(item: BackendGalleryItem) {
    console.warn('Video failed to play, falling back to sample interior MP4 video:', item.url);
    item.url = 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-with-luxurious-furniture-43093-large.mp4';
  }

  loadBackendImages() {
    this.isLoading.set(true);

    this.projectsDataService.getAllProjectsFromApi().subscribe({
      next: (projects) => {
        const items: BackendGalleryItem[] = [];
        const seenUrls = new Set<string>();

        if (projects && projects.length > 0) {
          projects.forEach(proj => {
            // 1. Walkthrough Videos
            const vUrls = proj.videoUrls && proj.videoUrls.length > 0
              ? proj.videoUrls
              : (proj.videoUrl ? [proj.videoUrl] : []);

            vUrls.forEach((vUrl, vIdx) => {
              if (vUrl && vUrl.trim() && !seenUrls.has(vUrl)) {
                seenUrls.add(vUrl);
                items.push({
                  id: `vid_${proj.id}_${vIdx}`,
                  type: 'VIDEO',
                  url: vUrl,
                  caption: `${proj.title} • Walkthrough Tour ${vUrls.length > 1 ? '#' + (vIdx + 1) : ''}`.trim()
                });
              }
            });

            // 2. Cover / Hero Image
            if (proj.heroImage && proj.heroImage.trim() && !seenUrls.has(proj.heroImage)) {
              seenUrls.add(proj.heroImage);
              items.push({
                id: `hero_${proj.id}`,
                type: this.isVideoUrl(proj.heroImage) ? 'VIDEO' : 'IMAGE',
                url: proj.heroImage,
                caption: proj.title
              });
            }

            // 3. Project Gallery Array
            if (proj.gallery && proj.gallery.length > 0) {
              proj.gallery.forEach((gUrl, idx) => {
                if (gUrl && gUrl.trim() && !seenUrls.has(gUrl)) {
                  seenUrls.add(gUrl);
                  items.push({
                    id: `gal_${proj.id}_${idx}`,
                    type: this.isVideoUrl(gUrl) ? 'VIDEO' : 'IMAGE',
                    url: gUrl,
                    caption: proj.title
                  });
                }
              });
            }

            // 4. Block Category Images
            if (proj.blocks) {
              proj.blocks.forEach(block => {
                if (block.categories) {
                  block.categories.forEach(cat => {
                    if (cat.images) {
                      cat.images.forEach(img => {
                        const url = this.projectsDataService.formatImageUrl(img.imageUrl || (img.fileName ? `/uploads/${img.fileName}` : ''));
                        if (url && url.trim() && !seenUrls.has(url)) {
                          seenUrls.add(url);
                          items.push({
                            id: `img_${img.imageId || items.length + 1}`,
                            type: this.isVideoUrl(url) ? 'VIDEO' : 'IMAGE',
                            url: url,
                            caption: img.caption || cat.name || proj.title
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }

        this.galleryImages.set(items);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.warn('Error fetching gallery items from backend:', err);
        this.galleryImages.set([]);
        this.isLoading.set(false);
      }
    });
  }

  loadMoreImages() {
    if (this.isLoadingMore() || !this.hasMoreImages()) return;

    this.isLoadingMore.set(true);
    setTimeout(() => {
      this.visibleCount.update(count => count + 4);
      this.isLoadingMore.set(false);
    }, 350);
  }

  openLightbox(index: number) {
    this.currentImageIndex.set(index);
    this.isLightboxOpen.set(true);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  closeLightbox() {
    this.isLightboxOpen.set(false);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  nextImage(event?: Event) {
    if (event) event.stopPropagation();
    const total = this.visibleGalleryImages().length;
    if (total === 0) return;
    this.currentImageIndex.update(idx => (idx + 1) % total);
  }

  prevImage(event?: Event) {
    if (event) event.stopPropagation();
    const total = this.visibleGalleryImages().length;
    if (total === 0) return;
    this.currentImageIndex.update(idx => (idx - 1 + total) % total);
  }

  get activeImage(): BackendGalleryItem | null {
    const list = this.visibleGalleryImages();
    const idx = this.currentImageIndex();
    if (list.length > 0 && idx >= 0 && idx < list.length) {
      return list[idx];
    }
    return null;
  }
}
