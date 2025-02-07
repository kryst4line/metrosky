import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {RippleModule} from "primeng/ripple";
import {NgIcon} from "@ng-icons/core";
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
})
export class SidebarComponent {
  @Output() onActionPost: EventEmitter<void> = new EventEmitter<void>;
}
