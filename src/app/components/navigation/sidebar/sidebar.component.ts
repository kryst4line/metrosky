import {ChangeDetectionStrategy, Component, output} from '@angular/core';
import {RippleModule} from "primeng/ripple";
import {Avatar} from 'primeng/avatar';
import {ButtonDirective} from 'primeng/button';
import {Divider} from 'primeng/divider';
import {AuthService} from '@core/auth/auth.service';
import {Tooltip} from 'primeng/tooltip';

@Component({
  selector: 'sidebar',
  imports: [
    RippleModule,
    Avatar,
    ButtonDirective,
    Divider,
    Tooltip
  ],
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  onProfile = output<string>();
  onSearch = output();
  onLists = output();
  onFeeds = output();
  onSettings = output();
  onPost = output();

  constructor(
    protected authService: AuthService
  ) {}
}
