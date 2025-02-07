import {AppBskyFeedDefs, AppBskyGraphDefs} from "@atproto/api";
import {ExternalEmbed, ImageEmbed, VideoEmbed} from "~/src/app/api/models/embed";

export class PostComposerEvent {
  text: string;
  recordEmbed: AppBskyFeedDefs.PostView | AppBskyFeedDefs.GeneratorView | AppBskyGraphDefs.ListView | AppBskyGraphDefs.StarterPackView;
  mediaEmbed: ImageEmbed | VideoEmbed | ExternalEmbed;
}
