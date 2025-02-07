import {ExternalEmbed, RecordEmbed, RecordEmbedType} from "~/src/app/api/models/embed";
import {URL_REGEX} from "@atproto/api";

export const BSKY_PROFILE_URL_RE = /\/profile\/([^\/]+)$/;
export const BSKY_POST_URL_RE = /\/profile\/([^\/]+)\/post\/([^\/]+)$/;
export const BSKY_FEED_URL_RE = /\/profile\/([^\/]+)\/feed\/([^\/]+)$/;
export const BSKY_LIST_URL_RE = /\/profile\/([^\/]+)\/lists\/([^\/]+)$/;
export const BSKY_STARTER_PACK_URL_RE = /\/starter-pack\/([^\/]+)\/([^\/]+)$/;

export class EmbedUtils {
  public static findEmbedSuggestions(text: string): Array<ExternalEmbed | RecordEmbed> {
    const embeds: Array<ExternalEmbed | RecordEmbed> = [];
    const matches = text.match(URL_REGEX) ?? [];

    matches.forEach(match => {
      if (match.includes('bsky.app')) {
        if (BSKY_POST_URL_RE.test(match)) {
          const split = BSKY_POST_URL_RE.exec(match);
          embeds.push(new RecordEmbed(RecordEmbedType.POST, split[1], split[2]));
          return;
        } else if (BSKY_FEED_URL_RE.test(match)) {
          const split = BSKY_FEED_URL_RE.exec(match);
          embeds.push(new RecordEmbed(RecordEmbedType.FEED, split[1], split[2]));
          return;
        } else if (BSKY_LIST_URL_RE.test(match)) {
          const split = BSKY_LIST_URL_RE.exec(match);
          embeds.push(new RecordEmbed(RecordEmbedType.LIST, split[1], split[2]));
          return;
        } else if (BSKY_STARTER_PACK_URL_RE.test(match)) {
          const split = BSKY_STARTER_PACK_URL_RE.exec(match);
          embeds.push(new RecordEmbed(RecordEmbedType.STARTER_PACK, split[1], split[2]));
          return;
        } else {
          embeds.push(new ExternalEmbed(match));
          return;
        }
      }

      embeds.push(new ExternalEmbed(match));
    });

    return embeds;
  }
}
