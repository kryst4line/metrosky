import {Pipe, PipeTransform} from '@angular/core';
import {AppBskyFeedDefs} from "@atproto/api";

@Pipe({
  name: 'isFeedDefsReplyRef',
  standalone: true
})
export class IsFeedDefsReplyRefPipe implements PipeTransform {
  transform(value: unknown): value is AppBskyFeedDefs.ReplyRef {
    return AppBskyFeedDefs.isReplyRef(value);
  }
}
