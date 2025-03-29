import {StorageKeys} from "@core/storage-keys";
import {
  AuthorDeckColumn,
  DeckColumn,
  GeneratorDeckColumn,
  NotificationDeckColumn,
  SearchDeckColumn,
  TimelineDeckColumn
} from "@models/deck-column";
import {Injectable, signal, WritableSignal} from "@angular/core";
import * as uuid from "uuid";

const columns: WritableSignal<Partial<DeckColumn>[]> = signal([]);

@Injectable({
  providedIn: 'root'
})
export class ColumnService {
  public addColumn(column: Partial<DeckColumn>) {
    columns.update(columns => [...columns, column]);
    this.saveColumns();
  }

  public updateColumn(column: Partial<DeckColumn>) {
    columns.update(columns => {
      columns[columns.findIndex(col => col.uuid == column.uuid)] = column;
      return columns;
    });
    this.saveColumns();
  }

  public deleteColumn(uuid: string) {
    columns.update(columns => {
      columns.splice(columns.findIndex(col => col.uuid == uuid), 1);
      columns.forEach((column, index) => column.index = index);
      return columns;
    });
    this.saveColumns();
  }

  public getColumns(): WritableSignal<Partial<DeckColumn>[]> {
    return columns;
  }

  public saveColumns() {
    localStorage.setItem(StorageKeys.DECK_COLUMNS, JSON.stringify(columns()));
  }

  public checkColumns() {
    let storageColumns: Partial<DeckColumn>[] = JSON.parse(localStorage.getItem(StorageKeys.DECK_COLUMNS));

    if (!storageColumns || !storageColumns.length) {
      this.initColumns();
      return;
    }

    storageColumns.forEach((column: any) => {
      if (!column.width) column.width = 450;
      if (!column.uuid) column.uuid = uuid.v4();
    });

    localStorage.setItem(StorageKeys.DECK_COLUMNS, JSON.stringify(storageColumns));
    columns.set(storageColumns);
  }

  public initColumns() {
    this.createTimelineColumn();
    this.createNotificationsColumn();
    this.createAuthorColumn(JSON.parse(localStorage.getItem(StorageKeys.LOGGED_USER)));
  }

  public createTimelineColumn() {
    let column = new TimelineDeckColumn();
    column.title = 'Home';
    column.index = columns().length;
    this.addColumn(column);
  }

  public createNotificationsColumn() {
    let column = new NotificationDeckColumn();
    column.title = 'Notifications';
    column.index = columns().length;
    this.addColumn(column);
  }

  public createAuthorColumn(author: Partial<{did: string, handle: string, displayName: string}>) {
    let column = new AuthorDeckColumn();
    column.did = author.did;
    column.handle = author.handle;
    column.displayName = author.displayName;
    column.index = columns().length;
    this.addColumn(column);
  }

  public createGeneratorColumn(generator: Partial<{uri: string, avatar: string, displayName: string}>) {
    let column = new GeneratorDeckColumn();
    column.title = generator.displayName;
    column.uri = generator.uri;
    column.avatar = generator.avatar;
    column.index = columns().length;
    this.addColumn(column);
  }

  public createSearchColumn(query: string, sort: 'top' | 'latest') {
    let column = new SearchDeckColumn();
    column.query = query;
    column.sort = sort;
    column.index = columns().length;
    this.addColumn(column);
  }
}
