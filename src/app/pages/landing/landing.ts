import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Testimonials } from '../../components/testimonials/testimonials';
import { HeroSection } from '../../components/hero-section/hero-section';
import { DesignCategories } from '../../components/design-categories/design-categories';
import { BeforeAfterSlider } from '../../components/before-after-slider/before-after-slider';
import { MapContact } from '../../components/map-contact/map-contact';
import { About } from '../../components/about/about';
import { ScrollingFeatures } from '../../components/scrolling-features/scrolling-features';
import { FeaturedServices } from '../../components/featured-services/featured-services';
import { WhyChooseUs } from '../../components/why-choose-us/why-choose-us';
import { ConsultationModalService } from '../../services/consultation-modal.service';

@Component({
  selector: 'app-landing',
  imports: [Testimonials, HeroSection, DesignCategories, BeforeAfterSlider, MapContact, About, ScrollingFeatures, FeaturedServices, WhyChooseUs],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing implements OnInit, OnDestroy {
  private consultationModalService = inject(ConsultationModalService);
  private autoPopupTimer: any;

  ngOnInit() {
    // Show the Consultation Modal popup automatically 15 seconds after opening the homepage
    this.autoPopupTimer = setTimeout(() => {
      this.consultationModalService.open();
    }, 10000);
  }

  ngOnDestroy() {
    if (this.autoPopupTimer) {
      clearTimeout(this.autoPopupTimer);
    }
  }
}
