import {ChangeDetectionStrategy, Component, ElementRef, forwardRef, signal} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {AppBskyFeedDefs} from "@atproto/api";
import {from} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {MskyMessageService} from '@services/msky-message.service';
import {MskyDialogService} from '@services/msky-dialog.service';
import {agent} from '@core/bsky.api';
import {ProgressSpinner} from 'primeng/progressspinner';
import {Avatar} from 'primeng/avatar';
import {DisplayNamePipe} from '@shared/pipes/display-name.pipe';
import {RichTextComponent} from '@components/shared/rich-text/rich-text.component';
import {ButtonDirective} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {GeneratorFeedComponent} from '@components/feeds/generator-feed/generator-feed.component';
import {ColumnService} from '@services/column.service';

@Component({
  selector: 'generator-dialog',
  imports: [
    ProgressSpinner,
    Avatar,
    DisplayNamePipe,
    forwardRef(() => RichTextComponent),
    ButtonDirective,
    Ripple,
    forwardRef(() => GeneratorFeedComponent),
  ],
  templateUrl: './generator-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneratorDialogComponent {
  feedInfo = signal<AppBskyFeedDefs.GeneratorView>(undefined);
  uri = signal<string>(undefined);

  constructor(
    protected ref: DynamicDialogRef,
    config: DynamicDialogConfig,
    protected columnService: ColumnService,
    private messageService: MskyMessageService,
    private dialogService: MskyDialogService,
    private parentRef: ElementRef,
  ) {
    this.uri.set(config.data.uri);
    this.loadFeed();
  }

  loadFeed() {
    from(agent.app.bsky.feed.getFeedGenerator({
      feed: this.uri()
    })).subscribe({
      next: response => {
        this.feedInfo.set(response.data.view);
      }, error: (err: HttpErrorResponse) => {
        this.messageService.error(err.message);
        this.ref.close();
      }
    });
  }

  openPost(uri: string) {
    // Mute all video players
    this.parentRef.nativeElement.querySelectorAll('video').forEach((video: HTMLVideoElement) => {
      video.muted = true;
    });

    this.dialogService.openThread(uri, this.parentRef.nativeElement);
  }
}
