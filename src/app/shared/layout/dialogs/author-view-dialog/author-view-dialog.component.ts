import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  OnInit,
  signal,
  WritableSignal
} from '@angular/core';
import {DynamicDialogConfig} from "primeng/dynamicdialog";
import {iconsProvider} from "~/src/app/app.config";
import {NgIcon} from "@ng-icons/core";
import {agent} from "~/src/app/core/bsky.api";
import {MskyMessageService} from "~/src/app/api/services/msky-message.service";
import {AgVirtualScrollModule} from "ag-virtual-scroll";
import {ProfileViewDetailed} from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import {DisplayNamePipe} from "~/src/app/shared/utils/pipes/display-name.pipe";
import {NumberFormatterPipe} from "~/src/app/shared/utils/pipes/number-formatter.pipe";
import {
  RichTextDisplayComponent
} from "~/src/app/shared/components/rich-text/rich-text-display/rich-text-display.component";
import {AuthorFeedComponent} from "~/src/app/shared/layout/feeds/author-feed/author-feed.component";
import {NgTemplateOutlet} from "@angular/common";
import {IsLoggedUserPipe} from "~/src/app/shared/utils/pipes/is-logged-user.pipe";
import {from} from "rxjs";

@Component({
  selector: 'author-view-dialog',
  imports: [
    NgIcon,
    AgVirtualScrollModule,
    DisplayNamePipe,
    NumberFormatterPipe,
    RichTextDisplayComponent,
    forwardRef(() => AuthorFeedComponent),
    NgTemplateOutlet,
    IsLoggedUserPipe
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
    private messageService: MskyMessageService,
    private cdRef: ChangeDetectorRef
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
}

enum AuthorViewMode {
  POSTS = 'POSTS',
  MEDIA = 'MEDIA',
  MORE = 'MORE'
}
