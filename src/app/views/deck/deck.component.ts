import {
  ChangeDetectionStrategy,
  Component,
  WritableSignal
} from '@angular/core';
import {SidebarComponent} from "~/src/app/shared/components/navigation/sidebar/sidebar.component";
import {PostComposerComponent} from "~/src/app/shared/layout/dialogs/post-composer/post-composer.component";
import {Drawer} from "primeng/drawer";
import {PostService} from "~/src/app/api/services/post.service";
import {FileUploadModule} from "ng2-file-upload";
import {MskyDialogService} from "~/src/app/api/services/msky-dialog.service";
import {
  TimelineDeckColumnComponent
} from "~/src/app/shared/components/navigation/deck-columns/timeline-deck-column/timeline-deck-column.component";
import {
  NotificationsDeckColumnComponent
} from "~/src/app/shared/components/navigation/deck-columns/notifications-deck-column/notifications-deck-column.component";
import {
  AuthorDeckColumnComponent
} from "~/src/app/shared/components/navigation/deck-columns/author-deck-column/author-deck-column.component";
import {DeckColumn} from "~/src/app/api/models/deck-column";
import {ColumnService} from "~/src/app/api/services/column.service";
import {IsDeckColumnTimelinePipe} from "~/src/app/shared/utils/pipes/type-guards/is-deckcolumn-timeline";
import {IsDeckColumnNotificationsPipe} from "~/src/app/shared/utils/pipes/type-guards/is-deckcolumn-notifications";
import {IsDeckColumnAuthorPipe} from "~/src/app/shared/utils/pipes/type-guards/is-deckcolumn-author";
import {IsDeckColumnSearchPipe} from "~/src/app/shared/utils/pipes/type-guards/is-deckcolumn-search";
import {IsDeckColumnListPipe} from "~/src/app/shared/utils/pipes/type-guards/is-deckcolumn-list";
import {moveItemInArray} from "@angular/cdk/drag-drop";
import {NgIcon} from "@ng-icons/core";

@Component({
  selector: 'app-deck',
  imports: [
    SidebarComponent,
    PostComposerComponent,
    Drawer,
    FileUploadModule,
    TimelineDeckColumnComponent,
    NotificationsDeckColumnComponent,
    AuthorDeckColumnComponent,
    IsDeckColumnTimelinePipe,
    IsDeckColumnNotificationsPipe,
    IsDeckColumnAuthorPipe,
    IsDeckColumnSearchPipe,
    IsDeckColumnListPipe,
    NgIcon
  ],
  templateUrl: './deck.component.html',
  styleUrl: './deck.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeckComponent {
  columns: WritableSignal<Partial<DeckColumn>[]>;

  constructor(
    protected postService: PostService,
    protected dialogService: MskyDialogService,
    private columnService: ColumnService
  ) {
    this.columns = columnService.getColumns();
  }

  onColumnChange(column: Partial<DeckColumn>) {
    this.columnService.updateColumn(column);
  }

  onDeleteColumn(uuid: string) {
    this.columnService.deleteColumn(uuid);
  }

  reorder(index: number, next: number) {
    this.columns.update(columns => {
      const oldCols = columns.toSorted((a, b) => a.index - b.index);
      moveItemInArray(oldCols, index, next);
      oldCols.forEach((col, i) => columns.find(c => c.uuid == col.uuid).index = i);
      return columns;
    });
    this.columnService.saveColumns();
  }
}
