import {ChangeDetectionStrategy, Component} from '@angular/core';
import {SidebarComponent} from '@components/navigation/sidebar/sidebar.component';
import {DeckComponent} from '@components/navigation/deck/deck.component';
import {GalleriaModule} from 'primeng/galleria';
import {MskyDialogService} from '@services/msky-dialog.service';
import {Dialog} from "primeng/dialog";
import {PostComposerComponent} from "@components/dialogs/post-composer/post-composer.component";
import {PostService} from '@services/post.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    SidebarComponent,
    DeckComponent,
    GalleriaModule,
    Dialog,
    PostComposerComponent
  ],
  templateUrl: './dashboard.component.html',
  styles: `
    :host(::ng-deep p-galleria) {
      --p-galleria-border-width: 0;
      //--p-galleria-indicator-button-active-background: #007bb7;
      //--p-galleria-indicator-button-width: 0.75rem;
      //--p-galleria-indicator-button-height: 0.75rem;

      //.p-galleria {
      //  height: 100vh;
      //}
      //
      //p-galleriacontent {
      //  width: 100vw;
      //}
      //
      .p-galleria-content {
        height: 100vh;
      }

      .p-galleria-items-container {
        min-height: 0;
        height: 100vh;
      }

      .p-galleria-indicator-list {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
      }

      .p-galleria-item img {
        max-height: 100%;
        object-fit: contain;
      }

      .p-galleria-close-button {
        z-index: 99999;
        background: transparent;
        outline: none;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  constructor(
    protected dialogService: MskyDialogService,
    protected postService: PostService
  ) {}
}
