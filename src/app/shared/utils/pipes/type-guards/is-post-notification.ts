import {Pipe, PipeTransform} from '@angular/core';
import {Notification} from "~/src/app/api/models/notification";

@Pipe({
  name: 'isPostNotification'
})
export class IsNotificationArrayPipe implements PipeTransform {
  transform(value: Notification): boolean {
    return value.feedViewPost && (
      value.reason == 'reply' ||
      value.reason == 'quote' ||
      value.reason == 'mention'
    );
  }
}
