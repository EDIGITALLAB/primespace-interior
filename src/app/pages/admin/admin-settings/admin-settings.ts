import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminDataService, AdminSettings as SettingsType, OfficeLocation } from '../../../services/admin-data.service';

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

  // Office Location Modal State
  showLocationModal = signal(false);
  editingLocationId = signal<number | null>(null);

  locBranchName = signal('');
  locCity = signal('');
  locState = signal('');
  locAddress = signal('');
  locPhone = signal('');
  locEmail = signal('');
  locWhatsapp = signal('');
  locGoogleMapUrl = signal('');
  locOpeningTime = signal('09:30 AM');
  locClosingTime = signal('07:30 PM');
  locWorkingDays = signal('Monday - Saturday');
  locIsHeadOffice = signal(false);
  locDisplayOrder = signal(1);
  locStatus = signal<'ACTIVE' | 'INACTIVE'>('ACTIVE');

  get officeLocations(): OfficeLocation[] {
    return this.adminData.officeLocations();
  }

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

    this.adminData.loadOfficeLocationsFromBackend().subscribe();
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

  openAddLocationModal() {
    this.editingLocationId.set(null);
    this.locBranchName.set('');
    this.locCity.set('Bangalore');
    this.locState.set('Karnataka');
    this.locAddress.set('');
    this.locPhone.set('');
    this.locEmail.set('');
    this.locWhatsapp.set('');
    this.locGoogleMapUrl.set('');
    this.locOpeningTime.set('09:30 AM');
    this.locClosingTime.set('07:30 PM');
    this.locWorkingDays.set('Monday - Saturday');
    this.locIsHeadOffice.set(false);
    this.locDisplayOrder.set(this.officeLocations.length + 1);
    this.locStatus.set('ACTIVE');
    this.showLocationModal.set(true);
  }

  editLocation(loc: OfficeLocation) {
    if (!loc.locationId) return;
    this.editingLocationId.set(loc.locationId);
    this.locBranchName.set(loc.branchName || '');
    this.locCity.set(loc.city || '');
    this.locState.set(loc.state || '');
    this.locAddress.set(loc.address || '');
    this.locPhone.set(loc.phone || '');
    this.locEmail.set(loc.email || '');
    this.locWhatsapp.set(loc.whatsapp || '');
    this.locGoogleMapUrl.set(loc.googleMapUrl || '');
    this.locOpeningTime.set(loc.openingTime || '09:30 AM');
    this.locClosingTime.set(loc.closingTime || '07:30 PM');
    this.locWorkingDays.set(loc.workingDays || 'Monday - Saturday');
    this.locIsHeadOffice.set(!!loc.isHeadOffice);
    this.locDisplayOrder.set(loc.displayOrder || 1);
    this.locStatus.set(loc.status || 'ACTIVE');
    this.showLocationModal.set(true);
  }

  closeLocationModal() {
    this.showLocationModal.set(false);
  }

  saveLocation(e: Event) {
    e.preventDefault();
    const payload: OfficeLocation = {
      branchName: this.locBranchName().trim(),
      city: this.locCity().trim(),
      state: this.locState().trim(),
      address: this.locAddress().trim(),
      phone: this.locPhone().trim(),
      email: this.locEmail().trim(),
      whatsapp: this.locWhatsapp().trim(),
      googleMapUrl: this.locGoogleMapUrl().trim(),
      openingTime: this.locOpeningTime().trim(),
      closingTime: this.locClosingTime().trim(),
      workingDays: this.locWorkingDays().trim(),
      isHeadOffice: this.locIsHeadOffice(),
      displayOrder: Number(this.locDisplayOrder()) || 1,
      status: this.locStatus()
    };

    const editId = this.editingLocationId();
    if (editId) {
      this.adminData.updateOfficeLocation(editId, payload);
    } else {
      this.adminData.addOfficeLocation(payload);
    }
    this.closeLocationModal();
  }

  deleteLocation(id?: number) {
    if (!id) return;
    if (confirm('Are you sure you want to delete this office location?')) {
      this.adminData.deleteOfficeLocation(id);
    }
  }

  // Change Password Form State
  oldPassword = signal('');
  newPassword = signal('');
  confirmPassword = signal('');
  passwordSuccessMsg = signal('');
  passwordErrorMsg = signal('');
  isSubmittingPassword = signal(false);
  private passwordTimer: any;

  showPasswordSuccess(msg: string) {
    this.passwordErrorMsg.set('');
    this.passwordSuccessMsg.set(msg);
    if (this.passwordTimer) clearTimeout(this.passwordTimer);
    this.passwordTimer = setTimeout(() => {
      this.passwordSuccessMsg.set('');
    }, 3000);
  }

  showPasswordError(msg: string) {
    this.passwordSuccessMsg.set('');
    this.passwordErrorMsg.set(msg);
    if (this.passwordTimer) clearTimeout(this.passwordTimer);
    this.passwordTimer = setTimeout(() => {
      this.passwordErrorMsg.set('');
    }, 3000);
  }

  changePasswordForm(e: Event) {
    e.preventDefault();

    const oldPwd = this.oldPassword().trim();
    const newPwd = this.newPassword().trim();
    const confirmPwd = this.confirmPassword().trim();

    if (!oldPwd || !newPwd || !confirmPwd) {
      this.showPasswordError('Please fill all password fields.');
      return;
    }

    if (newPwd.length < 6) {
      this.showPasswordError('New password must be at least 6 characters long.');
      return;
    }

    if (newPwd !== confirmPwd) {
      this.showPasswordError('New password and confirm password do not match.');
      return;
    }

    this.isSubmittingPassword.set(true);
    this.adminData.changePassword(oldPwd, newPwd).subscribe(res => {
      this.isSubmittingPassword.set(false);
      if (res.success) {
        this.oldPassword.set('');
        this.newPassword.set('');
        this.confirmPassword.set('');
        this.showPasswordSuccess(res.message);
      } else {
        this.showPasswordError(res.message);
      }
    });
  }
}
