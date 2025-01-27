import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {agent} from "~/src/app/core/bsky.api";
import {AppBskyFeedDefs, AppBskyFeedPost} from "@atproto/api";
import {CommonModule} from "@angular/common";
import {FeedViewPostCardComponent} from "../../../components/feed-view-post-card/feed-view-post-card.component";
import {PostService} from "~/src/app/api/services/post.service";
import {SignalizedFeedViewPost} from "~/src/app/api/models/signalized-feed-view-post";
import {InfiniteScrollDirective} from "ngx-infinite-scroll";
import {ImagePostDialogComponent} from "~/src/app/shared/layout/dialogs/image-post-dialog/image-post-dialog.component";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'post-feed',
  imports: [
    CommonModule,
    FeedViewPostCardComponent,
    InfiniteScrollDirective
  ],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
  providers: [
    DialogService
  ]
})
export class PostFeedComponent implements OnInit {
  @ViewChild('feed') feed: ElementRef;
  posts: SignalizedFeedViewPost[] = [];
  dialogs: DynamicDialogRef[] = [];
  lastPostCursor: string;

  constructor(
    private postService: PostService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    agent.getTimeline({
      limit: 15
    }).then(
      response => {
        this.lastPostCursor = response.data.cursor;
        this.posts = response.data.feed.map(fvp => this.parseFeedViewPost(fvp, this.postService));
      }
    );
  }

  parseFeedViewPost(feedViewPost: AppBskyFeedDefs.FeedViewPost, postService: PostService): SignalizedFeedViewPost {
    const signalizedFeedViewPost = new SignalizedFeedViewPost();
    feedViewPost.post.record = feedViewPost.post.record as AppBskyFeedPost.Record;
    signalizedFeedViewPost.post = postService.setPost(feedViewPost.post);
    signalizedFeedViewPost.reply = feedViewPost.reply;
    signalizedFeedViewPost.reason = feedViewPost.reason;
    signalizedFeedViewPost.feedContext = feedViewPost.feedContext;

    return signalizedFeedViewPost;
  }

  nextData() {
    agent.getTimeline({
      cursor: this.lastPostCursor,
      limit: 15
    }).then(
      response => {
        this.lastPostCursor = response.data.cursor;
        const newPosts = response.data.feed.map(fvp => this.parseFeedViewPost(fvp, this.postService));
        this.posts = [...this.posts, ...newPosts];
      }
    );
  }

  openPost(event: SignalizedFeedViewPost) {
    this.dialogs.push(
      this.dialogService.open(ImagePostDialogComponent, {
        modal: true,
        dismissableMask: true,
        data: {
          post: event
        },
        appendTo: this.feed.nativeElement,
        maskStyleClass: '!absolute',
        focusOnShow: false
      })
    );
  }

  log(event: any) {
    console.log(event)
  }
}
