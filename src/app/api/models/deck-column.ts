import * as uuid from "uuid";

export class DeckColumn {
  uuid: string = uuid.v4();
  title: string = '';
  width: number = 480;
  index: number;
}

export class TimelineDeckColumn extends DeckColumn {
  type: DeckColumnType.TIMELINE = DeckColumnType.TIMELINE;
}

export class NotificationsDeckColumn extends DeckColumn {
  type: DeckColumnType.NOTIFICATIONS = DeckColumnType.NOTIFICATIONS;
}

export class AuthorDeckColumn extends DeckColumn {
  type: DeckColumnType.AUTHOR = DeckColumnType.AUTHOR;
  did: string;
  handle: string;
  mode: AuthorDeckColumnMode = AuthorDeckColumnMode.POSTS;
}

export class ListDeckColumn extends DeckColumn {
  type: DeckColumnType.LIST = DeckColumnType.LIST;
  did: string;
}

export class SearchDeckColumn extends DeckColumn {
  type: DeckColumnType.SEARCH = DeckColumnType.SEARCH;
  search: string;
}

export enum DeckColumnType {
  TIMELINE = 'TIMELINE',
  NOTIFICATIONS = 'NOTIFICATIONS',
  AUTHOR = 'AUTHOR',
  LIST = 'LIST',
  SEARCH = 'SEARCH'
}

export enum AuthorDeckColumnMode {
  POSTS = 'posts_no_replies',
  REPLIES = 'posts_with_replies',
  MEDIA = 'posts_with_media',
  VIDEO = 'posts_with_video'
}
