import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-section',
  imports: [CommonModule],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css',
})
export class HeroSection implements OnInit, OnDestroy {
  currentSlideIndex = 0;
  slideInterval: any;

  // Theme Color Switcher Properties
  isThemePanelOpen = false;
  currentThemeColor = '#96053E';
  themeColors = [
    { name: "Crimson Purple", hex: "#96053E", gradientEnd: "#ff007a" },
    { name: "Emerald Green", hex: "#0D5C3A", gradientEnd: "#00ff88" },
    { name: "Champagne Gold", hex: "#C59D5F", gradientEnd: "#ffd700" },
    { name: "Sapphire Blue", hex: "#1F4068", gradientEnd: "#00d2ff" },
    { name: "Architectural Bronze", hex: "#8D5B4C", gradientEnd: "#ff7733" }
  ];

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.startSlideshow();
    this.loadSavedTheme();
  }

  ngOnDestroy() {
    this.stopSlideshow();
  }

  startSlideshow() {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 11000);
  }

  stopSlideshow() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  nextSlide() {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % 3;
    this.cdr.detectChanges(); // Force Angular to run change detection
  }

  setSlide(index: number) {
    this.currentSlideIndex = index;
    this.cdr.detectChanges();
    this.stopSlideshow();
    this.startSlideshow();
  }

  // Theme Selector Panel actions
  toggleThemePanel() {
    this.isThemePanelOpen = !this.isThemePanelOpen;
    this.cdr.detectChanges();
  }

  loadSavedTheme() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedColor = localStorage.getItem('selectedThemeColor');
      const savedRgb = localStorage.getItem('selectedThemeColorRgb');
      const savedGradientEnd = localStorage.getItem('selectedThemeGradientEnd') || '#ff007a';
      if (savedColor && savedRgb) {
        document.documentElement.style.setProperty('--primary-maroon', savedColor);
        document.documentElement.style.setProperty('--primary-maroon-rgb', savedRgb);
        document.documentElement.style.setProperty('--primary-purple', savedColor);
        document.documentElement.style.setProperty('--primary-purple-rgb', savedRgb);
        document.documentElement.style.setProperty('--theme-gradient-end', savedGradientEnd);
        this.currentThemeColor = savedColor;
        this.cdr.detectChanges();
      }
    }
  }

  changeThemeColor(hex: string) {
    const rgb = this.hexToRgb(hex);
    if (rgb) {
      const rgbStr = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
      const preset = this.themeColors.find(c => c.hex.toLowerCase() === hex.toLowerCase());
      const gradientEnd = preset ? preset.gradientEnd : '#ff007a';

      document.documentElement.style.setProperty('--primary-maroon', hex);
      document.documentElement.style.setProperty('--primary-maroon-rgb', rgbStr);
      document.documentElement.style.setProperty('--primary-purple', hex);
      document.documentElement.style.setProperty('--primary-purple-rgb', rgbStr);
      document.documentElement.style.setProperty('--theme-gradient-end', gradientEnd);

      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('selectedThemeColor', hex);
        localStorage.setItem('selectedThemeColorRgb', rgbStr);
        localStorage.setItem('selectedThemeGradientEnd', gradientEnd);
      }
      this.currentThemeColor = hex;
      this.cdr.detectChanges();
    }
  }

  onCustomColorChange(event: any) {
    const hex = event.target.value;
    this.changeThemeColor(hex);
  }

  hexToRgb(hex: string) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
      return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
}
