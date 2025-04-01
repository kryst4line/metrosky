import {ChangeDetectionStrategy, ChangeDetectorRef, Component, signal} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {ColumnService} from '@services/column.service';
import {MentionModule} from 'angular-mentions';
import {agent} from '@core/bsky.api';
import {FormsModule} from '@angular/forms';
import {MskyDialogService} from '@services/msky-dialog.service';
import {Card} from 'primeng/card';
import {Divider} from 'primeng/divider';
import {MskyMessageService} from '@services/msky-message.service';
import {AppBskyFeedDefs} from '@atproto/api';
import {GeneratorCardComponent} from '@components/cards/generator-card/generator-card.component';
import {from} from 'rxjs';
import {ProgressSpinner} from 'primeng/progressspinner';

@Component({
  selector: 'generator-list-dialog',
  imports: [
    MentionModule,
    FormsModule,
    Card,
    Divider,
    GeneratorCardComponent,
    ProgressSpinner,
  ],
  templateUrl: './generator-list-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneratorListDialogComponent {
  generators = signal<AppBskyFeedDefs.GeneratorView[]>(undefined);
  cursor = signal<string>(undefined);

  constructor(
    config: DynamicDialogConfig,
    private dialog: DynamicDialogRef,
    protected dialogService: MskyDialogService,
    protected messageService: MskyMessageService,
    protected cdRef: ChangeDetectorRef,
    private columnService: ColumnService
  ) {
    this.initGenerators();
  }

  initGenerators() {
    from(agent.getPreferences()).subscribe({
      next: response => {
        from(agent.app.bsky.feed.getFeedGenerators({
          feeds: response.savedFeeds.filter(feed => feed.type == 'feed').map(feed => feed.value)
        })).subscribe({
          next: response => this.generators.set(response.data.feeds),
          error: err => this.messageService.error(err.message)
        })
      }, error: err => this.messageService.error(err.message)
    });
  }

  addAsColumn(generator: AppBskyFeedDefs.GeneratorView) {
    this.columnService.createGeneratorColumn(generator);
    this.dialog.close();
  }
}
