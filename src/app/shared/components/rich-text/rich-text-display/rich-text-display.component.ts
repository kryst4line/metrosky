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
import {DialogService} from "primeng/dynamicdialog";
import {MskyDialogService} from "~/src/app/api/services/msky-dialog.service";

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
    private dialogService: MskyDialogService
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
    event.preventDefault();
    event.stopPropagation();

    this.dialogService.openAuthor(did);
  }
}
