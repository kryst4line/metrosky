import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {AppBskyEmbedRecord} from "@atproto/api";
import {IsEmbedRecordViewRecordPipe} from "~/src/app/shared/utils/pipes/type-guards/is-embed-record-viewrecord.pipe";
import {
  IsEmbedRecordWithMediaViewPipe
} from "~/src/app/shared/utils/pipes/type-guards/is-embed-recordwithmedia-view.pipe";
import {IsEmbedRecordViewPipe} from "~/src/app/shared/utils/pipes/type-guards/is-embed-record-view.pipe";
import {IsFeedPostRecordPipe} from "~/src/app/shared/utils/pipes/type-guards/is-feed-post-record";
import {NgTemplateOutlet} from "@angular/common";
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
    DisplayNamePipe
  ],
  templateUrl: './post-embed-record.component.html',
  styleUrl: './post-embed-record.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostEmbedRecordComponent {
  @Input() embed: AppBskyEmbedRecord.View;

  openPost(event: MouseEvent) {
    if (!window.getSelection().toString().length) {

    }
    event.stopPropagation();
  }

  openAuthor(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
  }
}
