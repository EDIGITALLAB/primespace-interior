import { Routes } from '@angular/router';
import { Landing } from './pages/landing/landing';
import { ServiceDetails } from './pages/service-details/service-details';
import { ContactPage } from './pages/contact-page/contact-page';
import { LocationsPage } from './pages/locations-page/locations-page';
import { ProjectsPage } from './pages/projects-page/projects-page';
import { GalleryPage } from './pages/gallery-page/gallery-page';
import { WardrobePage } from './pages/wardrobe-page/wardrobe-page';
import { ModularKitchenPage } from './pages/modular-kitchen-page/modular-kitchen-page';
import { MasterBedroomPage } from './pages/master-bedroom-page/master-bedroom-page';
import { KidsBedroomPage } from './pages/kids-bedroom-page/kids-bedroom-page';
import { PoojaRoomPage } from './pages/pooja-room-page/pooja-room-page';
import { FalseCeilingPage } from './pages/false-ceiling-page/false-ceiling-page';
import { LivingRoomPage } from './pages/living-room-page/living-room-page';
import { LuxuryBathroomPage } from './pages/luxury-bathroom-page/luxury-bathroom-page';
import { DiningRoomPage } from './pages/dining-room-page/dining-room-page';
import { ExploreDesignIdeas } from './pages/explore-design-ideas/explore-design-ideas';
import { CataloguePage } from './pages/catalogue-page/catalogue-page';
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
import { AdminTestimonials } from './pages/admin/admin-testimonials/admin-testimonials';
import { AdminSettings } from './pages/admin/admin-settings/admin-settings';
import { NotFoundPage } from './pages/not-found-page/not-found-page';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'explore-design-ideas', component: ExploreDesignIdeas },
  { path: 'explore-design-ideas/wardrobe-designs', component: WardrobePage },
  { path: 'explore-design-ideas/wardrobes', component: WardrobePage },
  { path: 'explore-design-ideas/wardrobe', component: WardrobePage },
  { path: 'explore-design-ideas/modular-kitchen', component: ModularKitchenPage },
  { path: 'explore-design-ideas/kitchen-designs', component: ModularKitchenPage },
  { path: 'explore-design-ideas/kitchen', component: ModularKitchenPage },
  { path: 'explore-design-ideas/kitchens', component: ModularKitchenPage },
  { path: 'explore-design-ideas/master-bedroom', component: MasterBedroomPage },
  { path: 'explore-design-ideas/bedroom-designs', component: MasterBedroomPage },
  { path: 'explore-design-ideas/bedroom', component: MasterBedroomPage },
  { path: 'explore-design-ideas/bedrooms', component: MasterBedroomPage },
  { path: 'explore-design-ideas/kids-bedroom', component: KidsBedroomPage },
  { path: 'explore-design-ideas/kids-teen-bedroom', component: KidsBedroomPage },
  { path: 'explore-design-ideas/teen-bedroom', component: KidsBedroomPage },
  { path: 'explore-design-ideas/kids-room', component: KidsBedroomPage },
  { path: 'explore-design-ideas/kids', component: KidsBedroomPage },
  { path: 'explore-design-ideas/pooja-room', component: PoojaRoomPage },
  { path: 'explore-design-ideas/pooja-room-designs', component: PoojaRoomPage },
  { path: 'explore-design-ideas/mandir', component: PoojaRoomPage },
  { path: 'explore-design-ideas/pooja', component: PoojaRoomPage },
  { path: 'explore-design-ideas/false-ceiling', component: FalseCeilingPage },
  { path: 'explore-design-ideas/false-ceiling-lighting', component: FalseCeilingPage },
  { path: 'explore-design-ideas/false-ceiling-designs', component: FalseCeilingPage },
  { path: 'explore-design-ideas/ceiling', component: FalseCeilingPage },
  { path: 'explore-design-ideas/ceilings', component: FalseCeilingPage },
  { path: 'explore-design-ideas/living-room', component: LivingRoomPage },
  { path: 'explore-design-ideas/living-rooms', component: LivingRoomPage },
  { path: 'explore-design-ideas/living', component: LivingRoomPage },
  { path: 'explore-design-ideas/living-room-designs', component: LivingRoomPage },
  { path: 'explore-design-ideas/dining-room', component: DiningRoomPage },
  { path: 'explore-design-ideas/dining-room-designs', component: DiningRoomPage },
  { path: 'explore-design-ideas/dining', component: DiningRoomPage },
  { path: 'explore-design-ideas/luxury-bathroom', component: LuxuryBathroomPage },
  { path: 'explore-design-ideas/bathroom', component: LuxuryBathroomPage },
  { path: 'explore-design-ideas/bathrooms', component: LuxuryBathroomPage },
  { path: 'explore-design-ideas/bathroom-designs', component: LuxuryBathroomPage },
  { path: 'design-ideas', component: ExploreDesignIdeas },
  { path: 'projects', component: ProjectsPage },
  { path: 'gallery', component: GalleryPage },
  { path: 'wardrobe', component: WardrobePage },
  { path: 'wardrobes', component: WardrobePage },
  { path: 'modular-kitchen', component: ModularKitchenPage },
  { path: 'kitchen', component: ModularKitchenPage },
  { path: 'kitchens', component: ModularKitchenPage },
  { path: 'master-bedroom', component: MasterBedroomPage },
  { path: 'bedroom', component: MasterBedroomPage },
  { path: 'bedrooms', component: MasterBedroomPage },
  { path: 'kids-bedroom', component: KidsBedroomPage },
  { path: 'kids-teen-bedroom', component: KidsBedroomPage },
  { path: 'teen-bedroom', component: KidsBedroomPage },
  { path: 'kids-room', component: KidsBedroomPage },
  { path: 'kids', component: KidsBedroomPage },
  { path: 'pooja-room', component: PoojaRoomPage },
  { path: 'mandir', component: PoojaRoomPage },
  { path: 'pooja', component: PoojaRoomPage },
  { path: 'false-ceiling', component: FalseCeilingPage },
  { path: 'false-ceiling-lighting', component: FalseCeilingPage },
  { path: 'ceiling', component: FalseCeilingPage },
  { path: 'ceilings', component: FalseCeilingPage },
  { path: 'living-room', component: LivingRoomPage },
  { path: 'living-rooms', component: LivingRoomPage },
  { path: 'living', component: LivingRoomPage },
  { path: 'dining-room', component: DiningRoomPage },
  { path: 'dining', component: DiningRoomPage },
  { path: 'luxury-bathroom', component: LuxuryBathroomPage },
  { path: 'bathroom', component: LuxuryBathroomPage },
  { path: 'bathrooms', component: LuxuryBathroomPage },
  // { path: 'catalogue', component: CataloguePage },
  { path: 'projects/:id', component: ProjectDetails },
  // { path: 'project-details', component: ProjectDetails },
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
      { path: 'photo-and-gallery', component: AdminGallery },
      { path: 'gallery', redirectTo: 'photo-and-gallery', pathMatch: 'full' },
      { path: 'leads', component: AdminLeads },
      { path: 'testimonials', component: AdminTestimonials },
      { path: 'settings', component: AdminSettings }
    ]
  },

  { path: '**', component: NotFoundPage }
];
