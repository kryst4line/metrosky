import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import {SignalizedFeedViewPost} from "~/src/app/api/models/signalized-feed-view-post";
import {IsEmbedImagesViewPipe} from "~/src/app/shared/utils/pipes/type-guards/is-embed-images-view.pipe";
import {DisplayNamePipe} from "~/src/app/shared/utils/pipes/display-name.pipe";
import {NgIcon} from "@ng-icons/core";
import {agent} from "~/src/app/core/bsky.api";
import {LinkExtractorPipe} from "~/src/app/shared/utils/pipes/link-extractor.pipe";
import {DatePipe, NgTemplateOutlet} from "@angular/common";
import {NumberFormatterPipe} from "~/src/app/shared/utils/pipes/number-formatter.pipe";
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
import {RichTextDisplayComponent} from "~/src/app/shared/components/rich-text/rich-text-display/rich-text-display.component";
import {AppBskyEmbedRecord, AppBskyFeedDefs} from "@atproto/api";
import {PostService} from "~/src/app/api/services/post.service";
import {MessageService} from '~/src/app/api/services/message.service'
import {
  AuthorViewDialogComponent
} from "~/src/app/shared/layout/dialogs/author-view-dialog/author-view-dialog.component";
import {from} from "rxjs";

@Component({
  selector: 'feed-post-card-detail',
  imports: [
    IsEmbedImagesViewPipe,
    DisplayNamePipe,
    NgIcon,
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
    forwardRef(() => RichTextDisplayComponent)
  ],
  templateUrl: './feed-post-card-detail.component.html',
  styleUrl: './feed-post-card-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    LinkExtractorPipe,
    DialogService,
    DatePipe
  ]
})
export class FeedPostCardDetailComponent {
  @Input() feedViewPost: SignalizedFeedViewPost;
  @Output() onPostClick: EventEmitter<SignalizedFeedViewPost> = new EventEmitter<SignalizedFeedViewPost>();
  @Output() onEmbedClick: EventEmitter<AppBskyEmbedRecord.View> = new EventEmitter<AppBskyEmbedRecord.View>();

  @ViewChild('likeAnim', {read: ElementRef}) likeAnimation: ElementRef<HTMLElement>;
  @ViewChild('rtAnim', {read: ElementRef}) repostAnimation: ElementRef<HTMLElement>;
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
    private messageService: MessageService,
    private dialogService: DialogService
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
    if (this.likeAnimation.nativeElement.classList.contains('animate-pingonce')) {
      this.likeAnimation.nativeElement.classList.remove('animate-pingonce');
    }
    setTimeout(() => this.likeAnimation.nativeElement.classList.add('animate-pingonce'), 100);

    // API call
    this.processingAction = true;
    from(agent.like(this.feedViewPost.post().uri, this.feedViewPost.post().cid)).subscribe({
      next: () => {
        agent.getPosts({
          uris: [this.feedViewPost.post().uri]
        }).then(response => {
          this.feedViewPost.post.set(response.data.posts[0]);
        });
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

    // API call
    this.processingAction = true;
    from(agent.deleteLike(this.feedViewPost.post().viewer.like)).subscribe({
      next: () => {
        agent.getPosts({
          uris: [this.feedViewPost.post().uri]
        }).then(response => {
          this.feedViewPost.post.set(response.data.posts[0]);
        });
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
    if (this.repostAnimation.nativeElement.classList.contains('animate-pingonce')) {
      this.repostAnimation.nativeElement.classList.remove('animate-pingonce');
    }
    setTimeout(() => this.repostAnimation.nativeElement.classList.add('animate-pingonce'), 100);

    // API call
    this.processingAction = true;
    from(agent.repost(this.feedViewPost.post().uri, this.feedViewPost.post().cid)).subscribe({
      next: () => {
        agent.getPosts({
          uris: [this.feedViewPost.post().uri]
        }).then(response => {
          this.feedViewPost.post.set(response.data.posts[0]);
        });
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

    // API call
    this.processingAction = true;
    from(agent.deleteRepost(this.feedViewPost.post().viewer.repost)).subscribe({
      next: () => {
        agent.getPosts({
          uris: [this.feedViewPost.post().uri]
        }).then(response => {
          this.feedViewPost.post.set(response.data.posts[0]);
        });
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
    agent.deleteRepost(this.feedViewPost.post().viewer.repost).then(
      () => this.repost()
    );
  }

  log(event: any) {
    console.log("DEVELOPMENT LOG: ", event)
  }

  openAuthor(event: MouseEvent) {
    if (!window.getSelection().toString().length) {
      this.dialogService.open(AuthorViewDialogComponent, {
        data: {
          actor: this.feedViewPost.post().author.did
        },
        appendTo: document.querySelector('app-deck'),
        maskStyleClass: 'full-dialog',
        modal: true,
        dismissableMask: true,
        autoZIndex: false,
        style: {height: '100%'},
        focusOnShow: false,
        duplicate: true
      });
    }

    event.preventDefault();
    event.stopPropagation();
  }

  openImage(uri:string, index: number) {
    this.postService.openImage(uri, index);
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
