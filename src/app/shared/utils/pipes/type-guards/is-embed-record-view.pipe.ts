import {Pipe, PipeTransform} from '@angular/core';
import {AppBskyEmbedRecord} from "@atproto/api";

@Pipe({
  name: 'isEmbedRecordView'
})
export class IsEmbedRecordViewPipe implements PipeTransform {
  transform(value: unknown): value is AppBskyEmbedRecord.View {
    return AppBskyEmbedRecord.isView(value);
  }
}
