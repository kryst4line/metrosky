import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input, OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {AppBskyEmbedVideo} from "@atproto/api";
import videojs from "video.js";
import type Player from "video.js/dist/types/player";
type Options = typeof videojs.options;

@Component({
  selector: 'post-embed-video',
  imports: [
  ],
  templateUrl: './post-embed-video.component.html',
  styleUrl: './post-embed-video.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostEmbedVideoComponent implements OnInit, OnDestroy {
  @Input() embed: AppBskyEmbedVideo.View;
  @ViewChild('target', {static: true}) target: ElementRef;

  player: Player;
  options: Options;
  interacted = false;

  ngOnInit() {
    this.options = {
      fluid: true,
      aspectRatio: `${this.embed.aspectRatio.width}:${this.embed.aspectRatio.height}`,
      autoplay: true,
      sources: {
        src: this.embed.playlist,
        type: 'application/x-mpegURL'
      },
      playsinline: true,
      preload: 'auto',
      loop: true,
      inactivityTimeout: 1000,
      userActions: {
        click: () => {
          if (this.interacted) {
            this.player.paused() ? this.player.play() : this.player.pause();
          } else {
            this.player.loop(false);
            this.player.muted(false);
            this.interacted = true;
          }
        }
      }
    };

    this.player = videojs(this.target.nativeElement, this.options);
    this.player.addChild('RemainingTimeDisplay', {});
  }

  ngOnDestroy() {
    this.player?.dispose();
  }
}
