import {Pipe, PipeTransform} from '@angular/core';
import {AppBskyEmbedRecord} from "@atproto/api";

@Pipe({
  name: 'isEmbedRecordViewNotFound'
})
export class IsEmbedRecordViewNotFoundPipe implements PipeTransform {
  transform(value: unknown): value is AppBskyEmbedRecord.ViewNotFound {
    return AppBskyEmbedRecord.isViewNotFound(value);
  }
}
