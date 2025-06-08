import { Routes } from "@angular/router";
import { LoginComponent } from "./login.component";
import { UserInformationComponent } from "./user-information/user-information.component";
import { isFirstTimer } from "../../shared/guards/is-first-timer.guard";
import { SignupInformationComponent } from "./signup-information/signup-information.component";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => LoginComponent
  },
  {
    path: 'user-information',
    loadComponent: () => UserInformationComponent,
    canMatch: [isFirstTimer]
  },
  {
    path: 'signup-confirmation',
    loadComponent: () => SignupInformationComponent,
    canMatch: [isFirstTimer]
  },
];