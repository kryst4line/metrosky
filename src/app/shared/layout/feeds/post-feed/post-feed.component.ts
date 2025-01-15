import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {agent} from "~/src/app/core/bsky.api";
import {AppBskyFeedDefs, AppBskyFeedPost} from "@atproto/api";
import {CommonModule} from "@angular/common";
import {FeedViewPostCardComponent} from "../../../components/feed-view-post-card/feed-view-post-card.component";
import {PostService} from "~/src/app/api/services/post.service";
import {SignalizedFeedViewPost} from "~/src/app/api/models/signalized-feed-view-post";
import {CdkVirtualScrollViewport, ScrollingModule} from "@angular/cdk/scrolling";
import {ScrollingModule as ScrollingModuleExperimental} from "@angular/cdk-experimental/scrolling";

@Component({
  selector: 'post-feed',
  imports: [
    CommonModule,
    FeedViewPostCardComponent,
    ScrollingModule,
    ScrollingModuleExperimental
  ],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss'
})
export class PostFeedComponent implements OnInit, AfterViewInit {
  @ViewChild(CdkVirtualScrollViewport, {static:false}) virtualScrollViewport?: CdkVirtualScrollViewport;
  posts: SignalizedFeedViewPost[] = [];

  constructor(private postService: PostService) {}

  ngOnInit() {
    agent.getTimeline().then(
      response => {
        this.posts = response.data.feed.map(fvp => this.parseFeedViewPost(fvp, this.postService));
      }
    )
  }

  ngAfterViewInit() {
    this.virtualScrollViewport.elementRef.nativeElement.onscroll = (e) => {this.onScroll(e)};
  }

  onScroll(e: any) {
    var scrollOffset = this.virtualScrollViewport.measureScrollOffset("bottom");

    if (scrollOffset == 0) {
      this.nextData();
      console.log("END")
    }
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
      cursor: this.posts[this.posts.length-1].post().indexedAt
    }).then(response => {
      const newPosts = response.data.feed.map(fvp => this.parseFeedViewPost(fvp, this.postService));

      const offset = this.virtualScrollViewport.measureScrollOffset("top");
      const topPosition = offset + newPosts.length * this.virtualScrollViewport["_scrollStrategy"]._averager._averageItemSize;

      this.posts = [...this.posts, ...newPosts];
      this.virtualScrollViewport.scrollTo({
        top: topPosition
      });
    })
  }

  log(event: any) {
    console.log(event)
  }
}
