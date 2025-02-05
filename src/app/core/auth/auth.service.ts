import { Injectable } from '@angular/core';
import {BehaviorSubject, from} from 'rxjs';
import {AtpAgentLoginOpts} from "@atproto/api";
import {agent} from "../bsky.api";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {HttpErrorResponse} from "@angular/common/http";

const TOKEN_KEY = 'session';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  authenticationState = new BehaviorSubject(false);

  constructor(
    private router: Router,
    private messageService: MessageService
  ) {
    this.checkToken();
  }

  checkToken() {
    const sessionData = localStorage.getItem(TOKEN_KEY);
    if (sessionData) {
      agent.resumeSession(JSON.parse(sessionData)).then(
        () => {
          this.authenticationState.next(true);
          localStorage.setItem(TOKEN_KEY, JSON.stringify(agent.session));
        }
      );
    }
  }

  login(credentials: AtpAgentLoginOpts) {
    from(agent.login(credentials)).subscribe({
      next: () => {
        localStorage.setItem(TOKEN_KEY, JSON.stringify(agent.session));
        this.authenticationState.next(true);
        this.router.navigate(['']);
      },
      error: (err: HttpErrorResponse) => {
        this.messageService.add({
          icon: 'warn',
          severity: 'warn',
          summary: 'Oops!',
          detail: err.message
        });
      }
    });
  }

  logout() {
    agent.logout().then(
      () => {
        localStorage.removeItem(TOKEN_KEY);
        this.authenticationState.next(false);
      }
    );
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }
}
