import { EnrollmentDetailListComponent } from './enrollment-detail-list/enrollment-detail-list.component';
import { UpdateEnrollmentComponent } from './update-enrollment/update-enrollment.component';
import { EnrollmentListComponent } from './enrollment-list/enrollment-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewEnrollmentComponent } from './new-enrollment/new-enrollment.component';
import { UpdateEnrollmentResolver } from './resolver/update-enrollment.resolver';

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
},
{
  path : 'updateenrollment/:id',
  component : UpdateEnrollmentComponent,
  resolve : {
    routeResolver : UpdateEnrollmentResolver
  }
},
{
  path : 'enrollmentdetails/:id',
  component : EnrollmentDetailListComponent,
  resolve : {
    routeResolver : UpdateEnrollmentResolver
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnrollmentRoutingModule { }
