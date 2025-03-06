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
import {NgIcon} from "@ng-icons/core";
import {NgOptimizedImage, NgTemplateOutlet, SlicePipe} from "@angular/common";
import {DisplayNamePipe} from "~/src/app/shared/utils/pipes/display-name.pipe";
import {IsFeedPostRecordPipe} from "~/src/app/shared/utils/pipes/type-guards/is-feed-post-record";
import {IsEmbedImagesViewPipe} from "~/src/app/shared/utils/pipes/type-guards/is-embed-images-view.pipe";
import {IsEmbedVideoViewPipe} from "~/src/app/shared/utils/pipes/type-guards/is-embed-video-view.pipe";
import {
  PostEmbedImagesComponent
} from "~/src/app/shared/components/embeds/post-embed-images/post-embed-images.component";
import {PostEmbedVideoComponent} from "~/src/app/shared/components/embeds/post-embed-video/post-embed-video.component";
import {DialogService} from "primeng/dynamicdialog";
import {MskyDialogService} from "~/src/app/api/services/msky-dialog.service";

@Component({
  selector: 'notification-card',
  imports: [
    IsLikeNotificationPipe,
    IsFollowNotificationPipe,
    IsRepostNotificationPipe,
    IsStarterPackNotificationPipe,
    NgIcon,
    NgTemplateOutlet,
    SlicePipe,
    DisplayNamePipe,
    IsFeedPostRecordPipe,
    IsEmbedImagesViewPipe,
    IsEmbedVideoViewPipe,
    PostEmbedImagesComponent,
    PostEmbedVideoComponent,
    NgOptimizedImage
  ],
  templateUrl: './notification-card.component.html',
  styleUrl: './notification-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DialogService
  ]
})
export class NotificationCardComponent {
  @Input() notification: Notification;
  @Output() onNotificationClick: EventEmitter<Notification> = new EventEmitter<Notification>;

  constructor(
    private dialogService: MskyDialogService
  ) {}

  openAuthor(event: MouseEvent, did: string) {
    event.preventDefault();
    event.stopPropagation();

    this.dialogService.openAuthor(did);
  }

  openImage(index: number) {
    this.dialogService.openImagePost(this.notification.uri, index);
  }
}
