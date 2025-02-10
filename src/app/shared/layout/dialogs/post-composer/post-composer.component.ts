import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output, WritableSignal
} from '@angular/core';
import {Button} from "primeng/button";
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
import Quill from "quill";
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

@Component({
  selector: 'post-composer',
  imports: [
    Button,
    Editor,
    NgIcon,
    DisplayNamePipe,
    SlicePipe,
    NgTemplateOutlet,
    IsMediaEmbedImagePipe,
    IsMediaEmbedVideoPipe,
    IsMediaEmbedExternalPipe
  ],
  templateUrl: './post-composer.component.html',
  styleUrl: './post-composer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComposerComponent {
  @Input() loading = false;
  @Output() onPublishPost: EventEmitter<string> = new EventEmitter<string>;
  postCompose: WritableSignal<PostCompose>
  embedSuggestions: Array<RecordEmbed | ExternalEmbed> = [];

  editor: Quill;
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
    private postService: PostService
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
    this.editor.on('text-change', () => {
      this.embedSuggestions = EmbedUtils.findEmbedSuggestions(this.editor.getText());
    });
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

  log(event: any) {
    console.log('DEVELOPMENT LOG: ', event);
  }
}
