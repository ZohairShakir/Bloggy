import axios from 'axios';

// Initialize Global Loading Interceptors
export function initApiInterceptors() {
  axios.interceptors.request.use((config) => {
    // Only trigger if it's an API call to our backend
    if (config.url && (config.url.startsWith('/api') || config.url.startsWith(import.meta.env.VITE_API_URL || ''))) {
      window.dispatchEvent(new Event('bureau-loading:start'));
    }
    return config;
  }, (error) => {
    window.dispatchEvent(new Event('bureau-loading:stop'));
    return Promise.reject(error);
  });

  axios.interceptors.response.use((response) => {
    window.dispatchEvent(new Event('bureau-loading:stop'));
    return response;
  }, (error) => {
    window.dispatchEvent(new Event('bureau-loading:stop'));
    return Promise.reject(error);
  });
}
