import {Pipe, PipeTransform} from '@angular/core';
import {AppBskyFeedDefs} from "@atproto/api";

@Pipe({
  name: 'isPostReposted',
  standalone: true
})
export class IsPostRepostedPipe implements PipeTransform {
  transform(post: AppBskyFeedDefs.PostView): boolean {
    return !!post.viewer.repost;
  }
}
