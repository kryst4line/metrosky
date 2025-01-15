import {Pipe, PipeTransform} from '@angular/core';
import {AppBskyActorDefs} from "@atproto/api";

@Pipe({
  name: 'isActorDefsProfileViewBasic',
  standalone: true
})
export class IsActorDefsProfileViewBasicPipe implements PipeTransform {
  transform(value: unknown): value is AppBskyActorDefs.ProfileViewBasic {
    return AppBskyActorDefs.isProfileViewBasic(value);
  }
}
