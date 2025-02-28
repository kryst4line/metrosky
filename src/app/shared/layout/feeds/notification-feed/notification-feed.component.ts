import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {agent} from "~/src/app/core/bsky.api";
import {CommonModule} from "@angular/common";
import {FeedPostCardComponent} from "~/src/app/shared/components/cards/feed-post-card/feed-post-card.component";
import {PostService} from "~/src/app/api/services/post.service";
import {ThreadViewDialogComponent} from "~/src/app/shared/layout/dialogs/thread-view-dialog/thread-view-dialog.component";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {AgVirtualScrollModule, AgVirtualSrollComponent} from "ag-virtual-scroll";
import {Notification} from "~/src/app/api/models/notification";
import NotificationUtils from "~/src/app/shared/utils/notification-utils";
import {IsNotificationArrayPipe} from "~/src/app/shared/utils/pipes/type-guards/notifications/is-post-notification";
import {NotificationCardComponent} from "~/src/app/shared/components/cards/notification-card/notification-card.component";
import {MessageService} from "~/src/app/api/services/message.service";
import {NgIcon} from "@ng-icons/core";

@Component({
  selector: 'notification-feed',
  imports: [
    CommonModule,
    FeedPostCardComponent,
    AgVirtualScrollModule,
    IsNotificationArrayPipe,
    NotificationCardComponent,
    NgIcon,
  ],
  templateUrl: './notification-feed.component.html',
  styleUrl: './notification-feed.component.scss',
  providers: [
    DialogService
  ]
})
export class NotificationFeedComponent implements OnInit, OnDestroy {
  @ViewChild('feed') feed: ElementRef;
  @ViewChild('vs') virtualScroll: AgVirtualSrollComponent;
  notifications: Notification[];
  dialog: DynamicDialogRef;
  lastPostCursor: string;
  loading = true;
  reloadReady = false;
  reloadTimeout: ReturnType<typeof setTimeout>;

  constructor(
    private postService: PostService,
    private dialogService: DialogService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.initData();
  }

  ngOnDestroy() {
    clearTimeout(this.reloadTimeout);
  }

  initData() {
    this.loading = true;
    agent.listNotifications({
      limit: 100
    }).then(
      response => {
        this.lastPostCursor = response.data.cursor;
        NotificationUtils.parseNotifications(response.data.notifications, this.postService).then(notifications => {
          this.notifications = notifications;
          setTimeout(() => {
            this.loading = false;
            this.manageRefresh();
          }, 500);
        });
      }
    );
  }

  nextData(scrollEvent: any) {
    if (!this.loading && scrollEvent.endIndex == this.notifications.length -1) {
      this.loading = true;

      agent.listNotifications({
        cursor: this.lastPostCursor,
        limit: 100
      }).then(
        response => {
          this.lastPostCursor = response.data.cursor;
          NotificationUtils.parseNotifications(response.data.notifications, this.postService).then(notifications => {
            this.notifications = [...this.notifications, ...notifications];
            setTimeout(() => {
              this.loading = false;
            }, 500);
          });
        }
      );
    }
  }

  openPost(uri: string) {
    this.dialog = this.dialogService.open(ThreadViewDialogComponent, {
      data: {
        uri: uri
      },
      appendTo: this.feed.nativeElement,
      maskStyleClass: 'inner-dialog',
      autoZIndex: false,
      focusOnShow: false,
    });

    this.dialog.onClose.subscribe({
      next: () => {
        this.dialog.destroy();
        this.dialog = undefined;
      }
    });
  }

  openNotification(notification: Notification) {
    switch (notification.reason) {
      case "like":
      case "repost":
        this.openPost(notification.uri);
        break;
      case "follow":
      case "starterpack-joined":
        this.messageService.warnIcon('This feature is not implemented yet.', 'Welp!');
        break;
    }
  }

  manageRefresh() {
    if (this.loading) return;

    if (!this.reloadReady && !this.reloadTimeout) {
      this.reloadTimeout = setTimeout(() => {
        this.reloadTimeout = undefined;

        if (this.virtualScroll.currentScroll == 0) {
          this.reloadReady = false;
          agent.listNotifications({
            limit: 1
          }).then(response => {
            const notification = response.data.notifications[0];
            const lastNotification = this.notifications[0];

            if (notification?.indexedAt !== lastNotification?.notification.indexedAt) {
              this.initData();
            } else {
              this.manageRefresh();
            }
          });
        } else {
          this.reloadReady = true;
        }
      }, 30e3);
      // Timer in seconds
    } else if (this.reloadReady && this.virtualScroll.currentScroll == 0) {
      this.reloadReady = false;
      this.initData();
    }
  }

  log(event: any) {
    console.log(event)
  }
}
