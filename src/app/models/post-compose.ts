import {signal, WritableSignal} from "@angular/core";
import {$Typed, AppBskyEmbedRecord, AppBskyFeedDefs, AppBskyFeedPost, AppBskyGraphDefs} from "@atproto/api";
import {ExternalEmbed, ImageEmbed, VideoEmbed} from "@models/embed";

type Record = AppBskyFeedPost.Record;

export class PostCompose {
  post: WritableSignal<AppBskyFeedPost.Record> = signal(undefined);
  reply: WritableSignal<AppBskyFeedDefs.PostView> = signal(undefined);
  recordEmbed: WritableSignal<$Typed<AppBskyEmbedRecord.ViewRecord> | $Typed<AppBskyFeedDefs.GeneratorView> | $Typed<AppBskyGraphDefs.ListView> | $Typed<AppBskyGraphDefs.StarterPackView>> = signal(undefined);
  mediaEmbed: WritableSignal<ImageEmbed | VideoEmbed | ExternalEmbed> = signal(undefined);

  constructor() {
    this.post.set({
      $type: 'app.bsky.feed.post',
      text: '',
      facets: [],
      createdAt: '',
      langs: [],
      tags: [],
    } as Record);
  }
}
