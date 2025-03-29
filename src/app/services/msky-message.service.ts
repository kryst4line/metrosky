import {Injectable} from '@angular/core';
import {ConfirmationService, MessageService as PrimeNgMessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class MskyMessageService {
  constructor(
    private messageService: PrimeNgMessageService,
    private confirmationService: ConfirmationService
  ) {}

  success(title: string, subtitle?: string) {
    this.messageService.add({
      severity: 'pi pi-success',
      summary: title,
      detail: subtitle
    });
  }

  warn(title: string, subtitle?: string) {
    this.messageService.add({
      severity: 'pi pi-warn',
      summary: title,
      detail: subtitle
    });
  }

  error(title: string, subtitle?: string) {
    this.messageService.add({
      icon: 'pi pi-error',
      severity: 'error',
      summary: title,
      detail: subtitle
    });
  }

  info(title: string, subtitle?: string) {
    this.messageService.add({
      severity: 'secondary',
      summary: title,
      detail: subtitle
    });
  }

  confirm(message: string, confirmLabel: string, cancelLabel?: string) {
    return new Promise<void>((resolve, reject) => {
      this.confirmationService.confirm({
        message: message,
        closable: false,
        closeOnEscape: true,
        acceptButtonStyleClass: '!text-sm !h-8',
        rejectButtonStyleClass: '!text-sm !h-8',
        rejectButtonProps: {
          label: cancelLabel ?? 'Cancel',
          severity: 'secondary',
          outlined: true,
        },
        acceptButtonProps: {
          label: confirmLabel
        },
        accept: () => {
          resolve();
        },
        reject: () => {
          reject();
        }
      });
    });
  }
}
