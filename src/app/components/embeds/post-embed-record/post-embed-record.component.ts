import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {AppBskyEmbedRecord, AppBskyFeedDefs, AppBskyGraphDefs} from "@atproto/api";
import {NgOptimizedImage, NgTemplateOutlet} from "@angular/common";
import {IsEmbedRecordViewRecordPipe} from '@shared/pipes/type-guards/is-embed-record-viewrecord.pipe';
import {IsEmbedRecordWithMediaViewPipe} from '@shared/pipes/type-guards/is-embed-recordwithmedia-view.pipe';
import {IsEmbedRecordViewPipe} from '@shared/pipes/type-guards/is-embed-record-view.pipe';
import {IsFeedPostRecordPipe} from '@shared/pipes/type-guards/is-feed-post-record';
import {IsEmbedImagesViewPipe} from '@shared/pipes/type-guards/is-embed-images-view.pipe';
import {PostEmbedImagesComponent} from '@components/embeds/post-embed-images/post-embed-images.component';
import {IsEmbedVideoViewPipe} from '@shared/pipes/type-guards/is-embed-video-view.pipe';
import {PostEmbedVideoComponent} from '@components/embeds/post-embed-video/post-embed-video.component';
import {IsEmbedExternalViewPipe} from '@shared/pipes/type-guards/is-embed-external-view.pipe';
import {PostEmbedExternalComponent} from '@components/embeds/post-embed-external/post-embed-external.component';
import {IsEmbedRecordViewBlockedPipe} from '@shared/pipes/type-guards/is-embed-record-viewblocked.pipe';
import {IsEmbedRecordViewNotFoundPipe} from '@shared/pipes/type-guards/is-embed-record-viewnotfound.pipe';
import {IsEmbedRecordViewDetachedPipe} from '@shared/pipes/type-guards/is-embed-record-viewdetached.pipe';
import {DisplayNamePipe} from '@shared/pipes/display-name.pipe';
import {IsFeedDefsGeneratorViewPipe} from '@shared/pipes/type-guards/is-feed-defs-generator-view';
import {IsGraphDefsListViewPipe} from '@shared/pipes/type-guards/is-graph-defs-list-view';
import {IsLabelerDefsLabelerViewPipe} from '@shared/pipes/type-guards/is-labeler-defs-labeler-view';
import {IsGraphDefsStarterPackViewPipe} from '@shared/pipes/type-guards/is-graph-defs-starterpack-view';
import {LinkExtractorStarterPackPipe} from '@shared/pipes/link-extractor-starterpack.pipe';
import {LinkExtractorPipe} from '@shared/pipes/link-extractor.pipe';
import {RichTextComponent} from '@components/shared/rich-text/rich-text.component';
import {MskyDialogService} from '@services/msky-dialog.service';
import {Avatar} from 'primeng/avatar';

@Component({
  selector: 'post-embed-record',
  imports: [
    IsEmbedRecordViewRecordPipe,
    IsEmbedRecordWithMediaViewPipe,
    IsEmbedRecordViewPipe,
    IsFeedPostRecordPipe,
    NgTemplateOutlet,
    IsEmbedImagesViewPipe,
    PostEmbedImagesComponent,
    IsEmbedVideoViewPipe,
    PostEmbedVideoComponent,
    IsEmbedExternalViewPipe,
    PostEmbedExternalComponent,
    IsEmbedRecordViewBlockedPipe,
    IsEmbedRecordViewNotFoundPipe,
    IsEmbedRecordViewDetachedPipe,
    DisplayNamePipe,
    IsFeedDefsGeneratorViewPipe,
    IsGraphDefsListViewPipe,
    IsLabelerDefsLabelerViewPipe,
    LinkExtractorStarterPackPipe,
    LinkExtractorPipe,
    RichTextComponent,
    NgOptimizedImage,
    Avatar,
    IsGraphDefsStarterPackViewPipe
  ],
  templateUrl: './post-embed-record.component.html',
  styleUrl: './post-embed-record.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostEmbedRecordComponent {
  @Input() embed: AppBskyEmbedRecord.View;
  @Output() onEmbedClick: EventEmitter<AppBskyEmbedRecord.View> = new EventEmitter<AppBskyEmbedRecord.View>();

  protected readonly AppBskyGraphDefs = AppBskyGraphDefs;
  protected readonly AppBskyFeedDefs = AppBskyFeedDefs;

  constructor(
    protected dialogService: MskyDialogService
  ) {}

  openEmbed(event: MouseEvent) {
    if (!window.getSelection().toString().length) {
      this.onEmbedClick.emit(this.embed);
    }
    event.stopPropagation();
  }

  openAuthor(event: MouseEvent, did: string) {
    event.preventDefault();
    event.stopPropagation();

    this.dialogService.openAuthor(did);
  }

  openStarterPack(event: MouseEvent) {
    if (!window.getSelection().toString().length) {

    }
    event.preventDefault();
    event.stopPropagation();
  }

  openList(event: MouseEvent) {
    if (!window.getSelection().toString().length) {

    }
    event.preventDefault();
    event.stopPropagation();
  }

  openFeed(event: MouseEvent) {
    if (!window.getSelection().toString().length) {

    }
    event.preventDefault();
    event.stopPropagation();
  }
}
