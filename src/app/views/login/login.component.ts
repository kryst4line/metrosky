import {Component, signal} from '@angular/core';
import {Panel} from 'primeng/panel';
import {IftaLabel} from 'primeng/iftalabel';
import {InputText} from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {AuthService} from '@core/auth/auth.service';
import {MskyMessageService} from '@services/msky-message.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [
    Panel,
    IftaLabel,
    InputText,
    Button,
    FormsModule
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  credentials = signal({
    identifier: '',
    password: ''
  });

  constructor(
    private authService: AuthService,
    private messageService: MskyMessageService
  ) {}

  onLogin() {
    this.credentials().identifier = this.credentials().identifier.trim();

    if (
      this.credentials().identifier.length
    ) {
      this.authService.login(this.credentials());
    } else {
      this.messageService.warn('Please check your credentials.', 'Oops!');
    }
  }
}
