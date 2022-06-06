import { EffectsModule } from '@ngrx/effects';
import { userFeatureKey, userReducer } from './reducer/user.reducer';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserListComponent } from './user-list/user-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { RegisterComponent } from './register/register.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UserEffects } from './effect/user.effects';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { GetUserByIdResolver } from './resolvers/get-user-by-id.resolver';



@NgModule({
  declarations: [
    UserComponent,
    UserListComponent,
    RegisterComponent,
    UpdateUserComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    DataTablesModule,
    NgxDatatableModule,
    FormsModule,
    StoreModule.forFeature(userFeatureKey,userReducer),
    EffectsModule.forFeature([UserEffects])
  ],
  providers : [GetUserByIdResolver]
})
export class UserModule { }
