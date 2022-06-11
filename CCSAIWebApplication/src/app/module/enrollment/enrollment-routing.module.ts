import { EnrollmentListComponent } from './enrollment-list/enrollment-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewEnrollmentComponent } from './new-enrollment/new-enrollment.component';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: "enrollmentlist"
},
{
  path: 'enrollmentlist',
  component: EnrollmentListComponent,
},
{
  path : 'newenrollment',
  component : NewEnrollmentComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnrollmentRoutingModule { }
