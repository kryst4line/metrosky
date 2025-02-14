import {SignalizedFeedViewPost} from "~/src/app/api/models/signalized-feed-view-post";
import * as uuid from "uuid";

export class ThreadReply {
  post: SignalizedFeedViewPost;
  replies: ThreadReply[];
  /** Uuid */
  uuid: string = uuid.v4();

  constructor(post: SignalizedFeedViewPost) {
    this.post = post;
  }
}
