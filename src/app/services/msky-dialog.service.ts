import {Injectable, signal, WritableSignal} from '@angular/core';
import {DialogService} from "primeng/dynamicdialog";
import {ThreadDialogComponent} from '@components/dialogs/thread-dialog/thread-dialog.component';
import {AppBskyEmbedImages} from '@atproto/api';
import {AuthorDialogComponent} from '@components/dialogs/author-dialog/author-dialog.component';
import {PostComposerComponent} from '@components/dialogs/post-composer/post-composer.component';
import {SearchDialogComponent} from '@components/dialogs/search-dialog/search-dialog.component';
import {PostCompose} from '@models/post-compose';
import {GeneratorDialogComponent} from '@components/dialogs/generator-dialog/generator-dialog.component';

@Injectable({
  providedIn: 'root',

})
export class MskyDialogService {
  constructor(
    private dialogService: DialogService
  ) {}

  images = signal<{images: AppBskyEmbedImages.ViewImage[], index: number}>(undefined);

  openAuthor(did: string) {
    const ref = this.dialogService.open(AuthorDialogComponent, {
      data: {
        actor: did
      },
      appendTo: document.querySelector('dashboard'),
      maskStyleClass: '[--p-dialog-content-padding:0] [&_.p-dialog-header]:!hidden',
      contentStyle: {'--p-dialog-background': 'var(--p-primary-850)'},
      modal: true,
      dismissableMask: true,
      focusOnShow: false,
      duplicate: true
    });

    ref.onClose.subscribe(() => ref.destroy());
  }

  openFeed(uri: string, parentElement: HTMLElement) {
    const ref = this.dialogService.open(GeneratorDialogComponent, {
      data: {
        uri: uri,
      },
      appendTo: parentElement,
      maskStyleClass: '!absolute top-[100px] !max-w-full [--p-dialog-content-padding:0] [&_.p-dialog-header]:!hidden',
      style: {height: '100%', width: '100%', maxHeight: '100%'},
      autoZIndex: false,
      focusOnShow: false,
      duplicate: true
    });

    ref.onClose.subscribe(() => ref.destroy());
  }

  openImagePost(images: AppBskyEmbedImages.ViewImage[], index: number) {
    this.images.set({
      images: images,
      index: index
    });
  }

  openThread(uri: string, parentElement: HTMLElement) {
    const ref = this.dialogService.open(ThreadDialogComponent, {
      data: {
        uri: uri,
      },
      appendTo: parentElement,
      maskStyleClass: '!absolute top-[100px] !max-w-full [--p-dialog-content-padding:0] [&_.p-dialog-header]:!hidden has-[thread-dialog]:[&_.p-dialog]:!border-0',
      style: {height: '100%', width: '100%', maxHeight: '100%'},
      autoZIndex: false,
      focusOnShow: false,
      duplicate: true
    });

    ref.onClose.subscribe(() => ref.destroy());
  }

  openSearch(query?: string) {
    const ref = this.dialogService.open(SearchDialogComponent, {
      data: {
        query: query
      },
      appendTo: document.querySelector('dashboard'),
      height: '100%',
      width: '40rem',
      maskStyleClass: '[--p-dialog-content-padding:0] [&_.p-dialog-header]:!hidden',
      modal: true,
      dismissableMask: true,
      focusOnShow: true,
      duplicate: true
    });

    ref.onClose.subscribe(() => ref.destroy());
  }

  openPostComposer(postCompose: WritableSignal<PostCompose>) {
    const ref = this.dialogService.open(PostComposerComponent, {
      appendTo: document.querySelector('dashboard'),
      maskStyleClass: '[&_.p-dialog-header]:!hidden [&_.p-dialog-content]:!overflow-visible',
      style: {position: 'absolute', bottom: '0.5rem', left: '4.75rem', '--p-dialog-content-padding': 0},
      focusOnShow: true
    });

    ref.onClose.subscribe(() => {
      postCompose.set(undefined);
      ref.destroy();
    });
  }
}
