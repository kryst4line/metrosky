import {Component, Input} from '@angular/core';
import {CardModule} from "primeng/card";
import {SignalizedFeedViewPost} from "~/src/app/api/models/signalized-feed-view-post";
import {IsFeedPostRecordPipe} from "~/src/app/shared/utils/pipes/type-guards/is-feed-post-record";
import {IsEmbedImagesViewPipe} from "~/src/app/shared/utils/pipes/type-guards/is-embed-images-view.pipe";
import {IsFeedDefsReasonRepostPipe} from "~/src/app/shared/utils/pipes/type-guards/is-feed-defs-reasonrepost";

@Component({
    selector: 'feed-view-post-card',
  imports: [
    CardModule,
    IsEmbedImagesViewPipe,
    IsFeedPostRecordPipe,
    IsFeedDefsReasonRepostPipe,
  ],
    templateUrl: './feed-view-post-card.component.html',
    styleUrl: './feed-view-post-card.component.scss'
})
export class FeedViewPostCardComponent {
  @Input() feedViewPost: SignalizedFeedViewPost;
}

export function castTo<T>(): (event: any) => T {
  return (event) => event as T
}
