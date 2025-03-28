import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {AppBskyEmbedImages} from "@atproto/api";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'post-embed-images',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './post-embed-images.component.html',
  styleUrl: './post-embed-images.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostEmbedImagesComponent {
  @Input() embed: AppBskyEmbedImages.View;
  /**
   * Returns the index of the clicked image
   */
  @Output() onImgClick: EventEmitter<number> = new EventEmitter<number>();

  imgClick(index: number, event: MouseEvent) {
    this.onImgClick.emit(index);
    event.stopPropagation();
  }
}
