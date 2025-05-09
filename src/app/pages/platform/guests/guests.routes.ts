import { Routes } from '@angular/router';
import { GuestsComponent } from './guests.component';
import { ImportComponent } from './import/import.component';


export const routes: Routes = [
  {
    path: '',
    component: GuestsComponent,
    children: [
      {
        path: 'import',
        component: ImportComponent
      },
    ]
  },

];
