import {ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, signal, viewChild} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {ColumnService} from '@services/column.service';
import {SearchFeedComponent} from '@components/feeds/search-feed/search-feed.component';
import {MentionModule} from 'angular-mentions';
import {agent} from '@core/bsky.api';
import {FormsModule} from '@angular/forms';
import {MskyDialogService} from '@services/msky-dialog.service';
import {Card} from 'primeng/card';
import {ButtonDirective} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {Divider} from 'primeng/divider';
import {InputText} from 'primeng/inputtext';
import type * as AppBskyActorDefs from '@atproto/api/src/client/types/app/bsky/actor/defs';
import {NgTemplateOutlet} from '@angular/common';
import {ScrollDirective} from '@shared/directives/scroll.directive';
import {Tooltip} from 'primeng/tooltip';
import {MskyMessageService} from '@services/msky-message.service';
import {AppBskyFeedDefs} from '@atproto/api';
import {AuthorCardComponent} from '@components/cards/author-card/author-card.component';
import {GeneratorCardComponent} from '@components/cards/generator-card/generator-card.component';

@Component({
  selector: 'search-dialog',
  imports: [
    MentionModule,
    FormsModule,
    SearchFeedComponent,
    Card,
    ButtonDirective,
    Ripple,
    Divider,
    InputText,
    NgTemplateOutlet,
    ScrollDirective,
    Tooltip,
    AuthorCardComponent,
    GeneratorCardComponent,
  ],
  templateUrl: './search-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchDialogComponent {
  query = '';
  savedQuery = signal<string>(undefined);
  searchType = signal<'top' | 'latest' | 'users' | 'feeds'>('top');
  cursor = signal<string>(undefined);
  users = signal<AppBskyActorDefs.ProfileView[]>([]);
  feeds = signal<AppBskyFeedDefs.GeneratorView[]>([]);

  usersTemplate = viewChild('usersTemplate');
  feedsTemplate = viewChild('feedsTemplate');

  constructor(
    config: DynamicDialogConfig,
    private dialog: DynamicDialogRef,
    protected dialogService: MskyDialogService,
    protected messageService: MskyMessageService,
    protected cdRef: ChangeDetectorRef,
    private columnService: ColumnService
  ) {
    if (config.data.query) {
      this.query = config.data.query;
      this.savedQuery.set(config.data.query);
    }
    effect(() => {
      if (this.usersTemplate() && this.savedQuery()) {
        this.initUsers();
      }
      if (this.feedsTemplate() && this.savedQuery()) {
        this.initFeeds();
      }
    });
  }

  initUsers() {
    if (!this.savedQuery()) return;

    this.users.set([]);
    agent.searchActors({
      q: this.savedQuery(),
      limit: 15
    }).then(response => {
      this.users.set(response.data.actors);
      this.cursor.set(response.data.cursor);
      this.cdRef.markForCheck();
    });
  }

  nextUsers() {
    agent.searchActors({
      q: this.savedQuery(),
      limit: 15,
      cursor: this.cursor()
    }).then(response => {
      this.users.update(users => {
        users = [...users, ...response.data.actors];
        return users;
      });
      this.cursor.set(response.data.cursor);
      this.cdRef.markForCheck();
    });
  }

  initFeeds() {
    if (!this.savedQuery()) return;

    this.feeds.set([]);
    agent.app.bsky.unspecced.getPopularFeedGenerators({
      query: this.savedQuery(),
      limit: 15
    }).then(response => {
      this.feeds.set(response.data.feeds);
      this.cursor.set(response.data.cursor);
      this.cdRef.markForCheck();
    });
  }

  nextFeeds() {
    agent.app.bsky.unspecced.getPopularFeedGenerators({
      query: this.savedQuery(),
      limit: 15,
      cursor: this.cursor()
    }).then(response => {
      this.feeds.update(feeds => {
        feeds = [...feeds, ...response.data.feeds];
        return feeds;
      });
      this.cursor.set(response.data.cursor);
      this.cdRef.markForCheck();
    });
  }

  addAsColumn() {
    this.columnService.createSearchColumn(this.savedQuery(), this.searchType() as any);
    this.dialog.close();
  }
}
