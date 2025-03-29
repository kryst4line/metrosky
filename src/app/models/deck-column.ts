import * as uuid from "uuid";

export class DeckColumn {
  uuid: string = uuid.v4();
  title: string = '';
  width: number = 450;
  index: number;
}

export class TimelineDeckColumn extends DeckColumn {
  type: DeckColumnType.TIMELINE = DeckColumnType.TIMELINE;
}

export class NotificationDeckColumn extends DeckColumn {
  type: DeckColumnType.NOTIFICATION = DeckColumnType.NOTIFICATION;
}

export class AuthorDeckColumn extends DeckColumn {
  type: DeckColumnType.AUTHOR = DeckColumnType.AUTHOR;
  did: string;
  handle: string;
  displayName: string;
  mode: AuthorDeckColumnMode = AuthorDeckColumnMode.POSTS;
}

export class ListDeckColumn extends DeckColumn {
  type: DeckColumnType.LIST = DeckColumnType.LIST;
  did: string;
}

export class GeneratorDeckColumn extends DeckColumn {
  type: DeckColumnType.GENERATOR = DeckColumnType.GENERATOR;
  uri: string;
  avatar: string;
}

export class SearchDeckColumn extends DeckColumn {
  type: DeckColumnType.SEARCH = DeckColumnType.SEARCH;
  query: string;
  sort: 'top' | 'latest';
}

export enum DeckColumnType {
  TIMELINE = 'TIMELINE',
  NOTIFICATION = 'NOTIFICATION',
  AUTHOR = 'AUTHOR',
  LIST = 'LIST',
  GENERATOR = 'GENERATOR',
  SEARCH = 'SEARCH'
}

export enum AuthorDeckColumnMode {
  POSTS = 'posts_no_replies',
  REPLIES = 'posts_with_replies',
  MEDIA = 'posts_with_media',
  VIDEO = 'posts_with_video'
}
