import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {AppBskyEmbedRecord, AppBskyFeedDefs, AppBskyGraphDefs} from "@atproto/api";
import {IsEmbedRecordViewRecordPipe} from "~/src/app/shared/utils/pipes/type-guards/is-embed-record-viewrecord.pipe";
import {
  IsEmbedRecordWithMediaViewPipe
} from "~/src/app/shared/utils/pipes/type-guards/is-embed-recordwithmedia-view.pipe";
import {IsEmbedRecordViewPipe} from "~/src/app/shared/utils/pipes/type-guards/is-embed-record-view.pipe";
import {IsFeedPostRecordPipe} from "~/src/app/shared/utils/pipes/type-guards/is-feed-post-record";
import {NgOptimizedImage, NgTemplateOutlet} from "@angular/common";
import {IsEmbedImagesViewPipe} from "~/src/app/shared/utils/pipes/type-guards/is-embed-images-view.pipe";
import {
  PostEmbedImagesComponent
} from "~/src/app/shared/components/embeds/post-embed-images/post-embed-images.component";
import {IsEmbedVideoViewPipe} from "~/src/app/shared/utils/pipes/type-guards/is-embed-video-view.pipe";
import {PostEmbedVideoComponent} from "~/src/app/shared/components/embeds/post-embed-video/post-embed-video.component";
import {IsEmbedExternalViewPipe} from "~/src/app/shared/utils/pipes/type-guards/is-embed-external-view.pipe";
import {
  PostEmbedExternalComponent
} from "~/src/app/shared/components/embeds/post-embed-external/post-embed-external.component";
import {IsEmbedRecordViewBlockedPipe} from "~/src/app/shared/utils/pipes/type-guards/is-embed-record-viewblocked.pipe";
import {
  IsEmbedRecordViewNotFoundPipe
} from "~/src/app/shared/utils/pipes/type-guards/is-embed-record-viewnotfound.pipe";
import {
  IsEmbedRecordViewDetachedPipe
} from "~/src/app/shared/utils/pipes/type-guards/is-embed-record-viewdetached.pipe";
import {DisplayNamePipe} from "~/src/app/shared/utils/pipes/display-name.pipe";
import {IsFeedDefsGeneratorViewPipe} from "~/src/app/shared/utils/pipes/type-guards/is-feed-defs-generator-view";
import {IsGraphDefsListViewPipe} from "~/src/app/shared/utils/pipes/type-guards/is-graph-defs-list-view";
import {IsLabelerDefsLabelerViewPipe} from "~/src/app/shared/utils/pipes/type-guards/is-labeler-defs-labeler-view";
import {
  IsGraphDefsStarterPackViewBasicPipe
} from "~/src/app/shared/utils/pipes/type-guards/is-graph-defs-starterpack-viewbasic";
import {LinkExtractorStarterPackPipe} from "~/src/app/shared/utils/pipes/link-extractor-starterpack.pipe";
import {NgIcon} from "@ng-icons/core";
import {LinkExtractorPipe} from "~/src/app/shared/utils/pipes/link-extractor.pipe";
import {DialogService} from "primeng/dynamicdialog";
import {MskyDialogService} from "~/src/app/api/services/msky-dialog.service";
import {RichTextComponent} from "~/src/app/shared/components/utils/rich-text/rich-text.component";

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
    IsGraphDefsStarterPackViewBasicPipe,
    LinkExtractorStarterPackPipe,
    NgIcon,
    LinkExtractorPipe,
    RichTextComponent,
    NgOptimizedImage
  ],
  templateUrl: './post-embed-record.component.html',
  styleUrl: './post-embed-record.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DialogService
  ]
})
export class PostEmbedRecordComponent {
  @Input() embed: AppBskyEmbedRecord.View;
  @Output() onEmbedClick: EventEmitter<AppBskyEmbedRecord.View> = new EventEmitter<AppBskyEmbedRecord.View>();
  @Output() onImgClick: EventEmitter<{index: number, uri: string}> = new EventEmitter<{uri: string, index: number}>();

  protected readonly AppBskyGraphDefs = AppBskyGraphDefs;
  protected readonly AppBskyFeedDefs = AppBskyFeedDefs;

  constructor(
    private dialogService: MskyDialogService
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
