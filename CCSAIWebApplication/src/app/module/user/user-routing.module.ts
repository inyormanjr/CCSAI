import { UserProfileResolver } from './resolvers/user-profile.resolver';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ChangeUserPasswordComponent } from './change-user-password/change-user-password.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { RegisterComponent } from './register/register.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { GetUserByIdResolver } from './resolvers/get-user-by-id.resolver';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: "userlist"
  },
  {
    path: 'userlist',
    component: UserListComponent,
  },
  {
    path : 'updateuser/:id',
    component : UpdateUserComponent,
    resolve: {
      routeResolver: GetUserByIdResolver
    }
  },
  {
    path : 'userprofile',
    component : UserProfileComponent,
    resolve: {
      routeResolver: UserProfileResolver
    }
  },
  {
    path : 'changeuserpassword',
    component : ChangeUserPasswordComponent
  },
  {
    path : 'register',
    component : RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
