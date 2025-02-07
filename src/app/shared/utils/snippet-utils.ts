import {AppBskyEmbedExternal} from "@atproto/api";
import {SnippetSource, SnippetType, LinkSnippet, BlueskyGifSnippet, IframeSnippet} from "~/src/app/api/models/snippet";

export class SnippetUtils {
  public static detectSnippet(link: Pick<AppBskyEmbedExternal.ViewExternal, 'uri' | 'description'>): LinkSnippet | BlueskyGifSnippet | IframeSnippet {
    const url = link.uri;

    let u: URL;
    let m: RegExpExecArray | null | undefined;

    try {
      u = new URL(url);

      if (u.protocol !== 'https:' && u.protocol !== 'http:') {
        return { type: SnippetType.LINK } as LinkSnippet;
      }
    } catch {
      return { type: SnippetType.LINK } as LinkSnippet;
    }

    const h = u.host;
    const p = u.pathname;
    const q = u.searchParams;

    const d = h.startsWith('www.') ? h.slice(4) : h;

    if (d === 'media.tenor.com') {
      // Bluesky GIFs
      if ((m = /\/([^/]+?AAAAC)\/([^/]+?)\?hh=(\d+?)&ww=(\d+?)$/.exec(url))) {
        const id = m[1].replace(/AAAAC$/, 'AAAP3');
        const file = m[2].replace(/\.gif$/, '.webm');

        const width = m[4];
        const height = m[3];

        return new BlueskyGifSnippet(
          d,
          `https://t.gifs.bsky.app/${id}/${file}`,
          `${width}:${height}`,
          link.description.replace(/^ALT: /, '')
        );
      }
    } else if (d === 'youtube.com' || d === 'm.youtube.com' || d === 'music.youtube.com') {
      // YouTube iframe
      if (p === '/watch') {
        const videoId = q.get('v');
        const seek = q.get('t') || 0;

        return new IframeSnippet(
          d,
          videoId,
          d !== 'music.youtube.com' ? `16:9` : `1:1`,
          SnippetSource.YOUTUBE,
          Number.parseInt(seek.toString())
        );
      }
    } else if (d === 'youtu.be') {
      // YouTube iframe
      if ((m = /^\/([^/]+?)$/.exec(p))) {
        const videoId = m[1];
        const seek = q.get('t') || 0;

        return new IframeSnippet(
          d,
          videoId,
          `16:9`,
          SnippetSource.YOUTUBE,
          Number.parseInt(seek.toString())
        );
      }
    } else if (d === 'soundcloud.com' || d === 'www.soundcloud.com') {
      // SoundCloud embed
      if ((m = /^\/([^/]+?)(?:\/(?!reposts$)([^/]+?)|\/sets\/([^/]+?))?$/.exec(p))) {
        return new IframeSnippet(
          d,
          `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&auto_play=false&visual=false&hide_related=true`,
          m[3] ? `1:1` : `16:9`,
          SnippetSource.SOUNDCLOUD
        );
      }
    }

    // Link snippet, always matches
    return new LinkSnippet(d, u.toString());
  }
}
