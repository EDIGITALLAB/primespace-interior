import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServicesDataService, type ServiceDetailData } from '../../services/services-data.service';
import { ConsultationModalService } from '../../services/consultation-modal.service';

@Component({
  selector: 'app-service-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './service-details.html',
  styleUrl: './service-details.css',
})
export class ServiceDetails implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private servicesDataService = inject(ServicesDataService);
  private consultationModalService = inject(ConsultationModalService);

  serviceData?: ServiceDetailData;
  allServices: ServiceDetailData[] = [];
  openFaqIndex: number | null = 0;
  private routeSub?: Subscription;

  ngOnInit(): void {
    this.allServices = this.servicesDataService.getAllServices();
    this.routeSub = this.route.params.subscribe((params) => {
      const slug = params['slug'] || params['id'];
      this.serviceData = this.servicesDataService.getServiceBySlug(slug);
      this.openFaqIndex = 0;
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  toggleFaq(index: number): void {
    this.openFaqIndex = this.openFaqIndex === index ? null : index;
  }

  openConsultationModal(event: Event): void {
    event.preventDefault();
    this.consultationModalService.open();
  }

  isGalleryModalOpen: boolean = false;
  activeGalleryIndex: number = 0;

  openGalleryModal(index: number = 0, event?: Event): void {
    if (event) event.preventDefault();
    this.activeGalleryIndex = index;
    this.isGalleryModalOpen = true;
  }

  closeGalleryModal(): void {
    this.isGalleryModalOpen = false;
  }

  nextGalleryPhoto(event?: Event): void {
    if (event) event.stopPropagation();
    if (this.serviceData?.gallery && this.serviceData.gallery.length > 0) {
      this.activeGalleryIndex = (this.activeGalleryIndex + 1) % this.serviceData.gallery.length;
    }
  }

  prevGalleryPhoto(event?: Event): void {
    if (event) event.stopPropagation();
    if (this.serviceData?.gallery && this.serviceData.gallery.length > 0) {
      this.activeGalleryIndex = (this.activeGalleryIndex - 1 + this.serviceData.gallery.length) % this.serviceData.gallery.length;
    }
  }

  openConsultationFromGallery(event: Event): void {
    event.preventDefault();
    this.closeGalleryModal();
    this.consultationModalService.open();
  }

  scrollToSection(sectionId: string, event: Event): void {
    event.preventDefault();
    if (typeof document !== 'undefined' && typeof window !== 'undefined') {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerOffset = 165; // Extra breathing room for navbar + category bar
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  }
}
