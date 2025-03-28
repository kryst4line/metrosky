import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit, viewChildren
} from '@angular/core';
import {AppBskyEmbedExternal} from "@atproto/api";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import videojs from "video.js";
import type Player from "video.js/dist/types/player";
import {NgOptimizedImage} from "@angular/common";
import {BlueskyGifSnippet, IframeSnippet, LinkSnippet, SnippetSource, SnippetType} from '@models/snippet';
import {SnippetUtils} from '@shared/utils/snippet-utils';
import {YouTubePlayer} from '@angular/youtube-player';
type Options = typeof videojs.options;

@Component({
  selector: 'post-embed-external',
  imports: [
    YouTubePlayer,
    NgOptimizedImage
  ],
  templateUrl: './post-embed-external.component.html',
  styleUrl: './post-embed-external.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostEmbedExternalComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() embed: AppBskyEmbedExternal.View;
  target = viewChildren<ElementRef<HTMLVideoElement>>('target');

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

      this.player = videojs(this.target()[0].nativeElement, this.options);
    }
  }

  ngOnDestroy() {
    this.player?.dispose();
  }

}
