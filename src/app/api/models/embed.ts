import {UrlMetadata} from "~/src/app/api/models/url-metadata";
import {BlueskyGifSnippet, IframeSnippet, LinkSnippet} from "~/src/app/api/models/snippet";

export const enum EmbedType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  EXTERNAL = 'EXTERNAL',
  RECORD = 'RECORD',
}
export const enum RecordEmbedType {
  POST = 'POST',
  FEED = 'FEED',
  LIST = 'LIST',
  STARTER_PACK = 'STARTER_PACK',
}

interface Embed {
  type: EmbedType.IMAGE | EmbedType.VIDEO | EmbedType.EXTERNAL | EmbedType.RECORD;
}

export class ImageEmbed implements Embed {
  type: EmbedType.IMAGE = EmbedType.IMAGE;
  /** Image array */
  images: {data: string, alt: string}[] = [];
}

export class VideoEmbed implements Embed {
  type: EmbedType.VIDEO = EmbedType.VIDEO;
  /** Video file */
  file: File;
  thumbnail: string;

  constructor(file: File, thumbnail: string) {
    this.file = file;
    this.thumbnail = thumbnail;
  }
}

export class ExternalEmbed implements Embed {
  type: EmbedType.EXTERNAL = EmbedType.EXTERNAL;
  /** Url */
  url: string;
  /** Extended info */
  metadata: UrlMetadata;
  /** Extended info */
  snippet: LinkSnippet | BlueskyGifSnippet | IframeSnippet;

  constructor(url: string) {
    this.url = url;
  }
}

export class RecordEmbed implements Embed {
  type: EmbedType.RECORD = EmbedType.RECORD;
  /** Record type */
  recordType: RecordEmbedType;
  /** Record info */
  author: string;
  rkey: string;

  constructor(recordType: RecordEmbedType, author: string, rkey: string) {
    this.recordType = recordType;
    this.author = author;
    this.rkey = rkey;
  }
}
