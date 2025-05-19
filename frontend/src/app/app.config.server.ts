import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';

export const config: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch())
  ]
};
// This module configures the Angular application by providing the router and HTTP client services. It uses the routes defined in app.routes.ts to set up the routing for the application.
