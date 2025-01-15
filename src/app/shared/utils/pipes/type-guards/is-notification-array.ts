import {Pipe, PipeTransform} from '@angular/core';
import {Notification} from "../../models/notification";

@Pipe({
  name: 'isNotificationArray',
  standalone: true
})
export class IsNotificationArrayPipe implements PipeTransform {
  transform(value: unknown[]): value is Notification[] {
    return value && value.length && value[0] instanceof Notification;
  }
}
