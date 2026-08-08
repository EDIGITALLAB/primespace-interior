import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ConsultationModalService } from '../../services/consultation-modal.service';

export interface FaqItem {
  id: string;
  category: 'general' | 'pricing' | 'timeline' | 'materials' | 'warranty';
  question: string;
  answer: string;
  isOpen?: boolean;
}

@Component({
  selector: 'app-faq-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './faq-page.html',
  styleUrl: './faq-page.css'
})
export class FaqPage implements OnInit {
  readonly activeCategory = signal<string>('all');
  readonly searchQuery = signal<string>('');

  readonly faqList = signal<FaqItem[]>([
    {
      id: 'f1',
      category: 'general',
      question: 'What services does Prime Space Interior provide?',
      answer: 'We provide end-to-end turnkey interior design and execution for luxury villas, apartments, and penthouses. This includes photorealistic 3D VR space planning, modular kitchen fabrication, bespoke bedroom wardrobes, living room wall paneling, false ceiling lighting, and complete site installation.',
      isOpen: true
    },
    {
      id: 'f2',
      category: 'general',
      question: 'Where are your physical experience centers located?',
      answer: 'We currently operate flagship design studios in Indiranagar (Bengaluru) and Saheed Nagar (Bhubaneswar). You can visit our studios to touch raw HDMR samples, test soft-close hardware bays, and consult 1-on-1 with our principal interior architects.',
      isOpen: false
    },
    {
      id: 'f3',
      category: 'pricing',
      question: 'How much does a full home interior project cost?',
      answer: 'Interior costs depend on property size and material finishes. Our Essential packages start at ₹4.85 Lakhs for 2BHKs, Eleganza packages start at ₹9.95 Lakhs for 3BHKs, and Eleganza Plus luxury villa setups start at ₹16.4 Lakhs. All quotations come itemized with zero hidden fees.',
      isOpen: false
    },
    {
      id: 'f4',
      category: 'pricing',
      question: 'What is your milestone payment structure?',
      answer: 'Our transparent 3-stage payment plan includes: 10% upon booking to start 3D designs, 50% prior to factory manufacturing and CNC board cutting, and the remaining 40% upon site delivery before final assembly.',
      isOpen: false
    },
    {
      id: 'f5',
      category: 'timeline',
      question: 'What is the average timeline for project completion?',
      answer: 'Our standard move-in commitment is 45 Days from factory order approval. Because all modular carcasses are precision cut in our automated factory while civil site prep occurs in parallel, project timelines are significantly faster than traditional hand-carved joinery.',
      isOpen: false
    },
    {
      id: 'f6',
      category: 'materials',
      question: 'What core materials do you use for modular cabinets?',
      answer: 'We exclusively use 100% Boiling Water Proof (BWP) Marine Plywood Grade 710 and High-Density Moisture Resistant (HDMR) boards. Surfaces are laminated with anti-scratch high-gloss acrylics, natural veneers, or soft-touch laminates with seamless PUR laser edge banding.',
      isOpen: false
    },
    {
      id: 'f7',
      category: 'materials',
      question: 'What hardware brands are integrated into your modular kitchens?',
      answer: 'We integrate top-tier Blum and Hettich hydraulic soft-close hinges, tandem drawer runners, gas lifts, and spice pullouts tested for over 200,000 open-close cycles.',
      isOpen: false
    },
    {
      id: 'f8',
      category: 'warranty',
      question: 'What is covered under the Prime Space 10-Year Warranty?',
      answer: 'Our 10-year warranty covers structural carcass integrity against delamination, termite infestation, and borer attacks on all modular woodwork, alongside lifetime warranty on Blum/Hettich soft-close hardware.',
      isOpen: false
    },
    {
      id: 'f9',
      category: 'warranty',
      question: 'How do I request site maintenance or warranty service?',
      answer: 'Simply call our customer helpline (+91 98765 43210) or email support@primespaceinterior.com. A certified site technician will visit your home within 48 hours to inspect and replace any affected components.',
      isOpen: false
    }
  ]);

  constructor(public consultationModalService: ConsultationModalService) {}

  ngOnInit() {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }

  readonly filteredFaqs = computed(() => {
    const cat = this.activeCategory();
    const query = this.searchQuery().toLowerCase().trim();

    return this.faqList().filter(item => {
      const matchesCat = cat === 'all' || item.category === cat;
      const matchesSearch = !query ||
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query);
      return matchesCat && matchesSearch;
    });
  });

  toggleFaq(item: FaqItem) {
    this.faqList.update(list =>
      list.map(f => f.id === item.id ? { ...f, isOpen: !f.isOpen } : f)
    );
  }

  setCategory(cat: string) {
    this.activeCategory.set(cat);
  }
}
