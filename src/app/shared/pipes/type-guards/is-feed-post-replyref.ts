import {Pipe, PipeTransform} from '@angular/core';
import {AppBskyFeedPost} from "@atproto/api";

@Pipe({
  name: 'isFeedPostReplyRef'
})
export class IsFeedPostReplyRefPipe implements PipeTransform {
  transform(value: unknown): value is AppBskyFeedPost.ReplyRef {
    return AppBskyFeedPost.isReplyRef(value);
  }
}
