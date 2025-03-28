import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  viewChild
} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Divider} from "primeng/divider";
import {FeedPostCardComponent} from "@components/cards/feed-post-card/feed-post-card.component";
import {ScrollDirective} from "@shared/directives/scroll.directive";
import {PostService} from '@services/post.service';
import {IsNotificationArrayPipe} from '@shared/pipes/type-guards/notifications/is-post-notification';
import {MskyDialogService} from '@services/msky-dialog.service';
import {MskyMessageService} from '@services/msky-message.service';
import {agent} from '@core/bsky.api';
import {Notification} from '@models/notification'
import NotificationUtils from '@shared/utils/notification-utils';
import {NotificationCardComponent} from '@components/cards/notification-card/notification-card.component';
import {ProgressSpinner} from "primeng/progressspinner";

@Component({
  selector: 'notification-feed',
    imports: [
        CommonModule,
        FeedPostCardComponent,
        IsNotificationArrayPipe,
        NotificationCardComponent,
        Divider,
        FeedPostCardComponent,
        ScrollDirective,
        NotificationCardComponent,
        ProgressSpinner,
    ],
  templateUrl: './notification-feed.component.html',
  styleUrl: './notification-feed.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationFeedComponent implements OnInit, OnDestroy {
  feed = viewChild<ElementRef>('feed');
  notifications: Notification[];
  lastPostCursor: string;
  loading = true;
  reloadReady = false;
  reloadTimeout: ReturnType<typeof setTimeout>;

  constructor(
    private postService: PostService,
    private dialogService: MskyDialogService,
    private messageService: MskyMessageService,
    private cdRef: ChangeDetectorRef
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
          this.cdRef.markForCheck();
          setTimeout(() => {
            this.loading = false;
            this.manageRefresh();
          }, 500);
        });
      }
    );
  }

  nextData() {
    if (this.loading) return;
    this.loading = true;

    agent.listNotifications({
      cursor: this.lastPostCursor,
      limit: 100
    }).then(
      response => {
        this.lastPostCursor = response.data.cursor;
        NotificationUtils.parseNotifications(response.data.notifications, this.postService).then(notifications => {
          this.notifications = [...this.notifications, ...notifications];
          this.cdRef.markForCheck();
          setTimeout(() => {
            this.loading = false;
          }, 500);
        });
      }
    );
  }

  openPost(uri: string) {
    // Mute all video players
    this.feed().nativeElement.querySelectorAll('video').forEach((video: HTMLVideoElement) => {
      video.muted = true;
    });

    this.dialogService.openThread(uri, this.feed().nativeElement);
  }

  openNotification(notification: Notification) {
    switch (notification.reason) {
      case "like":
      case "repost":
        this.openPost(notification.uri);
        break;
      case "follow":
      case "starterpack-joined":
        this.messageService.warn('This feature is not implemented yet.', 'Welp!');
        break;
    }
  }

  manageRefresh() {
    if (this.loading) return;

    if (!this.reloadReady && !this.reloadTimeout) {
      this.reloadTimeout = setTimeout(() => {
        this.reloadTimeout = undefined;

        if (this.feed().nativeElement.scrollTop == 0) {
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
    } else if (this.reloadReady && this.feed().nativeElement.scrollTop == 0) {
      this.reloadReady = false;
      this.initData();
    }
  }

  log(event: any) {
    console.log(event)
  }
}
