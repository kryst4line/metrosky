import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Notification} from "@models/notification";
import {NgTemplateOutlet, SlicePipe} from "@angular/common";
import {DialogService} from "primeng/dynamicdialog";
import {IsLikeNotificationPipe} from '@shared/pipes/type-guards/notifications/is-like-notification.pipe';
import {IsFollowNotificationPipe} from '@shared/pipes/type-guards/notifications/is-follow-notification.pipe';
import {IsRepostNotificationPipe} from '@shared/pipes/type-guards/notifications/is-repost-notification.pipe';
import {IsStarterPackNotificationPipe} from '@shared/pipes/type-guards/notifications/is-starterpack-notification.pipe';
import {DisplayNamePipe} from '@shared/pipes/display-name.pipe';
import {IsFeedPostRecordPipe} from '@shared/pipes/type-guards/is-feed-post-record';
import {IsEmbedImagesViewPipe} from '@shared/pipes/type-guards/is-embed-images-view.pipe';
import {IsEmbedVideoViewPipe} from '@shared/pipes/type-guards/is-embed-video-view.pipe';
import {PostEmbedImagesComponent} from '@components/embeds/post-embed-images/post-embed-images.component';
import {PostEmbedVideoComponent} from '@components/embeds/post-embed-video/post-embed-video.component';
import {MskyDialogService} from '@services/msky-dialog.service';
import {Avatar} from 'primeng/avatar';

@Component({
  selector: 'notification-card',
  imports: [
    IsLikeNotificationPipe,
    IsFollowNotificationPipe,
    IsRepostNotificationPipe,
    IsStarterPackNotificationPipe,
    NgTemplateOutlet,
    SlicePipe,
    DisplayNamePipe,
    IsFeedPostRecordPipe,
    IsEmbedImagesViewPipe,
    IsEmbedVideoViewPipe,
    PostEmbedImagesComponent,
    PostEmbedVideoComponent,
    Avatar
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
    protected dialogService: MskyDialogService
  ) {}

  openAuthor(event: MouseEvent, did: string) {
    event.preventDefault();
    event.stopPropagation();

    this.dialogService.openAuthor(did);
  }
}
