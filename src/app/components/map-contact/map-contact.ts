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
      name: 'Indiranagar Flagship Studio',
      address: '10th Main Rd, Indiranagar, Bengaluru, Karnataka 560038',
      hours: 'Mon - Sun: 10:00 AM - 8:00 PM',
      phone: '+91 98765 43210',
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.925085300078!2d77.63842607604473!3d12.97662498733904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x350bf8a0aef8a04b%3A0xe5ec73b18d22bb7a!2sIndiranagar%2C%20Bengaluru%2C%20Karnataka%20560038!5e0!3m2!1sen!2sin!4v1716300000000!5m2!1sen!2sin',
      directionsUrl: 'https://maps.google.com/?q=Indiranagar,Bengaluru'
    },
    {
      id: 'bhubaneswar',
      city: 'Bhubaneswar',
      name: 'Janpath Luxury Experience Studio',
      address: 'Plot No. 102, Janpath Rd, Saheed Nagar, Bhubaneswar, Odisha 751007',
      hours: 'Mon - Sun: 10:00 AM - 8:00 PM',
      phone: '+91 98765 43211',
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.146816578912!2d85.83685437609204!3d20.294194981180296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909e20a9a1175%3A0x673934336c1c876!2sSaheed%20Nagar%2C%20Bhubaneswar%2C%20Odisha%20751007!5e0!3m2!1sen!2sin!4v1716300000000!5m2!1sen!2sin',
      directionsUrl: 'https://maps.google.com/?q=Saheed+Nagar,Bhubaneswar'
    }
  ];

  activeLocationId: string = 'bengaluru';
  activeLocation!: StudioLocation;

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
      title: 'German Modular Kitchen Unit',
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
  ) {}

  ngOnInit() {
    this.locations.forEach(loc => {
      loc.safeMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(loc.mapEmbedUrl);
    });
    this.activeLocation = this.locations[0];
  }

  selectLocation(id: string) {
    this.activeLocationId = id;
    const found = this.locations.find(l => l.id === id);
    if (found) {
      this.activeLocation = found;
    }
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

  onModalFormSubmit(event: Event, name: string, email: string, phone: string, service: string, message: string) {
    event.preventDefault();
    if (name && email && phone && service && message) {
      alert(`Thank you, ${name}! Your consultation request for "${service}" has been received. Our lead architect will reach out to you within 24 hours.`);
      const form = event.target as HTMLFormElement;
      form.reset();
      this.consultationModalService.close();
    }
  }
}
