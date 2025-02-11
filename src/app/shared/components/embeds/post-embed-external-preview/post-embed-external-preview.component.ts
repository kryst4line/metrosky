import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  SnippetType,
  BlueskyGifSnippet,
  IframeSnippet,
  LinkSnippet,
  SnippetSource
} from "~/src/app/api/models/snippet";
import {SnippetUtils} from "~/src/app/shared/utils/snippet-utils";
import {ExternalEmbed} from "~/src/app/api/models/embed";

@Component({
  selector: 'post-embed-external-preview',
  templateUrl: './post-embed-external-preview.component.html',
  styleUrl: './post-embed-external-preview.component.scss',
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
    this.snippet = SnippetUtils.detectSnippet({uri: this.embed.url, description: this.embed.metadata.description});
  }

}
