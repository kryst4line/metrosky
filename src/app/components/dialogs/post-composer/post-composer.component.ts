import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef, forwardRef,
  output, signal,
  viewChild,
  WritableSignal
} from '@angular/core';
import {$Typed, AppBskyFeedDefs, AppBskyGraphDefs, RichText} from '@atproto/api';
import {MentionModule} from 'angular-mentions';
import {agent} from '@core/bsky.api';
import {ProgressBar} from 'primeng/progressbar';
import {ButtonDirective} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {PostService} from '@services/post.service';
import {IsMediaEmbedImagePipe} from '@shared/pipes/type-guards/is-media-embed-image';
import {IsMediaEmbedVideoPipe} from '@shared/pipes/type-guards/is-media-embed-video';
import {IsMediaEmbedExternalPipe} from '@shared/pipes/type-guards/is-media-embed-external';
import {ExternalEmbed, ImageEmbed, RecordEmbed} from '@models/embed';
import {DisplayNamePipe} from '@shared/pipes/display-name.pipe';
import {ProgressSpinner} from 'primeng/progressspinner';
import {MskyMessageService} from '@services/msky-message.service';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {EmbedUtils} from '@shared/utils/embed-utils';
import {NgTemplateOutlet, SlicePipe} from '@angular/common';
import {SnippetUtils} from '@shared/utils/snippet-utils';
import {SnippetType} from '@models/snippet';
import {EmbedService} from '@services/embed.service';
import {PreviewCardComponent} from '@components/cards/preview-card/preview-card.component';
import {IsEmbedRecordViewRecordPipe} from '@shared/pipes/type-guards/is-embed-record-viewrecord.pipe';
import {PostEmbedRecordComponent} from '@components/embeds/post-embed-record/post-embed-record.component';
import {IsFeedDefsGeneratorViewPipe} from '@shared/pipes/type-guards/is-feed-defs-generator-view';
import {IsGraphDefsListViewPipe} from '@shared/pipes/type-guards/is-graph-defs-list-view';
import {IsGraphDefsStarterPackViewPipe} from '@shared/pipes/type-guards/is-graph-defs-starterpack-view';

@Component({
  selector: 'post-composer',
  imports: [
    MentionModule,
    ProgressBar,
    ButtonDirective,
    Ripple,
    IsMediaEmbedImagePipe,
    IsMediaEmbedVideoPipe,
    IsMediaEmbedExternalPipe,
    DisplayNamePipe,
    ProgressSpinner,
    SlicePipe,
    NgTemplateOutlet,
    PreviewCardComponent,
    IsEmbedRecordViewRecordPipe,
    IsFeedDefsGeneratorViewPipe,
    IsGraphDefsListViewPipe,
    IsGraphDefsStarterPackViewPipe
  ],
  templateUrl: './post-composer.component.html',
  styles: `
    :host(::ng-deep mention-list) {
      transform: translateY(-1.25rem);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComposerComponent {
  formattedText = '';
  rt: RichText;
  mentionItems = [];
  loading = false;

  embedSuggestions = signal<Array<RecordEmbed | ExternalEmbed>>([]);

  constructor(
    protected postService: PostService,
    private embedService: EmbedService,
    private messageService: MskyMessageService,
    private cdRef: ChangeDetectorRef,
    protected dialog: DynamicDialogRef
  ) {}

  formatText(event: Event) {
    const text = (event.target as HTMLDivElement).innerText;
    this.postService.postCompose().post().text = text;

    this.rt = new RichText({text: text});
    this.rt.detectFacetsWithoutResolution();
    const segments = [...this.rt.segments()];

    this.embedSuggestions.set(EmbedUtils.findEmbedSuggestions(segments.filter(s => s.facet).map(s => s.text).join(' ')));

    let htmlText = '';

    segments.forEach(segment => {
      if (segment.isMention()) {
        htmlText += `<span class="text-blue-800">${segment.text}</span>`;
      } else if (segment.isTag()) {
        htmlText += `<span class="text-purple-800">${segment.text}</span>`;
      } else if (segment.isLink()) {
        htmlText += `<span class="text-red-800">${segment.text}</span>`;
      } else {
        htmlText += `<span>${segment.text.replace('<','&lt;').replace('>','&gt;')}</span>`;
      }
    });

    this.formattedText = htmlText;
    this.cdRef.markForCheck();
  }

  searchMentions(searchTerm: string) {
    agent.searchActorsTypeahead({q: searchTerm, limit: 5}).then(response => {
      this.mentionItems = response.data.actors.map(actor => {
        return {
          id: actor.did,
          value: actor.handle
        }
      });
      this.cdRef.markForCheck();
    });
  }

  removeImage(index: number) {
    const imageEmbed = this.postService.postCompose().mediaEmbed as WritableSignal<ImageEmbed>;

    if (imageEmbed().images.length == 1) {
      imageEmbed.set(undefined);
    } else {
      imageEmbed.update(embed => {
        embed.images.splice(index, 1);
        return embed;
      });
    }
  }

  embedLink() {
    const embed = this.embedSuggestions()[0] as ExternalEmbed;
    embed.snippet = SnippetUtils.detectSnippet({uri: embed.url, description: ''});

    if (embed.snippet.type !== SnippetType.BLUESKY_GIF) {
      this.embedService.getUrlMetadata(embed.url).subscribe({
        next: metadata => {
          embed.metadata = metadata;
          this.postService.postCompose().mediaEmbed.set(embed);
        },
        error: err => this.messageService.error(err.message, 'Oops!')
      });
    }
  }

  embedQuote() {
    const embed = this.embedSuggestions()[0] as RecordEmbed;
    agent.resolveHandle({
      handle: embed.author
    }).then(response => {
      this.postService.quotePost('at://' + response.data.did + '/app.bsky.feed.post/' + embed.rkey);
    });
  }

  embedFeed() {
    const embed = this.embedSuggestions()[0] as RecordEmbed;

    agent.resolveHandle({
      handle: embed.author
    }).then(response => agent.app.bsky.feed.getFeedGenerator({
      feed: 'at://' + response.data.did + '/app.bsky.feed.generator/' + embed.rkey
    })).then(response => {
      let feed = response.data.view;
      feed['$type'] = 'app.bsky.feed.defs#generatorView';
      this.postService.postCompose().recordEmbed.set(feed as $Typed<AppBskyFeedDefs.GeneratorView>);
    });
  }

  embedList() {
    const embed = this.embedSuggestions()[0] as RecordEmbed;

    agent.resolveHandle({
      handle: embed.author
    }).then(response => agent.app.bsky.graph.getList({
      list: 'at://' + response.data.did + '/app.bsky.graph.list/' + embed.rkey
    })).then(response => {
      let list = response.data.list;
      list['$type'] = 'app.bsky.graph.defs#listView';
      this.postService.postCompose().recordEmbed.set(list as $Typed<AppBskyGraphDefs.ListView>);
    });
  }

  embedStarterPack() {
    const embed = this.embedSuggestions()[0] as RecordEmbed;

    agent.resolveHandle({
      handle: embed.author
    }).then(response => agent.app.bsky.graph.getStarterPack({
      starterPack: 'at://' + response.data.did + '/app.bsky.graph.starterpack/' + embed.rkey
    })).then(response => {
      let starterPack = response.data.starterPack;
      starterPack['$type'] = 'app.bsky.graph.defs#starterPackView';
      this.postService.postCompose().recordEmbed.set(starterPack as $Typed<AppBskyGraphDefs.StarterPackView>);
    });
  }

  publishPost() {
    this.loading = true;

    this.postService.publishPost().then(
      () => {
        this.messageService.success('Your post has been successfully published');
      },
      err => this.messageService.error(err.message, 'Oops!')
    ).finally(() => this.loading = false);
  }

  paste(event: ClipboardEvent) {
    console.log(event.clipboardData.files)
  }

  log(event: any) {
    console.log("DEVELOPMENT LOG: ", event);
  }
}
