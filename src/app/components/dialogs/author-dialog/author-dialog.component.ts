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
import {FollowButtonComponent} from '@components/shared/follow-button/follow-button.component';
import {Tooltip} from 'primeng/tooltip';
import {MskyDialogService} from '@services/msky-dialog.service';
import {MenuItem, PrimeIcons} from 'primeng/api';
import {LinkExtractorPipe} from '@shared/pipes/link-extractor.pipe';
import {Menu} from 'primeng/menu';

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
    Tooltip,
    Menu
  ],
  templateUrl: './author-dialog.component.html',
  providers: [
    LinkExtractorPipe
  ]
})
export class AuthorDialogComponent {
  author = signal<AppBskyActorDefs.ProfileViewDetailed>(undefined);
  viewMode: WritableSignal<AuthorViewMode> = signal(AuthorViewMode.POSTS);
  protected readonly AuthorViewMode = AuthorViewMode;

  menuItems = signal<MenuItem[]>(undefined);

  constructor(
    private config: DynamicDialogConfig,
    private dialog: DynamicDialogRef,
    private dialogService: MskyDialogService,
    private messageService: MskyMessageService,
    private cdRef: ChangeDetectorRef,
    private columnService: ColumnService,
    private linkExtractorPipe: LinkExtractorPipe
  ) {
    this.loadAuthor();
  }

  loadAuthor() {
    from(agent.getProfile({
      actor: this.config.data.actor
    })).subscribe({
      next: response => {
        this.author.set(response.data);
        this.cdRef.markForCheck();
      }, error: err => this.messageService.error(err.message, 'Oops!')
    });
  }

  refreshMenuItems() {
    this.menuItems.set([
      {
        label: this.author().viewer.muted ? 'Unmute user' : 'Mute user',
        icon: this.author().viewer.muted ? 'pi pi-eye' : 'pi pi-eye-slash',
        command: () => this.author().viewer.muted ? this.unmute() : this.mute()
      },
      {
        label: this.author().viewer.blocking ? 'Unblock user' : 'Block user',
        icon: this.author().viewer.blocking ? PrimeIcons.USER_PLUS : PrimeIcons.BAN,
        command: () => this.author().viewer.blocking ? this.unblock() : this.block()
      },
      {
        label: 'Copy link',
        icon: 'pi pi-link',
        command: () => {
          navigator.clipboard.writeText(
            this.linkExtractorPipe.transform(
              undefined,
              this.author().handle
            )
          );
        }
      },
      {
        label: 'Open in Bsky',
        icon: 'pi pi-upload',
        url: this.linkExtractorPipe.transform(undefined, this.author().handle)
      },
    ]);
  }

  addAsColumn() {
    this.columnService.createAuthorColumn(this.author());
    this.dialog.close();
  }

  openSearch() {
    this.dialogService.openSearch(`from:${this.author().handle} `);
  }

  mute() {
    this.messageService.confirm(`Do you really want to mute ${this.author().displayName ?? this.author().handle}?`, 'Mute').then(() => {
      from(agent.mute(this.author().did)).subscribe({
        next: () => {
          this.author.update(author => {
            author.viewer.muted = true;
            return author;
          });
          this.refreshMenuItems();
          this.messageService.info(`${this.author().displayName ?? this.author().handle} has been muted`);
        }, error: err => this.messageService.error(err.message)
      });
    });
  }

  unmute() {
    this.messageService.confirm(`Do you really want to unmute ${this.author().displayName ?? this.author().handle}?`, 'Mute').then(() => {
      from(agent.unmute(this.author().did)).subscribe({
        next: () => {
          this.author.update(author => {
            author.viewer.muted = false;
            return author;
          });
          this.refreshMenuItems();
          this.messageService.info(`${this.author().displayName ?? this.author().handle} has been unmuted`);
        }, error: err => this.messageService.error(err.message)
      });
    });
  }

  block() {
    this.messageService.confirm(`Do you really want to block ${this.author().displayName ?? this.author().handle}?`, 'Mute').then(() => {
      from(agent.app.bsky.graph.block.create(
        {repo: agent.session.did},
        {subject: this.author().did, createdAt: new Date().toISOString()}
      )).subscribe({
        next: response => {
          this.author.update(author => {
            author.viewer.blocking = response.uri;
            return author;
          });
          this.refreshMenuItems();
        }, error: err => this.messageService.error(err.message)
      });
    });
  }

  unblock() {
    this.messageService.confirm(`Do you really want to unblock ${this.author().displayName ?? this.author().handle}?`, 'Mute').then(() => {
      from(agent.app.bsky.graph.block.delete(
        {repo: agent.session.did, rkey: this.author().viewer.blocking}
      )).subscribe({
        next: () => {
          this.author.update(author => {
            author.viewer.blocking = undefined;
            return author;
          });
          this.refreshMenuItems();
        }, error: err => this.messageService.error(err.message)
      });
    });
  }
}

enum AuthorViewMode {
  POSTS = 'POSTS',
  REPLIES = 'REPLIES',
  MEDIA = 'MEDIA',
  MORE = 'MORE'
}
