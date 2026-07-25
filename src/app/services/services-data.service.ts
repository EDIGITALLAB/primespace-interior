import { Injectable } from '@angular/core';

export interface SubServiceItem {
  name: string;
  icon: string;
  description: string;
  image: string;
  highlights: string[];
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  description: string;
  icon: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceStat {
  label: string;
  value: string;
}

export interface ServiceDetailData {
  slug: string;
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  icon: string;
  heroImage: string;
  overviewHeading: string;
  overviewDescription: string;
  stats: ServiceStat[];
  highlights: string[];
  subServices: SubServiceItem[];
  process: ProcessStep[];
  gallery: { url: string; title: string; subtitle: string }[];
  faqs: ServiceFAQ[];
}

@Injectable({
  providedIn: 'root'
})
export class ServicesDataService {
  private readonly servicesMap: Record<string, ServiceDetailData> = {
    'residential-interiors': {
      slug: 'residential-interiors',
      id: '01',
      title: 'Residential Interiors',
      subtitle: 'Bespoke Luxury Home & Living Spaces',
      tagline: 'Complete home interiors blending modern German precision with timeless aesthetic elegance.',
      icon: 'fa-solid fa-house-chimney-window',
      heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      overviewHeading: 'Transforming Houses into Bespoke Sanctuary Homes',
      overviewDescription: 'Our residential interior design services cover every square inch of your home. From initial 3D architectural visualization to German modular installation, we ensure your living room, master bedroom, modular kitchen, and dining areas reflect your unique persona with unparalleled luxury.',
      stats: [
        { label: 'Homes Delivered', value: '450+' },
        { label: 'Warranty On Materials', value: '10 Years' },
        { label: 'Design Options', value: '1000+' },
        { label: 'Execution Time', value: '45 Days' }
      ],
      highlights: [
        'End-to-End Turnkey Design & Execution',
        'Precision German Modular Engineering',
        '10-Year Structural & Hardware Warranty',
        'Photorealistic 3D VR Walkthroughs',
        'Transparent Factory Direct Pricing'
      ],
      subServices: [
        {
          name: 'Modular Kitchen Solutions',
          icon: 'fa-solid fa-kitchen-set',
          description: 'Custom engineered acrylic, lacquer, and veneer modular kitchens designed for high ergonomics and smart storage.',
          image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
          highlights: ['Hafele & Blum Soft-close Hardware', 'BWP Waterproof Plywood Base', 'Quartz & Marble Countertops', 'Built-in Pantry & Appliance Towers']
        },
        {
          name: 'Master & Guest Wardrobes',
          icon: 'fa-solid fa-door-closed',
          description: 'Sliding, walk-in, and floor-to-ceiling hinge wardrobes equipped with sensor lighting and organizer accessories.',
          image: 'https://images.unsplash.com/photo-1558882224-dda166733046?auto=format&fit=crop&w=800&q=80',
          highlights: ['Fluted Glass & Tinted Mirrors', 'Soft-close Drawer Runners', 'Integrated LED Profile Lights', 'Custom Jewelry & Tie Drawers']
        },
        {
          name: 'Living & Media Wall Units',
          icon: 'fa-solid fa-tv',
          description: 'Contemporary TV backdrops with louvers, Italian marble paneling, floating consoles, and hidden cable channels.',
          image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
          highlights: ['Italian Travertine Paneling', 'Acoustic Charcoal Louvers', 'Ambient Smart RGB Strips', 'Floating Minimal Consoles']
        },
        {
          name: 'False Ceiling & Architectural Lighting',
          icon: 'fa-solid fa-lightbulb',
          description: 'Gypsum ceiling designs featuring cove lighting, magnetic tracks, anti-glare COB spotlights, and chandelier points.',
          image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
          highlights: ['Saint-Gobain Gypsum Board', 'Warm Architectural Spotlights', 'Magnetic Track Lighting', 'Minimalist Cove Glow']
        },
        {
          name: 'Accent Wall Paneling & Painting',
          icon: 'fa-solid fa-paint-roller',
          description: 'Bespoke textures, PU paint finishes, CNC motif paneling, and eco-friendly luxury washable paints.',
          image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
          highlights: ['Royal PU Gloss & Matt', 'MDF CNC Decorative Screens', 'Textured Metallic Accent Walls', 'Low-VOC Eco Friendly Paints']
        },
        {
          name: 'Space Planning & Furniture',
          icon: 'fa-solid fa-couch',
          description: 'Curated space optimization including bespoke sofas, dining tables, accent chairs, and custom upholstery.',
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
          highlights: ['Custom Fabric & Leatherette', 'Ergonomic Seating Layouts', 'Marble & Brass Dining Setups', 'Balcony & Reading Nooks']
        }
      ],
      process: [
        {
          stepNumber: '01',
          title: 'Initial Consultation',
          description: 'We meet at your home or studio to understand your style preferences, budget, and lifestyle requirements.',
          icon: 'fa-solid fa-comments'
        },
        {
          stepNumber: '02',
          title: '3D Layout & Visualization',
          description: 'Our senior designers create photorealistic 3D renders and detailed floor plans for complete clarity.',
          icon: 'fa-solid fa-vr-cardboard'
        },
        {
          stepNumber: '03',
          title: 'Material & Finishes Selection',
          description: 'Explore laminates, acrylics, hardware, and fabrics in our state-of-the-art experience center.',
          icon: 'fa-solid fa-swatchbook'
        },
        {
          stepNumber: '04',
          title: 'Precision Factory Production',
          description: 'Your modular components are manufactured in our automated CNC factory under strict quality controls.',
          icon: 'fa-solid fa-industry'
        },
        {
          stepNumber: '05',
          title: 'On-Site Handover',
          description: 'Our project managers assemble, clean, inspect, and hand over your ready-to-move dream home on time.',
          icon: 'fa-solid fa-key'
        }
      ],
      gallery: [
        { url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80', title: 'Luxury Villa Living Room', subtitle: 'Indiranagar, Bengaluru' },
        { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80', title: 'Minimalist Modular Kitchen', subtitle: 'Smart City Studio, Bhubaneswar' },
        { url: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80', title: 'Contemporary Master Suite', subtitle: 'Whitefield, Bengaluru' }
      ],
      faqs: [
        {
          question: 'How long does a full residential interior project take?',
          answer: 'Typically, turnkey residential interiors take 35 to 45 working days from approval of 3D designs to final handover.'
        },
        {
          question: 'What warranty is provided for residential modular furniture?',
          answer: 'We provide a 10-year flat structural and anti-sag warranty on all factory-made modular cabinets and Blum/Hafele hardware.'
        },
        {
          question: 'Can I customize hardware and finishes?',
          answer: 'Yes! We offer 100% customizability across acrylic, PU paint, veneer, laminate, and glass finishes with your choice of premium hardware.'
        }
      ]
    },

    'commercial-interiors': {
      slug: 'commercial-interiors',
      id: '02',
      title: 'Commercial Interiors',
      subtitle: 'High-Impact Workspaces, Retail & Hospitality',
      tagline: 'Designing commercial environments that boost brand equity, employee efficiency, and customer experience.',
      icon: 'fa-solid fa-city',
      heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80',
      overviewHeading: 'Strategic Interior Architecture for Modern Businesses',
      overviewDescription: 'From tech corporate offices and boutique cafes to luxury retail showrooms and medical clinics, PrimeSpace delivers commercial spaces engineered for maximum workflow efficiency, safety compliance, and striking brand presence.',
      stats: [
        { label: 'Corporate Projects', value: '180+' },
        { label: 'Sq. Ft. Designed', value: '1M+' },
        { label: 'Brand Impact', value: '100%' },
        { label: 'On-Time Delivery', value: '99.4%' }
      ],
      highlights: [
        'Acoustic & Ergonomic Office Layouts',
        'Commercial Grade High-Traffic Materials',
        'HVAC, Electrical & Fire Safety Integration',
        'Custom Reception & Brand Wall Displays',
        'Fast-Track Commercial Execution'
      ],
      subServices: [
        {
          name: 'Corporate Offices & IT Hubs',
          icon: 'fa-solid fa-building',
          description: 'Ergonomic workstations, executive cabins, boardrooms, and collaborative lounge spaces.',
          image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80',
          highlights: ['Acoustic Partition Panels', 'Modular Workstation Bays', 'AV Integrated Conference Tables', 'Breakout & Cafeteria Spaces']
        },
        {
          name: 'Luxury Retail Showrooms',
          icon: 'fa-solid fa-store',
          description: 'Experiential retail layouts with optimal customer movement paths, display racks, and focal lighting.',
          image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
          highlights: ['High Intensity Spotlight Racks', 'Bespoke Counter Displays', 'Window Display Framing', 'Security System Provision']
        },
        {
          name: 'Cafes & Fine Dining Restaurants',
          icon: 'fa-solid fa-utensils',
          description: 'Atmospheric dining interiors, acoustic ceilings, bar counter design, and kitchen layouting.',
          image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
          highlights: ['Custom Booth Seating', 'Industrial & Warm Lighting', 'Heavy Duty Flooring', 'Acoustic Noise Control']
        },
        {
          name: 'Clinics, Salons & Wellness Studios',
          icon: 'fa-solid fa-scissors',
          description: 'Hygienic, serene, and aesthetic environments optimized for client comfort and service efficiency.',
          image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80',
          highlights: ['Easy-to-Sanitize Surfaces', 'Ergonomic Styling Stations', 'Calming Ambient Cove Lighting', 'Private Treatment Pods']
        }
      ],
      process: [
        {
          stepNumber: '01',
          title: 'Brand & Spatial Analysis',
          description: 'Evaluating footfall patterns, employee density, brand guidelines, and acoustic requirements.',
          icon: 'fa-solid fa-chart-pie'
        },
        {
          stepNumber: '02',
          title: 'Zoning & 3D Architectural Renders',
          description: 'Developing high-efficiency floor plans, fire egress compliance, and realistic 3D renderings.',
          icon: 'fa-solid fa-pen-ruler'
        },
        {
          stepNumber: '03',
          title: 'MEP & Safety Integration',
          description: 'Integrating HVAC ducts, data cabling, fire sprinklers, and acoustic wall panels seamlessly.',
          icon: 'fa-solid fa-gears'
        },
        {
          stepNumber: '04',
          title: 'Fast-Track Execution',
          description: 'Operating round-the-clock site shifts to meet tight commercial launch deadlines.',
          icon: 'fa-solid fa-bolt'
        },
        {
          stepNumber: '05',
          title: 'Final Audit & Handover',
          description: 'Comprehensive electrical, acoustic, and finishing audit prior to commercial inauguration.',
          icon: 'fa-solid fa-flag-checkered'
        }
      ],
      gallery: [
        { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80', title: 'Tech Headquarters', subtitle: 'Electronic City, Bengaluru' },
        { url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80', title: 'Artisan Coffee Roasters', subtitle: 'Koramangala, Bengaluru' }
      ],
      faqs: [
        {
          question: 'Can you work outside of regular business hours to prevent operational disruption?',
          answer: 'Yes, we specialize in night shifts and phased execution for ongoing commercial spaces.'
        },
        {
          question: 'Do you handle fire safety and MEP permissions?',
          answer: 'Our commercial team includes MEP engineers who design systems in full compliance with local municipal safety norms.'
        }
      ]
    },

    'civil-works': {
      slug: 'civil-works',
      id: '03',
      title: 'Civil Works',
      subtitle: 'Structural Modifications, Tiling & Plumbing',
      tagline: 'Robust structural alterations, premium Italian marble laying, and heavy-duty electrical infrastructural foundation.',
      icon: 'fa-solid fa-cubes-stacked',
      heroImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80',
      overviewHeading: 'Flawless Structural Foundation for Long-Lasting Interiors',
      overviewDescription: 'The beauty of any interior design rests on a solid civil engineering foundation. PrimeSpace provides expert masonry, laser-aligned tile and slab laying, waterproof plumbing networks, concealed electrical routing, and structural wall removals.',
      stats: [
        { label: 'Civil Projects', value: '300+' },
        { label: 'Quality Checks', value: '50+' },
        { label: 'Zero Leak Guarantee', value: '100%' },
        { label: 'Master Masons', value: '40+' }
      ],
      highlights: [
        'Laser-Guided Level Tiling & Slab Work',
        'Pressure-Tested Waterproof Plumbing',
        'Concealed Finolex / Havells Wiring',
        'Structural Demolition & Beam Reinforcement',
        'POP & Gypsum Plaster Smooth Finishing'
      ],
      subServices: [
        {
          name: 'Precision Tiling & Slab Laying',
          icon: 'fa-solid fa-border-all',
          description: 'Large format vitrified tile laying, epoxy grouting, Italian marble diamond polishing, and granite counter fitting.',
          image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
          highlights: ['Laser Level Alignment', 'Stain Resistant Epoxy Grout', 'Italian Marble Mirror Polish', 'Anti-Skid Outdoor Tiles']
        },
        {
          name: 'Concealed Electrical Infrastructure',
          icon: 'fa-solid fa-plug',
          description: 'Heavy gauge copper conduit wiring, distribution board balancing, earthing, and modular switch box fitting.',
          image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
          highlights: ['Fire Retardant FR-LSH Cables', '3-Phase Load Balancing', 'Schneider & Legrand Switches', 'Surge Protection Devices']
        },
        {
          name: 'Plumbing & Waterproofing',
          icon: 'fa-solid fa-faucet-drip',
          description: 'CPVC/UPVC concealed pipe routing, wall-hung WC frames, multi-layer bathroom waterproofing, and drainage traps.',
          image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80',
          highlights: ['Polyurethane Waterproofing Membrane', 'Pressure Test Certification', 'Concealed Diverters & Body Jets', 'Acoustic Sound-Dampened Pipes']
        },
        {
          name: 'Masonry & Structural Alterations',
          icon: 'fa-solid fa-trowel-bricks',
          description: 'Brickwork partitions, structural wall openings, lintel beams, balcony extensions, and plastering.',
          image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
          highlights: ['AAC Light Block Masonry', 'Steel Lintel Support Beams', 'Smooth Gypsum Wall Finish', 'Niche & Arch Carvings']
        }
      ],
      process: [
        {
          stepNumber: '01',
          title: 'Structural Inspection',
          description: 'Assessing load-bearing walls, existing plumbing lines, and electrical distribution limits.',
          icon: 'fa-solid fa-compass-drafting'
        },
        {
          stepNumber: '02',
          title: 'Demolition & Layout Marking',
          description: 'Laser marking accurate points for masonry walls, plumbing drains, and electrical switch boxes.',
          icon: 'fa-solid fa-hammer'
        },
        {
          stepNumber: '03',
          title: 'Chipping, Piping & Wiring',
          description: 'Laying concealed conduits and pressure testing plumbing lines before plastering.',
          icon: 'fa-solid fa-faucet'
        },
        {
          stepNumber: '04',
          title: 'Waterproofing & Tiling',
          description: 'Applying multi-layer waterproof chemical membranes followed by laser-aligned tile laying.',
          icon: 'fa-solid fa-layer-group'
        },
        {
          stepNumber: '05',
          title: 'Plastering & Curing Audit',
          description: 'Final level check, epoxy grouting, and smooth POP base preparation for interior woodwork.',
          icon: 'fa-solid fa-circle-check'
        }
      ],
      gallery: [
        { url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80', title: 'Italian Marble Installation', subtitle: 'Jayanagar, Bengaluru' },
        { url: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80', title: 'Luxury Bathroom Civil Work', subtitle: 'Patia, Bhubaneswar' }
      ],
      faqs: [
        {
          question: 'Do you offer waterproofing guarantees for bathrooms and balconies?',
          answer: 'Yes, all our waterproofing applications come with a written 5-year leak-proof guarantee.'
        },
        {
          question: 'Are structural modifications safe for apartments?',
          answer: 'We only remove non-load-bearing partition walls after structural engineering verification and approval.'
        }
      ]
    },

    'wood-works': {
      slug: 'wood-works',
      id: '04',
      title: 'Wood Works',
      subtitle: 'German Modular Precision & Custom Carpentry',
      tagline: 'Precision engineered woodwork utilizing HDMR, BWP Plywood, Natural Veneer, and PU finishes.',
      icon: 'fa-solid fa-couch',
      heroImage: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1600&q=80',
      overviewHeading: 'Craftsmanship Meets High-Tech Automated Carpentry',
      overviewDescription: 'Whether you desire German modular factory furniture with seamless edge banding or custom handcrafted solid wood artifacts, our joinery team delivers immaculate fit and finish for every cabinet, vanity, and panel in your home.',
      stats: [
        { label: 'Factory Capacity', value: '50K Sq. Ft.' },
        { label: 'Hardware Partners', value: 'Blum / Hafele' },
        { label: 'Edge Banding', value: 'PUR Zero Joint' },
        { label: 'Anti-Termite', value: '100% Guaranteed' }
      ],
      highlights: [
        'Boiling Water Proof (BWP) IS-710 Grade Plywood',
        'PUR Seamless Zero-Joint Edge Banding',
        'Super Matt & High Gloss German Acrylic Sheets',
        'Multi-Coat Italian PU Lacquer Polish',
        'Soft-Close Blum & Hafele Concealed Hinges'
      ],
      subServices: [
        {
          name: 'German Factory Modular Furniture',
          icon: 'fa-solid fa-cubes',
          description: 'CNC cut modular carcasses with PUR edge banding, eliminating rough edges and moisture seepage.',
          image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
          highlights: ['Zero-Joint PUR Technology', 'Anti-Termite HDMR Boards', 'Integrated Cable Passages', 'Modular Expandable Shelving']
        },
        {
          name: 'Natural Veneer & Fluted Wood Paneling',
          icon: 'fa-solid fa-tree',
          description: 'Teak, Walnut, and Oak veneer paneling with natural wood grains polished in matte or high gloss PU.',
          image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
          highlights: ['Imported European Veneer Sheets', 'Seamless Book-Matched Grains', 'CNC Fluted Wall Profiles', 'UV Protection Layer']
        },
        {
          name: 'Bespoke Solid Wood Carpentry',
          icon: 'fa-solid fa-hammer',
          description: 'Handcrafted solid teakwood main doors, dining tables, mandir units, and customized seating.',
          image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80',
          highlights: ['Seasoned Teak & Sheesham Wood', 'Traditional Mortise & Tenon Joinery', 'Brass Inlay Details', 'Custom Carved Motifs']
        },
        {
          name: 'Acrylic & Italian PU Coating',
          icon: 'fa-solid fa-spray-can',
          description: 'Mirror-finish high gloss or smooth tactile matte PU paint finishes in over 2000 RAL color shades.',
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
          highlights: ['Scratch-Resistant Acrylic', 'Yellowing Resistant PU Polish', 'Dual Tone Color Choices', 'Fingerprint-Resistant Finish']
        }
      ],
      process: [
        {
          stepNumber: '01',
          title: '3D CAD Cutlist Generation',
          description: 'Architectural drawings converted into precise CNC machine code for zero material wastage.',
          icon: 'fa-solid fa-laptop-code'
        },
        {
          stepNumber: '02',
          title: 'Automated Board Cutting & Edging',
          description: 'Precision panel saws and PUR edge banders process BWP plywood boards.',
          icon: 'fa-solid fa-scissors'
        },
        {
          stepNumber: '03',
          title: 'Dust-Free PU Coating Spray Booth',
          description: 'Veneers and doors receive multi-coat PU application in pressurized cleanroom booths.',
          icon: 'fa-solid fa-spray-can'
        },
        {
          stepNumber: '04',
          title: 'Hardware Pre-Assembly Inspection',
          description: 'Dovetail joints, drawer runners, and hinges are pre-tested at the plant before packing.',
          icon: 'fa-solid fa-screwdriver'
        },
        {
          stepNumber: '05',
          title: 'Dust-Free On-Site Assembly',
          description: 'Modular units are assembled in hours without on-site cutting noise or sawdust pollution.',
          icon: 'fa-solid fa-box-open'
        }
      ],
      gallery: [
        { url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80', title: 'Modular German Kitchen', subtitle: 'HSR Layout, Bengaluru' },
        { url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80', title: 'Fluted Teak Wall Paneling', subtitle: 'Khandagiri, Bhubaneswar' }
      ],
      faqs: [
        {
          question: 'What is the difference between BWP Plywood and HDMR Board?',
          answer: 'BWP (Boiling Water Proof) Plywood IS-710 is ideal for wet zones like kitchens and bathrooms. HDMR (High Density Moisture Resistant) is ideal for dry area wardrobes, TV units, and beds.'
        },
        {
          question: 'What brand hardware do you use?',
          answer: 'We exclusively use Blum (Austria) and Hafele (Germany) soft-close runners, hinges, and lift-up mechanisms with lifetime smooth movement.'
        }
      ]
    },

    'renovation': {
      slug: 'renovation',
      id: '05',
      title: 'Renovation Services',
      subtitle: 'Complete Home, Villa & Office Remodeling',
      tagline: 'Revitalize outdated spaces with modern layouts, upgraded civil infrastructure, and fresh aesthetic designs.',
      icon: 'fa-solid fa-paint-roller',
      heroImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80',
      overviewHeading: 'Breathe New Life into Your Existing Property',
      overviewDescription: 'Is your home or office starting to show its age? Our structural and interior renovation team specializes in converting dated, cramped spaces into bright, spacious, and energy-efficient contemporary environments without the hassle of moving.',
      stats: [
        { label: 'Renovations Done', value: '250+' },
        { label: 'Value Addition', value: '35%+' },
        { label: 'Hassle Free Process', value: '100%' },
        { label: 'Site Protection', value: 'Included' }
      ],
      highlights: [
        'Complete Home & Villa Modernization',
        'Dust-Proof Site Protection Barriers',
        'Modular Kitchen & Bathroom Overhaul',
        'Electrical Rewiring & Smart Automation',
        'Facade & Outdoor Terrace Renovation'
      ],
      subServices: [
        {
          name: 'Full Home & Apartment Remodeling',
          icon: 'fa-solid fa-house-chimney-crack',
          description: 'Comprehensive overhaul of flooring, woodwork, false ceiling, lighting, and wall finishes.',
          image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
          highlights: ['Open-Concept Wall Removal', 'New Marble / Tile Overlay', 'Smart Home Integration', 'Energy Efficient Lighting']
        },
        {
          name: 'Bathroom & Kitchen Revamp',
          icon: 'fa-solid fa-bath',
          description: 'Replacing old plumbing pipes, tiles, sanitaryware, counter slabs, and modern modular cabinets.',
          image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
          highlights: ['Concealed Rain Shower Setup', 'Waterproof Membrane Coating', 'Quartz Counter Slabs', 'Modular Soft-Close Drawers']
        },
        {
          name: 'Villa & Heritage Property Facade',
          icon: 'fa-solid fa-gopuram',
          description: 'Exterior structural repairs, weather-proof texture paint, balcony glass railings, and terrace landscaping.',
          image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
          highlights: ['Toughened Glass Balustrades', 'Weather Shield Paint', 'Terrace Pergola & Decking', 'Exterior Highlight Lighting']
        },
        {
          name: 'Office & Commercial Space Overhaul',
          icon: 'fa-solid fa-rotate',
          description: 'Upgrading legacy office setups into agile co-working spaces with acoustic partitions and LED lighting.',
          image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
          highlights: ['Phased Work During Off-Hours', 'HVAC Duct Optimization', 'Modern Conference Rooms', 'Fresh Corporate Palette']
        }
      ],
      process: [
        {
          stepNumber: '01',
          title: 'Structural Safety Assessment',
          description: 'Inspecting existing beams, plumbing pipelines, electrical wiring condition, and dampness sources.',
          icon: 'fa-solid fa-magnifying-glass'
        },
        {
          stepNumber: '02',
          title: 'Dust Masking & Property Protection',
          description: 'Covering un-renovated rooms, lifts, and common passages with heavy protective plastic and corrugated sheets.',
          icon: 'fa-solid fa-shield-halved'
        },
        {
          stepNumber: '03',
          title: 'Targeted Demolition & Civil Work',
          description: 'Safely dismantling old tiles, cabinets, and unwanted partition walls.',
          icon: 'fa-solid fa-person-digging'
        },
        {
          stepNumber: '04',
          title: 'Modular Installation & Finishing',
          description: 'Installing new electrical lines, tiling, custom modular cabinets, and false ceiling.',
          icon: 'fa-solid fa-screwdriver-wrench'
        },
        {
          stepNumber: '05',
          title: 'Deep Cleaning & Final Reveal',
          description: 'Professional deep clean, debris disposal, and unveiling your brand-new interior space.',
          icon: 'fa-solid fa-sparkles'
        }
      ],
      gallery: [
        { url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80', title: 'Renovated Penthouse Living', subtitle: 'Indiranagar, Bengaluru' },
        { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80', title: 'Villa Exterior Modernization', subtitle: 'Jayadev Vihar, Bhubaneswar' }
      ],
      faqs: [
        {
          question: 'Can we live in the house while partial renovation takes place?',
          answer: 'Yes, for kitchen or bathroom renovations, we implement dust-proof isolation walls so you can reside in other sections of the home comfortably.'
        },
        {
          question: 'How do you handle old debris disposal?',
          answer: 'We manage complete daily removal and ethical disposal of civil debris in accordance with city municipal guidelines.'
        }
      ]
    }
  };

  getServiceBySlug(slug: string): ServiceDetailData | undefined {
    return this.servicesMap[slug] || this.servicesMap['residential-interiors'];
  }

  getAllServices(): ServiceDetailData[] {
    return Object.values(this.servicesMap);
  }
}
