import {AppBskyFeedGetPosts, AppBskyNotificationListNotifications} from "@atproto/api";
import {Notification} from '~/src/app/api/models/notification'
import {agent} from "../../core/bsky.api";
import {PostService} from "~/src/app/api/services/post.service";
import {SignalizedFeedViewPost} from "~/src/app/api/models/signalized-feed-view-post";

export default class NotificationUtils {
  public static parseNotifications(notifications: AppBskyNotificationListNotifications.Notification[], postService: PostService): Promise<Notification[]> {
    return new Promise<Notification[]>((resolve) => {
      const target: Notification[] = [];
      while (notifications.length) {
        const temp = new Notification();
        if (notifications[0].reason === 'reply' || notifications[0].reason === 'quote' || notifications[0].reason === 'mention') {
          temp.authors = [notifications[0].author];
          temp.reason = notifications[0].reason;
          temp.notification = notifications[0];
          temp.uri = notifications[0].uri;

          target.push(temp);
          notifications.shift();
        } else if (notifications[0].reason) {
          const slice = notifications.filter(n =>
            (n.reasonSubject === notifications[0].reasonSubject && n.reason === notifications[0].reason)
          );

          temp.authors = slice.map(s => s.author);
          temp.reason = notifications[0].reason;
          temp.notification = notifications[0];
          temp.uri = notifications[0].reasonSubject;

          target.push(temp);

          notifications = notifications.filter(n =>
            !(n.reasonSubject === notifications[0].reasonSubject && n.reason === notifications[0].reason)
          );
        }
      }

      const chunkFn = (arr: Notification[], size: number) =>
        Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
          arr.slice(i * size, i * size + size)
        );

      const promises: Promise<AppBskyFeedGetPosts.Response>[] = [];
      const tempChunks = chunkFn(target, 25);

      tempChunks.forEach(array => {
        promises.push(
          agent.getPosts({
            uris: array.map(n => n.uri).filter(n => n)
          })
        )
      });

      Promise.all(promises).then(chunk => {

        chunk.forEach((response, i1) => {
          target.forEach(notification => {
            const postView = response.data.posts.find(post => post.uri === notification.uri);
            if (postView) {
              notification.feedViewPost = new SignalizedFeedViewPost();
              notification.feedViewPost.post = postService.setPost(postView);
            }
          })
        })
      }, error => console.error(error)).then(() => resolve(target));
    });
  }
}
