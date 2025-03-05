import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit, ViewChild,
  WritableSignal
} from '@angular/core';
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {iconsProvider} from "~/src/app/app.config";
import {agent} from "~/src/app/core/bsky.api";
import {MessageService} from "~/src/app/api/services/message.service";
import {PostService} from "~/src/app/api/services/post.service";
import {from} from "rxjs";
import {AppBskyEmbedImages, AppBskyEmbedRecordWithMedia, AppBskyFeedDefs} from "@atproto/api";
import {GalleriaModule} from "primeng/galleria";
import {
  AuthorViewDialogComponent
} from "~/src/app/shared/layout/dialogs/author-view-dialog/author-view-dialog.component";
import {DisplayNamePipe} from "~/src/app/shared/utils/pipes/display-name.pipe";
import {IsFeedPostRecordPipe} from "~/src/app/shared/utils/pipes/type-guards/is-feed-post-record";
import {
  RichTextDisplayComponent
} from "~/src/app/shared/components/rich-text/rich-text-display/rich-text-display.component";
import {NgIcon} from "@ng-icons/core";
import {NumberFormatterPipe} from "~/src/app/shared/utils/pipes/number-formatter.pipe";
import {DateFormatterPipe} from "~/src/app/shared/utils/pipes/date-formatter.pipe";
import {LinkExtractorPipe} from "~/src/app/shared/utils/pipes/link-extractor.pipe";
import {Menu} from "primeng/menu";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'image-view-dialog',
  imports: [
    GalleriaModule,
    DisplayNamePipe,
    IsFeedPostRecordPipe,
    RichTextDisplayComponent,
    NgIcon,
    NumberFormatterPipe,
    DateFormatterPipe,
    LinkExtractorPipe,
    Menu
  ],
  templateUrl: './image-view-dialog.component.html',
  styleUrl: './image-view-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    iconsProvider,
    LinkExtractorPipe
  ]
})
export class ImageViewDialogComponent implements OnInit {
  post: WritableSignal<AppBskyFeedDefs.PostView>;
  images: AppBskyEmbedImages.ViewImage[];
  initialIndex: number = 0;

  @ViewChild('likeAnim', {read: ElementRef}) likeAnimation: ElementRef<HTMLElement>;
  @ViewChild('rtAnim', {read: ElementRef}) repostAnimation: ElementRef<HTMLElement>;
  processingAction = false;

  protected readonly window = window;

  moreMenuItems: MenuItem[] = [
    {
      label: 'Open in Bsky',
      command: () => {
        window.open(
          this.linkExtractorPipe.transform(
            this.post().uri,
            this.post().author.handle
          ), "_blank"
        );
      }
    },
    {
      label: 'Copy link',
      command: () => {
        navigator.clipboard.writeText(
          this.linkExtractorPipe.transform(
            this.post().uri,
            this.post().author.handle
          )
        );
      }
    }
  ];
  repostMenuItems: MenuItem[];

  constructor(
    protected ref: DynamicDialogRef,
    protected config: DynamicDialogConfig,
    private postService: PostService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private parentRef: ElementRef,
    private cdRef: ChangeDetectorRef,
    private linkExtractorPipe: LinkExtractorPipe
  ) {}

  ngOnInit() {
    this.loadPost();
  }

  loadPost() {
    from(
      agent.getPosts({
        uris: [this.config.data.uri]
      })
    ).subscribe({
      next: response => {
        this.post = this.postService.setPost(response.data.posts[0]);

        if (AppBskyEmbedRecordWithMedia.isView(this.post().embed)) {
          const embed = this.post().embed as AppBskyEmbedRecordWithMedia.View;
          this.images = (embed.media as AppBskyEmbedImages.View).images;
        } else {
          this.images = (this.post().embed as AppBskyEmbedImages.View).images;
        }

        if (this.config.data.index) {
          this.initialIndex = this.config.data.index;
        }

        this.cdRef.markForCheck();
      },
      error: err => {
        this.messageService.error(err.message, 'Oops!');
        this.ref.close();
      }
    })
  }

  reply(event: MouseEvent) {
    this.postService.replyPost(this.post().uri);
    event.stopPropagation();
  }

  like(event: MouseEvent) {
    event.stopPropagation();

    // Update UI
    this.post.update(post => {
      post.viewer.like = 'placeholder';
      return post;
    });

    // Show animation
    this.likeAnimation.nativeElement.classList.add('animate-pingonce')
    setTimeout(() => this.likeAnimation.nativeElement.classList.remove('animate-pingonce'), 1000);

    // API call (delayed to not step over placeholder change)
    this.processingAction = true;
    from(agent.like(this.post().uri, this.post().cid)).subscribe({
      next: () => {
        setTimeout(() => {
          from(agent.getPosts({
            uris: [this.post().uri]
          })).subscribe({
            next: response => this.post.set(response.data.posts[0]),
            error: err => this.messageService.error(err.message, 'Oops!')
          });
        }, 100);
      },
      error: err => {
        this.messageService.error(err.message, 'Oops!');
        this.post.update(post => {
          post.viewer.like = undefined;
          return post;
        });
      }
    }).add(() => this.processingAction = false);
  }

  deleteLike(event: MouseEvent) {
    event.stopPropagation();

    // Update UI
    const likeRef = this.post().viewer.like;
    this.post.update(post => {
      post.viewer.like = undefined;
      return post;
    });

    // API call (delayed to not step over placeholder change)
    this.processingAction = true;
    from(agent.deleteLike(likeRef)).subscribe({
      next: () => {
        setTimeout(() => {
          from(agent.getPosts({
            uris: [this.post().uri]
          })).subscribe({
            next: response => this.post.set(response.data.posts[0]),
            error: err => this.messageService.error(err.message, 'Oops!')
          });
        }, 200);
      },
      error: err => {
        this.messageService.error(err.message, 'Oops!');
        this.post.update(post => {
          post.viewer.like = likeRef;
          return post;
        });
      }
    }).add(() => this.processingAction = false);
  }

  repost() {
    // Update UI
    this.post.update(post => {
      post.viewer.repost = 'placeholder';
      return post;
    });

    // Show animation
    this.repostAnimation.nativeElement.classList.add('animate-pingonce')
    setTimeout(() => this.repostAnimation.nativeElement.classList.remove('animate-pingonce'), 1000);

    // API call (delayed to not step over placeholder change)
    this.processingAction = true;
    from(agent.repost(this.post().uri, this.post().cid)).subscribe({
      next: () => {
        setTimeout(() => {
          from(agent.getPosts({
            uris: [this.post().uri]
          })).subscribe({
            next: response => this.post.set(response.data.posts[0]),
            error: err => this.messageService.error(err.message, 'Oops!')
          });
        }, 100);
      },
      error: err => {
        this.messageService.error(err.message, 'Oops!');
        this.post.update(post => {
          post.viewer.repost = undefined;
          return post;
        });
      }
    }).add(() => this.processingAction = false);
  }

  deleteRepost() {
    // Update UI
    const rtRef = this.post().viewer.repost;
    this.post.update(post => {
      post.viewer.repost = undefined;
      return post;
    });

    // API call (delayed to not step over placeholder change)
    this.processingAction = true;
    from(agent.deleteRepost(rtRef)).subscribe({
      next: () => {
        setTimeout(() => {
          from(agent.getPosts({
            uris: [this.post().uri]
          })).subscribe({
            next: response => this.post.set(response.data.posts[0]),
            error: err => this.messageService.error(err.message, 'Oops!')
          });
        }, 200);
      },
      error: err => {
        this.messageService.error(err.message, 'Oops!');
        this.post.update(post => {
          post.viewer.repost = rtRef;
          return post;
        });
      }
    }).add(() => this.processingAction = false);
  }

  redoRepost() {
    this.processingAction = true;
    from(agent.deleteRepost(this.post().viewer.repost)).subscribe({
      next: () => this.repost(),
      error: err => this.messageService.error(err.message, 'Oops!')
    }).add(() => this.processingAction = false);
  }

  openRepostMenu(menu: Menu, event: MouseEvent) {
    this.repostMenuItems = [
      {
        label: !this.post().viewer.repost ? 'Repost' : 'Undo repost',
        command: () => !this.post().viewer.repost ? this.repost() : this.deleteRepost(),
        disabled: this.processingAction
      },
      {
        label: 'Redo repost',
        command: () => this.redoRepost(),
        visible: !!this.post().viewer.repost,
        disabled: this.processingAction
      },
      {
        label: 'Quote post',
        command: () => this.postService.quotePost(this.post().uri)
      }
    ];
    menu.toggle(event);
    event.stopPropagation();
  }

  openAuthor(event: MouseEvent, did: string) {
    if (!window.getSelection().toString().length) {
      this.dialogService.open(AuthorViewDialogComponent, {
        data: {
          actor: did
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
}
