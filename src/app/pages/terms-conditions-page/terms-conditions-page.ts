import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ConsultationModalService } from '../../services/consultation-modal.service';

@Component({
  selector: 'app-terms-conditions-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './terms-conditions-page.html',
  styleUrl: './terms-conditions-page.css'
})
export class TermsConditionsPage implements OnInit {
  constructor(public consultationModalService: ConsultationModalService) {}

  ngOnInit() {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }
}
