import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RippleModule} from "primeng/ripple";
import {NgIcon} from "@ng-icons/core";
import {NgTemplateOutlet} from "@angular/common";
import {AppBskyActorDefs} from "@atproto/api";

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
})
export class SidebarComponent implements OnInit {
  @Output() onActionPost: EventEmitter<void> = new EventEmitter<void>;
  loggedUser: AppBskyActorDefs.ProfileViewDetailed;

  ngOnInit() {
    this.loggedUser = JSON.parse(localStorage.getItem('logged_user')) as AppBskyActorDefs.ProfileViewDetailed;
  }
}
