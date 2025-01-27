import {AppBskyFeedDefs} from "@atproto/api";
import {WritableSignal} from "@angular/core";
import * as uuid from "uuid";

export class SignalizedFeedViewPost {
  [k: string]: unknown;
  post: WritableSignal<AppBskyFeedDefs.PostView>;
  reply?: AppBskyFeedDefs.ReplyRef | undefined;
  reason?: AppBskyFeedDefs.ReasonRepost | AppBskyFeedDefs.ReasonPin | { [k: string]: unknown; $type: string; } | undefined;
  feedContext?: string | undefined;
  uuid: string = uuid.v4();
}
