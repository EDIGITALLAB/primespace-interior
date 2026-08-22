import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { ConsultationModal } from './components/consultation-modal/consultation-modal';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Navbar, Footer, ConsultationModal],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('prime_space_interior');
  private router = inject(Router);

  readonly isAdminRoute = signal(false);

  constructor() {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isAdminRoute.set(event.urlAfterRedirects.startsWith('/admin') || event.url.startsWith('/admin'));
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
  }

  ngOnInit() {
    this.loadSavedTheme();
  }

  private loadSavedTheme() {
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
      }
    }
  }
}
