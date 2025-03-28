import {Pipe, PipeTransform} from '@angular/core';
import {EmbedType, VideoEmbed} from "@models/embed";

@Pipe({
  name: 'isMediaEmbedVideo'
})
export class IsMediaEmbedVideoPipe implements PipeTransform {
  transform(value: unknown): value is VideoEmbed {
    return (value as VideoEmbed)?.type == EmbedType.VIDEO;
  }
}
