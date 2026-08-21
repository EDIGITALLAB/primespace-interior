import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ConsultationModalService } from '../../services/consultation-modal.service';

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
  locations: StudioLocation[] = [
    {
      id: 'bengaluru',
      city: 'Bengaluru',
      name: 'Medahalli Flagship Studio',
      address: 'Palm Kingdom, House No. 15, Medahalli, Near Satsang Temple, KRPURAM, Avalahalli,\nBengaluru, Karnataka - 560049',
      hours: 'Mon - Sun: 10:00 AM - 8:00 PM',
      phone: '+91 78997 45577',
      email: 'support.primespaceinterior@gmail.com',
      mapEmbedUrl: 'https://maps.google.com/maps?q=Sizzle+Palm+Kingdom,+Medahalli,+Bengaluru,+Karnataka+560049&t=&z=16&ie=UTF8&iwloc=&output=embed',
      directionsUrl: 'https://maps.google.com/?q=Palm+Kingdom,+House+No.+15,+Medahalli,+Near+Satsang+Temple,+KRPURAM,+Avalahalli,+Bengaluru,+Karnataka+560049'
    },
    {
      id: 'bhubaneswar',
      city: 'Bhubaneswar',
      name: 'Janpath Luxury Experience Studio',
      address: 'Plot No. 102, Janpath Rd, Saheed Nagar, Bhubaneswar, Odisha 751007',
      hours: 'Mon - Sun: 10:00 AM - 8:00 PM',
      phone: '+91 78997 45577',
      email: 'support.primespaceinterior@gmail.com',
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3742.146816578912!2d85.83685437609204!3d20.294194981180296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1716300000000!5m2!1sen!2sin',
      directionsUrl: 'https://maps.google.com/?q=Saheed+Nagar,Bhubaneswar'
    }
  ];

  activeLocationId: string = 'bengaluru';
  activeLocation!: StudioLocation;
  currentMapType: 'roadmap' | 'satellite' = 'roadmap';

  // Studio Photos Modal State
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

  constructor(
    private sanitizer: DomSanitizer,
    public consultationModalService: ConsultationModalService
  ) { }

  ngOnInit() {
    this.activeLocation = this.locations[0];
    this.updateActiveMapUrl();
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
