import {Pipe, PipeTransform} from '@angular/core';
import {AppBskyLabelerDefs} from "@atproto/api";

@Pipe({
  name: 'isLabelerDefsLabelerView'
})
export class IsLabelerDefsLabelerViewPipe implements PipeTransform {
  transform(value: unknown): value is AppBskyLabelerDefs.LabelerView {
    return AppBskyLabelerDefs.isLabelerView(value);
  }
}
