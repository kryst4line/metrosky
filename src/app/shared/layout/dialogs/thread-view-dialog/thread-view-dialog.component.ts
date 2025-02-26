import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, forwardRef, ViewChild} from '@angular/core';
import {
  FeedPostCardDetailComponent
} from "~/src/app/shared/components/cards/feed-post-card-detail/feed-post-card-detail.component";
import {SignalizedFeedViewPost} from "~/src/app/api/models/signalized-feed-view-post";
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {iconsProvider} from "~/src/app/app.config";
import {NgIcon} from "@ng-icons/core";
import {AppBskyFeedDefs} from "@atproto/api";
import {agent} from "~/src/app/core/bsky.api";
import {from} from "rxjs";
import {MessageService} from "~/src/app/api/services/message.service";
import {HttpErrorResponse} from "@angular/common/http";
import {PostService} from "~/src/app/api/services/post.service";
import {PostUtils} from "~/src/app/shared/utils/post-utils";
import {FeedPostCardComponent} from "~/src/app/shared/components/cards/feed-post-card/feed-post-card.component";
import {BlockedPost, NotFoundPost, ThreadViewPost} from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import {ThreadReply} from "~/src/app/api/models/thread-reply";
import {NgTemplateOutlet} from "@angular/common";

@Component({
  selector: 'thread-view-dialog',
  imports: [
    forwardRef(() => FeedPostCardDetailComponent),
    forwardRef(() => NgIcon),
    forwardRef(() => FeedPostCardComponent),
    NgTemplateOutlet,
  ],
  templateUrl: './thread-view-dialog.component.html',
  styleUrl: './thread-view-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    iconsProvider
  ]
})
export class ThreadViewDialogComponent {
  @ViewChild('main', {read: ElementRef}) mainCard: ElementRef;
  @ViewChild('scroll', {read: ElementRef}) scrollDiv: ElementRef<HTMLDivElement>;
  post: SignalizedFeedViewPost;
  parents: SignalizedFeedViewPost[] = [];
  replies: ThreadReply[] = [];
  dialog: DynamicDialogRef;

  constructor(
    protected ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private postService: PostService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private parentRef: ElementRef,
    private cdRef: ChangeDetectorRef
  ) {
    this.loadThread();
  }

  loadThread() {
    from(agent.getPostThread({
      uri: this.config.data.uri,
      depth: 10
    })).subscribe({
      next: response => {
        if (AppBskyFeedDefs.isThreadViewPost(response.data.thread)) {
          const thread = response.data.thread;
          this.post = PostUtils.parseFeedViewPost({
            $type: 'app.bsky.feed.defs#postView',
            post: thread.post as AppBskyFeedDefs.PostView
          }, this.postService);
          this.post.post.set(response.data.thread.post);

          if (thread.parent) {
            let parent = thread.parent;
            this.parents.unshift(
              PostUtils.parseFeedViewPost({
                $type: 'app.bsky.feed.defs#postView',
                post: parent.post as AppBskyFeedDefs.PostView
              }, this.postService)
            );
            while (parent.parent) {
              parent = parent.parent as AppBskyFeedDefs.ThreadViewPost;
              this.parents.unshift(
                PostUtils.parseFeedViewPost({
                  $type: 'app.bsky.feed.defs#postView',
                  post: parent.post as AppBskyFeedDefs.PostView
                }, this.postService)
              );
            }
          }

          if (thread.replies) {
            this.replies = [];
            thread.replies.forEach(reply => {
              this.replies.push(this.parseReplies(reply as ThreadViewPost))
            });
          }

          this.cdRef.markForCheck();
          setTimeout(() => {
            if (thread.parent) {
              this.scrollDiv.nativeElement.scrollTo({
                top: this.mainCard.nativeElement.offsetTop,
                behavior: 'smooth'
              });
            }
          }, 50);
        } else {
          this.messageService.warnIcon("It wasn't possible to find the post.", 'Oops!');
        }
      }, error: (err: HttpErrorResponse) => this.messageService.error(err.message, 'Oops!')
    })
  }

  parseReplies(reply: ThreadViewPost | NotFoundPost | BlockedPost): ThreadReply {
  let threadReply = new ThreadReply(
      PostUtils.parseFeedViewPost({
        $type: 'app.bsky.feed.defs#postView',
        post: reply.post as AppBskyFeedDefs.PostView
      }, this.postService)
    );
    if (reply.replies) {
      threadReply.replies =
        (reply.replies as Array<ThreadViewPost | NotFoundPost | BlockedPost>).map(nestedReply => this.parseReplies(nestedReply))
    }
    return threadReply;
  }

  onPostClick(uri: string) {
    this.dialog = this.dialogService.open(ThreadViewDialogComponent, {
      data: {
        uri: uri,
      },
      appendTo: this.parentRef.nativeElement,
      maskStyleClass: 'inner-dialog',
      style: {background: 'transparent', height: '100%'},
      focusOnShow: false,
      width: '450px',
      duplicate: true
    });

    this.dialog.onClose.subscribe({
      next: () => {
        this.dialog.destroy();
        this.dialog = undefined;
        this.cdRef.markForCheck();
      }
    });
  }
}
