import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
  signal
} from '@angular/core';
import {TimelineFeedComponent} from "~/src/app/shared/layout/feeds/timeline-feed/timeline-feed.component";
import {NgIcon} from "@ng-icons/core";
import {FormsModule} from "@angular/forms";
import {Ripple} from "primeng/ripple";
import {TimelineDeckColumn} from "~/src/app/api/models/deck-column";

@Component({
  selector: 'timeline-deck-column',
  imports: [
    TimelineFeedComponent,
    NgIcon,
    FormsModule,
    Ripple,
  ],
  templateUrl: './timeline-deck-column.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelineDeckColumnComponent {
  column = model.required<TimelineDeckColumn>();
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
