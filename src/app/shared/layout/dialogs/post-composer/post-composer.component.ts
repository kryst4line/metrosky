import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input, OnDestroy,
  Output, signal, WritableSignal
} from '@angular/core';
import {Editor, EditorInitEvent} from "primeng/editor";
import "quill-mention/autoregister";
import "quill-mention/dist/quill.mention.css"
import {agent} from "~/src/app/core/bsky.api";
import {
  debounceTime,
  distinctUntilChanged,
  from,
  mergeMap,
  Observable,
  Subject,
  Subscription
} from "rxjs";
import {AppBskyActorSearchActorsTypeahead} from "@atproto/api";
import Quill, {Delta} from "quill";
import {NgIcon} from "@ng-icons/core";
import {PostService} from "~/src/app/api/services/post.service";
import {DisplayNamePipe} from "~/src/app/shared/utils/pipes/display-name.pipe";
import {ExternalEmbed, ImageEmbed, RecordEmbed} from "~/src/app/api/models/embed";
import {EmbedUtils} from "~/src/app/shared/utils/embed-utils";
import {NgTemplateOutlet, SlicePipe} from "@angular/common";
import {IsMediaEmbedImagePipe} from "~/src/app/shared/utils/pipes/type-guards/is-media-embed-image";
import {IsMediaEmbedVideoPipe} from "~/src/app/shared/utils/pipes/type-guards/is-media-embed-video";
import {IsMediaEmbedExternalPipe} from "~/src/app/shared/utils/pipes/type-guards/is-media-embed-external";
import {PostCompose} from "~/src/app/api/models/post-compose";
import {
  PostEmbedRecordComponent
} from "~/src/app/shared/components/embeds/post-embed-record/post-embed-record.component";
import {EmbedService} from "~/src/app/api/services/embed.service";
import {MessageService} from "~/src/app/api/services/message.service";
import {SnippetUtils} from "~/src/app/shared/utils/snippet-utils";
import {
  PostEmbedExternalPreviewComponent
} from "~/src/app/shared/components/embeds/post-embed-external-preview/post-embed-external-preview.component";
import {SnippetType} from "~/src/app/api/models/snippet";
import {Ripple} from "primeng/ripple";
import {IsEmbedRecordViewRecordPipe} from "~/src/app/shared/utils/pipes/type-guards/is-embed-record-viewrecord.pipe";
import {IsGraphDefsListViewPipe} from "~/src/app/shared/utils/pipes/type-guards/is-graph-defs-list-view";
import {
  IsGraphDefsStarterPackViewBasicPipe
} from "~/src/app/shared/utils/pipes/type-guards/is-graph-defs-starterpack-viewbasic";
import {IsFeedDefsGeneratorViewPipe} from "~/src/app/shared/utils/pipes/type-guards/is-feed-defs-generator-view";

@Component({
  selector: 'post-composer',
  imports: [
    Editor,
    NgIcon,
    DisplayNamePipe,
    SlicePipe,
    NgTemplateOutlet,
    IsMediaEmbedImagePipe,
    IsMediaEmbedVideoPipe,
    IsMediaEmbedExternalPipe,
    PostEmbedRecordComponent,
    PostEmbedExternalPreviewComponent,
    Ripple,
    IsEmbedRecordViewRecordPipe,
    IsGraphDefsListViewPipe,
    IsGraphDefsStarterPackViewBasicPipe,
    IsFeedDefsGeneratorViewPipe
  ],
  templateUrl: './post-composer.component.html',
  styleUrl: './post-composer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComposerComponent implements OnDestroy {
  @Input() loading = false;
  @Output() onPublishPost: EventEmitter<string> = new EventEmitter<string>;
  postCompose: WritableSignal<PostCompose>
  embedSuggestions: WritableSignal<Array<RecordEmbed | ExternalEmbed>> = signal([]);

  pasteListener: EventListener = (event: any) => this.postService.attachMedia(event.clipboardData.files);

  editor: Quill;
  keyboardBindings = [
    {
      key: 'Enter',
      ctrlKey: true,
      handler: () => this.onPublishPost.emit(this.text)
    },
    {
      key: 'Escape',
      handler: () => {
        const mention: any = this.editor.getModule('mention');
        if (mention.isOpen) {
          mention.escapeHandler();
        } else {
          this.postCompose.set(undefined);
        }
      }
    }
  ];
  mentionResults$: Observable<AppBskyActorSearchActorsTypeahead.Response>;
  mentionSubject = new Subject<string>();
  mentionSubscription: Subscription;

  mentionConfig = {
    allowedChars: /(^|\s|\()([a-zA-Z0-9.-]+)(\b)/g,
    mentionDenotationChars: ["@"],
    defaultMenuOrientation: 'top',
    source: (searchTerm:any, renderList:any, mentionChar:any) => {
      let values;

      if (!this.mentionSubscription && searchTerm.length) {
        this.mentionSubscription = this.mentionResults$.subscribe({
          next: response => {
            values = response.data.actors.map(actor => {
              return {
                id: actor.did,
                value: actor.handle
              }
            });
            renderList(values, searchTerm);
          }
        });
      }

      this.mentionSubject.next(searchTerm);
      renderList(values);
    },
    renderItem: (data: any) => {
      const memberName = document.createElement('span');
      memberName.style.color = '#0000DE';
      memberName.textContent = data.value;
      return memberName;
    }
  };

  constructor(
    protected postService: PostService,
    private embedService: EmbedService,
    private messageService: MessageService
  ) {
    this.postCompose = this.postService.postCompose;
    this.mentionResults$ = this.mentionSubject.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      mergeMap(searchText => from(agent.searchActorsTypeahead({q: searchText, limit: 5})))
    );
  }

  onEditorInit(event: EditorInitEvent) {
    this.editor = event.editor;
    //Listen for possible urls to embed
    this.editor.on('text-change', () => {
      this.embedSuggestions.set(EmbedUtils.findEmbedSuggestions(this.editor.getText()));
    });
    //Remove tabulation
    delete this.editor.keyboard.bindings['Tab'];

    this.editor.container.addEventListener('paste', this.pasteListener);
  }

  ngOnDestroy() {
    removeEventListener('paste', this.pasteListener);
  }

  get text(): string {
    return this.editor.getContents().ops
      .map((op: any) => {
        if (typeof op.insert === 'string') {
          return op.insert;
        }
        if (op.insert.mention) {
          return op.insert.mention.denotationChar + op.insert.mention.value;
        }
      })
      .join('').trim();
  }

  removeImage(index: number) {
    const imageEmbed = this.postCompose().mediaEmbed as WritableSignal<ImageEmbed>;

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
          this.postCompose().mediaEmbed.set(embed);
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
      this.postCompose().recordEmbed.set(feed);
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
      this.postCompose().recordEmbed.set(list);
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
      starterPack['$type'] = 'app.bsky.graph.defs#starterPackViewBasic';
      this.postCompose().recordEmbed.set(starterPack);
    });
  }

  log(event: any) {
    console.log('DEVELOPMENT LOG: ', event);
  }
}
