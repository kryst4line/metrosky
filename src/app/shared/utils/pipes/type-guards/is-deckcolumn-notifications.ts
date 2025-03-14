import {Pipe, PipeTransform} from '@angular/core';
import {DeckColumnType, NotificationsDeckColumn} from "~/src/app/api/models/deck-column";

@Pipe({
  name: 'isDeckColumnNotifications'
})
export class IsDeckColumnNotificationsPipe implements PipeTransform {
  transform(value: unknown): value is NotificationsDeckColumn {
    const typedValue = value as NotificationsDeckColumn;
    return typedValue && typedValue.type && typedValue.type == DeckColumnType.NOTIFICATIONS;
  }
}
