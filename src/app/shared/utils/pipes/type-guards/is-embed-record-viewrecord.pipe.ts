import {Pipe, PipeTransform} from '@angular/core';
import {AppBskyEmbedRecord} from "@atproto/api";

@Pipe({
  name: 'isEmbedRecordViewRecord',
  standalone: true
})
export class IsEmbedRecordViewRecordPipe implements PipeTransform {
  transform(value: unknown): value is AppBskyEmbedRecord.ViewRecord {
    return AppBskyEmbedRecord.isViewRecord(value);
  }
}
