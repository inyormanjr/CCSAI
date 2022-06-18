import { CourseEffects } from './effects/course.effects';
import { EffectsModule } from '@ngrx/effects';
import { courseFeatureKey, courseReducer } from './reducer/course.reducer';
import { StoreModule } from '@ngrx/store';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseComponent } from './course.component';
import { NewCourseComponent } from './new-course/new-course.component';
import { UpdateCourseComponent } from './update-course/update-course.component';
import { CourseListComponent } from './course-list/course-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActiveCourseListComponent } from './active-course-list/active-course-list.component';
import { ModuleListComponent } from './module-list/module-list.component';


@NgModule({
  declarations: [
    CourseComponent,
    NewCourseComponent,
    UpdateCourseComponent,
    CourseListComponent,
    ActiveCourseListComponent,
    ModuleListComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    FormsModule,
    StoreModule.forFeature(courseFeatureKey,courseReducer),
    EffectsModule.forFeature([CourseEffects])
  ]
})
export class CourseModule { }
