import { CourseListComponent } from './course-list/course-list.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [  {
  path: '',
  pathMatch: 'full',
  redirectTo: "courselist"
},
{
  path: 'courselist',
  component: CourseListComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
