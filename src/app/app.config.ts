import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginGuard } from './core/guards/login.guard';
import { authInterceptor } from './core/interceptors/auth.interceptor';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { CustomPreset } from './custom-preset';

export const appConfig: ApplicationConfig = {
  providers: [
    [
      AuthGuard,
      LoginGuard
    ],
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([ authInterceptor ]),
    ),

    // PrimeNG
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: CustomPreset
      },
      ripple: true
    })
  ]
};
