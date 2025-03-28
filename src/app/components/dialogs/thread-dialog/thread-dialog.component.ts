import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  viewChild
} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {$Typed, AppBskyFeedDefs} from "@atproto/api";
import {from} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {BlockedPost, NotFoundPost, ThreadViewPost} from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import {NgTemplateOutlet} from "@angular/common";
import {FeedPostCardComponent} from '@components/cards/feed-post-card/feed-post-card.component';
import {IsFeedDefsNotFoundPostPipe} from '@shared/pipes/type-guards/is-feed-defs-notfoundpost';
import {IsFeedDefsBlockedPostPipe} from '@shared/pipes/type-guards/is-feed-defs-blockedpost';
import {SignalizedFeedViewPost} from '@models/signalized-feed-view-post';
import {ThreadReply} from '@models/thread-reply';
import {PostService} from '@services/post.service';
import {MskyMessageService} from '@services/msky-message.service';
import {MskyDialogService} from '@services/msky-dialog.service';
import {agent} from '@core/bsky.api';
import {PostUtils} from '@shared/utils/post-utils';
import {FeedPostCardDetailComponent} from '@components/cards/feed-post-card-detail/feed-post-card-detail.component';
import {Divider} from 'primeng/divider';

@Component({
  selector: 'thread-dialog',
  imports: [
    forwardRef(() => FeedPostCardDetailComponent),
    forwardRef(() => FeedPostCardComponent),
    NgTemplateOutlet,
    IsFeedDefsNotFoundPostPipe,
    IsFeedDefsBlockedPostPipe,
    Divider,
  ],
  templateUrl: './thread-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThreadDialogComponent {
  mainCard = viewChild('main', {read: ElementRef});
  scrollDiv = viewChild('scroll', {read: ElementRef<HTMLDivElement>});
  post: SignalizedFeedViewPost;
  parents: Array<SignalizedFeedViewPost | AppBskyFeedDefs.NotFoundPost | AppBskyFeedDefs.BlockedPost> = [];
  replies: Array<ThreadReply | AppBskyFeedDefs.NotFoundPost | AppBskyFeedDefs.BlockedPost> = [];
  dialog: DynamicDialogRef;

  constructor(
    protected ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private postService: PostService,
    private messageService: MskyMessageService,
    private dialogService: MskyDialogService,
    private parentRef: ElementRef,
    private cdRef: ChangeDetectorRef
  ) {
    this.loadThread();
  }

  loadThread() {
    from(agent.getPostThread({
      uri: this.config.data.uri,
      depth: 5
    })).subscribe({
      next: response => {
        if (AppBskyFeedDefs.isThreadViewPost(response.data.thread)) {
          const thread = response.data.thread;
          this.post = PostUtils.parseFeedViewPost({
            $type: 'app.bsky.feed.defs#feedViewPost',
            post: thread.post as AppBskyFeedDefs.PostView
          }, this.postService);
          this.post.post.set(response.data.thread.post);

          if (thread.parent && AppBskyFeedDefs.isThreadViewPost(thread.parent)) {
            let parent: $Typed<ThreadViewPost> | $Typed<NotFoundPost> | $Typed<BlockedPost> = thread.parent;
            this.parents.unshift(
              PostUtils.parseFeedViewPost({
                $type: 'app.bsky.feed.defs#feedViewPost',
                post: parent.post as AppBskyFeedDefs.PostView
              }, this.postService)
            );
            while (AppBskyFeedDefs.isThreadViewPost(parent.parent)) {
              if (AppBskyFeedDefs.isThreadViewPost(parent.parent)) {
                parent = parent.parent;

                this.parents.unshift(
                  PostUtils.parseFeedViewPost({
                    $type: 'app.bsky.feed.defs#feedViewPost',
                    post: parent.post
                  }, this.postService)
                );
              } else if(AppBskyFeedDefs.isNotFoundPost(parent.parent)) {
                parent = parent.parent;
                this.parents.unshift(parent);
              } else if (AppBskyFeedDefs.isBlockedPost(parent.parent)) {
                parent = parent.parent;
                this.parents.unshift(parent);
              }
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
              this.scrollDiv().nativeElement.scrollTo({
                top: this.mainCard().nativeElement.offsetTop - (3.5 * 16),
                behavior: 'smooth'
              });
            }
          }, 100);
        } else {
          this.messageService.warn("It wasn't possible to find the post.", 'Oops!');
        }
      }, error: (err: HttpErrorResponse) => this.messageService.error(err.message, 'Oops!')
    })
  }

  parseReplies(reply: ThreadViewPost | NotFoundPost | BlockedPost): ThreadReply | NotFoundPost | BlockedPost {
    if (AppBskyFeedDefs.isThreadViewPost(reply)) {
      let threadReply = new ThreadReply(
        PostUtils.parseFeedViewPost({
          $type: 'app.bsky.feed.defs#feedViewPost',
          post: reply.post as AppBskyFeedDefs.PostView
        }, this.postService)
      );
      if (reply.replies) {
        threadReply.replies =
          (reply.replies as Array<ThreadViewPost | NotFoundPost | BlockedPost>).map(nestedReply => this.parseReplies(nestedReply))
      }
      return threadReply;
    } else {
      if (AppBskyFeedDefs.isNotFoundPost(reply)) {
        return reply as NotFoundPost;
      } else {
        return reply as BlockedPost;
      }
    }
  }

  openPost(uri: string) {
    // Mute all video players
    this.parentRef.nativeElement.querySelectorAll('video').forEach((video: HTMLVideoElement) => {
      video.muted = true;
    });

    this.dialogService.openThread(uri, this.parentRef.nativeElement);
  }

  log(event: any) {
    console.log("DEVELOPMENT LOG: ", event);
  }
}
