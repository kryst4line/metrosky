import {ApplicationConfig, Provider, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import Nora from '@primeng/themes/nora'

import { routes } from './app.routes';
import {providePrimeNG} from "primeng/config";
import {provideHttpClient} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {DialogService} from "primeng/dynamicdialog";
import {provideIcons} from "@ng-icons/core";
import {
  tablerAlertTriangle,
  tablerArrowForward, tablerChevronLeft,
  tablerCircleSquare, tablerCircleX,
  tablerDots,
  tablerHash,
  tablerHeart,
  tablerInfoCircle,
  tablerLink,
  tablerList, tablerLoader2,
  tablerMessage, tablerPaperclip,
  tablerPin,
  tablerRepeat,
  tablerSearch,
  tablerSettings, tablerUser,
  tablerUserPlus,
  tablerX
} from "@ng-icons/tabler-icons";
import {tablerHeartFill} from "@ng-icons/tabler-icons/fill";

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
    provideHttpClient(),
    MessageService,
    DialogService
  ]
};

export const iconsProvider: Provider = provideIcons({
  tablerX,
  tablerInfoCircle,
  tablerAlertTriangle,
  tablerArrowForward,
  tablerDots,
  tablerHeart,
  tablerHeartFill,
  tablerLink,
  tablerMessage,
  tablerPin,
  tablerRepeat,
  tablerUserPlus,
  tablerCircleSquare,
  tablerSettings,
  tablerList,
  tablerHash,
  tablerSearch,
  tablerLoader2,
  tablerUser,
  tablerCircleX,
  tablerPaperclip,
  tablerChevronLeft
});
