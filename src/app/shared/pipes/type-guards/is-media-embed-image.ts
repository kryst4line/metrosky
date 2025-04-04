import {Pipe, PipeTransform} from '@angular/core';
import {EmbedType, ImageEmbed} from '@models/embed';

@Pipe({
  name: 'isMediaEmbedImage'
})
export class IsMediaEmbedImagePipe implements PipeTransform {
  transform(value: unknown): value is ImageEmbed {
    return (value as ImageEmbed)?.type == EmbedType.IMAGE;
  }
}
