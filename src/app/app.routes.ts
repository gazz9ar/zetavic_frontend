import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { isAuthenticatedGuard } from './shared/guards/is-authenticated.guard';
import { LandingComponent } from './pages/landing/landing.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'platform',
    loadChildren: () => import('./pages/platform/platform.routes').then(r => r.routes),
    canMatch: [isAuthenticatedGuard]
  },
  {
    path: '',
    component: LandingComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
