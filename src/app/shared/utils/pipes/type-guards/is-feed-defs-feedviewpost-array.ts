import {Pipe, PipeTransform} from '@angular/core';
import {AppBskyFeedDefs} from "@atproto/api";

@Pipe({
  name: 'isFeedDefsFeedViewPostArray',
  standalone: true,
  pure: false
})
export class IsFeedDefsFeedViewPostArrayPipe implements PipeTransform {
  transform(value: unknown[]): value is AppBskyFeedDefs.FeedViewPost[] {
    return value && value.length && !!(value[0] as AppBskyFeedDefs.FeedViewPost).post;
  }
}
