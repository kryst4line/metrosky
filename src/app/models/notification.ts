import {AppBskyActorDefs, AppBskyNotificationListNotifications} from "@atproto/api";
import {SignalizedFeedViewPost} from "@models/signalized-feed-view-post";
import * as uuid from "uuid";

export class Notification {
  /** Notification list object */
  notification: AppBskyNotificationListNotifications.Notification;
  /** Notification reason */
  reason: "like" | "repost" | "follow" | "mention" | "reply" | "quote" | "starterpack-joined" | string;
  /** Authors' profile */
  authors: AppBskyActorDefs.ProfileView[] = [];
  /** Record URI */
  uri?: string;
  /** Record */
  feedViewPost?: SignalizedFeedViewPost;
  /** Uuid */
  uuid: string = uuid.v4();
}
