import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  OnInit,
  signal,
  WritableSignal
} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {iconsProvider} from "~/src/app/app.config";
import {NgIcon} from "@ng-icons/core";
import {agent} from "~/src/app/core/bsky.api";
import {MskyMessageService} from "~/src/app/api/services/msky-message.service";
import {AgVirtualScrollModule} from "ag-virtual-scroll";
import {ProfileViewDetailed} from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import {DisplayNamePipe} from "~/src/app/shared/utils/pipes/display-name.pipe";
import {NumberFormatterPipe} from "~/src/app/shared/utils/pipes/number-formatter.pipe";
import {RichTextComponent} from "~/src/app/shared/components/utils/rich-text/rich-text.component";
import {AuthorFeedComponent} from "~/src/app/shared/layout/feeds/author-feed/author-feed.component";
import {NgOptimizedImage, NgTemplateOutlet} from "@angular/common";
import {IsLoggedUserPipe} from "~/src/app/shared/utils/pipes/is-logged-user.pipe";
import {from} from "rxjs";
import {ColumnService} from "~/src/app/api/services/column.service";
import {Tooltip} from "primeng/tooltip";

@Component({
  selector: 'author-view-dialog',
  imports: [
    NgIcon,
    AgVirtualScrollModule,
    DisplayNamePipe,
    NumberFormatterPipe,
    RichTextComponent,
    forwardRef(() => AuthorFeedComponent),
    NgTemplateOutlet,
    IsLoggedUserPipe,
    NgOptimizedImage,
    Tooltip
  ],
  templateUrl: './author-view-dialog.component.html',
  styleUrl: './author-view-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    iconsProvider
  ]
})
export class AuthorViewDialogComponent implements OnInit {
  author: ProfileViewDetailed;
  viewMode: WritableSignal<AuthorViewMode> = signal(AuthorViewMode.POSTS);

  protected readonly AuthorViewMode = AuthorViewMode;

  constructor(
    private config: DynamicDialogConfig,
    private dialog: DynamicDialogRef,
    private messageService: MskyMessageService,
    private cdRef: ChangeDetectorRef,
    private columnService: ColumnService
  ) {}

  ngOnInit() {
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

  followUser() {
    from(agent.follow(this.author.did)).subscribe({
      next: response => {
        this.author.viewer.following = response.uri;
        this.cdRef.markForCheck();
        this.messageService.success(`You are now following ${this.author.displayName ?? this.author.handle}`);
      }, error: err => this.messageService.error(err.message, 'Oops!')
    });
  }

  unfollowUser() {
    from(agent.deleteFollow(this.author.viewer.following)).subscribe({
      next: () => {
        this.author.viewer.following = undefined;
        this.cdRef.markForCheck();
        this.messageService.success(`You unfollowed ${this.author.displayName ?? this.author.handle}`);
      }, error: err => this.messageService.error(err.message, 'Oops!')
    });
  }

  addColumn() {
    this.columnService.createAuthorColumn(this.author);
    this.dialog.close();
  }
}

enum AuthorViewMode {
  POSTS = 'POSTS',
  MEDIA = 'MEDIA',
  MORE = 'MORE'
}
