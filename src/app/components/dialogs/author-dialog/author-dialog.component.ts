import {ChangeDetectorRef, Component, forwardRef, signal, WritableSignal} from '@angular/core';
import {AppBskyActorDefs} from '@atproto/api';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {MskyMessageService} from '@services/msky-message.service';
import {ColumnService} from '@services/column.service';
import {from} from 'rxjs';
import {agent} from '@core/bsky.api';
import {Image} from 'primeng/image';
import {Avatar} from 'primeng/avatar';
import {ButtonDirective} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {DisplayNamePipe} from '@shared/pipes/display-name.pipe';
import {RichTextComponent} from '@components/shared/rich-text/rich-text.component';
import {Card} from 'primeng/card';
import {NgTemplateOutlet} from '@angular/common';
import {AuthorFeedComponent} from '@components/feeds/author-feed/author-feed.component';
import {ProgressSpinner} from 'primeng/progressspinner';
import {AuthService} from '@core/auth/auth.service';
import {FollowButtonComponent} from '@components/shared/follow-button/follow-button.component';
import {Tooltip} from 'primeng/tooltip';

@Component({
  selector: 'author-dialog',
  imports: [
    Image,
    Avatar,
    ButtonDirective,
    Ripple,
    DisplayNamePipe,
    forwardRef(() => RichTextComponent),
    Card,
    NgTemplateOutlet,
    AuthorFeedComponent,
    ProgressSpinner,
    FollowButtonComponent,
    Tooltip
  ],
  templateUrl: './author-dialog.component.html'
})
export class AuthorDialogComponent {
  author: AppBskyActorDefs.ProfileViewDetailed;
  viewMode: WritableSignal<AuthorViewMode> = signal(AuthorViewMode.POSTS);
  protected readonly AuthorViewMode = AuthorViewMode;

  constructor(
    private config: DynamicDialogConfig,
    private dialog: DynamicDialogRef,
    protected authService: AuthService,
    private messageService: MskyMessageService,
    private cdRef: ChangeDetectorRef,
    private columnService: ColumnService
  ) {
    this.loadAuthor();
  }

  loadAuthor() {
    from(agent.getProfile({
      actor: this.config.data.actor
    })).subscribe({
      next: response => {
        this.author = response.data;
        this.cdRef.markForCheck();
      }, error: err => this.messageService.error(err.message, 'Oops!')
    });
  }

  addAsColumn() {
    this.columnService.createAuthorColumn(this.author);
    this.dialog.close();
  }
}

enum AuthorViewMode {
  POSTS = 'POSTS',
  REPLIES = 'REPLIES',
  MEDIA = 'MEDIA',
  MORE = 'MORE'
}
