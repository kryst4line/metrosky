import {Pipe, PipeTransform} from '@angular/core';
import {AppBskyEmbedVideo} from "@atproto/api";

@Pipe({
  name: 'isEmbedVideoView'
})
export class IsEmbedVideoViewPipe implements PipeTransform {
  transform(value: unknown): value is AppBskyEmbedVideo.View {
    return AppBskyEmbedVideo.isView(value);
  }
}
