import {Pipe, PipeTransform} from '@angular/core';
import {AppBskyGraphDefs} from "@atproto/api";

@Pipe({
  name: 'isGraphDefsStarterPackViewBasic'
})
export class IsGraphDefsStarterPackViewBasicPipe implements PipeTransform {
  transform(value: unknown): value is AppBskyGraphDefs.StarterPackViewBasic {
    return AppBskyGraphDefs.isStarterPackViewBasic(value);
  }
}
