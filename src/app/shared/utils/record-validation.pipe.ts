import { Pipe, PipeTransform } from '@angular/core';
import {AppBskyFeedPost} from "@atproto/api";

@Pipe({
  name: 'recordValidation',
  pure: true
})
export class RecordValidationPipe implements PipeTransform {

  transform(value: unknown): AppBskyFeedPost.Record {
    return value as AppBskyFeedPost.Record;
  }

}
