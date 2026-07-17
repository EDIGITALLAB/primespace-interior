import { Component } from '@angular/core';
import { PackageOffersSection } from '../../components/package-offers-section/package-offers-section';
import { HeroSection } from '../../components/hero-section/hero-section';
import { DesignCategories } from '../../components/design-categories/design-categories';
import { DesignProcess } from '../../components/design-process/design-process';
import { BeforeAfterSlider } from '../../components/before-after-slider/before-after-slider';

@Component({
  selector: 'app-landing',
  imports: [PackageOffersSection, HeroSection, DesignCategories, DesignProcess, BeforeAfterSlider],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {}
