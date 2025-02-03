import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {RippleModule} from "primeng/ripple";
import {NgIcon, provideIcons} from "@ng-icons/core";
import {tablerHash, tablerList, tablerMessage, tablerSearch, tablerSettings, tablerUser} from "@ng-icons/tabler-icons";
import {NgTemplateOutlet} from "@angular/common";

@Component({
  selector: 'sidebar',
  imports: [
    RippleModule,
    NgIcon,
    NgTemplateOutlet
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideIcons({
      tablerUser,
      tablerSettings,
      tablerMessage,
      tablerList,
      tablerHash,
      tablerSearch
    })
  ]
})
export class SidebarComponent {
  @Output() onActionPost: EventEmitter<void> = new EventEmitter<void>;
}
