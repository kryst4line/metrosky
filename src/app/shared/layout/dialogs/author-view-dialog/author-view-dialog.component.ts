import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef, forwardRef,
  OnInit,
  signal,
  WritableSignal
} from '@angular/core';
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {iconsProvider} from "~/src/app/app.config";
import {NgIcon} from "@ng-icons/core";
import {agent} from "~/src/app/core/bsky.api";
import {MessageService} from "~/src/app/api/services/message.service";
import {PostService} from "~/src/app/api/services/post.service";
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
    protected ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private postService: PostService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private parentRef: ElementRef,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadAuthor();
  }

  loadAuthor() {
    agent.getProfile({
      actor: this.config.data.actor
    }).then(response => {
      this.author = response.data;
      this.cdRef.markForCheck();
    });
  }
}

enum AuthorViewMode {
  POSTS = 'POSTS',
  MEDIA = 'MEDIA',
  MORE = 'MORE'
}
