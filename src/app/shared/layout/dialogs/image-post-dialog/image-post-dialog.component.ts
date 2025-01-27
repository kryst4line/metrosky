import {ChangeDetectionStrategy, Component, Input, WritableSignal} from '@angular/core';
import {AppBskyFeedDefs} from "@atproto/api";

@Component({
  selector: 'image-post-dialog',
  imports: [],
  templateUrl: './image-post-dialog.component.html',
  styleUrl: './image-post-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImagePostDialogComponent {
  @Input() post: WritableSignal<AppBskyFeedDefs.FeedViewPost>;
}
