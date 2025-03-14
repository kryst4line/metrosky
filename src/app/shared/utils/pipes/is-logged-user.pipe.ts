import {Pipe, PipeTransform} from '@angular/core';
import {AppBskyActorDefs} from "@atproto/api";
import {StorageKeys} from "~/src/app/core/storage-keys";

@Pipe({
  name: 'isLoggedUser'
})
export class IsLoggedUserPipe implements PipeTransform {
  transform(did: string): boolean {
    const loggedUser = JSON.parse(localStorage.getItem(StorageKeys.LOGGED_USER)) as AppBskyActorDefs.ProfileViewDetailed;
    return did == loggedUser.did;
  }
}
