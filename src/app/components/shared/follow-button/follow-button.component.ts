import {ChangeDetectorRef, Component, model} from '@angular/core';
import {ButtonDirective} from 'primeng/button';
import {IsLoggedUserPipe} from '@shared/pipes/is-logged-user.pipe';
import {Ripple} from 'primeng/ripple';
import {AuthService} from '@core/auth/auth.service';
import {AppBskyActorDefs} from '@atproto/api';
import {from} from 'rxjs';
import {agent} from '@core/bsky.api';
import {MskyMessageService} from '@services/msky-message.service';

@Component({
  selector: 'follow-button',
  imports: [
    ButtonDirective,
    IsLoggedUserPipe,
    Ripple
  ],
  templateUrl: './follow-button.component.html',
})
export class FollowButtonComponent {
  author = model<Partial<{
    did: string,
    displayName: string,
    handle: string,
    viewer: AppBskyActorDefs.ViewerState | undefined
  }>>();

  constructor(
    protected authService: AuthService,
    private messageService: MskyMessageService,
    private cdRef: ChangeDetectorRef
  ) {}

  follow() {
    from(agent.follow(this.author().did)).subscribe({
      next: response => {
        this.author.update(author => {
          author.viewer.following = response.uri;
          return author;
        });
        this.cdRef.markForCheck();
        this.messageService.success(`You are now following ${this.author().displayName ?? this.author().handle}`);
      }, error: err => this.messageService.error(err.message, 'Oops!')
    });
  }

  unfollow() {
    this.messageService.confirm(
      `Are you sure to unfollow ${this.author().displayName ?? this.author().handle}?`,
      'Unfollow'
    ).then(() => {
      from(agent.deleteFollow(this.author().viewer.following)).subscribe({
        next: () => {
          this.author.update(author => {
            author.viewer.following = undefined;
            return author;
          });
          this.cdRef.markForCheck();
          this.messageService.success(`You unfollowed ${this.author().displayName ?? this.author().handle}`);
        }, error: err => this.messageService.error(err.message, 'Oops!')
      });
    });
  }
}
