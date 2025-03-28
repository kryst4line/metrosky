import {Pipe, PipeTransform} from '@angular/core';
import {AppBskyFeedDefs} from "@atproto/api";

@Pipe({
  name: 'isFeedDefsPostView'
})
export class IsFeedDefsPostViewPipe implements PipeTransform {
  transform(value: unknown): value is AppBskyFeedDefs.PostView {
    return AppBskyFeedDefs.isPostView(value);
  }
}
