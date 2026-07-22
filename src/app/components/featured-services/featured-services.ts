import { Component, ElementRef, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ServiceGridItem {
  id: string;
  num: string;
  icon: string;
  subtitle: string;
  title: string;
  description: string;
  tags: string[];
}

@Component({
  selector: 'app-featured-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './featured-services.html',
  styleUrl: './featured-services.css',
})
export class FeaturedServices {
  @ViewChild('videoRef') videoRef!: ElementRef<HTMLVideoElement>;

  isPlaying = signal<boolean>(false);
  isMuted = signal<boolean>(true);
  currentTimeStr = signal<string>('00:00');
  durationStr = signal<string>('00:10');
  progressPercent = signal<number>(0);

  // Real Local MP4 Video File
  readonly videoUrl = '/interior_tour.mp4';

  readonly services: ServiceGridItem[] = [
    {
      id: '01',
      num: '01',
      icon: 'fa-solid fa-compass-drafting',
      subtitle: 'Design & Engineering',
      title: 'Architecture & Structural Planning',
      description: 'Precision architectural planning combining structural integrity with refined German modular engineering for residences and commercial spaces.',
      tags: ['Floor Plans', 'Structural Drafts', '3D Volumetric Modelling', 'Bespoke Façade']
    },
    {
      id: '02',
      num: '02',
      icon: 'fa-solid fa-screwdriver-wrench',
      subtitle: 'Execution & Build',
      title: 'Turnkey Interior Execution',
      description: 'End-to-end interior execution with premium-grade materials, on-site supervision, custom carpentry, and zero-compromise quality standards.',
      tags: ['Custom Carpentry', 'Civil & Electrical', 'German Hardware', 'On-Site Supervision']
    },
    {
      id: '03',
      num: '03',
      icon: 'fa-solid fa-cube',
      subtitle: '3D Renders & VR',
      title: '2D & 3D Photorealistic Layouts',
      description: 'Walk through your future space with 100% photorealistic 3D renders and accurate 2D drafts before a single nail is placed on site.',
      tags: ['4K VR Renders', 'AutoCAD Drafts', '3ds Max Lighting', 'Material Swatches']
    },
    {
      id: '04',
      num: '04',
      icon: 'fa-solid fa-couch',
      subtitle: 'Modular & Luxury',
      title: 'Bespoke Interior & Modular Furniture',
      description: 'Curated luxury living rooms, master bedroom suites, and German modular kitchen systems backed by a 10-year structural warranty.',
      tags: ['Living Suites', 'Modular Kitchens', 'Custom Wardrobes', '10-Year Warranty']
    },
    {
      id: '05',
      num: '05',
      icon: 'fa-solid fa-lightbulb',
      subtitle: 'Lighting & Decor',
      title: 'Smart Lighting & Ambient Automation',
      description: 'Custom ambient lighting design, automated scene controls, decorative fixtures, and layered mood illumination for luxury spaces.',
      tags: ['Smart Automation', 'Mood Scenes', 'Architectural Fixtures', 'LED Concealed']
    },
    {
      id: '06',
      num: '06',
      icon: 'fa-solid fa-palette',
      subtitle: 'Styling & Fitouts',
      title: 'Material Curation & Commercial Fitouts',
      description: 'Handpicked Italian marble, acoustic paneling, soft furnishings, wallpaper styling, and complete commercial space transformation.',
      tags: ['Italian Marble', 'Acoustic Panels', 'Soft Furnishings', 'Commercial Fitouts']
    }
  ];

  togglePlay() {
    const video = this.videoRef?.nativeElement;
    if (video) {
      if (video.paused) {
        video.play().then(() => {
          this.isPlaying.set(true);
        }).catch(err => console.warn('Video play error:', err));
      } else {
        video.pause();
        this.isPlaying.set(false);
      }
    }
  }

  toggleMute() {
    const video = this.videoRef?.nativeElement;
    if (video) {
      video.muted = !video.muted;
      this.isMuted.set(video.muted);
    }
  }

  onTimeUpdate() {
    const video = this.videoRef?.nativeElement;
    if (video && video.duration) {
      const current = video.currentTime;
      const duration = video.duration;
      this.progressPercent.set((current / duration) * 100);
      this.currentTimeStr.set(this.formatTime(current));
      this.durationStr.set(this.formatTime(duration));
    }
  }

  onVideoEnded() {
    this.isPlaying.set(false);
    this.progressPercent.set(0);
  }

  private formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
}
