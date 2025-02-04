import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {CardModule} from "primeng/card";
import {SignalizedFeedViewPost} from "~/src/app/api/models/signalized-feed-view-post";
import {IsEmbedImagesViewPipe} from "~/src/app/shared/utils/pipes/type-guards/is-embed-images-view.pipe";
import {IsFeedDefsReasonRepostPipe} from "~/src/app/shared/utils/pipes/type-guards/is-feed-defs-reasonrepost";
import {DisplayNamePipe} from "~/src/app/shared/utils/pipes/display-name.pipe";
import {IsFeedDefsPostViewPipe} from "~/src/app/shared/utils/pipes/type-guards/is-feed-defs-postview";
import {NgIcon, provideIcons} from "@ng-icons/core";
import {
  tablerArrowForward,
  tablerDots,
  tablerHeart,
  tablerLink,
  tablerMessage, tablerPin,
  tablerRepeat
} from "@ng-icons/tabler-icons";
import {tablerHeartFill} from "@ng-icons/tabler-icons/fill";
import {agent} from "~/src/app/core/bsky.api";
import {LinkExtractorPipe} from "~/src/app/shared/utils/pipes/link-extractor.pipe";
import {DatePipe, NgTemplateOutlet} from "@angular/common";
import {NumberFormatterPipe} from "~/src/app/shared/utils/pipes/number-formatter.pipe";
import {DateFormatterPipe} from "~/src/app/shared/utils/pipes/date-formatter.pipe";
import {
  PostEmbedImagesComponent
} from "~/src/app/shared/components/embeds/post-embed-images/post-embed-images.component";
import {IsEmbedVideoViewPipe} from "~/src/app/shared/utils/pipes/type-guards/is-embed-video-view.pipe";
import {PostEmbedVideoComponent} from "~/src/app/shared/components/embeds/post-embed-video/post-embed-video.component";
import {IsEmbedRecordViewPipe} from "~/src/app/shared/utils/pipes/type-guards/is-embed-record-view.pipe";
import {
  IsEmbedRecordWithMediaViewPipe
} from "~/src/app/shared/utils/pipes/type-guards/is-embed-recordwithmedia-view.pipe";
import {
  PostEmbedRecordComponent
} from "~/src/app/shared/components/embeds/post-embed-record/post-embed-record.component";
import {IsEmbedExternalViewPipe} from "~/src/app/shared/utils/pipes/type-guards/is-embed-external-view.pipe";
import {
  PostEmbedExternalComponent
} from "~/src/app/shared/components/embeds/post-embed-external/post-embed-external.component";
import {Menu} from "primeng/menu";
import {MenuItem} from "primeng/api";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {ImagePostDialogComponent} from "~/src/app/shared/layout/dialogs/image-post-dialog/image-post-dialog.component";
import {IsFeedPostRecordPipe} from "~/src/app/shared/utils/pipes/type-guards/is-feed-post-record";
import {IsFeedDefsReasonPinPipe} from "~/src/app/shared/utils/pipes/type-guards/is-feed-defs-reasonpin";
import {IsFeedDefsNotFoundPostPipe} from "~/src/app/shared/utils/pipes/type-guards/is-feed-defs-notfoundpost";
import {IsFeedDefsBlockedPostPipe} from "~/src/app/shared/utils/pipes/type-guards/is-feed-defs-blockedpost";
import {RichTextDisplayComponent} from "~/src/app/shared/components/rich-text/rich-text-display/rich-text-display.component";
import {AppBskyFeedDefs} from "@atproto/api";
import {PostService} from "~/src/app/api/services/post.service";

@Component({
  selector: 'feed-view-post-card',
  imports: [
    CardModule,
    IsEmbedImagesViewPipe,
    IsFeedDefsReasonRepostPipe,
    DisplayNamePipe,
    IsFeedDefsPostViewPipe,
    NgIcon,
    LinkExtractorPipe,
    DatePipe,
    NumberFormatterPipe,
    DateFormatterPipe,
    PostEmbedImagesComponent,
    IsEmbedVideoViewPipe,
    PostEmbedVideoComponent,
    IsEmbedRecordViewPipe,
    IsEmbedRecordWithMediaViewPipe,
    PostEmbedRecordComponent,
    IsEmbedExternalViewPipe,
    PostEmbedExternalComponent,
    Menu,
    NgTemplateOutlet,
    IsFeedPostRecordPipe,
    IsFeedDefsReasonPinPipe,
    IsFeedDefsNotFoundPostPipe,
    IsFeedDefsBlockedPostPipe,
    RichTextDisplayComponent
  ],
  templateUrl: './feed-view-post-card.component.html',
  styleUrl: './feed-view-post-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideIcons({
      tablerMessage,
      tablerRepeat,
      tablerHeart,
      tablerHeartFill,
      tablerArrowForward,
      tablerDots,
      tablerLink,
      tablerPin
    }),
    LinkExtractorPipe,
    DialogService
  ]
})
export class FeedViewPostCardComponent {
  @Input() feedViewPost: SignalizedFeedViewPost;
  @Output() onPostClick: EventEmitter<SignalizedFeedViewPost> = new EventEmitter<SignalizedFeedViewPost>;
  ref: DynamicDialogRef;

  postMenuItems: MenuItem[] = [
    {
      label: 'Open in Bsky',
      command: () => {
        window.open(
          this.linkExtractorPipe.transform(
            this.feedViewPost.post().uri,
            this.feedViewPost.post().author.handle
          ), "_blank"
        );
      }
    },
    {
      label: 'Copy link',
      command: () => {
        navigator.clipboard.writeText(
          this.linkExtractorPipe.transform(
            this.feedViewPost.post().uri,
            this.feedViewPost.post().author.handle
          )
        );
      }
    }
  ];

  constructor(
    private postService: PostService,
    private linkExtractorPipe: LinkExtractorPipe,
    private dialogService: DialogService
  ) {}

  replyPost(post: AppBskyFeedDefs.PostView, event: MouseEvent) {
    this.postService.replyPost(post.uri)
    event.stopPropagation();
  }

  like(event: MouseEvent) {
    agent.like(this.feedViewPost.post().uri, this.feedViewPost.post().cid).then(
      response => {
        agent.getPosts({
          uris: [this.feedViewPost.post().uri]
        }).then(response => {
          this.feedViewPost.post.set(response.data.posts[0]);
        });
      }
    );
    event.stopPropagation();
  }

  deleteLike(event: MouseEvent) {
    agent.deleteLike(this.feedViewPost.post().viewer.like).then(
      response => {
        agent.getPosts({
          uris: [this.feedViewPost.post().uri]
        }).then(response => {
          this.feedViewPost.post.set(response.data.posts[0]);
        });
      }
    );
    event.stopPropagation();
  }

  repost(event: MouseEvent) {
    agent.repost(this.feedViewPost.post().uri, this.feedViewPost.post().cid).then(
      response => {
        agent.getPosts({
          uris: [this.feedViewPost.post().uri]
        }).then(response => {
          this.feedViewPost.post.set(response.data.posts[0]);
        });
      }
    );
    event.stopPropagation();
  }

  deleteRepost(event: MouseEvent) {
    agent.deleteRepost(this.feedViewPost.post().viewer.repost).then(
      response => {
        agent.getPosts({
          uris: [this.feedViewPost.post().uri]
        }).then(response => {
          this.feedViewPost.post.set(response.data.posts[0]);
        });
      }
    );
    event.stopPropagation();
  }

  log(event: any) {
    console.log("DEVELOPMENT LOG: ", event)
  }

  openPost(event: MouseEvent) {
    if (!window.getSelection().toString().length) {
      this.onPostClick.emit(this.feedViewPost);
    }
    event.stopPropagation();
  }

  openAuthor(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  openDialog(index: number) {
    this.ref = this.dialogService.open(ImagePostDialogComponent, {
      modal: true,
      dismissableMask: true,
      data: {
        post: this.feedViewPost.post()
      },
      focusOnShow: false
    });
  }
}
