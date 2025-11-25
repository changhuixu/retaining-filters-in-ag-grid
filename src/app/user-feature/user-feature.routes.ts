import { Routes } from '@angular/router';
import { UserDetail } from './user-detail/user-detail';
import { UserList } from './user-list/user-list';

export const USERS_ROUTES: Routes = [
  {
    path: '',
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
];
