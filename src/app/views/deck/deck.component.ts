import { Component } from '@angular/core';
import {PostFeedComponent} from "~/src/app/shared/layout/lists/post-feed/post-feed.component";
import {NotificationFeedComponent} from "~/src/app/shared/layout/lists/notification-feed/notification-feed.component";
import {SidebarComponent} from "~/src/app/shared/components/navigation/sidebar/sidebar.component";

@Component({
    selector: 'app-deck',
  imports: [
    PostFeedComponent,
    NotificationFeedComponent,
    SidebarComponent
  ],
    templateUrl: './deck.component.html',
    styleUrl: './deck.component.scss'
})
export class DeckComponent {
}
