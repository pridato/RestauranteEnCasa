import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { añadirJwtInterceptor } from './core/interceptors/añadir-jwt.interceptor';
import { CommonModule } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withFetch(),
      withInterceptors([
        añadirJwtInterceptor
      ]),
    ),
    
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    provideToastr(), provideAnimationsAsync(),
  ]
};
