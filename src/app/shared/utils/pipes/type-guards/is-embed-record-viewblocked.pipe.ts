import {Pipe, PipeTransform} from '@angular/core';
import {AppBskyEmbedRecord} from "@atproto/api";

@Pipe({
  name: 'isEmbedRecordViewBlocked'
})
export class IsEmbedRecordViewBlockedPipe implements PipeTransform {
  transform(value: unknown): value is AppBskyEmbedRecord.ViewBlocked {
    return AppBskyEmbedRecord.isViewBlocked(value);
  }
}
