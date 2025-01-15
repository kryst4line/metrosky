import {Injectable, signal, WritableSignal} from "@angular/core";
import {AppBskyFeedDefs} from "@atproto/api";

export const posts: Map<string, WritableSignal<AppBskyFeedDefs.PostView>> =
  new Map<string, WritableSignal<AppBskyFeedDefs.PostView>>();

@Injectable({
  providedIn: 'root'
})
export class PostService {
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
}
