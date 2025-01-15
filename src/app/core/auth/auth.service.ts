import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {AtpAgentLoginOpts} from "@atproto/api";
import {agent} from "../bsky.api";
import {Router} from "@angular/router";

const TOKEN_KEY = 'session';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticationState = new BehaviorSubject(false);

  constructor(private router: Router) {
    this.checkToken();
  }

  checkToken() {
    const sessionData = localStorage.getItem(TOKEN_KEY);
    if (sessionData) {
      agent.resumeSession(JSON.parse(sessionData)).then(
        () => {
          this.authenticationState.next(true);
        }
      );
    }
  }

  login(credentials: AtpAgentLoginOpts) {
    agent.login(credentials).then(() => {
      localStorage.setItem(TOKEN_KEY, JSON.stringify(agent.session));
      this.authenticationState.next(true);
      this.router.navigate(['']);
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
