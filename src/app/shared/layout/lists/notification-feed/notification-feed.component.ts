import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {agent} from "~/src/app/core/bsky.api";
import {CommonModule} from "@angular/common";
import {FeedViewPostCardComponent} from "../../../components/feed-view-post-card/feed-view-post-card.component";
import {PostService} from "~/src/app/api/services/post.service";
import {SignalizedFeedViewPost} from "~/src/app/api/models/signalized-feed-view-post";
import {ImagePostDialogComponent} from "~/src/app/shared/layout/dialogs/image-post-dialog/image-post-dialog.component";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {AgVirtualScrollModule} from "ag-virtual-scroll";
import {Notification} from "~/src/app/api/models/notification";
import NotificationUtils from "~/src/app/shared/utils/notification-utils";
import {IsNotificationArrayPipe} from "~/src/app/shared/utils/pipes/type-guards/is-post-notification";
import {NotificationCardComponent} from "~/src/app/shared/components/notification-card/notification-card.component";

@Component({
  selector: 'notification-feed',
  imports: [
    CommonModule,
    FeedViewPostCardComponent,
    AgVirtualScrollModule,
    IsNotificationArrayPipe,
    NotificationCardComponent,
  ],
  templateUrl: './notification-feed.component.html',
  styleUrl: './notification-feed.component.scss',
  providers: [
    DialogService
  ]
})
export class NotificationFeedComponent implements OnInit {
  @ViewChild('feed') feed: ElementRef;
  notifications: Notification[] = [];
  dialogs: DynamicDialogRef[] = [];
  lastPostCursor: string;
  loading = true;

  constructor(
    private postService: PostService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.loading = true;
    agent.listNotifications({
      limit: 15
    }).then(
      response => {
        this.lastPostCursor = response.data.cursor;
        NotificationUtils.parseNotifications(response.data.notifications, this.postService).then(notifications => {
          this.notifications = notifications;
          setTimeout(() => {
            this.loading = false;
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
        limit: 15
      }).then(
        response => {
          this.lastPostCursor = response.data.cursor;
          NotificationUtils.parseNotifications(response.data.notifications, this.postService).then(notifications => {
            this.notifications = notifications;
            setTimeout(() => {
              this.loading = false;
            }, 500);
          });
        }
      );
    }
  }

  openPost(event: SignalizedFeedViewPost) {
    this.dialogs.push(
      this.dialogService.open(ImagePostDialogComponent, {
        modal: true,
        dismissableMask: true,
        data: {
          post: event
        },
        appendTo: this.feed.nativeElement,
        maskStyleClass: '!absolute',
        focusOnShow: false
      })
    );
  }

  log(event: any) {
    console.log(event)
  }
}
