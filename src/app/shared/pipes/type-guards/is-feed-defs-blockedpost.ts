import {Pipe, PipeTransform} from '@angular/core';
import {AppBskyFeedDefs} from "@atproto/api";

@Pipe({
  name: 'isFeedDefsBlockedPost'
})
export class IsFeedDefsBlockedPostPipe implements PipeTransform {
  transform(value: unknown): value is AppBskyFeedDefs.BlockedPost {
    return AppBskyFeedDefs.isBlockedPost(value);
  }
}
