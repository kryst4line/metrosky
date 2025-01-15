import {Pipe, PipeTransform} from '@angular/core';
import {AppBskyFeedDefs} from "@atproto/api";

@Pipe({
  name: 'isFeedDefsReasonRepost',
  standalone: true
})
export class IsFeedDefsReasonRepostPipe implements PipeTransform {
  transform(value: unknown): value is AppBskyFeedDefs.ReasonRepost {
    return AppBskyFeedDefs.isReasonRepost(value);
  }
}
