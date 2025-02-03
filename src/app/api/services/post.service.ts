import {Injectable, signal, WritableSignal} from "@angular/core";
import {AppBskyFeedDefs, AppBskyFeedPost} from "@atproto/api";

export const posts: Map<string, WritableSignal<AppBskyFeedDefs.PostView>> =
  new Map<string, WritableSignal<AppBskyFeedDefs.PostView>>();
type Record = AppBskyFeedPost.Record;

@Injectable({
  providedIn: 'root'
})
export class PostService {
  public newPost: WritableSignal<AppBskyFeedPost.Record> = signal(undefined);

  setPost(post: AppBskyFeedDefs.PostView): WritableSignal<AppBskyFeedDefs.PostView> {
    const existingPost = posts.get(post.cid);
    if (existingPost) {
      existingPost.set(post);
      return existingPost;
    } else {
      const newPost = signal(post);
      posts.set(post.cid, newPost);
      return newPost;
    }
  }

  getPost(cid: string): WritableSignal<AppBskyFeedDefs.PostView> | undefined {
    return posts.get(cid);
  }

  writeNewPost(replyDid?: string, quoteDid?: string) {
    this.newPost.set({
      $type: 'app.bsky.feed.post',
      text: '',
      facets: [],
      createdAt: '',
      langs: [],
      tags: [],
      //TODO: Think how to implement reply/quote embeds
    } as Record)
  }
}
