import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AdminDataService } from '../services/admin-data.service';

export const adminAuthGuard: CanActivateFn = () => {
  const adminService = inject(AdminDataService);
  const router = inject(Router);

  if (adminService.isAuthenticated()) {
    return true;
  }

  router.navigate(['/admin/login']);
  return false;
};
