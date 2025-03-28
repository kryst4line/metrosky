import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, effect,
  ElementRef, forwardRef, input,
  OnDestroy,
  OnInit, viewChild,
} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FeedPostCardComponent} from '@components/cards/feed-post-card/feed-post-card.component';
import {SignalizedFeedViewPost} from '@models/signalized-feed-view-post';
import {PostService} from '@services/post.service';
import {MskyDialogService} from '@services/msky-dialog.service';
import {agent} from '@core/bsky.api';
import {PostUtils} from '@shared/utils/post-utils';
import {Divider} from 'primeng/divider';
import {ScrollDirective} from '@shared/directives/scroll.directive';
import {$Typed, AppBskyFeedDefs} from '@atproto/api';
import {ReasonRepost} from '@atproto/api/dist/client/types/app/bsky/feed/defs';
import {ProgressSpinner} from 'primeng/progressspinner';

@Component({
  selector: 'search-feed',
  imports: [
    CommonModule,
    forwardRef(() => FeedPostCardComponent),
    Divider,
    ScrollDirective,
    ProgressSpinner,
  ],
  templateUrl: './search-feed.component.html',
  styleUrl: './search-feed.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchFeedComponent implements OnInit, OnDestroy {
  feed = viewChild<ElementRef>('feed');

  query = input.required<string>();
  sort = input.required<'top' | 'latest'>();
  posts: SignalizedFeedViewPost[];
  lastPostCursor: string;
  loading = true;
  reloadReady = false;
  reloadTimeout: ReturnType<typeof setTimeout>;

  constructor(
    private postService: PostService,
    private dialogService: MskyDialogService,
    public cdRef: ChangeDetectorRef
  ) {
    effect(() => {
      if (this.query() || this.sort()) this.initData();
    })
  }

  ngOnInit() {
    if (this.query()) this.initData();

    // Listen to new posts to refresh
    this.postService.refreshFeeds.subscribe({
      next: () => {
        if (this.feed().nativeElement.scrollTop == 0) {
          this.initData();
        } else {
          this.reloadReady = true;
        }
      }
    });
  }

  ngOnDestroy() {
    this.postService.refreshFeeds.unsubscribe();
    clearTimeout(this.reloadTimeout);
  }

  initData() {
    this.loading = true;
    agent.app.bsky.feed.searchPosts({
      q: this.query(),
      limit: 15,
      sort: this.sort()
    }).then(
      response => {
        this.lastPostCursor = response.data.cursor;
        this.posts = response.data.posts.map(post => PostUtils.parseFeedViewPost({
          $type: 'app.bsky.feed.defs#feedViewPost',
          post: post as AppBskyFeedDefs.PostView
        }, this.postService));
        this.cdRef.markForCheck();
        this.feed().nativeElement.scrollTo({top: 0});
        setTimeout(() => {
          this.loading = false;
          this.manageRefresh();
        }, 500);
      }
    );
  }

  nextData() {
    if (this.loading) return;
    this.loading = true;

    agent.app.bsky.feed.searchPosts({
      q: this.query(),
      limit: 15,
      sort: this.sort(),
      cursor: this.lastPostCursor
    }).then(
      response => {
        this.lastPostCursor = response.data.cursor;
        const newPosts = response.data.posts.map(post => PostUtils.parseFeedViewPost({
          $type: 'app.bsky.feed.defs#feedViewPost',
          post: post as AppBskyFeedDefs.PostView
        }, this.postService));
        this.posts = [...this.posts, ...newPosts];
        this.cdRef.markForCheck();
        setTimeout(() => {
          this.loading = false;
        }, 500);
      }
    );
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

        if (this.feed().nativeElement.scrollTop == 0) {
          this.reloadReady = false;
          agent.getTimeline({
            limit: 1
          }).then(response => {
            const post = response.data.feed[0];
            const lastPost = this.posts[0];
            let isNewPost = false;

            if (post) {
              if (post.reason) {
                const reason = post.reason as $Typed<ReasonRepost>;
                if (!lastPost.reason) isNewPost = true;
                if (reason.indexedAt !== (lastPost.reason as $Typed<ReasonRepost>)?.indexedAt) isNewPost = true;
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
    } else if (this.reloadReady && this.feed().nativeElement.scrollTop == 0) {
      this.reloadReady = false;
      this.initData();
    }
  }

  log(event: any) {
    console.log(event)
  }
}
