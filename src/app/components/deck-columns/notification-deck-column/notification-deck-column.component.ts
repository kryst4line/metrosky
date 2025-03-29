import {booleanAttribute, ChangeDetectionStrategy, Component, input, model, output} from '@angular/core';
import {Card} from 'primeng/card';
import {NotificationFeedComponent} from '@components/feeds/notification-feed/notification-feed.component';
import {NotificationDeckColumn} from '@models/deck-column';
import {Popover} from 'primeng/popover';
import {ButtonDirective} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {SelectButton} from 'primeng/selectbutton';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'notification-deck-column',
  imports: [
    Card,
    NotificationFeedComponent,
    Popover,
    ButtonDirective,
    Ripple,
    SelectButton,
    FormsModule
  ],
  templateUrl: './notification-deck-column.component.html',
  styles: `
    :host(::ng-deep .p-card-body) {
      min-height: 0;

      .p-card-content {
        overflow: hidden;
      }
    }
    :host(::ng-deep .p-popover) {
      width: 100%;
      left: 0 !important;
      top: 3rem !important;
      --p-popover-background: var(--p-primary-850);
      --p-popover-arrow-left: calc(100% - 3rem) !important;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationDeckColumnComponent {
  column = model.required<NotificationDeckColumn>();
  firstIndex = input(false, {transform: booleanAttribute});
  lastIndex = input(false, {transform: booleanAttribute});
  reorderNext = output();
  reorderPrev = output();
  delete = output();
  widthChange = output<number>();
}
