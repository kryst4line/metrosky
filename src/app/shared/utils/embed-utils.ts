import {ExternalEmbed, RecordEmbed, RecordEmbedType} from "@models/embed";
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
    let split: RegExpExecArray | null;

    matches.forEach(match => {
      if (match.includes('bsky.app')) {
        if ((split = BSKY_POST_URL_RE.exec(match))) {
          embeds.push(new RecordEmbed(RecordEmbedType.POST, split[1], split[2]));
          return;
        }
        if ((split = BSKY_FEED_URL_RE.exec(match))) {
          embeds.push(new RecordEmbed(RecordEmbedType.FEED, split[1], split[2]));
          return;
        }
        if ((split = BSKY_LIST_URL_RE.exec(match))) {
          embeds.push(new RecordEmbed(RecordEmbedType.LIST, split[1], split[2]));
          return;
        }
        if ((split = BSKY_STARTER_PACK_URL_RE.exec(match))) {
          embeds.push(new RecordEmbed(RecordEmbedType.STARTER_PACK, split[1], split[2]));
          return;
        }

        embeds.push(new ExternalEmbed(match));
        return;
      }

      embeds.push(new ExternalEmbed(match));
    });

    return embeds;
  }
}
