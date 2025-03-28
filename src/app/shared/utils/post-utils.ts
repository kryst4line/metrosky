import {AppBskyFeedDefs, AppBskyFeedPost} from "@atproto/api";
import {PostService} from '@services/post.service';
import {SignalizedFeedViewPost} from '@models/signalized-feed-view-post';

export class PostUtils {
  public static parseFeedViewPost(feedViewPost: AppBskyFeedDefs.FeedViewPost, postService: PostService): SignalizedFeedViewPost {
    const signalizedFeedViewPost = new SignalizedFeedViewPost();
    feedViewPost.post.record = feedViewPost.post.record as AppBskyFeedPost.Record;
    signalizedFeedViewPost.post = postService.setPost(feedViewPost.post);
    signalizedFeedViewPost.reply = feedViewPost.reply;
    signalizedFeedViewPost.reason = feedViewPost.reason;
    signalizedFeedViewPost.feedContext = feedViewPost.feedContext;

    return signalizedFeedViewPost;
  }
}
