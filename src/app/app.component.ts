import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {AuthService} from "./core/auth/auth.service";
import {takeWhile} from "rxjs";
import {Toast} from "primeng/toast";
import {NgIcon} from "@ng-icons/core";
import {NgClass} from "@angular/common";
import {iconsProvider} from "~/src/app/app.config";

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
    iconsProvider
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
