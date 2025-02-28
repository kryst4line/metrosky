import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
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
  processingAction = false;

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
        this.ref.close();
      }
    })
  }

  reply(event: MouseEvent) {
    this.postService.replyPost(this.post().uri);
    event.stopPropagation();
  }

  like(event: MouseEvent) {
    if (!this.processingAction) {
      this.processingAction = true;

      let likePromise;

      if (this.post().viewer.like) {
        likePromise = this.postService.deleteLike(this.post().uri, this.post().viewer.like);
      } else {
        likePromise = this.postService.like(this.post().uri, this.post().cid);
      }

      likePromise
        .catch(err => this.messageService.error(err, 'Oops!'))
        .finally(() => this.processingAction = false);
    }

    event.stopPropagation();
  }

  repost() {
    if (!this.processingAction) {
      this.processingAction = true;

      let repostPromise;

      if (this.post().viewer.repost) {
        repostPromise = this.postService.deleteRepost(this.post().uri, this.post().viewer.repost);
      } else {
        repostPromise = this.postService.repost(this.post().uri, this.post().cid);
      }

      repostPromise
        .catch(err => this.messageService.error(err, 'Oops!'))
        .finally(() => {
          this.processingAction = false;
          this.cdRef.markForCheck();
        });
    }
  }

  renewRepost() {
    if (!this.processingAction) {
      this.processingAction = true;

      this.postService.renewRepost(this.post().uri, this.post().cid, this.post().viewer.repost)
        .catch(err => this.messageService.error(err, 'Oops!'))
        .finally(() => this.processingAction = false);
    }
  }

  openRepostMenu(menu: Menu, event: MouseEvent) {
    this.repostMenuItems = [
      {
        label: !this.post().viewer.repost ? 'Repost' : 'Undo repost',
        command: () => this.repost(),
        disabled: this.processingAction
      },
      {
        label: 'Redo repost',
        command: () => this.renewRepost(),
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

  protected readonly window = window;
}
