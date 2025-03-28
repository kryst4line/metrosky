import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef, input,
  Input, output,
  Output, viewChild,
} from '@angular/core';
import {Menu} from "primeng/menu";
import {MenuItem} from "primeng/api";
import {DialogService} from "primeng/dynamicdialog";
import {AppBskyEmbedImages, AppBskyEmbedRecord, AppBskyFeedDefs} from "@atproto/api";
import {from} from "rxjs";
import {Ripple} from "primeng/ripple";
import {IsEmbedImagesViewPipe} from '@shared/pipes/type-guards/is-embed-images-view.pipe';
import {IsFeedDefsReasonRepostPipe} from '@shared/pipes/type-guards/is-feed-defs-reasonrepost';
import {DisplayNamePipe} from '@shared/pipes/display-name.pipe';
import {IsFeedDefsPostViewPipe} from '@shared/pipes/type-guards/is-feed-defs-postview';
import {LinkExtractorPipe} from '@shared/pipes/link-extractor.pipe';
import {DatePipe, NgOptimizedImage, NgTemplateOutlet} from '@angular/common';
import {NumberFormatterPipe} from '@shared/pipes/number-formatter.pipe';
import {DateFormatterPipe} from '@shared/pipes/date-formatter.pipe';
import {IsEmbedVideoViewPipe} from '@shared/pipes/type-guards/is-embed-video-view.pipe';
import {IsEmbedRecordViewPipe} from '@shared/pipes/type-guards/is-embed-record-view.pipe';
import {IsEmbedRecordWithMediaViewPipe} from '@shared/pipes/type-guards/is-embed-recordwithmedia-view.pipe';
import {IsEmbedExternalViewPipe} from '@shared/pipes/type-guards/is-embed-external-view.pipe';
import {IsFeedPostRecordPipe} from '@shared/pipes/type-guards/is-feed-post-record';
import {IsFeedDefsReasonPinPipe} from '@shared/pipes/type-guards/is-feed-defs-reasonpin';
import {IsFeedDefsNotFoundPostPipe} from '@shared/pipes/type-guards/is-feed-defs-notfoundpost';
import {IsFeedDefsBlockedPostPipe} from '@shared/pipes/type-guards/is-feed-defs-blockedpost';
import {PostEmbedImagesComponent} from '@components/embeds/post-embed-images/post-embed-images.component';
import {PostEmbedVideoComponent} from '@components/embeds/post-embed-video/post-embed-video.component';
import {PostEmbedRecordComponent} from '@components/embeds/post-embed-record/post-embed-record.component';
import {PostEmbedExternalComponent} from '@components/embeds/post-embed-external/post-embed-external.component';
import {RichTextComponent} from '@components/shared/rich-text/rich-text.component';
import {SignalizedFeedViewPost} from '@models/signalized-feed-view-post';
import {MskyMessageService} from '@services/msky-message.service';
import {MskyDialogService} from '@services/msky-dialog.service';
import {PostService} from '@services/post.service';
import {agent} from '@core/bsky.api';
import {Avatar} from 'primeng/avatar';

@Component({
  selector: 'feed-post-card',
  imports: [
    IsEmbedImagesViewPipe,
    IsFeedDefsReasonRepostPipe,
    DisplayNamePipe,
    IsFeedDefsPostViewPipe,
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
    forwardRef(() => RichTextComponent),
    Ripple,
    Avatar
  ],
  templateUrl: './feed-post-card.component.html',
  styleUrl: './feed-post-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    LinkExtractorPipe,
    DialogService
  ]
})
export class FeedPostCardComponent {
  feedViewPost = input<SignalizedFeedViewPost>();
  parent = input(false, {transform: booleanAttribute});
  onPostClick = output<SignalizedFeedViewPost>();
  onEmbedClick = output<AppBskyEmbedRecord.View>();

  processingAction: boolean = false;

  moreMenuItems: MenuItem[] = [
    {
      label: 'Open in Bsky',
      command: () => {
        window.open(
          this.linkExtractorPipe.transform(
            this.feedViewPost().post().uri,
            this.feedViewPost().post().author.handle
          ), "_blank"
        );
      }
    },
    {
      label: 'Copy link',
      command: () => {
        navigator.clipboard.writeText(
          this.linkExtractorPipe.transform(
            this.feedViewPost().post().uri,
            this.feedViewPost().post().author.handle
          )
        );
      }
    }
  ];
  repostMenuItems: MenuItem[];

  constructor(
    protected postService: PostService,
    private linkExtractorPipe: LinkExtractorPipe,
    private messageService: MskyMessageService,
    private dialogService: MskyDialogService
  ) {}

  replyPost(event: MouseEvent) {
    this.postService.replyPost(this.feedViewPost().post().uri);
    event.stopPropagation();
  }

  like(event: MouseEvent) {
    event.stopPropagation();

    // Update UI
    this.feedViewPost().post.update(post => {
      post.viewer.like = 'placeholder';
      return post;
    });

    // API call (delayed to not step over placeholder change)
    this.processingAction = true;
    from(agent.like(this.feedViewPost().post().uri, this.feedViewPost().post().cid)).subscribe({
      next: () => {
        setTimeout(() => {
          from(agent.getPosts({
            uris: [this.feedViewPost().post().uri]
          })).subscribe({
            next: response => this.feedViewPost().post.set(response.data.posts[0]),
            error: err => this.messageService.error(err.message, 'Oops!')
          });
        }, 100);
      },
      error: err => {
        this.messageService.error(err.message, 'Oops!');
        this.feedViewPost().post.update(post => {
          post.viewer.like = undefined;
          return post;
        });
      }
    }).add(() => this.processingAction = false);
  }

  deleteLike(event: MouseEvent) {
    event.stopPropagation();

    // Update UI
    const likeRef = this.feedViewPost().post().viewer.like;
    this.feedViewPost().post.update(post => {
      post.viewer.like = undefined;
      return post;
    });

    // API call (delayed to not step over placeholder change)
    this.processingAction = true;
    from(agent.deleteLike(likeRef)).subscribe({
      next: () => {
        setTimeout(() => {
          from(agent.getPosts({
            uris: [this.feedViewPost().post().uri]
          })).subscribe({
            next: response => this.feedViewPost().post.set(response.data.posts[0]),
            error: err => this.messageService.error(err.message, 'Oops!')
          });
        }, 200);
      },
      error: err => {
        this.messageService.error(err.message, 'Oops!');
        this.feedViewPost().post.update(post => {
          post.viewer.like = likeRef;
          return post;
        });
      }
    }).add(() => this.processingAction = false);
  }

  repost() {
    // Update UI
    this.feedViewPost().post.update(post => {
      post.viewer.repost = 'placeholder';
      return post;
    });

    // API call (delayed to not step over placeholder change)
    this.processingAction = true;
    from(agent.repost(this.feedViewPost().post().uri, this.feedViewPost().post().cid)).subscribe({
      next: () => {
        setTimeout(() => {
          from(agent.getPosts({
            uris: [this.feedViewPost().post().uri]
          })).subscribe({
            next: response => this.feedViewPost().post.set(response.data.posts[0]),
            error: err => this.messageService.error(err.message, 'Oops!')
          });
        }, 100);
      },
      error: err => {
        this.messageService.error(err.message, 'Oops!');
        this.feedViewPost().post.update(post => {
          post.viewer.repost = undefined;
          return post;
        });
      }
    }).add(() => this.processingAction = false);
  }

  deleteRepost() {
    // Update UI
    const rtRef = this.feedViewPost().post().viewer.repost.toString();
    this.feedViewPost().post.update(post => {
      post.viewer.repost = undefined;
      return post;
    });

    // API call (delayed to not step over placeholder change)
    this.processingAction = true;
    from(agent.deleteRepost(rtRef)).subscribe({
      next: () => {
        setTimeout(() => {
          from(agent.getPosts({
            uris: [this.feedViewPost().post().uri]
          })).subscribe({
            next: response => this.feedViewPost().post.set(response.data.posts[0]),
            error: err => this.messageService.error(err.message, 'Oops!')
          });
        }, 200);
      },
      error: err => {
        this.messageService.error(err.message, 'Oops!');
        this.feedViewPost().post.update(post => {
          post.viewer.repost = rtRef;
          return post;
        });
      }
    }).add(() => this.processingAction = false);
  }

  redoRepost() {
    this.processingAction = true;
    from(agent.deleteRepost(this.feedViewPost().post().viewer.repost)).subscribe({
      next: () => this.repost(),
      error: err => this.messageService.error(err.message, 'Oops!')
    }).add(() => this.processingAction = false);
  }

  log(event: any) {
    console.log("DEVELOPMENT LOG: ", event)
  }

  openPost(event: MouseEvent) {
    if (!window.getSelection().toString().length) {
      this.onPostClick.emit(this.feedViewPost());
    }
    event.stopPropagation();
  }

  openImage(media: AppBskyEmbedImages.ViewImage[], index: number) {
    this.dialogService.openImagePost(media, index);
  }

  openAuthor(event: MouseEvent, did: string) {
    event.preventDefault();
    event.stopPropagation();

    this.dialogService.openAuthor(did);
  }

  openRepostMenu(menu: Menu, event: MouseEvent) {
    this.repostMenuItems = [
      {
        label: !this.feedViewPost().post().viewer.repost ? 'Repost' : 'Undo repost',
        command: () => {
          !this.feedViewPost().post().viewer.repost ? this.repost() : this.deleteRepost()
        },
        disabled: this.processingAction
      },
      {
        label: 'Redo repost',
        command: () => {
          this.redoRepost()
        },
        visible: !!this.feedViewPost().post().viewer.repost,
        disabled: this.processingAction
      },
      {
        label: 'Quote post',
        command: () => {
          this.postService.quotePost(this.feedViewPost().post().uri);
        }
      }
    ];
    menu.toggle(event);
    event.stopPropagation();
  }
}
