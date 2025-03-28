import {Pipe, PipeTransform} from '@angular/core';
import {AppBskyGraphDefs} from "@atproto/api";

@Pipe({
  name: 'isGraphDefsStarterPackView'
})
export class IsGraphDefsStarterPackViewPipe implements PipeTransform {
  transform(value: unknown): value is AppBskyGraphDefs.StarterPackView {
    return AppBskyGraphDefs.isStarterPackView(value);
  }
}
