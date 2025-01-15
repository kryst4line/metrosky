import {Pipe, PipeTransform} from '@angular/core';
import {AppBskyFeedDefs} from "@atproto/api";

@Pipe({
  name: 'isFeedDefsPostView',
  standalone: true
})
export class IsFeedDefsPostViewPipe implements PipeTransform {
  transform(value: unknown): value is AppBskyFeedDefs.PostView {
    return AppBskyFeedDefs.isPostView(value);
  }
}
