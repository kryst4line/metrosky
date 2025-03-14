import { Injectable } from '@angular/core';
import {BehaviorSubject, from} from 'rxjs';
import {AtpAgentLoginOpts} from "@atproto/api";
import {agent} from "../bsky.api";
import {Router} from "@angular/router";
import {MskyMessageService} from "~/src/app/api/services/msky-message.service";
import {HttpErrorResponse} from "@angular/common/http";
import {StorageKeys} from "~/src/app/core/storage-keys";
import {ColumnService} from "~/src/app/api/services/column.service";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  authenticationState = new BehaviorSubject(false);

  constructor(
    private router: Router,
    private messageService: MskyMessageService,
    private columnService: ColumnService
  ) {
    this.checkToken();
  }

  checkToken() {
    const sessionData = localStorage.getItem(StorageKeys.TOKEN_KEY);
    if (sessionData) {
      agent.resumeSession(JSON.parse(sessionData)).then(
        () => {
          localStorage.setItem(StorageKeys.TOKEN_KEY, JSON.stringify(agent.session));

          //store user info in localStorage
          agent.getProfile({actor: agent.session.did}).then(response => {
            localStorage.setItem(StorageKeys.LOGGED_USER, JSON.stringify(response.data));
            this.columnService.checkColumns();

            this.authenticationState.next(true);
          });
        }
      );
    }
  }

  login(credentials: AtpAgentLoginOpts) {
    from(agent.login(credentials)).subscribe({
      next: () => {
        localStorage.setItem(StorageKeys.TOKEN_KEY, JSON.stringify(agent.session));

        //store user info in localStorage
        agent.getProfile({actor: agent.session.did}).then(response => {
          localStorage.setItem(StorageKeys.LOGGED_USER, JSON.stringify(response.data));
          this.columnService.checkColumns();

          this.authenticationState.next(true);
          this.router.navigate(['']);
        });
      },
      error: (err: HttpErrorResponse) => {
        this.messageService.warnIcon(err.message, 'Oops!');
      }
    });
  }

  logout() {
    agent.logout().then(
      () => {
        localStorage.removeItem(StorageKeys.TOKEN_KEY);
        this.authenticationState.next(false);
      }
    );
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }
}
