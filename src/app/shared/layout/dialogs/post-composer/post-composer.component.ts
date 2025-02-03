import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {Button} from "primeng/button";
import {Editor, EditorInitEvent} from "primeng/editor";
import "quill-mention/autoregister";
import "quill-mention/dist/quill.mention.css"
import {agent} from "~/src/app/core/bsky.api";
import {debounceTime, distinctUntilChanged, from, mergeMap, Observable, Subject, Subscription} from "rxjs";
import {AppBskyActorSearchActorsTypeahead} from "@atproto/api";
import Quill from "quill";
import {NgIcon, provideIcons} from "@ng-icons/core";
import {tablerLoader2} from "@ng-icons/tabler-icons";
import {PostService} from "~/src/app/api/services/post.service";

@Component({
  selector: 'post-composer',
  imports: [
    Button,
    Editor,
    NgIcon
  ],
  templateUrl: './post-composer.component.html',
  styleUrl: './post-composer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideIcons({
      tablerLoader2
    })
  ]
})
export class PostComposerComponent implements OnDestroy {
  @Input() loading = false;
  @Output() onCreatePost: EventEmitter<string> = new EventEmitter<string>;

  mentionResults$: Observable<AppBskyActorSearchActorsTypeahead.Response>;
  mentionSubject = new Subject<string>();
  mentionSubscription: Subscription;
  editor: Quill;

  mentionConfig = {
    // this is config from offical package. Can adjust as you wants
    allowedChars: /^[A-Za-z\s.-]*$/,
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
      return memberName
    }
  };

  constructor(private postService: PostService) {
    this.mentionResults$ = this.mentionSubject.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      mergeMap(searchText => from(agent.searchActorsTypeahead({q: searchText, limit: 5})))
    );
  }

  ngOnDestroy() {
  }

  onEditorInit(event: EditorInitEvent) {
    this.editor = event.editor;
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
      .join('');
  }
}
