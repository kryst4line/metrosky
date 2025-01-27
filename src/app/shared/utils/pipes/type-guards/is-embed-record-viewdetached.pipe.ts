import {Pipe, PipeTransform} from '@angular/core';
import {AppBskyEmbedRecord} from "@atproto/api";

@Pipe({
  name: 'isEmbedRecordViewDetached'
})
export class IsEmbedRecordViewDetachedPipe implements PipeTransform {
  transform(value: unknown): value is AppBskyEmbedRecord.ViewDetached {
    return AppBskyEmbedRecord.isViewDetached(value);
  }
}
