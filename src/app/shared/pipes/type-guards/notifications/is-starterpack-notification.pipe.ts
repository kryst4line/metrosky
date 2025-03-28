import {Pipe, PipeTransform} from '@angular/core';
import {Notification} from '@models/notification';

@Pipe({
  name: 'isStarterPackNotification'
})
export class IsStarterPackNotificationPipe implements PipeTransform {
  transform(value: Notification): boolean {
    return value.reason == "starterpack-joined";
  }
}
