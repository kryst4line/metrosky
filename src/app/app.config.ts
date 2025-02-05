import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import Nora from '@primeng/themes/nora'

import { routes } from './app.routes';
import {providePrimeNG} from "primeng/config";
import {MessageService} from "primeng/api";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Nora
      },
      ripple: true
    }),
    MessageService
  ]
};
