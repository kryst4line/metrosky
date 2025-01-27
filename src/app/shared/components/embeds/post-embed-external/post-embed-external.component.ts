import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit, QueryList,
  ViewChildren
} from '@angular/core';
import {AppBskyEmbedExternal} from "@atproto/api";
import {
  SnippetType,
  BlueskyGifSnippet,
  IframeSnippet,
  LinkSnippet,
  SnippetSource
} from "~/src/app/shared/models/snippet";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {SnippetUtils} from "~/src/app/shared/utils/snippet-utils";
import videojs from "video.js";
import type Player from "video.js/dist/types/player";
type Options = typeof videojs.options;
import {YouTubePlayer} from "@angular/youtube-player";

@Component({
  selector: 'post-embed-external',
  imports: [
    YouTubePlayer
  ],
  templateUrl: './post-embed-external.component.html',
  styleUrl: './post-embed-external.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostEmbedExternalComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() embed: AppBskyEmbedExternal.View;
  @ViewChildren('target') target: QueryList<ElementRef>;

  player: Player;
  options: Options;
  snippet: LinkSnippet | BlueskyGifSnippet | IframeSnippet;
  safeURL: SafeResourceUrl;

  protected readonly LinkSnippetType = SnippetType.LINK;
  protected readonly BlueskyGifSnippetType = SnippetType.BLUESKY_GIF;
  protected readonly IframeSnippetType = SnippetType.IFRAME;
  protected readonly YoutubeSnippetSource = SnippetSource.YOUTUBE;

  constructor(
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit() {
    this.snippet = SnippetUtils.detectSnippet(this.embed.external);

    if (this.snippet.type === SnippetType.IFRAME) {
      this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.snippet.url);
    }
  }

  ngAfterViewInit() {
    if (this.snippet.type === SnippetType.BLUESKY_GIF) {
      this.options = {
        fluid: true,
        aspectRatio: this.snippet.ratio,
        autoplay: true,
        loop: true,
        sources: {
          src: this.snippet.url,
          type: 'video/webm'
        },
        controls: true,
        muted: true,
        playsinline: true,
        preload: 'none',
        bigPlayButton: true,
        controlBar: false,
      };

      this.player = videojs(this.target.first.nativeElement, this.options);
    }
  }

  ngOnDestroy() {
    this.player?.dispose();
  }

}
