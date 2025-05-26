import { provideRouter } from '@angular/router';
import { routes } from './app.routes'; // Change import to use 'routes' instead of 'appRoutes'
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig : ApplicationConfig = {
  providers: [
    
    provideRouter(routes), // Update to use 'routes' instead of 'appRoutes'
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([authInterceptor])),
  ]
};
