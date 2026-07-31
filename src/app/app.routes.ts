import { Routes } from '@angular/router';
import { Landing } from './pages/landing/landing';
import { ServiceDetails } from './pages/service-details/service-details';
import { CategoriesPage } from './pages/categories-page/categories-page';
import { ContactPage } from './pages/contact-page/contact-page';
import { LocationsPage } from './pages/locations-page/locations-page';
import { ProjectsPage } from './pages/projects-page/projects-page';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'categories', component: CategoriesPage },
  { path: 'projects', component: ProjectsPage },
  { path: 'contact', component: ContactPage },
  { path: 'locations', component: LocationsPage },
  { path: 'locations/:city', component: LocationsPage },
  { path: 'service-details', component: ServiceDetails },
  { path: 'service-details/:slug', component: ServiceDetails },
  { path: 'services', component: ServiceDetails },
  { path: 'services/:slug', component: ServiceDetails },
  { path: '**', redirectTo: '' }
];
