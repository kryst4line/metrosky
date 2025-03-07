import {SignalizedFeedViewPost} from "~/src/app/api/models/signalized-feed-view-post";
import * as uuid from "uuid";
import {AppBskyFeedDefs} from "@atproto/api";

export class ThreadReply {
  post: SignalizedFeedViewPost;
  replies: Array<ThreadReply | AppBskyFeedDefs.NotFoundPost | AppBskyFeedDefs.BlockedPost>;
  /** Uuid */
  uuid: string = uuid.v4();

  constructor(post: SignalizedFeedViewPost) {
    this.post = post;
  }
}
