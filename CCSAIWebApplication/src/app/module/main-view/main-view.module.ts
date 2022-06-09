import { ChangeUserPasswordComponent } from './../user/change-user-password/change-user-password.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainViewRoutingModule } from './main-view-routing.module';
import { MainViewComponent } from './main-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { MainNavBarComponent } from 'src/app/shared/components/main-nav-bar/main-nav-bar.component';


@NgModule({
  declarations: [
    MainViewComponent,
    MainNavBarComponent
  ],
  imports: [
    CommonModule,
    MainViewRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule
  ]
})
export class MainViewModule { }
