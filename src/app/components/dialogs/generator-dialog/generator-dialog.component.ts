import {ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, signal} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {AppBskyFeedDefs} from "@atproto/api";
import {from} from "rxjs";
import {MskyMessageService} from '@services/msky-message.service';
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
  generator = signal<AppBskyFeedDefs.GeneratorView>(undefined);
  uri = signal<string>(undefined);

  constructor(
    protected dialog: DynamicDialogRef,
    config: DynamicDialogConfig,
    protected columnService: ColumnService,
    private messageService: MskyMessageService,
    private cdRef: ChangeDetectorRef
  ) {
    this.generator.set(config.data.generator);
    // this.loadFeed();
  }

  // loadFeed() {
  //   from(agent.app.bsky.feed.getFeedGenerator({
  //     feed: this.generator().uri
  //   })).subscribe({
  //     next: response => {
  //       this.generator.set(response.data.view);
  //     }, error: (err: HttpErrorResponse) => {
  //       this.messageService.error(err.message);
  //       this.dialog.close();
  //     }
  //   });
  // }

  like() {
    from(agent.like(this.generator().uri, this.generator().cid)).subscribe({
      next: response => {
        this.generator.update(feed => {
          feed.viewer.like = response.uri;
          return feed;
        });
        this.cdRef.markForCheck();
      }, error: err => this.messageService.error(err.message)
    });
  }

  unlike() {
    from(agent.deleteLike(this.generator().viewer.like)).subscribe({
      next: () => {
        this.generator.update(feed => {
          feed.viewer.like = undefined;
          return feed;
        });
        this.cdRef.markForCheck();
      }, error: err => this.messageService.error(err.message)
    });
  }

  addAsColumn() {
    this.columnService.createGeneratorColumn(this.generator());
    this.dialog.close();
  }
}
