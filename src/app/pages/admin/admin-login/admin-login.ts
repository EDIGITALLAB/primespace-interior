import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminDataService } from '../../../services/admin-data.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.css'
})
export class AdminLogin {
  private adminData = inject(AdminDataService);
  private router = inject(Router);

  email = signal('');
  password = signal('');
  errorMessage = signal('');
  isLoading = signal(false);

  onSubmit(e: Event) {
    e.preventDefault();
    this.errorMessage.set('');
    this.isLoading.set(true);

    this.adminData.login(this.email(), this.password()).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.success) {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.errorMessage.set(res.message || 'Invalid admin email or password. Please check your credentials.');
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err?.error?.message || 'Authentication failed. Please verify backend connection.');
      }
    });
  }

  // Forgot Password Modal State
  showForgotPasswordModal = signal(false);
  forgotStep = signal<1 | 2 | 3>(1); // 1: Email OTP request, 2: Enter OTP & New Password, 3: Success
  forgotEmail = signal('');
  forgotOtp = signal('');
  forgotNewPassword = signal('');
  forgotConfirmPassword = signal('');

  forgotError = signal('');
  forgotSuccess = signal('');
  isForgotLoading = signal(false);

  openForgotPassword() {
    this.forgotEmail.set(this.email() || '');
    this.forgotOtp.set('');
    this.forgotNewPassword.set('');
    this.forgotConfirmPassword.set('');
    this.forgotError.set('');
    this.forgotSuccess.set('');
    this.forgotStep.set(1);
    this.showForgotPasswordModal.set(true);
  }

  closeForgotPassword() {
    this.showForgotPasswordModal.set(false);
  }

  requestOtp(e: Event) {
    e.preventDefault();
    const mail = this.forgotEmail().trim();
    if (!mail) {
      this.forgotError.set('Please enter your admin email address.');
      return;
    }

    this.forgotError.set('');
    this.isForgotLoading.set(true);

    this.adminData.forgotPassword(mail).subscribe(res => {
      this.isForgotLoading.set(false);
      if (res.success) {
        this.forgotSuccess.set(res.message);
        this.forgotStep.set(2);
      } else {
        this.forgotError.set(res.message);
      }
    });
  }

  submitResetPassword(e: Event) {
    e.preventDefault();
    const mail = this.forgotEmail().trim();
    const otpVal = this.forgotOtp().trim();
    const newPwd = this.forgotNewPassword().trim();
    const confirmPwd = this.forgotConfirmPassword().trim();

    if (!otpVal || !newPwd || !confirmPwd) {
      this.forgotError.set('Please fill all OTP and password fields.');
      return;
    }

    if (newPwd.length < 6) {
      this.forgotError.set('Password must be at least 6 characters long.');
      return;
    }

    if (newPwd !== confirmPwd) {
      this.forgotError.set('New password and confirm password do not match.');
      return;
    }

    this.forgotError.set('');
    this.isForgotLoading.set(true);

    this.adminData.resetPassword({
      email: mail,
      otp: otpVal,
      newPassword: newPwd,
      confirmPassword: confirmPwd
    }).subscribe(res => {
      this.isForgotLoading.set(false);
      if (res.success) {
        this.forgotStep.set(3);
      } else {
        this.forgotError.set(res.message);
      }
    });
  }
}
