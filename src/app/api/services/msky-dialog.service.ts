import { Injectable } from '@angular/core';
import {
  AuthorViewDialogComponent
} from "~/src/app/shared/layout/dialogs/author-view-dialog/author-view-dialog.component";
import {DialogService} from "primeng/dynamicdialog";
import {ImageViewDialogComponent} from "~/src/app/shared/layout/dialogs/image-view-dialog/image-view-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class MskyDialogService {
  constructor(
    private dialogService: DialogService
  ) {}

  openAuthor(did: string) {
    const ref = this.dialogService.open(AuthorViewDialogComponent, {
      data: {
        actor: did
      },
      appendTo: document.querySelector('app-deck > div > div'),
      maskStyleClass: 'full-dialog',
      modal: true,
      dismissableMask: true,
      autoZIndex: false,
      style: {height: '100%'},
      focusOnShow: false,
      duplicate: true
    });

    ref.onClose.subscribe(() => ref.destroy());
  }

  openImagePost(uri: string, index: number) {
    const ref = this.dialogService.open(ImageViewDialogComponent, {
      data: {
        uri: uri,
        index: index
      },
      appendTo: document.querySelector('app-deck > div > div'),
      maskStyleClass: 'full-dialog',
      modal: true,
      dismissableMask: true,
      autoZIndex: false,
      style: {height: '100%'},
      focusOnShow: false,
      duplicate: true,
      closeOnEscape: true,
    });

    ref.onClose.subscribe(() => ref.destroy());
  }
}
