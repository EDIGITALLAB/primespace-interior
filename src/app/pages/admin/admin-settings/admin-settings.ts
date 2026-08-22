import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminDataService, AdminSettings as SettingsType } from '../../../services/admin-data.service';

@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-settings.html',
  styleUrl: './admin-settings.css'
})
export class AdminSettings implements OnInit {
  adminData = inject(AdminDataService);

  companyName = signal('');
  tagline = signal('');
  phoneBangalore = signal('');
  phoneBhubaneswar = signal('');
  email = signal('');
  bangaloreAddress = signal('');
  bhubaneswarAddress = signal('');
  whatsappNumber = signal('');
  instagramUrl = signal('');
  facebookUrl = signal('');
  youtubeUrl = signal('');

  savedMessage = signal(false);

  ngOnInit() {
    const s = this.adminData.settings();
    this.companyName.set(s.companyName);
    this.tagline.set(s.tagline);
    this.phoneBangalore.set(s.phoneBangalore);
    this.phoneBhubaneswar.set(s.phoneBhubaneswar);
    this.email.set(s.email);
    this.bangaloreAddress.set(s.bangaloreAddress);
    this.bhubaneswarAddress.set(s.bhubaneswarAddress);
    this.whatsappNumber.set(s.whatsappNumber);
    this.instagramUrl.set(s.instagramUrl);
    this.facebookUrl.set(s.facebookUrl);
    this.youtubeUrl.set(s.youtubeUrl);
  }

  saveSettings(e: Event) {
    e.preventDefault();
    this.adminData.updateSettings({
      companyName: this.companyName(),
      tagline: this.tagline(),
      phoneBangalore: this.phoneBangalore(),
      phoneBhubaneswar: this.phoneBhubaneswar(),
      email: this.email(),
      bangaloreAddress: this.bangaloreAddress(),
      bhubaneswarAddress: this.bhubaneswarAddress(),
      whatsappNumber: this.whatsappNumber(),
      instagramUrl: this.instagramUrl(),
      facebookUrl: this.facebookUrl(),
      youtubeUrl: this.youtubeUrl()
    });

    this.savedMessage.set(true);
    setTimeout(() => this.savedMessage.set(false), 3000);
  }
}
