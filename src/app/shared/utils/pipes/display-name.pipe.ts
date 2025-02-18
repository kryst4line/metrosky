import {Pipe, PipeTransform} from '@angular/core';
import {AppBskyActorDefs} from "@atproto/api";

@Pipe({
  name: 'displayName'
})
export class DisplayNamePipe implements PipeTransform {
  transform(author: AppBskyActorDefs.ProfileViewBasic): string {
    return author.displayName?.length ? author.displayName : `@${author.handle}`;
  }
}
