import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ConsultationModalService } from '../../services/consultation-modal.service';
import { getApiBaseUrl } from '../../config/api.config';

export interface StudioLocation {
  id: string;
  city: string;
  name: string;
  address: string;
  hours: string;
  phone: string;
  email?: string;
  mapEmbedUrl: string;
  directionsUrl: string;
  safeMapUrl?: SafeResourceUrl;
}

export interface GalleryPhoto {
  title: string;
  subtitle: string;
  imageUrl: string;
}

@Component({
  selector: 'app-map-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map-contact.html',
  styleUrl: './map-contact.css'
})
export class MapContact implements OnInit {
  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);
  public consultationModalService = inject(ConsultationModalService);

  locations: StudioLocation[] = [
    {
      id: 'bengaluru',
      city: 'Bengaluru',
      name: 'Medahalli Flagship Studio',
      address: 'Palm Kingdom, House No. 15, Medahalli, Near Satsang Temple, KRPURAM, Avalahalli,\nBengaluru, Karnataka - 560049',
      hours: 'Mon - Sun: 09:30 AM - 07:30 PM',
      phone: '+91 78997 45577',
      email: 'support.primespaceinterior@gmail.com',
      mapEmbedUrl: 'https://maps.google.com/maps?q=Palm+Kingdom+Layout+Rd,+Medahalli,+Bengaluru,+Karnataka+560049&t=&z=17&ie=UTF8&iwloc=&output=embed',
      directionsUrl: 'https://www.google.com/maps/place/Palm+Kingdom+Layout+Rd,+Medahalli,+Bengaluru,+Karnataka+560049/@13.0297809,77.7192436,18.75z/data=!4m6!3m5!1s0x3bae10489dbfe4f5:0x990d235cf9e5f3d3!8m2!3d13.0295397!4d77.7190998'
    }
  ];

  activeLocationId: string = 'bengaluru';
  activeLocation!: StudioLocation;
  currentMapType: 'roadmap' | 'satellite' = 'roadmap';

  showGalleryModal: boolean = false;
  activePhotoIndex: number = 0;
  galleryPhotos: GalleryPhoto[] = [
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
    this.activeLocation = this.locations[0];
    this.updateActiveMapUrl();

    this.http.get<any[]>(`${getApiBaseUrl()}/locations?activeOnly=true`).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          const mapped: StudioLocation[] = data.map((loc) => {
            const cityClean = (loc.city || 'Studio').trim();
            const id = loc.locationId ? `loc_${loc.locationId}` : cityClean.toLowerCase().replace(/[^a-z0-9]/g, '');

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
              address: loc.address || '',
              hours: hoursStr,
              phone: loc.phone || '+91 78997 45577',
              email: loc.email || 'support.primespaceinterior@gmail.com',
              mapEmbedUrl: mapEmbed,
              directionsUrl: directions
            };
          });

          this.locations = mapped;
          if (this.locations.length > 0) {
            this.activeLocationId = this.locations[0].id;
            this.activeLocation = this.locations[0];
            this.updateActiveMapUrl();
          }
        }
      },
      error: (err) => {
        console.warn('Could not fetch home map locations from backend, using fallback:', err);
      }
    });
  }

  selectLocation(id: string) {
    this.activeLocationId = id;
    const found = this.locations.find(l => l.id === id);
    if (found) {
      this.activeLocation = found;
      this.updateActiveMapUrl();
    }
  }

  toggleMapType() {
    this.currentMapType = this.currentMapType === 'roadmap' ? 'satellite' : 'roadmap';
    this.updateActiveMapUrl();
  }

  updateActiveMapUrl() {
    if (!this.activeLocation) return;
    let url = this.activeLocation.mapEmbedUrl;
    if (this.currentMapType === 'satellite') {
      if (url.includes('!5e0!')) {
        url = url.replace('!5e0!', '!5e1!');
      } else if (url.includes('&t=')) {
        url = url.replace('&t=', '&t=k');
      } else if (!url.includes('&t=k')) {
        url += '&t=k';
      }
    } else {
      url = url.replace('!5e1!', '!5e0!').replace('&t=k', '&t=');
    }
    this.activeLocation.safeMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  openStudioGallery() {
    this.activePhotoIndex = 0;
    this.showGalleryModal = true;
  }

  closeStudioGallery() {
    this.showGalleryModal = false;
  }

  selectPhoto(index: number) {
    this.activePhotoIndex = index;
  }

  nextPhoto() {
    this.activePhotoIndex = (this.activePhotoIndex + 1) % this.galleryPhotos.length;
  }

  prevPhoto() {
    this.activePhotoIndex = (this.activePhotoIndex - 1 + this.galleryPhotos.length) % this.galleryPhotos.length;
  }
}
