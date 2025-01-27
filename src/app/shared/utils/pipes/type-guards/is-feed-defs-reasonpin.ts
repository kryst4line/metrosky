import {Pipe, PipeTransform} from '@angular/core';
import {AppBskyFeedDefs} from "@atproto/api";

@Pipe({
  name: 'isFeedDefsReasonPin'
})
export class IsFeedDefsReasonPinPipe implements PipeTransform {
  transform(value: unknown): value is AppBskyFeedDefs.ReasonPin {
    return AppBskyFeedDefs.isReasonPin(value);
  }
}
