import { LoginStudentComponent } from './login-student/login-student.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{path: '', component: LoginStudentComponent}, {path: 'home', loadChildren: () => import("../app/home/home.module").then(x=> x.HomeModule)}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
