import {Pipe, PipeTransform} from '@angular/core';
import {Notification} from "~/src/app/api/models/notification";

@Pipe({
  name: 'isFollowNotification'
})
export class IsFollowNotificationPipe implements PipeTransform {
  transform(value: Notification): boolean {
    return value.reason == "follow";
  }
}
