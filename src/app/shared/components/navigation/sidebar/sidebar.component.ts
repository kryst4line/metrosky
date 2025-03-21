import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RippleModule} from "primeng/ripple";
import {NgIcon} from "@ng-icons/core";
import {NgOptimizedImage, NgTemplateOutlet} from "@angular/common";
import {AppBskyActorDefs} from "@atproto/api";
import {StorageKeys} from "~/src/app/core/storage-keys";

@Component({
  selector: 'sidebar',
  imports: [
    RippleModule,
    NgIcon,
    NgTemplateOutlet,
    NgOptimizedImage
  ],
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit {
  @Output() onActionProfile: EventEmitter<string> = new EventEmitter<string>;
  @Output() onActionSearch: EventEmitter<void> = new EventEmitter<void>;
  @Output() onActionLists: EventEmitter<void> = new EventEmitter<void>;
  @Output() onActionFeeds: EventEmitter<void> = new EventEmitter<void>;
  @Output() onActionSettings: EventEmitter<void> = new EventEmitter<void>;
  @Output() onActionPost: EventEmitter<void> = new EventEmitter<void>;
  loggedUser: AppBskyActorDefs.ProfileViewDetailed;

  ngOnInit() {
    this.loggedUser = JSON.parse(localStorage.getItem(StorageKeys.LOGGED_USER)) as AppBskyActorDefs.ProfileViewDetailed;
  }
}
