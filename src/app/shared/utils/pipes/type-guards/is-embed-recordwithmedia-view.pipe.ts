import {Pipe, PipeTransform} from '@angular/core';
import {AppBskyEmbedRecordWithMedia} from "@atproto/api";

@Pipe({
  name: 'isEmbedRecordWithMediaView',
  standalone: true
})
export class IsEmbedRecordWithMediaViewPipe implements PipeTransform {
  transform(value: unknown): value is AppBskyEmbedRecordWithMedia.View {
    return AppBskyEmbedRecordWithMedia.isView(value);
  }
}
