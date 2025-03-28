import {booleanAttribute, ChangeDetectionStrategy, Component, forwardRef, input, output} from '@angular/core';
import {Card} from 'primeng/card';
import {Image} from 'primeng/image';
import {ButtonDirective} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {$Typed, AppBskyEmbedDefs, AppBskyEmbedRecord} from '@atproto/api';
import {Avatar} from 'primeng/avatar';
import {DisplayNamePipe} from '@shared/pipes/display-name.pipe';
import {IsFeedPostRecordPipe} from '@shared/pipes/type-guards/is-feed-post-record';
import {RichTextComponent} from '@components/shared/rich-text/rich-text.component';
import {NgTemplateOutlet} from '@angular/common';
import {MskyDialogService} from '@services/msky-dialog.service';
import {IsEmbedImagesViewPipe} from '@shared/pipes/type-guards/is-embed-images-view.pipe';
import {IsEmbedVideoViewPipe} from '@shared/pipes/type-guards/is-embed-video-view.pipe';
import {IsEmbedExternalViewPipe} from '@shared/pipes/type-guards/is-embed-external-view.pipe';
import {PostEmbedImagesComponent} from '@components/embeds/post-embed-images/post-embed-images.component';

@Component({
  selector: 'preview-card',
  imports: [
    Card,
    Image,
    ButtonDirective,
    Ripple,
    Avatar,
    DisplayNamePipe,
    IsFeedPostRecordPipe,
    forwardRef(() => RichTextComponent),
    NgTemplateOutlet,
    IsEmbedImagesViewPipe,
    IsEmbedVideoViewPipe,
    IsEmbedExternalViewPipe,
    PostEmbedImagesComponent
  ],
  templateUrl: './preview-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewCardComponent {
  record = input<AppBskyEmbedRecord.ViewRecord>();
  title = input<string>();
  subtitle = input<string>();
  image = input<string>();

  closable = input(false, {transform: booleanAttribute});
  onClose = output();

  constructor(
    private dialogService: MskyDialogService
  ) {}

  openAuthor(event: MouseEvent, did: string) {
    event.preventDefault();
    event.stopPropagation();

    this.dialogService.openAuthor(did);
  }

  log(event: any) {
    console.log("DEVELOPMENT LOG: ", event)
  }
}
