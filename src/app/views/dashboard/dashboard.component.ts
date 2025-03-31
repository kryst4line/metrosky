import {ChangeDetectionStrategy, Component} from '@angular/core';
import {SidebarComponent} from '@components/navigation/sidebar/sidebar.component';
import {DeckComponent} from '@components/navigation/deck/deck.component';
import {GalleriaModule} from 'primeng/galleria';
import {MskyDialogService} from '@services/msky-dialog.service';
import {PostService} from '@services/post.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    SidebarComponent,
    DeckComponent,
    GalleriaModule,
  ],
  templateUrl: './dashboard.component.html',
  styles: `
    :host(::ng-deep p-galleria) {
      --p-galleria-border-width: 0;
      --p-galleria-nav-button-size: 3.5rem;

      .p-galleria-content {
        max-height: 90vh;
        max-width: 90vw;
      }

      .p-galleria-items {
        justify-content: center;
      }

      .p-galleria-item {
        width: fit-content;
      }

      .p-galleria-items-container {
        min-height: 0;
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
        background: transparent;
        outline: none;
        height: 100vh;
        width: 100vw;
        border-radius: 0;
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
