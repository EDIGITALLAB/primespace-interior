const isProduction =
  typeof window !== 'undefined' &&
  window.location.hostname !== 'localhost' &&
  window.location.hostname !== '127.0.0.1';

export const API_CONFIG = {
  baseUrl: isProduction
    ? 'https://primespaceinterior.com'
    : 'http://localhost:8084',

  apiUrl: isProduction
    ? 'https://primespaceinterior.com/api'
    : 'http://localhost:8084/api'
};

export const getApiBaseUrl = (): string => API_CONFIG.apiUrl;
export const API_BASE_URL = API_CONFIG.apiUrl;
