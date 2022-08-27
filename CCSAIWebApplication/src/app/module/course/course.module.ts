import { AddAssessmentComponent } from './assessment/add-assessment/add-assessment.component';
import { ExerciseMainViewComponent } from './exercise/exercise-main-view/exercise-main-view.component';
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
import { ModuleViewComponent } from './module-view/module-view.component';
import { ModuleViewReferenceTabComponent } from './components/module-view-reference-tab/module-view-reference-tab.component';
import { AddDiscussionModalComponent } from './discussion/add-discussion-modal/add-discussion-modal.component';
import { UpdateDiscussionModalComponent } from './discussion/update-discussion-modal/update-discussion-modal.component';
import { AssessmentListComponent } from './assessment/assessment-list/assessment-list.component';






@NgModule({
  declarations: [
    CourseComponent,
    NewCourseComponent,
    UpdateCourseComponent,
    CourseListComponent,
    ActiveCourseListComponent,
    ModuleListComponent,
    ModuleViewComponent,
    ModuleViewReferenceTabComponent,
    AddDiscussionModalComponent,
    UpdateDiscussionModalComponent,
    ExerciseMainViewComponent,
    AssessmentListComponent,
    AddAssessmentComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    FormsModule,
    StoreModule.forFeature(courseFeatureKey,courseReducer),
    EffectsModule.forFeature([CourseEffects]),
  ]
})
export class CourseModule { }
