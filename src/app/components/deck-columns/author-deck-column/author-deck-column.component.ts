import {booleanAttribute, ChangeDetectionStrategy, Component, input, model, output} from '@angular/core';
import {Card} from 'primeng/card';
import {AuthorFeedComponent} from '@components/feeds/author-feed/author-feed.component';
import {AuthorDeckColumn} from '@models/deck-column';
import {ButtonDirective} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {Popover} from 'primeng/popover';
import {SelectButton} from 'primeng/selectbutton';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'author-deck-column',
  imports: [
    Card,
    AuthorFeedComponent,
    ButtonDirective,
    Ripple,
    Popover,
    SelectButton,
    FormsModule
  ],
  templateUrl: './author-deck-column.component.html',
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
export class AuthorDeckColumnComponent {
  column = model.required<AuthorDeckColumn>();
  firstIndex = input(false, {transform: booleanAttribute});
  lastIndex = input(false, {transform: booleanAttribute});
  reorderNext = output();
  reorderPrev = output();
  delete = output();
  widthChange = output<number>();
}
