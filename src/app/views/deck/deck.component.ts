import { Component } from '@angular/core';
import {PostFeedComponent} from "~/src/app/shared/layout/lists/post-feed/post-feed.component";
import {Ripple} from "primeng/ripple";

@Component({
    selector: 'app-deck',
    imports: [
        PostFeedComponent,
        Ripple
    ],
    templateUrl: './deck.component.html',
    styleUrl: './deck.component.scss'
})
export class DeckComponent {

}
