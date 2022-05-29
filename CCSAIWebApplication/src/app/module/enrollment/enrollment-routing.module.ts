import { EnrollmentListComponent } from './enrollment-list/enrollment-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: "enrollmentlist"
},
{
  path: 'enrollmentlist',
  component: EnrollmentListComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnrollmentRoutingModule { }
