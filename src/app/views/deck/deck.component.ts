import {Component, OnInit, WritableSignal} from '@angular/core';
import {TimelineFeedComponent} from "~/src/app/shared/layout/feeds/timeline-feed/timeline-feed.component";
import {NotificationFeedComponent} from "~/src/app/shared/layout/feeds/notification-feed/notification-feed.component";
import {SidebarComponent} from "~/src/app/shared/components/navigation/sidebar/sidebar.component";
import {PostComposerComponent} from "~/src/app/shared/layout/dialogs/post-composer/post-composer.component";
import {Drawer} from "primeng/drawer";
import {PostService} from "~/src/app/api/services/post.service";
import {Subject} from "rxjs";
import {MessageService} from "~/src/app/api/services/message.service";
import {FileUploadModule} from "ng2-file-upload";
import {PostCompose} from "~/src/app/api/models/post-compose";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-deck',
  imports: [
    TimelineFeedComponent,
    NotificationFeedComponent,
    SidebarComponent,
    PostComposerComponent,
    Drawer,
    FileUploadModule
  ],
  templateUrl: './deck.component.html',
  styleUrl: './deck.component.scss',
})
export class DeckComponent implements OnInit {
  postCompose: WritableSignal<PostCompose>;
  creatingPost = false;

  refreshFeeds: Subject<void> = new Subject<void>();

  constructor(
    protected postService: PostService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.postCompose = this.postService.postCompose;
  }

  publishPost(text: string) {
    if (!text.trim().length) return;
    this.creatingPost = true;

    this.postService.publishPost(text).then(
      () => {
        this.messageService.success('Your post has been successfully published');

        setTimeout(() => {
          this.refreshFeeds.next();
        }, 1e3);
      },
      (err: HttpErrorResponse) => this.messageService.error(err.message, 'Oops!')
    ).finally(() => this.creatingPost = false);
  }

  onFileDrop($event: any) {
    this.postService.attachMedia($event);
  }
}
