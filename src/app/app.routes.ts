import {Routes} from '@angular/router';
import {AuthGuard} from '@core/auth/auth.guard';
import {DashboardComponent} from '@views/dashboard/dashboard.component';
import {LoginComponent} from '@views/login/login.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  }
];
