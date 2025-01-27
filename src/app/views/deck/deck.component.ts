import { Component } from '@angular/core';
import {PostFeedComponent} from "~/src/app/shared/layout/lists/post-feed/post-feed.component";
import {Ripple} from "primeng/ripple";
import {NotificationFeedComponent} from "~/src/app/shared/layout/lists/notification-feed/notification-feed.component";

@Component({
    selector: 'app-deck',
  imports: [
    PostFeedComponent,
    Ripple,
    NotificationFeedComponent
  ],
    templateUrl: './deck.component.html',
    styleUrl: './deck.component.scss'
})
export class DeckComponent {

}
