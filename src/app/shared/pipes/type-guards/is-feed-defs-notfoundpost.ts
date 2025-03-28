import {Pipe, PipeTransform} from '@angular/core';
import {AppBskyFeedDefs} from "@atproto/api";

@Pipe({
  name: 'isFeedDefsNotFoundPost'
})
export class IsFeedDefsNotFoundPostPipe implements PipeTransform {
  transform(value: unknown): value is AppBskyFeedDefs.NotFoundPost {
    return AppBskyFeedDefs.isNotFoundPost(value);
  }
}
