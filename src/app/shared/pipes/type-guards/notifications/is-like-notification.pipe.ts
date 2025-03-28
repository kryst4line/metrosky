import {Pipe, PipeTransform} from '@angular/core';
import {Notification} from "@models/notification";

@Pipe({
  name: 'isLikeNotification'
})
export class IsLikeNotificationPipe implements PipeTransform {
  transform(value: Notification): boolean {
    return value.reason == "like";
  }
}
