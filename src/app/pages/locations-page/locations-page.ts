import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ConsultationModalService } from '../../services/consultation-modal.service';
import { getApiBaseUrl } from '../../config/api.config';

export interface StudioLocationDetail {
  id: string;
  city: string;
  name: string;
  tagline: string;
  address: string;
  hours: string;
  phone: string;
  email: string;
  mapEmbedUrl: string;
  directionsUrl: string;
  safeMapUrl?: SafeResourceUrl;
  whatsappMessage?: string;
  highlights: string[];
  headArchitect: {
    name: string;
    role: string;
    exp: string;
    avatarUrl: string;
  };
  photos: {
    title: string;
    subtitle: string;
    imageUrl: string;
  }[];
}

@Component({
  selector: 'app-locations-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './locations-page.html',
  styleUrl: './locations-page.css',
})
export class LocationsPage implements OnInit {
  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);
  private route = inject(ActivatedRoute);
  public consultationModalService = inject(ConsultationModalService);

  readonly activeLocationId = signal<string>('bengaluru');
  readonly selectedPhotoIndex = signal<number>(0);
  readonly isGalleryOpen = signal<boolean>(false);

  locationsList: StudioLocationDetail[] = [
    {
      id: 'bengaluru',
      city: 'Bengaluru',
      name: 'Medahalli Flagship Studio',
      tagline: 'Silicon Valley Luxury Experience Hub',
      address: 'Palm Kingdom, House No. 15, Medahalli, Near Satsang Temple, KRPURAM, Avalahalli,\nBengaluru, Karnataka - 560049',
      hours: 'Mon - Sun: 09:30 AM - 07:30 PM',
      phone: '+91 78997 45577',
      email: 'support.primespaceinterior@gmail.com',
      mapEmbedUrl: 'https://maps.google.com/maps?q=Palm+Kingdom+Layout+Rd,+Medahalli,+Bengaluru,+Karnataka+560049&t=&z=17&ie=UTF8&iwloc=&output=embed',
      directionsUrl: 'https://www.google.com/maps/place/Palm+Kingdom+Layout+Rd,+Medahalli,+Bengaluru,+Karnataka+560049/@13.0297809,77.7192436,18.75z/data=!4m6!3m5!1s0x3bae10489dbfe4f5:0x990d235cf9e5f3d3!8m2!3d13.0295397!4d77.7190998',
      whatsappMessage: 'Hello Primespace Interior team, I am interested in your interior design services and would like to schedule a consultation with your design expert.',
      highlights: [
        'Full-Scale 1:1 Modular Kitchen Live Display',
        '200+ Premium Hardware & Soft-Close Testing Bay',
        '500+ Natural Veneer, Acrylic & Marble Swatches',
        'Dedicated 3D VR Walkthrough Lounge'
      ],
      headArchitect: {
        name: 'Ar. Ananya Deshmukh',
        role: 'Chief Design Principal - Bengaluru',
        exp: '14+ Years in Luxury Villa Planning',
        avatarUrl: '/hero_living_room.png'
      },
      photos: [
        {
          title: 'Luxury Living & Lounge Display',
          subtitle: 'Experience our bespoke living room layouts with premium Italian upholstery & lighting.',
          imageUrl: '/living_cat.png'
        },
        {
          title: 'Bespoke Modular Kitchen Unit',
          subtitle: 'Soft-close acrylic cabinetry with quartz countertops and built-in appliances.',
          imageUrl: '/kitchen_cat.png'
        },
        {
          title: 'Bespoke Master Suite Showcase',
          subtitle: 'Plush velvet headboards, integrated warm lighting & walk-in closet mockups.',
          imageUrl: '/bedroom_cat.png'
        },
        {
          title: 'Material & Texture Sample Lounge',
          subtitle: 'Touch & feel hundreds of veneer, marble, acrylic, and fabric swatches in person.',
          imageUrl: '/eleganza_plus_kitchen.png'
        }
      ]
    }
  ];

  private buildEmbedMapUrl(urlStr?: string, addressStr?: string, cityStr?: string): string {
    const raw = (urlStr || '').trim();

    if (raw.includes('output=embed') || raw.includes('/embed')) {
      return raw;
    }

    const coordMatch3d4d = raw.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);
    if (coordMatch3d4d) {
      return `https://maps.google.com/maps?q=${coordMatch3d4d[1]},${coordMatch3d4d[2]}&hl=en&z=17&output=embed`;
    }

    const coordMatchAt = raw.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (coordMatchAt) {
      return `https://maps.google.com/maps?q=${coordMatchAt[1]},${coordMatchAt[2]}&hl=en&z=17&output=embed`;
    }

    const placeMatch = raw.match(/\/place\/([^\/@]+)/);
    if (placeMatch) {
      const placeName = decodeURIComponent(placeMatch[1].replace(/\+/g, ' '));
      return `https://maps.google.com/maps?q=${encodeURIComponent(placeName)}&t=&z=17&ie=UTF8&iwloc=&output=embed`;
    }

    const fullAddr = (addressStr || '').trim();
    if (fullAddr.toLowerCase().includes('medahalli') || fullAddr.toLowerCase().includes('palm kingdom')) {
      return `https://maps.google.com/maps?q=Palm+Kingdom+Layout+Rd,+Medahalli,+Bengaluru,+Karnataka+560049&t=&z=17&ie=UTF8&iwloc=&output=embed`;
    }

    return `https://maps.google.com/maps?q=${encodeURIComponent(fullAddr + ' ' + (cityStr || ''))}&t=&z=17&ie=UTF8&iwloc=&output=embed`;
  }

  ngOnInit() {
    this.sanitizeMapUrls();

    this.http.get<any[]>(`${getApiBaseUrl()}/locations?activeOnly=true`).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          const mapped: StudioLocationDetail[] = data.map((loc) => {
            const cityClean = (loc.city || 'Studio').trim();
            const id = cityClean.toLowerCase().replace(/[^a-z0-9]/g, '');

            const directions = loc.googleMapUrl && loc.googleMapUrl.trim()
              ? loc.googleMapUrl.trim()
              : `https://maps.google.com/?q=${encodeURIComponent(loc.address || loc.branchName)}`;

            const mapEmbed = this.buildEmbedMapUrl(loc.googleMapUrl, loc.address, loc.city);

            const hoursStr = (loc.workingDays ? loc.workingDays + ': ' : 'Mon - Sun: ') +
              (loc.openingTime || '09:30 AM') + ' - ' + (loc.closingTime || '07:30 PM');

            return {
              id,
              city: cityClean,
              name: loc.branchName || `${cityClean} Experience Studio`,
              tagline: loc.isHeadOffice ? 'Principal Head Office & Experience Hub' : 'Luxury Interior Design Studio',
              address: loc.address || '',
              hours: hoursStr,
              phone: loc.phone || '+91 78997 45577',
              email: loc.email || 'support.primespaceinterior@gmail.com',
              mapEmbedUrl: mapEmbed,
              directionsUrl: directions,
              whatsappMessage: 'Hello Primespace Interior team, I am interested in your interior design services and would like to schedule a consultation with your design expert.',
              highlights: [
                'Full-Scale 1:1 Modular Kitchen Live Display',
                '200+ Premium Hardware & Soft-Close Testing Bay',
                '500+ Natural Veneer, Acrylic & Marble Swatches',
                'Dedicated 3D VR Walkthrough Lounge'
              ],
              headArchitect: {
                name: 'Ar. Ananya Deshmukh',
                role: `Chief Design Principal - ${cityClean}`,
                exp: '14+ Years in Luxury Villa Planning',
                avatarUrl: '/hero_living_room.png'
              },
              photos: [
                {
                  title: 'Luxury Living & Lounge Display',
                  subtitle: 'Experience our bespoke living room layouts with premium Italian upholstery & lighting.',
                  imageUrl: '/living_cat.png'
                },
                {
                  title: 'Bespoke Modular Kitchen Unit',
                  subtitle: 'Soft-close acrylic cabinetry with quartz countertops and built-in appliances.',
                  imageUrl: '/kitchen_cat.png'
                },
                {
                  title: 'Bespoke Master Suite Showcase',
                  subtitle: 'Plush velvet headboards, integrated warm lighting & walk-in closet mockups.',
                  imageUrl: '/bedroom_cat.png'
                },
                {
                  title: 'Material & Texture Sample Lounge',
                  subtitle: 'Touch & feel hundreds of veneer, marble, acrylic, and fabric swatches in person.',
                  imageUrl: '/eleganza_plus_kitchen.png'
                }
              ]
            };
          });

          this.locationsList = mapped;
          this.sanitizeMapUrls();

          const activeLocExists = this.locationsList.some(l => l.id === this.activeLocationId());
          if (!activeLocExists && this.locationsList.length > 0) {
            this.activeLocationId.set(this.locationsList[0].id);
          }
        }
      },
      error: (err) => {
        console.warn('Could not fetch office locations from backend, using fallback:', err);
      }
    });

    this.route.paramMap.subscribe(params => {
      const cityParam = params.get('city')?.toLowerCase();
      if (cityParam) {
        const found = this.locationsList.find(l => l.city.toLowerCase().includes(cityParam) || l.id.toLowerCase().includes(cityParam));
        if (found) {
          this.activeLocationId.set(found.id);
        }
      }
    });
  }

  private sanitizeMapUrls() {
    this.locationsList.forEach(loc => {
      loc.safeMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(loc.mapEmbedUrl);
    });
  }

  selectLocation(id: string) {
    this.activeLocationId.set(id);
  }

  get activeLocation(): StudioLocationDetail {
    return (
      this.locationsList.find(l => l.id === this.activeLocationId()) ||
      this.locationsList[0]
    );
  }

  get whatsappLink(): string {
    const cleanPhone = (this.activeLocation.phone || '').replace(/[^0-9]/g, '');
    const msg = this.activeLocation.whatsappMessage || 'Hello Primespace Interior team, I am interested in your interior design services and would like to schedule a consultation with your design expert.';
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
  }

  openGallery(photoIdx: number = 0) {
    this.selectedPhotoIndex.set(photoIdx);
    this.isGalleryOpen.set(true);
  }

  closeGallery() {
    this.isGalleryOpen.set(false);
  }

  nextPhoto() {
    const total = this.activeLocation.photos.length;
    this.selectedPhotoIndex.update(idx => (idx + 1) % total);
  }

  prevPhoto() {
    const total = this.activeLocation.photos.length;
    this.selectedPhotoIndex.update(idx => (idx - 1 + total) % total);
  }
}
