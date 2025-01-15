import { Routes } from '@angular/router';
import {AuthGuard} from "./core/auth/auth.guard";

export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./views/deck/deck.routes').then(m => m.routes),
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./views/login/login.routes').then((m) => m.routes)
  }
];
