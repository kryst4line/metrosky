import {Pipe, PipeTransform} from '@angular/core';
import {AppBskyActorDefs} from "@atproto/api";

@Pipe({
  name: 'isLoggedUser'
})
export class IsLoggedUserPipe implements PipeTransform {
  transform(did: string): boolean {
    const loggedUser = JSON.parse(localStorage.getItem('logged_user')) as AppBskyActorDefs.ProfileViewDetailed;
    return did == loggedUser.did;
  }
}
