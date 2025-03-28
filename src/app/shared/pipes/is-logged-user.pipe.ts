import {Pipe, PipeTransform} from '@angular/core';
import {AppBskyActorDefs} from "@atproto/api";

@Pipe({
  name: 'isLoggedUser'
})
export class IsLoggedUserPipe implements PipeTransform {
  transform(did: string, loggedUser: AppBskyActorDefs.ProfileViewDetailed): boolean {
    return did == loggedUser.did;
  }
}
