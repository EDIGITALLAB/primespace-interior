import { Routes } from '@angular/router';
import { Landing } from './pages/landing/landing';
import { ServiceDetail } from './pages/service-detail/service-detail';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'services/:slug', component: ServiceDetail },
  { path: '**', redirectTo: '' }
];
