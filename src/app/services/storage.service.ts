import {inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly platformId = inject(PLATFORM_ID);

  set(id: string, item: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(id, item);
    }
  }

  get(id: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(id);
    } else {
      return null;
    }
  }

  remove(id: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(id);
    }
  }
}
