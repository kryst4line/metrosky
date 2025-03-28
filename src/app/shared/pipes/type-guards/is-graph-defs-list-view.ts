import {Pipe, PipeTransform} from '@angular/core';
import {AppBskyGraphDefs} from "@atproto/api";

@Pipe({
  name: 'isGraphDefsListView'
})
export class IsGraphDefsListViewPipe implements PipeTransform {
  transform(value: unknown): value is AppBskyGraphDefs.ListView {
    return AppBskyGraphDefs.isListView(value);
  }
}
