import {Pipe, PipeTransform} from '@angular/core';
import {AppBskyEmbedExternal} from "@atproto/api";

@Pipe({
  name: 'isEmbedExternalView'
})
export class IsEmbedExternalViewPipe implements PipeTransform {
  transform(value: unknown): value is AppBskyEmbedExternal.View {
    return AppBskyEmbedExternal.isView(value);
  }
}
