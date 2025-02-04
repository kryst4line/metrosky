import {Injectable, signal, WritableSignal} from "@angular/core";
import {AppBskyFeedDefs, AppBskyFeedPost} from "@atproto/api";
import {agent} from "~/src/app/core/bsky.api";

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

  createPost() {
    this.newPost.set({
      $type: 'app.bsky.feed.post',
      text: '',
      facets: [],
      createdAt: '',
      langs: [],
      tags: [],
    } as Record)
  }

  replyPost(uri: string) {
    agent.getPostThread({
      uri: uri
    }).then(response => {
      let root;
      if (response.data.thread.parent) {
        root = response.data.thread.parent as AppBskyFeedDefs.ThreadViewPost;
        while (root.parent) {
          root = root.parent;
        }
      } else {
        root = response.data.thread.post;
      }

      let replyRef = {
        parent: {
          uri: (response.data.thread.post as AppBskyFeedDefs.PostView).uri,
          cid: (response.data.thread.post as AppBskyFeedDefs.PostView).cid
        },
        root: {
          uri: (root as any).uri,
          cid: (root as any).cid
        },
      };

      this.newPost.set({
        $type: 'app.bsky.feed.post',
        text: '',
        facets: [],
        createdAt: '',
        langs: [],
        tags: [],
        reply: replyRef
      } as Record);
    });
  }
}
