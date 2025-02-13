import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {AuthService} from "./core/auth/auth.service";
import {takeWhile} from "rxjs";
import {Toast} from "primeng/toast";
import {NgIcon, provideIcons} from "@ng-icons/core";
import {
  tablerAlertTriangle,
  tablerArrowForward,
  tablerCircleSquare,
  tablerDots,
  tablerHeart,
  tablerInfoCircle,
  tablerLink,
  tablerMessage,
  tablerPin,
  tablerRepeat,
  tablerUserPlus,
  tablerX,
  tablerSettings,
  tablerList,
  tablerHash,
  tablerSearch,
  tablerLoader2,
  tablerUser,
  tablerCircleX, tablerPaperclip
} from "@ng-icons/tabler-icons";
import {tablerHeartFill} from "@ng-icons/tabler-icons/fill";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Toast,
    NgIcon,
    NgClass,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    provideIcons({
      tablerX,
      tablerInfoCircle,
      tablerAlertTriangle,
      tablerArrowForward,
      tablerDots,
      tablerHeart,
      tablerHeartFill,
      tablerLink,
      tablerMessage,
      tablerPin,
      tablerRepeat,
      tablerUserPlus,
      tablerCircleSquare,
      tablerSettings,
      tablerList,
      tablerHash,
      tablerSearch,
      tablerLoader2,
      tablerUser,
      tablerCircleX,
      tablerPaperclip
    })
  ]
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.initApp();
  }

  initApp() {
    this.authService.authenticationState.pipe(takeWhile(res => !res, true)).subscribe(state => {
      if (state) {
        this.router.navigate(['']);
      } else {
        this.router.navigate(['login']);
      }
    });
  }

  ngOnInit(): void {
  }
}
