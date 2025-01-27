import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Notification} from "~/src/app/api/models/notification";
import {IsLikeNotificationPipe} from "~/src/app/shared/utils/pipes/type-guards/notifications/is-like-notification.pipe";
import {
  IsFollowNotificationPipe
} from "~/src/app/shared/utils/pipes/type-guards/notifications/is-follow-notification.pipe";
import {
  IsRepostNotificationPipe
} from "~/src/app/shared/utils/pipes/type-guards/notifications/is-repost-notification.pipe";
import {
  IsStarterPackNotificationPipe
} from "~/src/app/shared/utils/pipes/type-guards/notifications/is-starterpack-notification.pipe";

@Component({
  selector: 'notification-card',
  imports: [
    IsLikeNotificationPipe,
    IsFollowNotificationPipe,
    IsRepostNotificationPipe,
    IsStarterPackNotificationPipe
  ],
  templateUrl: './notification-card.component.html',
  styleUrl: './notification-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationCardComponent {
  @Input() notification: Notification;
  @Output() onNotificationClick: EventEmitter<any> = new EventEmitter<any>;

  openNotification(event: MouseEvent) {
    if (!window.getSelection().toString().length) {
      this.onNotificationClick.emit();
    }
    event.stopPropagation();
  }
}
