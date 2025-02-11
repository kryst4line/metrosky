import {Component, OnInit, WritableSignal} from '@angular/core';
import {PostFeedComponent} from "~/src/app/shared/layout/lists/post-feed/post-feed.component";
import {NotificationFeedComponent} from "~/src/app/shared/layout/lists/notification-feed/notification-feed.component";
import {SidebarComponent} from "~/src/app/shared/components/navigation/sidebar/sidebar.component";
import {PostComposerComponent} from "~/src/app/shared/layout/dialogs/post-composer/post-composer.component";
import {Drawer} from "primeng/drawer";
import {NgIcon} from "@ng-icons/core";
import {PostService} from "~/src/app/api/services/post.service";
import {Subject} from "rxjs";
import {MessageService} from "primeng/api";
import {FileUploadModule} from "ng2-file-upload";
import {PostCompose} from "~/src/app/api/models/post-compose";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-deck',
  imports: [
    PostFeedComponent,
    NotificationFeedComponent,
    SidebarComponent,
    PostComposerComponent,
    Drawer,
    NgIcon,
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
    this.creatingPost = true;



    this.postService.publishPost(text).then(
      () => {
        this.messageService.add({
          severity: 'success',
          detail: 'Your post has been successfully published'
        });

        setTimeout(() => {
          this.refreshFeeds.next();
        }, 1e3);
      },
      (err: HttpErrorResponse) => {
        this.messageService.add({
          icon: 'error',
          severity: 'error',
          summary: 'Oops!',
          detail: err.message
        });
      }
    ).finally(() => this.creatingPost = false);
  }

  onFileDrop($event: any) {
    this.postService.attachMedia($event);
  }
}
