import {Component, OnInit, WritableSignal} from '@angular/core';
import {PostFeedComponent} from "~/src/app/shared/layout/lists/post-feed/post-feed.component";
import {NotificationFeedComponent} from "~/src/app/shared/layout/lists/notification-feed/notification-feed.component";
import {SidebarComponent} from "~/src/app/shared/components/navigation/sidebar/sidebar.component";
import {PostComposerComponent} from "~/src/app/shared/layout/dialogs/post-composer/post-composer.component";
import {Drawer} from "primeng/drawer";
import {NgIcon, provideIcons} from "@ng-icons/core";
import {tablerX} from "@ng-icons/tabler-icons";
import {PostService} from "~/src/app/api/services/post.service";
import {AppBskyFeedPost, RichText} from "@atproto/api";
import {agent} from "~/src/app/core/bsky.api";
import {from, Subject} from "rxjs";

@Component({
  selector: 'app-deck',
  imports: [
    PostFeedComponent,
    NotificationFeedComponent,
    SidebarComponent,
    PostComposerComponent,
    Drawer,
    NgIcon
  ],
  templateUrl: './deck.component.html',
  styleUrl: './deck.component.scss',
  providers: [
    provideIcons({
      tablerX
    })
  ]
})
export class DeckComponent implements OnInit {
  newPost: WritableSignal<AppBskyFeedPost.Record>;
  creatingPost = false;

  refreshFeeds = new Subject<void>();

  constructor(protected postService: PostService) {}

  ngOnInit() {
    this.newPost = this.postService.newPost;
  }

  post(text: string) {
    this.creatingPost = true;

    const rt = new RichText({
      text: text
    });

    rt.detectFacets(agent).then(() => {
      this.postService.newPost().text = text;
      this.postService.newPost().facets = rt.facets;
      this.postService.newPost().createdAt = new Date().toISOString();

      from(agent.post(this.postService.newPost())).subscribe({
        next: () => {
          this.postService.newPost.set(undefined);
          this.refreshFeeds.next();
        },
        error: err => {

        }
      }).add(() => this.creatingPost = false);
    });
  }
}
