import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'users',
  },
  {
    path: 'users',
    loadChildren: () => import('./user-feature/user-feature.routes').then((m) => m.USERS_ROUTES),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
