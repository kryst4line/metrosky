import {
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef, forwardRef, input,
  Input, OnDestroy,
  OnInit, viewChild,
} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Divider} from "primeng/divider";
import {FeedPostCardComponent} from "@components/cards/feed-post-card/feed-post-card.component";
import {ScrollDirective} from "@shared/directives/scroll.directive";
import {$Typed} from '@atproto/api';
import {ReasonRepost} from '@atproto/api/dist/client/types/app/bsky/feed/defs';
import {SignalizedFeedViewPost} from '@models/signalized-feed-view-post';
import {PostService} from '@services/post.service';
import {MskyDialogService} from '@services/msky-dialog.service';
import {agent} from '@core/bsky.api';
import {PostUtils} from '@shared/utils/post-utils';
import {ProgressSpinner} from 'primeng/progressspinner';

@Component({
  selector: 'author-feed',
  imports: [
    CommonModule,
    forwardRef(() => FeedPostCardComponent),
    Divider,
    FeedPostCardComponent,
    ScrollDirective,
    ProgressSpinner,
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
    setTimeout(() => {
      this._filter = filter;
      this.initData();
    }, 50);
  }
  _filter = 'posts_no_replies';
  includePins = input(false, {transform: booleanAttribute});
  feed = viewChild<ElementRef>('feed');
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
    agent.getAuthorFeed({
      actor: this.author,
      filter: this._filter,
      includePins: this.includePins(),
      limit: 15
    }).then(
      response => {
        this.lastPostCursor = response.data.cursor;
        this.posts = response.data.feed.map(fvp => PostUtils.parseFeedViewPost(fvp, this.postService));
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

    agent.getAuthorFeed({
      actor: this.author,
      filter: this._filter,
      includePins: this.includePins(),
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
          agent.getAuthorFeed({
            actor: this.author,
            filter: this._filter,
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
}
