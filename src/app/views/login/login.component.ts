import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AtpAgentLoginOpts} from "@atproto/api";
import {AuthService} from "../../core/auth/auth.service";
import {CardModule} from "primeng/card";
import {InputTextModule} from "primeng/inputtext";
import {FloatLabelModule} from "primeng/floatlabel";
import {ButtonModule} from "primeng/button";

@Component({
    selector: 'app-login',
    imports: [
        FormsModule,
        CardModule,
        InputTextModule,
        FloatLabelModule,
        ButtonModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
  credentials: AtpAgentLoginOpts = {
    identifier: 'dragon.gal',
    password: ''
  };

  constructor(private authService: AuthService) {}

  onLogin() {
    this.authService.login(this.credentials);
  }
}
