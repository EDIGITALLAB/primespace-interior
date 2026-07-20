import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-featured-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './featured-services.html',
  styleUrl: './featured-services.css',
})
export class FeaturedServices {
  services = [
    {
      id: '01',
      icon: 'fa-solid fa-compass-drafting',
      title: 'Architecture',
      subtitle: 'Design & Planning',
      description: 'Precision architectural planning combining structural integrity with refined German modular engineering for residences and commercial spaces.',
      tags: ['Floor Plans', 'Structural', '3D Modelling'],
    },
    {
      id: '02',
      icon: 'fa-solid fa-screwdriver-wrench',
      title: 'Interior Work',
      subtitle: 'Execution & Build',
      description: 'End-to-end interior execution with premium-grade materials, on-site supervision, and zero-compromise quality standards.',
      tags: ['Carpentry', 'Civil Work', 'Finishing'],
    },
    {
      id: '03',
      icon: 'fa-solid fa-cube',
      title: '2D/3D Layout',
      subtitle: 'Photorealistic Renders',
      description: 'Walk through your future space with 100% photorealistic 3D renders and accurate 2D drafts before a single nail is placed.',
      tags: ['AutoCAD', '3ds Max', 'VRay Render'],
    },
    {
      id: '04',
      icon: 'fa-solid fa-couch',
      title: 'Interior Design',
      subtitle: 'Bespoke Luxury',
      description: 'Curated luxury interior design concepts tailored to your lifestyle — from minimalist sanctuaries to opulent statement rooms.',
      tags: ['Living Room', 'Bedroom', 'Kitchen'],
    },
    {
      id: '05',
      icon: 'fa-solid fa-palette',
      title: 'Decoration Art',
      subtitle: 'Curated Aesthetics',
      description: 'Handpicked decorative art, custom wall panels, designer accessories, and art-forward styling to give your space its final personality.',
      tags: ['Wall Art', 'Styling', 'Accessories'],
    },
    {
      id: '06',
      icon: 'fa-solid fa-layer-group',
      title: 'Modular Furniture',
      subtitle: 'German Engineering',
      description: 'Premium German modular systems for kitchens, wardrobes, and storage — precision-engineered with a 10-year structural warranty.',
      tags: ['Kitchens', 'Wardrobes', 'Storage'],
    },
  ];
}
