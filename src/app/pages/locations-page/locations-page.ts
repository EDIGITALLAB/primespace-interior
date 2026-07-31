import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ConsultationModalService } from '../../services/consultation-modal.service';

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
  readonly activeLocationId = signal<string>('bengaluru');
  readonly selectedPhotoIndex = signal<number>(0);
  readonly isGalleryOpen = signal<boolean>(false);

  readonly locationsList: StudioLocationDetail[] = [
    {
      id: 'bengaluru',
      city: 'Bengaluru',
      name: 'Indiranagar Flagship Studio',
      tagline: 'Silicon Valley Luxury Experience Hub',
      address: '10th Main Rd, Indiranagar, Bengaluru, Karnataka 560038',
      hours: 'Mon - Sun: 10:00 AM - 8:00 PM',
      phone: '+91 98765 43210',
      email: 'bengaluru@primespaceinterior.com',
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.925085300078!2d77.63842607604473!3d12.97662498733904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x350bf8a0aef8a04b%3A0xe5ec73b18d22bb7a!2sIndiranagar%2C%20Bengaluru%2C%20Karnataka%20560038!5e0!3m2!1sen!2sin!4v1716300000000!5m2!1sen!2sin',
      directionsUrl: 'https://maps.google.com/?q=Indiranagar,Bengaluru',
      highlights: [
        'Full-Scale 1:1 Modular Kitchen Live Display',
        '200+ German Hardware & Soft-Close Testing Bay',
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
      ]
    },
    {
      id: 'bhubaneswar',
      city: 'Bhubaneswar',
      name: 'Janpath Luxury Experience Studio',
      tagline: 'Smart City Design & Architecture Center',
      address: 'Plot No. 102, Janpath Rd, Saheed Nagar, Bhubaneswar, Odisha 751007',
      hours: 'Mon - Sun: 10:00 AM - 8:00 PM',
      phone: '+91 98765 43211',
      email: 'bhubaneswar@primespaceinterior.com',
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.146816578912!2d85.83685437609204!3d20.294194981180296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909e20a9a1175%3A0x673934336c1c876!2sSaheed%20Nagar%2C%20Bhubaneswar%2C%20Odisha%20751007!5e0!3m2!1sen!2sin!4v1716300000000!5m2!1sen!2sin',
      directionsUrl: 'https://maps.google.com/?q=Saheed+Nagar,Bhubaneswar',
      highlights: [
        'Smart Lighting & Automation Mockup Zone',
        'Modular Sliding Wardrobe & Glass Closet Gallery',
        'Custom Dining Table & Italian Slab Gallery',
        'Private Client Consultation Suites'
      ],
      headArchitect: {
        name: 'Ar. Sourav Mohanty',
        role: 'Senior Architectural Director - Bhubaneswar',
        exp: '12+ Years in Commercial & Luxury Residential',
        avatarUrl: '/dining_cat.png'
      },
      photos: [
        {
          title: 'Janpath Experience Studio Entry',
          subtitle: 'Welcome lounge featuring fluted panelling and warm ambient LED profiles.',
          imageUrl: '/hero_kitchen.png'
        },
        {
          title: 'Smart Wardrobe & Glass Closet Display',
          subtitle: 'Sensor lighting rods and smoked glass sliding closet doors.',
          imageUrl: '/wardrobe_cat.png'
        },
        {
          title: 'Dining & Crockery Unit Setup',
          subtitle: 'Marble-top dining tables with custom crockery bars.',
          imageUrl: '/dining_cat.png'
        },
        {
          title: 'Material Finishing Board Display',
          subtitle: 'Explore 100% boiling waterproof HDMR samples & edge banding.',
          imageUrl: '/essential_kitchen.png'
        }
      ]
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    public consultationModalService: ConsultationModalService
  ) {}

  ngOnInit() {
    this.locationsList.forEach(loc => {
      loc.safeMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(loc.mapEmbedUrl);
    });

    this.route.paramMap.subscribe(params => {
      const cityParam = params.get('city')?.toLowerCase();
      if (cityParam && (cityParam === 'bengaluru' || cityParam === 'bhubaneswar')) {
        this.activeLocationId.set(cityParam);
      }
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
