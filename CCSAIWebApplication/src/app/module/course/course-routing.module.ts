import { GetCourseByIdResolver } from './../user/resolver/get-course-by-id.resolver';
import { ModuleListComponent } from './module-list/module-list.component';
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
},
{
  path : 'modulelist/:id',
  component : ModuleListComponent,
  resolve : {
    routeResolver : GetCourseByIdResolver
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
