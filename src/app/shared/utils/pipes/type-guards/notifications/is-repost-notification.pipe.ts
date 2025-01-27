import {Pipe, PipeTransform} from '@angular/core';
import {Notification} from "~/src/app/api/models/notification";

@Pipe({
  name: 'isRepostNotification'
})
export class IsRepostNotificationPipe implements PipeTransform {
  transform(value: Notification): boolean {
    return value.reason == "repost";
  }
}
