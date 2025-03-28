export const enum SnippetType {
  LINK= 'LINK',
  BLUESKY_GIF = 'BLUESKY_GIF',
  IFRAME = 'IFRAME',
}

export const enum SnippetSource {
  YOUTUBE = 'YOUTUBE',
  SOUNDCLOUD = 'SOUNDCLOUD',
}

interface Snippet {
  type: SnippetType.LINK | SnippetType.BLUESKY_GIF | SnippetType.IFRAME;
  /** Domain name */
  domain: string;
  /** URL */
  url: string;
}

export class LinkSnippet implements Snippet {
  type: SnippetType.LINK = SnippetType.LINK;
  /** Domain name */
  domain: string;
  /** URL */
  url: string;

  constructor(domain: string, url: string) {
    this.domain = domain;
    this.url = url;
  }
}

export class BlueskyGifSnippet implements Snippet {
  type: SnippetType.BLUESKY_GIF = SnippetType.BLUESKY_GIF;
  /** Domain name */
  domain: string;
  /** Video URL */
  url: string;
  /** Aspect ratio */
  ratio: string;
  /** Alt text description */
  description: string;

  constructor(domain: string, url: string, ratio: string, description: string) {
    this.domain = domain;
    this.url = url;
    this.ratio = ratio;
    this.description = description;
  }
}

export class IframeSnippet implements Snippet {
  type: SnippetType.IFRAME = SnippetType.IFRAME;
  /** Source domain */
  domain: string;
  /** Iframe URL or Youtube ID */
  url: string;
  /** Aspect ratio */
  ratio: string;
  /** Source type */
  source: SnippetSource;
  /** The second is supposed to start at in a Youtube video */
  seek: number;

  constructor(domain: string, url: string, ratio: string, source: SnippetSource, seek?: number) {
    this.domain = domain;
    this.url = url;
    this.ratio = ratio;
    this.source = source;
    this.seek = seek;
  }
}
