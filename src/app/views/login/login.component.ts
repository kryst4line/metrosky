import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AtpAgentLoginOpts} from "@atproto/api";
import {AuthService} from "../../core/auth/auth.service";
import {CardModule} from "primeng/card";
import {InputTextModule} from "primeng/inputtext";
import {FloatLabelModule} from "primeng/floatlabel";
import {ButtonModule} from "primeng/button";
import {MessageService} from "~/src/app/api/services/message.service";

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
    identifier: '',
    password: ''
  };

  APP_PASSWORD_REGEX = new RegExp("[a-z0-9]{4}\-[a-z0-9]{4}\-[a-z0-9]{4}\-[a-z0-9]{4}");

  constructor(
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  onLogin() {
    if (
      this.credentials.identifier.trim().length &&
      this.APP_PASSWORD_REGEX.exec(this.credentials.password)
    ) {
      this.authService.login(this.credentials);
    } else {
      this.messageService.warnIcon('Please check your credentials.', 'Oops!');
    }
  }
}
