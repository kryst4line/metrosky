import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {Facet, RichText, RichTextSegment} from "@atproto/api";
import {agent} from "~/src/app/core/bsky.api";
import {
  AuthorViewDialogComponent
} from "~/src/app/shared/layout/dialogs/author-view-dialog/author-view-dialog.component";
import {DialogService} from "primeng/dynamicdialog";

@Component({
  selector: 'rich-text-display',
  imports: [],
  templateUrl: './rich-text-display.component.html',
  styleUrl: './rich-text-display.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DialogService
  ]
})
export class RichTextDisplayComponent implements OnInit {
  @Input() text: string;
  @Input() facets: Facet[];
  @Output() onMentionClick: EventEmitter<any>
  @Output() onTagClick: EventEmitter<any>
  segments: RichTextSegment[] = [];

  @ViewChildren('mention') mentionTemplate: ElementRef<TemplateRef<any>>;
  @ViewChild('text', {read: TemplateRef}) textTemplate: TemplateRef<any>;
  @ViewChild('link', {read: TemplateRef}) linkTemplate: TemplateRef<any>;

  constructor(
    private cdRef: ChangeDetectorRef,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    const rt = new RichText(
      {
        text: this.text,
        facets: this.facets
      }
    );

    if (!this.facets) {
      rt.detectFacets(agent).then(() => {
        this.segments = [...rt.segments()];
        this.cdRef.markForCheck();
      });
    } else {
      this.segments = [...rt.segments()];
    }
  }

  openAuthor(event: MouseEvent, did: string) {
    if (!window.getSelection().toString().length) {
      this.dialogService.open(AuthorViewDialogComponent, {
        data: {
          actor: did
        },
        appendTo: document.querySelector('app-deck'),
        maskStyleClass: 'inner-dialog',
        modal: true,
        dismissableMask: true,
        autoZIndex: false,
        style: {height: '100%'},
        focusOnShow: false,
        duplicate: true
      });
    }

    event.preventDefault();
    event.stopPropagation();
  }
}
