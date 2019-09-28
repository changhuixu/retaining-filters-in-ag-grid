import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

@NgModule({
  declarations: [UsersListComponent, UserDetailComponent],
  imports: [SharedModule, UsersRoutingModule]
})
export class UsersModule {}
