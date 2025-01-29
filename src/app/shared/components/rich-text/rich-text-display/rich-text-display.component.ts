import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';
import {Facet, RichText, RichTextSegment} from "@atproto/api";

@Component({
  selector: 'rich-text-display',
  imports: [],
  templateUrl: './rich-text-display.component.html',
  styleUrl: './rich-text-display.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
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
    private hostContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {
    const rt = new RichText(
      {
        text: this.text,
        facets: this.facets
      }
    );

    this.segments = [...rt.segments()];
  }

  manageClick(event: any) {
    console.log(event)
  }
}
