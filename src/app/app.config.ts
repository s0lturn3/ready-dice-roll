import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginGuard } from './core/guards/login.guard';

export const appConfig: ApplicationConfig = {
  providers: [
    [
      AuthGuard,
      LoginGuard
    ],
    provideRouter(routes),
    provideHttpClient(),
  ]
};
