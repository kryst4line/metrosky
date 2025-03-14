import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output, viewChild,
} from '@angular/core';
import {SignalizedFeedViewPost} from "~/src/app/api/models/signalized-feed-view-post";
import {IsEmbedImagesViewPipe} from "~/src/app/shared/utils/pipes/type-guards/is-embed-images-view.pipe";
import {IsFeedDefsReasonRepostPipe} from "~/src/app/shared/utils/pipes/type-guards/is-feed-defs-reasonrepost";
import {DisplayNamePipe} from "~/src/app/shared/utils/pipes/display-name.pipe";
import {IsFeedDefsPostViewPipe} from "~/src/app/shared/utils/pipes/type-guards/is-feed-defs-postview";
import {NgIcon} from "@ng-icons/core";
import {agent} from "~/src/app/core/bsky.api";
import {LinkExtractorPipe} from "~/src/app/shared/utils/pipes/link-extractor.pipe";
import {DatePipe, NgOptimizedImage, NgTemplateOutlet} from "@angular/common";
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
import {DialogService} from "primeng/dynamicdialog";
import {IsFeedPostRecordPipe} from "~/src/app/shared/utils/pipes/type-guards/is-feed-post-record";
import {IsFeedDefsReasonPinPipe} from "~/src/app/shared/utils/pipes/type-guards/is-feed-defs-reasonpin";
import {IsFeedDefsNotFoundPostPipe} from "~/src/app/shared/utils/pipes/type-guards/is-feed-defs-notfoundpost";
import {IsFeedDefsBlockedPostPipe} from "~/src/app/shared/utils/pipes/type-guards/is-feed-defs-blockedpost";
import {RichTextComponent} from "~/src/app/shared/components/utils/rich-text/rich-text.component";
import {AppBskyEmbedRecord, AppBskyFeedDefs} from "@atproto/api";
import {PostService} from "~/src/app/api/services/post.service";
import {MskyMessageService} from "~/src/app/api/services/msky-message.service";
import {from} from "rxjs";
import {MskyDialogService} from "~/src/app/api/services/msky-dialog.service";
import {Ripple} from "primeng/ripple";

@Component({
  selector: 'feed-post-card',
  imports: [
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
    forwardRef(() => RichTextComponent),
    NgOptimizedImage,
    Ripple
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
  @Input() feedViewPost: SignalizedFeedViewPost;
  @Output() onPostClick: EventEmitter<SignalizedFeedViewPost> = new EventEmitter<SignalizedFeedViewPost>();
  @Output() onEmbedClick: EventEmitter<AppBskyEmbedRecord.View> = new EventEmitter<AppBskyEmbedRecord.View>();

  likeAnimation = viewChild('likeAnim', {read: ElementRef});
  repostAnimation = viewChild('rtAnim', {read: ElementRef});
  processingAction: boolean = false;

  moreMenuItems: MenuItem[] = [
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
  repostMenuItems: MenuItem[];

  constructor(
    private postService: PostService,
    private linkExtractorPipe: LinkExtractorPipe,
    private messageService: MskyMessageService,
    private dialogService: MskyDialogService
  ) {}

  replyPost(post: AppBskyFeedDefs.PostView, event: MouseEvent) {
    this.postService.replyPost(post.uri)
    event.stopPropagation();
  }

  like(event: MouseEvent) {
    event.stopPropagation();

    // Update UI
    this.feedViewPost.post.update(post => {
      post.viewer.like = 'placeholder';
      return post;
    });

    // Show animation
    this.likeAnimation().nativeElement.classList.add('animate-pingonce')
    setTimeout(() => this.likeAnimation().nativeElement.classList.remove('animate-pingonce'), 1000);

    // API call (delayed to not step over placeholder change)
    this.processingAction = true;
    from(agent.like(this.feedViewPost.post().uri, this.feedViewPost.post().cid)).subscribe({
      next: () => {
        setTimeout(() => {
          from(agent.getPosts({
            uris: [this.feedViewPost.post().uri]
          })).subscribe({
            next: response => this.feedViewPost.post.set(response.data.posts[0]),
            error: err => this.messageService.error(err.message, 'Oops!')
          });
        }, 100);
      },
      error: err => {
        this.messageService.error(err.message, 'Oops!');
        this.feedViewPost.post.update(post => {
          post.viewer.like = undefined;
          return post;
        });
      }
    }).add(() => this.processingAction = false);
  }

  deleteLike(event: MouseEvent) {
    event.stopPropagation();

    // Update UI
    const likeRef = this.feedViewPost.post().viewer.like;
    this.feedViewPost.post.update(post => {
      post.viewer.like = undefined;
      return post;
    });

    // API call (delayed to not step over placeholder change)
    this.processingAction = true;
    from(agent.deleteLike(likeRef)).subscribe({
      next: () => {
        setTimeout(() => {
          from(agent.getPosts({
            uris: [this.feedViewPost.post().uri]
          })).subscribe({
            next: response => this.feedViewPost.post.set(response.data.posts[0]),
            error: err => this.messageService.error(err.message, 'Oops!')
          });
        }, 200);
      },
      error: err => {
        this.messageService.error(err.message, 'Oops!');
        this.feedViewPost.post.update(post => {
          post.viewer.like = likeRef;
          return post;
        });
      }
    }).add(() => this.processingAction = false);
  }

  repost() {
    // Update UI
    this.feedViewPost.post.update(post => {
      post.viewer.repost = 'placeholder';
      return post;
    });

    // Show animation
    this.repostAnimation().nativeElement.classList.add('animate-pingonce')
    setTimeout(() => this.repostAnimation().nativeElement.classList.remove('animate-pingonce'), 1000);

    // API call (delayed to not step over placeholder change)
    this.processingAction = true;
    from(agent.repost(this.feedViewPost.post().uri, this.feedViewPost.post().cid)).subscribe({
      next: () => {
        setTimeout(() => {
          from(agent.getPosts({
            uris: [this.feedViewPost.post().uri]
          })).subscribe({
            next: response => this.feedViewPost.post.set(response.data.posts[0]),
            error: err => this.messageService.error(err.message, 'Oops!')
          });
        }, 100);
      },
      error: err => {
        this.messageService.error(err.message, 'Oops!');
        this.feedViewPost.post.update(post => {
          post.viewer.repost = undefined;
          return post;
        });
      }
    }).add(() => this.processingAction = false);
  }

  deleteRepost() {
    // Update UI
    const rtRef = this.feedViewPost.post().viewer.repost.toString();
    this.feedViewPost.post.update(post => {
      post.viewer.repost = undefined;
      return post;
    });

    // API call (delayed to not step over placeholder change)
    this.processingAction = true;
    from(agent.deleteRepost(rtRef)).subscribe({
      next: () => {
        setTimeout(() => {
          from(agent.getPosts({
            uris: [this.feedViewPost.post().uri]
          })).subscribe({
            next: response => this.feedViewPost.post.set(response.data.posts[0]),
            error: err => this.messageService.error(err.message, 'Oops!')
          });
        }, 200);
      },
      error: err => {
        this.messageService.error(err.message, 'Oops!');
        this.feedViewPost.post.update(post => {
          post.viewer.repost = rtRef;
          return post;
        });
      }
    }).add(() => this.processingAction = false);
  }

  redoRepost() {
    this.processingAction = true;
    from(agent.deleteRepost(this.feedViewPost.post().viewer.repost)).subscribe({
      next: () => this.repost(),
      error: err => this.messageService.error(err.message, 'Oops!')
    }).add(() => this.processingAction = false);
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

  openImage(uri: string, index: number) {
    this.dialogService.openImagePost(uri, index);
  }

  openAuthor(event: MouseEvent, did: string) {
    event.preventDefault();
    event.stopPropagation();

    this.dialogService.openAuthor(did);
  }

  openRepostMenu(menu: Menu, event: MouseEvent) {
    this.repostMenuItems = [
      {
        label: !this.feedViewPost.post().viewer.repost ? 'Repost' : 'Undo repost',
        command: () => {
          !this.feedViewPost.post().viewer.repost ? this.repost() : this.deleteRepost()
        },
        disabled: this.processingAction
      },
      {
        label: 'Redo repost',
        command: () => {
          this.redoRepost()
        },
        visible: !!this.feedViewPost.post().viewer.repost,
        disabled: this.processingAction
      },
      {
        label: 'Quote post',
        command: () => {
          this.postService.quotePost(this.feedViewPost.post().uri);
        }
      }
    ];
    menu.toggle(event);
    event.stopPropagation();
  }
}
