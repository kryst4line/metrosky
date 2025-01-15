import {AppBskyFeedDefs} from "@atproto/api";
import {SignalizedFeedViewPost} from "~/src/app/api/models/signalized-feed-view-post";
import {PostService} from "~/src/app/api/services/post.service";

export class FeedViewPostService {
  constructor(private postService: PostService) {}

  parseFeedViewPost(feedViewPost: AppBskyFeedDefs.FeedViewPost): SignalizedFeedViewPost {
    const signalizedFeedViewPost = new SignalizedFeedViewPost();
    signalizedFeedViewPost.post = this.postService.setPost(feedViewPost.post);
    signalizedFeedViewPost.reply = feedViewPost.reply;
    signalizedFeedViewPost.reason = feedViewPost.reason;
    signalizedFeedViewPost.feedContext = feedViewPost.feedContext;

    return signalizedFeedViewPost;
  }
}
