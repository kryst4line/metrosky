import {booleanAttribute, ChangeDetectionStrategy, Component, input, model, output, signal} from '@angular/core';
import {NotificationFeedComponent} from "~/src/app/shared/layout/feeds/notification-feed/notification-feed.component";
import {NgIcon} from "@ng-icons/core";
import {Ripple} from "primeng/ripple";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NotificationsDeckColumn} from "~/src/app/api/models/deck-column";

@Component({
  selector: 'notifications-deck-column',
  imports: [
    NotificationFeedComponent,
    NgIcon,
    Ripple,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './notifications-deck-column.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsDeckColumnComponent {
  column = model.required<NotificationsDeckColumn>();
  lastIndex = input(false, {transform: booleanAttribute});
  reorder = output<{previousIndex: number, newIndex: number}>();
  delete = output();
  openSettings = signal(false);

  updateTitle(title: string) {
    this.column.update(column => {
      column.title = title;
      return {...column};
    });
  }
}
