import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  viewChild,
} from '@angular/core';
import {DatePipe, NgTemplateOutlet} from "@angular/common";
import {Menu} from "primeng/menu";
import {MenuItem} from "primeng/api";
import {AppBskyEmbedImages, AppBskyEmbedRecord, AppBskyFeedDefs} from "@atproto/api";
import {from} from "rxjs";
import {IsEmbedImagesViewPipe} from '@shared/pipes/type-guards/is-embed-images-view.pipe';
import {LinkExtractorPipe} from '@shared/pipes/link-extractor.pipe';
import {NumberFormatterPipe} from '@shared/pipes/number-formatter.pipe';
import {PostEmbedImagesComponent} from '@components/embeds/post-embed-images/post-embed-images.component';
import {IsEmbedVideoViewPipe} from '@shared/pipes/type-guards/is-embed-video-view.pipe';
import {PostEmbedVideoComponent} from '@components/embeds/post-embed-video/post-embed-video.component';
import {IsEmbedRecordViewPipe} from '@shared/pipes/type-guards/is-embed-record-view.pipe';
import {IsEmbedRecordWithMediaViewPipe} from '@shared/pipes/type-guards/is-embed-recordwithmedia-view.pipe';
import {PostEmbedRecordComponent} from '@components/embeds/post-embed-record/post-embed-record.component';
import {IsEmbedExternalViewPipe} from '@shared/pipes/type-guards/is-embed-external-view.pipe';
import {PostEmbedExternalComponent} from '@components/embeds/post-embed-external/post-embed-external.component';
import {IsFeedPostRecordPipe} from '@shared/pipes/type-guards/is-feed-post-record';
import {RichTextComponent} from '@components/shared/rich-text/rich-text.component';
import {SignalizedFeedViewPost} from '@models/signalized-feed-view-post';
import {MskyMessageService} from '@services/msky-message.service';
import {MskyDialogService} from '@services/msky-dialog.service';
import {PostService} from '@services/post.service';
import {agent} from '@core/bsky.api';
import {Avatar} from 'primeng/avatar';
import {Divider} from 'primeng/divider';
import {Ripple} from 'primeng/ripple';

@Component({
  selector: 'feed-post-card-detail',
  imports: [
    IsEmbedImagesViewPipe,
    LinkExtractorPipe,
    DatePipe,
    NumberFormatterPipe,
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
    forwardRef(() => RichTextComponent),
    Avatar,
    Divider,
    Ripple
  ],
  templateUrl: './feed-post-card-detail.component.html',
  styleUrl: './feed-post-card-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    LinkExtractorPipe,
    DatePipe
  ]
})
export class FeedPostCardDetailComponent {
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

  repostMenuItems: MenuItem[]

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
    const rtRef = this.feedViewPost.post().viewer.repost;
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

  openAuthor(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.dialogService.openAuthor(this.feedViewPost.post().author.did);
  }

  openImage(media: AppBskyEmbedImages.ViewImage[], index: number) {
    this.dialogService.openImagePost(media, index);
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
