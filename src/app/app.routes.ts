import { Routes } from '@angular/router';
import { Landing } from './pages/landing/landing';
import { ServiceDetails } from './pages/service-details/service-details';
import { CategoriesPage } from './pages/categories-page/categories-page';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'categories', component: CategoriesPage },
  { path: 'service-details', component: ServiceDetails },
  { path: 'service-details/:slug', component: ServiceDetails },
  { path: 'services', component: ServiceDetails },
  { path: 'services/:slug', component: ServiceDetails },
  { path: '**', redirectTo: '' }
];
