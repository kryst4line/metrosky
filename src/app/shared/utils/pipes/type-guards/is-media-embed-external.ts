import {Pipe, PipeTransform} from '@angular/core';
import {EmbedType, ExternalEmbed} from "~/src/app/api/models/embed";

@Pipe({
  name: 'isMediaEmbedExternal'
})
export class IsMediaEmbedExternalPipe implements PipeTransform {
  transform(value: unknown): value is ExternalEmbed {
    return (value as ExternalEmbed)?.type == EmbedType.EXTERNAL;
  }
}
