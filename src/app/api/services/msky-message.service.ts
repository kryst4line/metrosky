import { Injectable } from '@angular/core';
import {MessageService as PrimeNgMessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class MskyMessageService {
  constructor(
    private messageService: PrimeNgMessageService
  ) {}

  success(message: string, title?: string) {
    this.messageService.add({
      severity: 'success',
      summary: title,
      detail: message
    });
  }

  successIcon(message: string, title?: string) {
    this.messageService.add({
      icon: 'success',
      severity: 'success',
      summary: title,
      detail: message
    });
  }

  warn(message: string, title?: string) {
    this.messageService.add({
      severity: 'warn',
      summary: title,
      detail: message
    });
  }

  warnIcon(message: string, title?: string) {
    this.messageService.add({
      icon: 'warn',
      severity: 'warn',
      summary: title,
      detail: message
    });
  }

  error(message: string, title?: string) {
    this.messageService.add({
      icon: 'error',
      severity: 'error',
      summary: title,
      detail: message
    });
  }
}
