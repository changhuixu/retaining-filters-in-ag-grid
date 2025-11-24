import { Routes } from '@angular/router';
import { UserDetail } from './user-detail/user-detail';
import { UserList } from './user-list/user-list';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'users',
  },
  {
    path: 'users',
    children: [
      {
        path: '',
        component: UserList,
      },
      {
        path: ':id',
        component: UserDetail,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
