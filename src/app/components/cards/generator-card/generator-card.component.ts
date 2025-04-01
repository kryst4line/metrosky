import {booleanAttribute, ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {AppBskyFeedDefs} from '@atproto/api';
import {Avatar} from 'primeng/avatar';
import {DisplayNamePipe} from '@shared/pipes/display-name.pipe';
import {ButtonDirective} from 'primeng/button';
import {Ripple} from 'primeng/ripple';

@Component({
  selector: 'generator-card',
  imports: [
    Avatar,
    DisplayNamePipe,
    ButtonDirective,
    Ripple
  ],
  templateUrl: './generator-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneratorCardComponent {
  generator = input<AppBskyFeedDefs.GeneratorView>();
  addColumnButton = input(false, {transform: booleanAttribute});
  likeButton = input(false, {transform: booleanAttribute});

  onClick = output();
  onAuthorClick = output();
  onAddAsColumnClick = output();
  onLike = output();
  onUnlike = output();
}
