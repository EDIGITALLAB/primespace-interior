import { Injectable, inject } from '@angular/core';
import { FORMSPREE_CONFIG } from '../config/formspree.config';
import { AdminDataService } from './admin-data.service';
import { getApiBaseUrl } from '../config/api.config';

export interface LeadFormPayload {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  message: string;
  source: string;
}

export interface SubmissionResult {
  dbSuccess: boolean;
  formspreeSuccess: boolean;
  errorMessage?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FormspreeService {
  private adminData = inject(AdminDataService);
  private get backendUrl(): string {
    return `${getApiBaseUrl()}/consultations`;
  }

  async submitLeadForm(payload: LeadFormPayload): Promise<SubmissionResult> {
    // 1. Prepare Database payload and submission
    const dbPromise = fetch(this.backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    // 2. Prepare Formspree email submission if Form ID is set
    const adminId = this.adminData.settings()?.formspreeFormId;
    const activeFormId = (adminId && adminId.trim().length > 0) ? adminId.trim() : FORMSPREE_CONFIG.formId;
    let formspreePromise: Promise<Response> | null = null;

    if (FORMSPREE_CONFIG.enabled && activeFormId) {
      const endpoint = this.getFormspreeEndpoint(activeFormId);
      formspreePromise = fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: payload.fullName,
          email: payload.email,
          phone: payload.phone,
          location: payload.location,
          message: payload.message,
          source: payload.source,
          _subject: `New Interior Inquiry from ${payload.fullName} (${payload.location})`
        })
      });
    }

    let dbSuccess = false;
    let formspreeSuccess = false;
    let errorMessage: string | undefined;

    // Execute Database request
    try {
      const dbResponse = await dbPromise;
      if (dbResponse.ok) {
        dbSuccess = true;
      } else {
        const errJson = await dbResponse.json().catch(() => null);
        errorMessage = errJson?.message || errJson?.error || 'Database submission failed.';
      }
    } catch (e) {
      console.warn('Backend database connection error:', e);
      errorMessage = 'Network connection error. Unable to reach backend server.';
    }

    // Execute Formspree request
    if (formspreePromise) {
      try {
        const fsResponse = await formspreePromise;
        if (fsResponse.ok) {
          formspreeSuccess = true;
          console.log('Successfully dispatched lead email to Formspree!');
        } else {
          console.warn('Formspree returned status:', fsResponse.status);
        }
      } catch (e) {
        console.warn('Formspree network submission error:', e);
      }
    }

    return {
      dbSuccess,
      formspreeSuccess,
      errorMessage: (dbSuccess || formspreeSuccess) ? undefined : errorMessage
    };
  }

  getFormspreeEndpoint(formId: string): string {
    if (!formId) return '';
    const cleanId = formId.trim();
    if (cleanId.startsWith('http://') || cleanId.startsWith('https://')) {
      return cleanId;
    }
    return `https://formspree.io/f/${cleanId}`;
  }
}
