import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  input,
  OnDestroy,
  OnInit,
  viewChild,
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
import {ProgressSpinner} from 'primeng/progressspinner';
import {from} from 'rxjs';
import {MskyMessageService} from '@services/msky-message.service';

@Component({
  selector: 'generator-feed',
  imports: [
    CommonModule,
    forwardRef(() => FeedPostCardComponent),
    Divider,
    ScrollDirective,
    ProgressSpinner,
  ],
  templateUrl: './generator-feed.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneratorFeedComponent implements OnInit, OnDestroy {
  feed = viewChild<ElementRef>('feed');
  uri = input.required<string>();

  posts: SignalizedFeedViewPost[];
  lastPostCursor: string;
  loading = true;
  reloadReady = false;
  reloadTimeout: ReturnType<typeof setTimeout>;

  constructor(
    private postService: PostService,
    private dialogService: MskyDialogService,
    private messageService: MskyMessageService,
    public cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.initData();

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
    from(agent.app.bsky.feed.getFeed({
      feed: this.uri(),
      limit: 15
    })).subscribe({
      next: response => {
        this.lastPostCursor = response.data.cursor;
        this.posts = response.data.feed.map(fvp => PostUtils.parseFeedViewPost(fvp, this.postService));
        this.cdRef.markForCheck();
        setTimeout(() => {
          this.loading = false;
          this.manageRefresh();
        }, 500);
      }, error: err => this.messageService.error(err.message)
    });
  }

  nextData() {
    if (this.loading) return;
    this.loading = true;

    from(agent.app.bsky.feed.getFeed({
      feed: this.uri(),
      limit: 15,
      cursor: this.lastPostCursor
    })).subscribe({
      next: response => {
        this.lastPostCursor = response.data.cursor;
        const newPosts = response.data.feed.map(fvp => PostUtils.parseFeedViewPost(fvp, this.postService));
        this.posts = [...this.posts, ...newPosts];
        this.cdRef.markForCheck();
        setTimeout(() => {
          this.loading = false;
        }, 500);
      }, error: err => this.messageService.error(err.message)
    });
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

            if (post && post.post.uri+post.post.cid == lastPost.post().uri+lastPost.post().cid) {
              isNewPost = true;
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
}
