import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef, forwardRef,
  Input, OnDestroy,
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
  selector: 'author-feed',
  imports: [
    CommonModule,
    forwardRef(() => FeedPostCardComponent),
    AgVirtualScrollModule,
    NgIcon,
  ],
  templateUrl: './author-feed.component.html',
  styleUrl: './author-feed.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorFeedComponent implements OnInit, OnDestroy {
  @Input() author: string;
  @Input() set filter(filter:
    | 'posts_with_replies'
    | 'posts_no_replies'
    | 'posts_with_media'
    | 'posts_and_author_threads'
    | 'posts_with_video') {
    this._filter = filter;
    this.initData();
  }
  _filter = 'posts_no_replies';
  @Input() includePins?: boolean;
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
    private cdRef: ChangeDetectorRef
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
  }

  ngOnDestroy() {
    this.postService.refreshFeeds.unsubscribe();
    clearTimeout(this.reloadTimeout);
  }

  public initData() {
    this.loading = true;
    agent.getAuthorFeed({
      actor: this.author,
      filter: this._filter,
      includePins: this.includePins ?? false,
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

      agent.getAuthorFeed({
        actor: this.author,
        filter: this._filter,
        includePins: this.includePins ?? false,
        cursor: this.lastPostCursor,
        limit: 15
      }).then(
        response => {
          this.lastPostCursor = response.data.cursor;
          const newPosts = response.data.feed.map(fvp => PostUtils.parseFeedViewPost(fvp, this.postService));
          this.posts = [...this.posts, ...newPosts];
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
          agent.getAuthorFeed({
            actor: this.author,
            filter: this._filter,
            limit: 1
          }).then(response => {
            const post = response.data.feed[0];
            let isNewPost = false;
            const lastPost = this.posts[this.includePins ? 1 : 0];

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
}
