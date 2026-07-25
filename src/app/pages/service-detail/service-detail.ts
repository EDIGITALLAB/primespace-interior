import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServicesDataService, ServiceDetailData } from '../../services/services-data.service';
import { ConsultationModalService } from '../../services/consultation-modal.service';

@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './service-detail.html',
  styleUrl: './service-detail.css',
})
export class ServiceDetail implements OnInit, OnDestroy {
  serviceData?: ServiceDetailData;
  allServices: ServiceDetailData[] = [];
  openFaqIndex: number | null = 0;
  private routeSub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private servicesDataService: ServicesDataService,
    private consultationModalService: ConsultationModalService
  ) {}

  ngOnInit(): void {
    this.allServices = this.servicesDataService.getAllServices();
    this.routeSub = this.route.params.subscribe((params) => {
      const slug = params['slug'];
      this.serviceData = this.servicesDataService.getServiceBySlug(slug);
      this.openFaqIndex = 0;
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
}
