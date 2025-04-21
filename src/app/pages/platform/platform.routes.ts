import { Routes } from '@angular/router';
import { GuestsComponent } from './guests/guests.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PlatformComponent } from './platform.component';


export const routes: Routes = [
  {
    path: '',
    component: PlatformComponent,
    children: [
      {
        path: 'guests',
        component: GuestsComponent
      },
    ]
  },

];
