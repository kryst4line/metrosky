import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
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
import {AppBskyActorSearchActorsTypeahead, AppBskyEmbedRecord, AppBskyFeedDefs, AppBskyGraphDefs} from "@atproto/api";
import Quill from "quill";
import {NgIcon} from "@ng-icons/core";
import {PostService} from "~/src/app/api/services/post.service";
import {DisplayNamePipe} from "~/src/app/shared/utils/pipes/display-name.pipe";
import {EmbedType, ExternalEmbed, ImageEmbed, RecordEmbed, VideoEmbed} from "~/src/app/api/models/embed";
import {EmbedUtils} from "~/src/app/shared/utils/embed-utils";
import {NgTemplateOutlet, SlicePipe} from "@angular/common";
import {IsMediaEmbedImagePipe} from "~/src/app/shared/utils/pipes/type-guards/is-media-embed-image";
import {IsMediaEmbedVideoPipe} from "~/src/app/shared/utils/pipes/type-guards/is-media-embed-video";
import {IsMediaEmbedExternalPipe} from "~/src/app/shared/utils/pipes/type-guards/is-media-embed-external";
import {PostComposerEvent} from "~/src/app/api/models/post-composer-event";

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
export class PostComposerComponent implements OnInit {
  @Input() loading = false;
  @Input() fileDrop: Subject<File[]>;
  @Output() onCreatePost: EventEmitter<PostComposerEvent> = new EventEmitter<PostComposerEvent>;
  reply: AppBskyFeedDefs.PostView;
  recordEmbed: AppBskyFeedDefs.PostView | AppBskyFeedDefs.GeneratorView | AppBskyGraphDefs.ListView | AppBskyGraphDefs.StarterPackView;
  mediaEmbed: ImageEmbed | VideoEmbed | ExternalEmbed;
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
    private postService: PostService,
    private cdRef: ChangeDetectorRef
  ) {
    this.mentionResults$ = this.mentionSubject.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      mergeMap(searchText => from(agent.searchActorsTypeahead({q: searchText, limit: 5})))
    );
  }

  ngOnInit() {
    if (this.postService.newPost().reply) {
      this.reply = this.postService.getPost(this.postService.newPost().reply.parent.cid)();
    }
    if (AppBskyEmbedRecord.isMain(this.postService.newPost().embed)) {
      this.recordEmbed = this.postService.getPost((this.postService.newPost().embed.record as AppBskyEmbedRecord.ViewRecord).cid)();
    }
    this.fileDrop.subscribe(files => {
      this.onFileDrop(files);
    });
  }

  onEditorInit(event: EditorInitEvent) {
    this.editor = event.editor;
    this.editor.on('text-change', () => {
      this.embedSuggestions = EmbedUtils.findEmbedSuggestions(this.editor.getText());
    })
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

  onFileDrop(files: File[]) {
    //Fix array methods because it comes as FileList
    files = Array.from(files);

    if (files.some(f => f.type.includes('image'))) {
      //Filelist has images
      if (!this.mediaEmbed) {
        this.mediaEmbed = new ImageEmbed();
      }
      if (this.mediaEmbed.type == EmbedType.IMAGE) {
        //Our embed list is for images
        files.forEach(file => {
          if (file.type.includes('image') && (this.mediaEmbed as ImageEmbed).images.length < 4) {
            const reader = new FileReader();
            reader.onload = (event: any) => {
              (this.mediaEmbed as ImageEmbed).images.push({file: file, thumbnail: event.srcElement.result});
              this.cdRef.markForCheck();
            };
            reader.readAsDataURL(file);
          }
        })
      }
    } else if (files.some(f => f.type.includes('video'))) {
      //Filelist has video
      while (!this.mediaEmbed){
        files.forEach(file => {
          if (file.type.includes('video')) {

            this.mediaEmbed = new VideoEmbed(file, undefined);
          }
        });
      }
    }
  }

  removeImage(index: number) {
    if ((this.mediaEmbed as ImageEmbed).images.length == 1) {
      this.mediaEmbed = undefined;
    } else {
      (this.mediaEmbed as ImageEmbed).images.splice(index, 1);
    }
  }

  log(event: any) {
    console.log('DEVELOPMENT LOG: ', event);
  }
}
