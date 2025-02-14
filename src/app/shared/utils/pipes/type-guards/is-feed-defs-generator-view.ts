import {Pipe, PipeTransform} from '@angular/core';
import {AppBskyFeedDefs} from "@atproto/api";

@Pipe({
  name: 'isFeedDefsGeneratorView'
})
export class IsFeedDefsGeneratorViewPipe implements PipeTransform {
  transform(value: unknown): value is AppBskyFeedDefs.GeneratorView {
    return AppBskyFeedDefs.isGeneratorView(value);
  }
}
