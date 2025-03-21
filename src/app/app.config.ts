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
  tablerArrowForward, tablerBell, tablerCheck, tablerChevronLeft, tablerChevronRight,
  tablerCircleSquare, tablerCircleX, tablerColumnInsertRight, tablerDeviceFloppy,
  tablerDots, tablerGridDots,
  tablerHash,
  tablerHeart, tablerHome,
  tablerInfoCircle,
  tablerLink,
  tablerList, tablerLoader2, tablerMenu2,
  tablerMessage, tablerPaperclip, tablerPhoto,
  tablerPin,
  tablerRepeat,
  tablerSearch,
  tablerSettings, tablerTrash, tablerUser,
  tablerUserPlus,
  tablerX
} from "@ng-icons/tabler-icons";
import {tablerHeartFill} from "@ng-icons/tabler-icons/fill";
import {PRECONNECT_CHECK_BLOCKLIST} from "@angular/common";

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
    DialogService,
    {provide: PRECONNECT_CHECK_BLOCKLIST, useValue: 'https://cdn.bsky.app'}
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
  tablerChevronLeft,
  tablerChevronRight,
  tablerCheck,
  tablerPhoto,
  tablerGridDots,
  tablerMenu2,
  tablerColumnInsertRight,
  tablerDeviceFloppy,
  tablerHome,
  tablerBell,
  tablerTrash
});
