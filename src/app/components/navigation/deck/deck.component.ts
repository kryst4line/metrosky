import {ChangeDetectionStrategy, Component, WritableSignal} from '@angular/core';
import {RippleModule} from "primeng/ripple";
import {
  TimelineDeckColumnComponent
} from '@components/deck-columns/timeline-deck-column/timeline-deck-column.component';
import {
  NotificationDeckColumnComponent
} from '@components/deck-columns/notification-deck-column/notification-deck-column.component';
import {AuthorDeckColumnComponent} from '@components/deck-columns/author-deck-column/author-deck-column.component';
import {DeckColumn, SearchDeckColumn} from '@models/deck-column';
import {PostService} from '@services/post.service';
import {MskyDialogService} from '@services/msky-dialog.service';
import {ColumnService} from '@services/column.service';
import {IsDeckColumnTimelinePipe} from '@shared/pipes/type-guards/is-deckcolumn-timeline';
import {IsDeckColumnNotificationsPipe} from '@shared/pipes/type-guards/is-deckcolumn-notifications';
import {IsDeckColumnAuthorPipe} from '@shared/pipes/type-guards/is-deckcolumn-author';
import {IsDeckColumnSearchPipe} from '@shared/pipes/type-guards/is-deckcolumn-search';
import {IsDeckColumnListPipe} from '@shared/pipes/type-guards/is-deckcolumn-list';
import {MskyMessageService} from '@services/msky-message.service';
import {SearchDeckColumnComponent} from '@components/deck-columns/search-deck-column/search-deck-column.component';
import {IsDeckColumnGeneratorPipe} from '@shared/pipes/type-guards/is-deckcolumn-generator';
import {
  GeneratorDeckColumnComponent
} from '@components/deck-columns/generator-deck-column/generator-deck-column.component';

@Component({
  selector: 'deck',
  imports: [
    RippleModule,
    TimelineDeckColumnComponent,
    NotificationDeckColumnComponent,
    AuthorDeckColumnComponent,
    IsDeckColumnTimelinePipe,
    IsDeckColumnNotificationsPipe,
    IsDeckColumnAuthorPipe,
    IsDeckColumnSearchPipe,
    IsDeckColumnListPipe,
    SearchDeckColumnComponent,
    IsDeckColumnGeneratorPipe,
    GeneratorDeckColumnComponent
  ],
  templateUrl: './deck.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeckComponent {
  columns: WritableSignal<Partial<DeckColumn>[]>;

  constructor(
    protected postService: PostService,
    protected dialogService: MskyDialogService,
    private columnService: ColumnService,
    private messageService: MskyMessageService
  ) {
    this.columns = columnService.getColumns();
  }

  onColumnChange(column: Partial<DeckColumn>) {
    this.columnService.updateColumn(column);
  }

  onDeleteColumn(uuid: string) {
    this.messageService.confirm('Are you sure to delete this column?', 'Delete').then(() => {
      this.columnService.deleteColumn(uuid);
    })
  }

  reorder(index: number, next: number) {
    this.columns.update(columns => {
      const oldCols = columns.toSorted((a, b) => a.index - b.index);
      const item = oldCols.splice(oldCols.findIndex(col => col.index == index), 1)[0];
      oldCols.splice(next, 0, item);
      oldCols.forEach((col, i) => columns.find(c => c.uuid == col.uuid).index = i);
      return columns;
    });
    this.columnService.saveColumns();
  }

  widthChange(uuid: string, width: number) {
    this.columns.update(columns => {
      columns.find(col => col.uuid == uuid).width = width;
      return columns;
    });
    this.columnService.saveColumns();
  }

  sortChange(uuid: string, sort: 'top' | 'latest') {
    this.columns.update(columns => {
      (columns.find(col => col.uuid == uuid) as SearchDeckColumn).sort = sort;
      return columns;
    });
    this.columnService.saveColumns();
  }
}
