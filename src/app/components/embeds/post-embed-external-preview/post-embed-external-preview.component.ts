import {ChangeDetectionStrategy, Component, Input, OnInit,} from '@angular/core';
import {BlueskyGifSnippet, IframeSnippet, LinkSnippet, SnippetSource, SnippetType} from "@models/snippet";
import {SnippetUtils} from "@shared/utils/snippet-utils";
import {ExternalEmbed} from "@models/embed";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'post-embed-external-preview',
  templateUrl: './post-embed-external-preview.component.html',
  styleUrl: './post-embed-external-preview.component.scss',
  imports: [
    NgOptimizedImage
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostEmbedExternalPreviewComponent implements OnInit {
  @Input() embed: ExternalEmbed;

  snippet: LinkSnippet | BlueskyGifSnippet | IframeSnippet;

  protected readonly LinkSnippetType = SnippetType.LINK;
  protected readonly BlueskyGifSnippetType = SnippetType.BLUESKY_GIF;
  protected readonly IframeSnippetType = SnippetType.IFRAME;
  protected readonly YoutubeSnippetSource = SnippetSource.YOUTUBE;

  ngOnInit() {
    this.snippet = SnippetUtils.detectSnippet({uri: this.embed.metadata.url, description: this.embed.metadata.description});
  }

}
