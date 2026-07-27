import { Injectable } from '@angular/core';

export interface ServiceDetailData {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  icon: string;
  heroImage: string;
  overviewHeading: string;
  overviewDescription: string;
  highlights: string[];
  stats: {
    value: string;
    label: string;
  }[];
  subServices: {
    name: string;
    description: string;
    icon: string;
    image: string;
    highlights: string[];
  }[];
  process: {
    stepNumber: string;
    title: string;
    description: string;
    icon: string;
  }[];
  gallery?: {
    url: string;
    title: string;
    subtitle: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class ServicesDataService {
  private services: Record<string, ServiceDetailData> = {
    'residential-interiors': {
      id: '01',
      slug: 'residential-interiors',
      title: 'Residential Interiors',
      tagline: 'Transforming Houses into Bespoke Luxury Sanctuaries with Tailored Craftsmanship',
      icon: 'fa-solid fa-house-chimney-window',
      heroImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop',
      overviewHeading: 'Elevating Luxury Living Experiences',
      overviewDescription: 'At PrimeSpace Interior, we craft signature residential environments tailored to your lifestyle, aesthetics, and functional requirements. From modern luxury villas and penthouses to contemporary high-rise apartments, our end-to-end service covers space planning, custom furniture design, ceiling architecture, mood lighting, and curated decor.',
      highlights: [
        'End-to-end turn-key design & execution',
        'High-definition 3D VR walkthroughs prior to execution',
        'German & Italian modular hardware integration',
        '10-Year anti-sag & anti-termite warranty',
        'Zero-hassle project management with dedicated site engineers'
      ],
      stats: [
        { value: '500+', label: 'Homes Delivered' },
        { value: '10 Yrs', label: 'Warranty' },
        { value: '45 Days', label: 'Move-in Guarantee' },
        { value: '100%', label: 'Customization' }
      ],
      subServices: [
        {
          name: 'Modular Kitchens',
          description: 'Ergonomic, waterproof acrylic & PU finish kitchens with Blum & Hafele fittings.',
          icon: 'fa-solid fa-kitchen-set',
          image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800&auto=format&fit=crop',
          highlights: ['BWP Plywood', 'Soft-Close Hardware', 'Quartz Countertops']
        },
        {
          name: 'Master Bedrooms & Wardrobes',
          description: 'Floor-to-ceiling walk-in closets, floor-lit glass wardrobes, and headboard backdrops.',
          icon: 'fa-solid fa-bed',
          image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800&auto=format&fit=crop',
          highlights: ['Fluted Glass Doors', 'Sensor LED Strip', 'Velvet Organizers']
        },
        {
          name: 'Living & Dining Lounges',
          description: 'Statement TV unit walls, marble partition walls, acoustic ceilings, and custom seating.',
          icon: 'fa-solid fa-couch',
          image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop',
          highlights: ['Italian Marble Panels', 'Custom Seating', 'Cove Lighting']
        }
      ],
      process: [
        { stepNumber: '01', title: 'Consultation & Discovery', description: 'Detailed discussion on layout options, family needs, and style preferences.', icon: 'fa-solid fa-comments' },
        { stepNumber: '02', title: '3D Space Planning & VR', description: 'Hyper-realistic 3D rendering visuals showing materials and spatial flows.', icon: 'fa-solid fa-cube' },
        { stepNumber: '03', title: 'Material Curation', description: 'Hands-on selection of laminates, veneers, natural stones, and fabrics.', icon: 'fa-solid fa-palette' },
        { stepNumber: '04', title: 'Factory Fabrication', description: 'Precision German CNC cutting with PUR edge-banding.', icon: 'fa-solid fa-gears' },
        { stepNumber: '05', title: 'Precision Handover', description: 'On-site execution by master craftsmen with strict quality audits.', icon: 'fa-solid fa-key' }
      ],
      gallery: [
        { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop', title: 'Luxury Villa Indiranagar', subtitle: 'Bengaluru' },
        { url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=800&auto=format&fit=crop', title: 'Penthouse Residence', subtitle: 'Bhubaneswar' },
        { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop', title: 'Modern Duplex Home', subtitle: 'Whitefield' }
      ],
      faqs: [
        {
          question: 'What is included in a complete residential interior package?',
          answer: 'Our turnkey package includes architectural 3D planning, electrical & plumbing alterations, false ceiling, modular kitchens, wardrobes, TV units, wall paneling, painting, custom lighting, and deep cleaning before final handover.'
        },
        {
          question: 'How long does a 3BHK interior project take?',
          answer: 'Typically, a 3BHK complete interior execution takes between 35 to 45 working days post material approval and site clearance.'
        },
        {
          question: 'Do you provide customizable material options?',
          answer: 'Yes! We offer a massive spectrum of materials including Merino laminates, Royal Touch veneers, Merino PU paint finishes, Quartz countertops, and premium Italian marble.'
        }
      ]
    },
    'commercial-interiors': {
      id: '02',
      slug: 'commercial-interiors',
      title: 'Commercial Interiors',
      tagline: 'High-Impact Workspaces, Retail Showrooms & Hospitality Venues Designed to Elevate Your Brand',
      icon: 'fa-solid fa-city',
      heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop',
      overviewHeading: 'Productivity-Driven Commercial Architecture',
      overviewDescription: 'We engineer commercial spaces that align with your corporate brand identity, boost employee performance, and captivate visiting clients. Whether it is an IT corporate office, luxury retail boutique, boutique cafe, salon, or medical clinic, our commercial team blends spatial ergonomics with modern aesthetic power.',
      highlights: [
        'Acoustic-treated workspace layouting & partition walls',
        'HVAC, MEP, & Fire-Safety integrated design approval',
        'Custom reception counters & brand identity walls',
        'Ergonomic workstation furniture and executive cabins',
        'Strict milestone timelines to minimize operational downtime'
      ],
      stats: [
        { value: '150+', label: 'Commercial Hubs' },
        { value: 'NRC 0.75+', label: 'Acoustics' },
        { value: '100%', label: 'Code Compliant' },
        { value: '5 Yrs', label: 'Warranty' }
      ],
      subServices: [
        {
          name: 'Corporate Offices & IT Hubs',
          description: 'Open-plan workstations, private cabins, boardrooms, phone booths, and cafeteria hubs.',
          icon: 'fa-solid fa-briefcase',
          image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=800&auto=format&fit=crop',
          highlights: ['Ergonomic Seating', 'Acoustic Panels', 'Smart Cable Management']
        },
        {
          name: 'Retail Stores & Boutiques',
          description: 'High-margin product display systems, track lighting, cashier hubs, and window display zones.',
          icon: 'fa-solid fa-store',
          image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop',
          highlights: ['Spotlight Displays', 'Brand Accent Walls', 'Anti-Theft Counter Layouts']
        },
        {
          name: 'Cafes & Restaurants',
          description: 'Experiential dining layouts, bar counters, ambient mood lighting, and durable commercial seating.',
          icon: 'fa-solid fa-utensils',
          image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop',
          highlights: ['Stain-Resistant Fabrics', 'Mood Lighting', 'Acoustic Ceiling Systems']
        }
      ],
      process: [
        { stepNumber: '01', title: 'Brand Brief & Audit', description: 'Understanding staff capacity, brand values, traffic flow, and workflow requirements.', icon: 'fa-solid fa-chart-pie' },
        { stepNumber: '02', title: 'MEP Blueprinting', description: 'Drafting electrical, HVAC, data cabling, acoustic, and ergonomic furniture layouts.', icon: 'fa-solid fa-compass-drafting' },
        { stepNumber: '03', title: 'Off-site Modular Fabrication', description: 'Factory manufacturing of workstations and cabinetry to accelerate completion.', icon: 'fa-solid fa-warehouse' },
        { stepNumber: '04', title: 'Turnkey Installation', description: 'Parallel execution of ceiling, flooring, cabling, and furniture assembly.', icon: 'fa-solid fa-screwdriver-wrench' },
        { stepNumber: '05', title: 'Occupancy Handover', description: 'Final safety certifications, acoustic check, and zero-defect handover.', icon: 'fa-solid fa-building-circle-check' }
      ],
      gallery: [
        { url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=800&auto=format&fit=crop', title: 'Tech Mahindra Regional Office', subtitle: 'Bengaluru' },
        { url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop', title: 'Boutique Coffee House', subtitle: 'Bhubaneswar' }
      ],
      faqs: [
        {
          question: 'Can you handle MEP (Mechanical, Electrical, Plumbing) works for office setups?',
          answer: 'Yes, our team handles complete MEP engineering including HVAC ducting, server room cabling, access control systems, and sprinkler integration.'
        },
        {
          question: 'How do you ensure minimal disruption for existing office premises?',
          answer: 'We schedule noisy civil & installation activities during off-peak hours or weekends, ensuring your core business operations remain undisturbed.'
        }
      ]
    },
    'civil-works': {
      id: '03',
      slug: 'civil-works',
      title: 'Civil Works',
      tagline: 'Rock-Solid Structural Modifications, Tile Installation & Precision Engineering',
      icon: 'fa-solid fa-cubes-stacked',
      heroImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1600&auto=format&fit=crop',
      overviewHeading: 'Uncompromising Structural Foundation & Masonry',
      overviewDescription: 'Quality interiors start with flawless civil infrastructure. Our civil engineering wing provides expert brickwork modifications, wall removals, floor leveling, waterproof tiling, plumbing overhauls, POP moldings, and electrical rewiring executed by certified professionals using premium grade raw materials.',
      highlights: [
        'Structural modification with safety load-bearing calculations',
        'Large-format Italian tile laying with laser precision leveling',
        'Multi-layer waterproofing for bathrooms, terraces & kitchens',
        'Concealed ISI-marked copper wiring & modular switchgear',
        'Gypsum plastering & POP smooth surface preparation'
      ],
      stats: [
        { value: '300+', label: 'Civil Projects' },
        { value: '10 Yrs', label: 'Waterproof Guarantee' },
        { value: '53 Grade', label: 'ACC Cement' },
        { value: '100%', label: 'Engineer Supervised' }
      ],
      subServices: [
        {
          name: 'Demolition & Wall Alterations',
          description: 'Controlled wall demolition, steel beam reinforcements, and brickwork partitions.',
          icon: 'fa-solid fa-hammer',
          image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=800&auto=format&fit=crop',
          highlights: ['Laser Leveling', 'Beam Reinforcement', 'Dust Control']
        },
        {
          name: 'Flooring & Wall Tiling',
          description: 'Vitrified tiles, Italian marble flooring, epoxy grouting, and wooden floor layings.',
          icon: 'fa-solid fa-border-all',
          image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=800&auto=format&fit=crop',
          highlights: ['Italian Marble', 'Laser Tile Levelers', 'Epoxy Waterproof Grout']
        },
        {
          name: 'Waterproofing & Damp Treatment',
          description: 'Dr. Fixit polymer coating, chemical injection damp-proofing, and leak detection.',
          icon: 'fa-solid fa-droplet',
          image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop',
          highlights: ['Polymer Coating', '10-Yr Guarantee', 'Moisture Meter Audit']
        }
      ],
      process: [
        { stepNumber: '01', title: 'Site Inspection & Assessment', description: 'Structural audit, wall moisture check, and utility line mapping.', icon: 'fa-solid fa-magnifying-glass' },
        { stepNumber: '02', title: 'Demolition & Layout Marking', description: 'Safe structural alterations and precise laser marking.', icon: 'fa-solid fa-ruler-combined' },
        { stepNumber: '03', title: 'Concealed Piping & Wiring', description: 'Laying heavy-duty conduit lines, plumbing points, and electrical box fixings.', icon: 'fa-solid fa-bolt' },
        { stepNumber: '04', title: 'Plastering & Tiling', description: 'Applying POP finish, precision tile alignment, and water leak test approvals.', icon: 'fa-solid fa-trowel' },
        { stepNumber: '05', title: 'Civil Audit Signoff', description: 'Laser flatness measurement and site clearance handover.', icon: 'fa-solid fa-clipboard-check' }
      ],
      faqs: [
        {
          question: 'Do you handle structural wall demolition safely?',
          answer: 'Absolutely. Before breaking any wall, our structural engineer inspects the load-bearing pillars and beams to ensure total safety of the property.'
        },
        {
          question: 'What warranty do you provide for waterproofing?',
          answer: 'We provide a written 10-Year Leak-Proof Warranty for all bathroom and terrace waterproofing executed by our civil team.'
        }
      ]
    },
    'wood-works': {
      id: '04',
      slug: 'wood-works',
      title: 'Wood Works',
      tagline: 'Precision German Modular Joinery & Handcrafted Hardwood Furniture',
      icon: 'fa-solid fa-couch',
      heroImage: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=1600&auto=format&fit=crop',
      overviewHeading: 'Artisanal & Modular Wooden Masterpieces',
      overviewDescription: 'Woodwork is the soul of luxury interior design. Combining state-of-the-art German CNC factory precision with centuries-old hardwood hand-craftsmanship, we manufacture furniture, wardrobes, wall claddings, and acoustic panelings that resist time, moisture, and wear.',
      highlights: [
        '100% Boiling Water Proof (BWP) Marine Plywood construction',
        '0.8mm & 1mm anti-scratch laminate & natural veneer surfaces',
        'Soft-closing Blum & Hettich hydraulic hinges & drawer systems',
        'Dust-free factory edge banding using PUR adhesive technology',
        'Custom bespoke dining tables, consoles & vanity units'
      ],
      stats: [
        { value: '100% BWP', label: 'Plywood Grade' },
        { value: 'PUR', label: 'Edge Banding' },
        { value: 'Blum', label: 'Hardware Partner' },
        { value: '10 Yrs', label: 'Factory Warranty' }
      ],
      subServices: [
        {
          name: 'Modular Wardrobes',
          description: 'Sliding glass doors, walk-in organizers, sensor LED lighting, and velvet jewelry drawers.',
          icon: 'fa-solid fa-door-closed',
          image: 'https://images.unsplash.com/photo-1558882224-dda166733046?q=80&w=800&auto=format&fit=crop',
          highlights: ['Tinted Glass', 'Sensor LED', 'Soft-Close Slides']
        },
        {
          name: 'Custom Furniture & Tables',
          description: 'Teak wood dining tables, solid oak consoles, accent chairs, and custom bed frames.',
          icon: 'fa-solid fa-chair',
          image: 'https://images.unsplash.com/photo-1532372576444-dda954194ad0?q=80&w=800&auto=format&fit=crop',
          highlights: ['Burma Teak', 'Hand Polish', 'Ergonomic Curves']
        },
        {
          name: 'Wall Paneling & Louvers',
          description: 'Charcoal louvers, fluted wood panels, acoustic felt boards, and veneer feature walls.',
          icon: 'fa-solid fa-layer-group',
          image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=800&auto=format&fit=crop',
          highlights: ['Fluted Louvers', 'Veneer Finish', 'Acoustic Felt']
        }
      ],
      process: [
        { stepNumber: '01', title: 'Factory Production Drawing', description: 'Converting approved 3D designs into sub-millimeter CAD files.', icon: 'fa-solid fa-file-cad' },
        { stepNumber: '02', title: 'Precision CNC Cutting', description: 'Automated computer-guided cutting and PUR edge banding.', icon: 'fa-solid fa-scissors' },
        { stepNumber: '03', title: 'Multi-Coat Polish & Paint', description: 'Dust-controlled spray booth painting for high-gloss PU or staining.', icon: 'fa-solid fa-paint-roller' },
        { stepNumber: '04', title: 'Modular Assembly On-Site', description: 'Clean, knock-down modular assembly on site with zero dust.', icon: 'fa-solid fa-cubes' },
        { stepNumber: '05', title: 'Final Quality Audit', description: 'Rigorous 50-point hardware alignment and surface polish inspection.', icon: 'fa-solid fa-square-check' }
      ],
      faqs: [
        {
          question: 'What type of plywood do you use for wet areas like kitchens?',
          answer: 'We exclusively use IS:710 Grade 100% Boiling Water Proof (BWP) Marine Plywood with anti-termite and anti-fungal treatment.'
        },
        {
          question: 'Are the wardrobe door hinges soft-closing?',
          answer: 'Yes, all our cabinetry comes standard with imported soft-close hydraulic hinges tested for over 200,000 opening cycles.'
        }
      ]
    },
    'renovation': {
      id: '05',
      slug: 'renovation',
      title: 'Renovation',
      tagline: 'Breathing New Architectural Life & Modern Elegance into Existing Spaces',
      icon: 'fa-solid fa-paint-roller',
      heroImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600&auto=format&fit=crop',
      overviewHeading: 'Turnkey Property Makeovers & Facelifts',
      overviewDescription: 'Transform outdated layouts into modern, vibrant architectural marvels without starting from scratch. Our specialized renovation team rewires old infrastructure, replaces obsolete flooring, remodels outdated kitchens/bathrooms, and optimizes natural sunlight for a dramatic property facelift.',
      highlights: [
        'Complete property facelift with minimal structural teardown',
        'Old flooring removal & replacement with modern large tiles',
        'Bathroom space re-configuration with glass shower enclosures',
        'Modern smart home electrical & automated lighting upgrade',
        'Substantial increase in overall property market valuation'
      ],
      stats: [
        { value: '25-40%', label: 'Value Increase' },
        { value: '30 Days', label: 'Rapid Turnaround' },
        { value: '0 Hazard', label: 'Dust Control' },
        { value: '10 Yrs', label: 'New Work Warranty' }
      ],
      subServices: [
        {
          name: 'Full Home Makeover',
          description: 'Revamping older 15+ year homes into contemporary open-plan luxury spaces.',
          icon: 'fa-solid fa-arrows-rotate',
          image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=800&auto=format&fit=crop',
          highlights: ['Open-Plan Layout', 'Smart Home Integration', 'Structural Strengthening']
        },
        {
          name: 'Kitchen & Bathroom Remodeling',
          description: 'Upgrading old tiles, plumbing, sanitary fixtures, and modular storage units.',
          icon: 'fa-solid fa-shower',
          image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop',
          highlights: ['Concealed Diverters', 'Glass Partition', 'Anti-Skid Tiles']
        },
        {
          name: 'Commercial & Villa Facelift',
          description: 'Exterior balcony upgrades, elevation painting, false ceiling overhauls, and premium flooring.',
          icon: 'fa-solid fa-building-flag',
          image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800&auto=format&fit=crop',
          highlights: ['Exterior Elevation', 'Glass Railings', 'False Ceiling Overhaul']
        }
      ],
      process: [
        { stepNumber: '01', title: 'Old Property Assessment', description: 'Evaluating pipe leaks, electrical load, and structural walls.', icon: 'fa-solid fa-clipboard-list' },
        { stepNumber: '02', title: 'Remodeling Blueprint', description: 'Formulating a budget plan to salvage usable structures.', icon: 'fa-solid fa-pen-ruler' },
        { stepNumber: '03', title: 'Selective Strip-out', description: 'Careful removal of old cabinets, tiles, and fixtures.', icon: 'fa-solid fa-truck-ramp-box' },
        { stepNumber: '04', title: 'Modern Fit-out Execution', description: 'Installing new finishes, fixtures, and electrical wiring.', icon: 'fa-solid fa-sparkles' },
        { stepNumber: '05', title: 'Turnkey Handover', description: 'Post-renovation deep cleaning, final walkthrough, and warranty signoff.', icon: 'fa-solid fa-key' }
      ],
      faqs: [
        {
          question: 'Is it possible to renovate a house while staying in it?',
          answer: 'Yes! We execute phased room-by-room renovations with protective dust curtains to ensure you can stay comfortably during the process.'
        },
        {
          question: 'How much value can a full interior renovation add to my property?',
          answer: 'A high-end interior renovation typically increases property resale and rental valuation by 25% to 40% in prime urban areas.'
        }
      ]
    }
  };

  getAllServices(): ServiceDetailData[] {
    return Object.values(this.services);
  }

  getServiceBySlug(slug: string): ServiceDetailData {
    return this.services[slug] || this.services['residential-interiors'];
  }
}
