import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit, viewChild,
} from '@angular/core';
import {agent} from "~/src/app/core/bsky.api";
import {CommonModule} from "@angular/common";
import {FeedPostCardComponent} from "~/src/app/shared/components/cards/feed-post-card/feed-post-card.component";
import {PostService} from "~/src/app/api/services/post.service";
import {SignalizedFeedViewPost} from "~/src/app/api/models/signalized-feed-view-post";
import {AgVirtualScrollModule, AgVirtualSrollComponent} from "ag-virtual-scroll";
import {PostUtils} from "~/src/app/shared/utils/post-utils";
import {NgIcon} from "@ng-icons/core";
import {MskyDialogService} from "~/src/app/api/services/msky-dialog.service";

@Component({
  selector: 'timeline-feed',
  imports: [
    CommonModule,
    FeedPostCardComponent,
    AgVirtualScrollModule,
    NgIcon,
  ],
  templateUrl: './timeline-feed.component.html',
  styleUrl: './timeline-feed.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelineFeedComponent implements OnInit, OnDestroy {
  feed = viewChild<ElementRef>('feed');
  virtualScroll = viewChild<AgVirtualSrollComponent>('vs');

  posts: SignalizedFeedViewPost[];
  lastPostCursor: string;
  loading = true;
  reloadReady = false;
  reloadTimeout: ReturnType<typeof setTimeout>;

  constructor(
    private postService: PostService,
    private dialogService: MskyDialogService,
    public cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.initData();

    //Listen to new posts to refresh
    this.postService.refreshFeeds.subscribe({
      next: () => {
        if (this.virtualScroll().currentScroll == 0) {
          this.initData();
        } else {
          this.reloadReady = true;
        }
      }
    });

    this.postService.reset.subscribe({
      next: () => this.initData()
    })
  }

  ngOnDestroy() {
    this.postService.refreshFeeds.unsubscribe();
    clearTimeout(this.reloadTimeout);
  }

  initData() {
    this.loading = true;
    agent.getTimeline({
      limit: 15
    }).then(
      response => {
        this.lastPostCursor = response.data.cursor;
        this.posts = response.data.feed.map(fvp => PostUtils.parseFeedViewPost(fvp, this.postService));
        this.cdRef.markForCheck();
        setTimeout(() => {
          this.loading = false;
          this.manageRefresh();
        }, 500);
      }
    );
  }

  nextData(scrollEvent: any) {
    if (!this.loading && scrollEvent.endIndex == this.posts.length -1) {
      this.loading = true;

      agent.getTimeline({
        cursor: this.lastPostCursor,
        limit: 15
      }).then(
        response => {
          this.lastPostCursor = response.data.cursor;
          const newPosts = response.data.feed.map(fvp => PostUtils.parseFeedViewPost(fvp, this.postService));
          this.posts = [...this.posts, ...newPosts];
          this.cdRef.markForCheck();
          setTimeout(() => {
            this.loading = false;
          }, 500);
        }
      );
    }
  }

  openPost(uri: string) {
    // Mute all video players
    this.feed().nativeElement.querySelectorAll('video').forEach((video: HTMLVideoElement) => {
      video.muted = true;
    });

    this.dialogService.openThread(uri, this.feed().nativeElement);
  }

  manageRefresh() {
    if (this.loading) return;

    if (!this.reloadReady && !this.reloadTimeout) {
      this.reloadTimeout = setTimeout(() => {
        this.reloadTimeout = undefined;

        if (this.virtualScroll().currentScroll == 0) {
          this.reloadReady = false;
          agent.getTimeline({
            limit: 1
          }).then(response => {
            const post = response.data.feed[0];
            const lastPost = this.posts[0];
            let isNewPost = false;

            if (post) {
              if (post.reason) {
                if (!lastPost.reason) isNewPost = true;
                if (post.reason.indexedAt !== lastPost.reason?.indexedAt) isNewPost = true;
              } else {
                if (lastPost.reason) isNewPost = true;
                if (post.post.indexedAt !== lastPost.post().indexedAt) isNewPost = true;
              }
            }

            if (isNewPost) {
              this.initData();
            } else {
              this.manageRefresh();
            }
          });
        } else {
          this.reloadReady = true;
        }
      }, 30e3);
      // Timer in seconds
    } else if (this.reloadReady && this.virtualScroll().currentScroll == 0) {
      this.reloadReady = false;
      this.initData();
    }
  }

  log(event: any) {
    console.log(event)
  }
}
