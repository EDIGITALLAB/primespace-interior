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

  email = signal('admin@primespace.com');
  password = signal('admin123');
  errorMessage = signal('');
  isLoading = signal(false);

  onSubmit(e: Event) {
    e.preventDefault();
    this.errorMessage.set('');
    this.isLoading.set(true);

    setTimeout(() => {
      const success = this.adminData.login(this.email(), this.password());
      this.isLoading.set(false);

      if (success) {
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.errorMessage.set('Invalid admin email or password. Please check your credentials.');
      }
    }, 400);
  }

  fillDemo() {
    this.email.set('admin@primespace.com');
    this.password.set('admin123');
  }
}
