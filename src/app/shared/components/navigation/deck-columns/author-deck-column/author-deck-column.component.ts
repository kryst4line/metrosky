import {booleanAttribute, ChangeDetectionStrategy, Component, input, model, output, signal} from '@angular/core';
import {AuthorFeedComponent} from "~/src/app/shared/layout/feeds/author-feed/author-feed.component";
import {NgIcon} from "@ng-icons/core";
import {Ripple} from "primeng/ripple";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthorDeckColumn, AuthorDeckColumnMode} from "~/src/app/api/models/deck-column";

@Component({
  selector: 'author-deck-column',
  imports: [
    AuthorFeedComponent,
    NgIcon,
    Ripple,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './author-deck-column.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorDeckColumnComponent {
  column = model.required<AuthorDeckColumn>();
  lastIndex = input(false, {transform: booleanAttribute});
  delete = output();
  reorder = output<{previousIndex: number, newIndex: number}>();
  openSettings = signal(false);
  protected readonly AuthorDeckColumnMode = AuthorDeckColumnMode;

  updateTitle(title: string) {
    this.column.update(column => {
      column.title = title;
      return {...column};
    });
  }
}
