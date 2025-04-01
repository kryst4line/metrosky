import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {AppBskyActorDefs} from '@atproto/api';
import {Avatar} from 'primeng/avatar';
import {DisplayNamePipe} from '@shared/pipes/display-name.pipe';
import {FollowButtonComponent} from '@components/shared/follow-button/follow-button.component';

@Component({
  selector: 'author-card',
  imports: [
    Avatar,
    DisplayNamePipe,
    FollowButtonComponent
  ],
  templateUrl: './author-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorCardComponent {
  user = input<Partial<{
    did: string,
    avatar: string,
    displayName: string,
    handle: string,
    description: string,
    viewer: AppBskyActorDefs.ViewerState | undefined
  }>>();

  onClick = output<string>();
}
