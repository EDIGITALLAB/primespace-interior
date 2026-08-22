import { Routes } from '@angular/router';
import { Landing } from './pages/landing/landing';
import { ServiceDetails } from './pages/service-details/service-details';
import { CategoriesPage } from './pages/categories-page/categories-page';
import { ContactPage } from './pages/contact-page/contact-page';
import { LocationsPage } from './pages/locations-page/locations-page';
import { ProjectsPage } from './pages/projects-page/projects-page';
import { ProjectDetails } from './pages/project-details/project-details';
import { PrivacyPolicyPage } from './pages/privacy-policy-page/privacy-policy-page';
import { TermsConditionsPage } from './pages/terms-conditions-page/terms-conditions-page';
import { FaqPage } from './pages/faq-page/faq-page';
import { adminAuthGuard } from './guards/admin-auth.guard';
import { AdminLogin } from './pages/admin/admin-login/admin-login';
import { AdminLayout } from './pages/admin/admin-layout/admin-layout';
import { AdminDashboard } from './pages/admin/admin-dashboard/admin-dashboard';
import { AdminProjects } from './pages/admin/admin-projects/admin-projects';
import { AdminCategories } from './pages/admin/admin-categories/admin-categories';
import { AdminGallery } from './pages/admin/admin-gallery/admin-gallery';
import { AdminLeads } from './pages/admin/admin-leads/admin-leads';
import { AdminAppointments } from './pages/admin/admin-appointments/admin-appointments';
import { AdminTestimonials } from './pages/admin/admin-testimonials/admin-testimonials';
import { AdminTeam } from './pages/admin/admin-team/admin-team';
import { AdminSettings } from './pages/admin/admin-settings/admin-settings';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'categories', component: CategoriesPage },
  { path: 'projects', component: ProjectsPage },
  { path: 'projects/:id', component: ProjectDetails },
  { path: 'project-details', component: ProjectDetails },
  { path: 'project-details/:id', component: ProjectDetails },
  { path: 'contact', component: ContactPage },
  { path: 'locations', component: LocationsPage },
  { path: 'locations/:city', component: LocationsPage },
  { path: 'service-details', component: ServiceDetails },
  { path: 'service-details/:slug', component: ServiceDetails },
  { path: 'services', component: ServiceDetails },
  { path: 'services/:slug', component: ServiceDetails },
  { path: 'privacy-policy', component: PrivacyPolicyPage },
  { path: 'terms-conditions', component: TermsConditionsPage },
  { path: 'faq', component: FaqPage },

  // Admin Routes
  { path: 'admin/login', component: AdminLogin },
  {
    path: 'admin',
    component: AdminLayout,
    canActivate: [adminAuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboard },
      { path: 'projects', component: AdminProjects },
      { path: 'categories', component: AdminCategories },
      { path: 'gallery', component: AdminGallery },
      { path: 'leads', component: AdminLeads },
      { path: 'appointments', component: AdminAppointments },
      { path: 'testimonials', component: AdminTestimonials },
      { path: 'team', component: AdminTeam },
      { path: 'settings', component: AdminSettings }
    ]
  },

  { path: '**', redirectTo: '' }
];
