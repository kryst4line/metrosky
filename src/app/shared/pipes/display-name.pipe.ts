import {Pipe, PipeTransform} from '@angular/core';
import {AppBskyActorDefs} from "@atproto/api";

@Pipe({
  name: 'displayName'
})
export class DisplayNamePipe implements PipeTransform {
  transform(author: Partial<{displayName: string, handle: string}>): string {
    return author.displayName?.trim().length ? author.displayName : `@${author.handle}`;
  }
}
