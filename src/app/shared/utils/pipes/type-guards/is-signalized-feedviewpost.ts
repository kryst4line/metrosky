import {Pipe, PipeTransform} from '@angular/core';
import {SignalizedFeedViewPost} from "~/src/app/api/models/signalized-feed-view-post";
import {AppBskyFeedDefs} from "@atproto/api";

@Pipe({
  name: 'isSignalizedFeedViewPost'
})
export class IsSignalizedFeedViewPostPipe implements PipeTransform {
  transform(value: unknown): value is SignalizedFeedViewPost {
    return value &&
      (value as SignalizedFeedViewPost).post &&
      (value as SignalizedFeedViewPost).post() &&
      AppBskyFeedDefs.isFeedViewPost((value as SignalizedFeedViewPost).post());
  }
}
