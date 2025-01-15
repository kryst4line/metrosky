import {Pipe, PipeTransform} from '@angular/core';
import {AppBskyFeedPost} from "@atproto/api";

@Pipe({
  name: 'isFeedPostRecord',
  standalone: true
})
export class IsFeedPostRecordPipe implements PipeTransform {
  transform(value: unknown): value is AppBskyFeedPost.Record {
    return AppBskyFeedPost.isRecord(value);
  }
}
