import {Pipe, PipeTransform} from '@angular/core';
import {AppBskyEmbedRecord} from "@atproto/api";

@Pipe({
  name: 'isEmbedRecordViewRecord'
})
export class IsEmbedRecordViewRecordPipe implements PipeTransform {
  transform(value: unknown): value is AppBskyEmbedRecord.ViewRecord {
    return AppBskyEmbedRecord.isViewRecord(value);
  }
}
