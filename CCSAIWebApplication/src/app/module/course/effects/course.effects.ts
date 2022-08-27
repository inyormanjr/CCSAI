import { AssessmentListDTOService } from './../../../core/http/assessment/assessment-list-dto.service';
import { DiscussionService } from './../../../core/http/discussion/discussion.service';
import { CourseModelModule } from './../../../shared/models/CourseModule';
import { ModuleService } from './../../../core/http/module/module.service';
import { Course } from './../../../shared/models/Course';

import { CourseState } from './../reducer/course.reducer';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { CourseActionTypes } from '../action/course.action.types';
import { ResponseResult } from './../../../shared/models/response.interface';
import { Store } from '@ngrx/store';
import { AlertifyjsService } from 'src/app/core/services/alertifyjs.service';
import { CourseService } from 'src/app/core/http/course/course.service';
import { data, noop } from 'jquery';
import { Discussion } from 'src/app/shared/models/Discussion';
import { AssessmentListDTO } from 'src/app/shared/models/Assessment';

@Injectable()
export class CourseEffects {
  loadCourses$ = createEffect(() =>
    this.actions$.pipe(ofType(CourseActionTypes.loadCourses),
      tap((action) => {
        this.courseService.Get(0, 0).pipe(map((response: ResponseResult<Course[]>) => {
          this.courseStore.dispatch(CourseActionTypes.loadCoursesSuccess({ data: response.data }))
        })).subscribe(noop, error => console.log(error))
      })
    ), { dispatch: false }
  );

  loadModules$ = createEffect(() =>
    this.actions$.pipe(ofType(CourseActionTypes.loadModulesByCourseId),
      tap((action) => {
        this.moduleService.getModulesByCourseId(action._id).pipe(map((response: ResponseResult<CourseModelModule[]>) => {
          this.courseStore.dispatch(CourseActionTypes.loadModulesByCourseIdSuccess({ data: response.data }))
        })).subscribe(noop, error => console.log(error))
      })
    ), { dispatch: false }
  );

  loadDiscussions$ = createEffect(() =>
    this.actions$.pipe(ofType(CourseActionTypes.loadDiscussionsByModuleId),
      tap((action) => {

        this.discussionService.getDiscussionsByModuleId(action._id).pipe(map((response: ResponseResult<Discussion[]>) => {
          this.courseStore.dispatch(CourseActionTypes.loadDiscussionsByModuleIdSuccess({ data: response.data }))
        })).subscribe(noop, error => console.log(error))
      })
    ), { dispatch: false }
  );

  loadAssessmentsByModuleId$ = createEffect(() =>
  this.actions$.pipe(ofType(CourseActionTypes.loadAssessmentByModuleId),
    tap((action) => {

      this.assessmentListDTOService.getAssessmentsByModuleId(action._id).pipe(map((response: ResponseResult<AssessmentListDTO[]>) => {
       
        this.courseStore.dispatch(CourseActionTypes.loadAssessmentByModuleIdSuccess({ data: response.data }))
      })).subscribe(noop, error => console.log(error))
    })
  ), { dispatch: false }
);

  getCourseById$ = createEffect(() =>
    this.actions$.pipe(ofType(CourseActionTypes.getCourseById),
      tap((action) => {
        this.courseService.GetById(action._id).pipe(map((response: ResponseResult<Course>) => {
          this.courseStore.dispatch(CourseActionTypes.getCourseByIdSuccess({ course: response.data }))
        })).subscribe(noop, error => {
          this.courseStore.dispatch(CourseActionTypes.getCourseByIdFailure({ error }));
          this.alertify.error(error.error.error);
        })
      })
    ), { dispatch: false }
  );

  activateCourse$ = createEffect(() =>
    this.actions$.pipe(ofType(CourseActionTypes.activateCourse),
      tap((action) => {
        this.courseService.activateCourse(action.course).pipe(map((response: ResponseResult<Course>) => {

          this.courseStore.dispatch(CourseActionTypes.loadCourses());
          this.alertify.success("Course Activated");
        })).subscribe(noop, error => {
          this.alertify.error(error.error.error);
        });
      })
    ), { dispatch: false }
  );

  createCourse$ = createEffect(() =>
    this.actions$.pipe(ofType(CourseActionTypes.createCourse),
      tap((action) => {
        this.courseService.Create(action.data).pipe(map((response: ResponseResult<Course>) => {
          this.courseStore.dispatch(CourseActionTypes.loadCourses());
          this.courseStore.dispatch(CourseActionTypes.createCourseSuccess({ data: response.data }));
          this.alertify.success("Course Saved.");
        })).subscribe(noop, error => {
          this.courseStore.dispatch(CourseActionTypes.createCourseFailure());
          this.alertify.error(error.error.error);
        })
      })
    ), { dispatch: false }
  );

  updateCourse$ = createEffect(() =>
    this.actions$.pipe(ofType(CourseActionTypes.updateCourse),
      tap((action) => {

        this.courseService.Update(action.id, action.course).pipe(map((response: ResponseResult<Course>) => {

          this.courseStore.dispatch(CourseActionTypes.getCourseById({ _id: response.data._id }));
          this.courseStore.dispatch(CourseActionTypes.loadCourses());
          this.alertify.success("Course Saved.");
        })).subscribe(noop, error => {
          this.alertify.error(error.error.error);
        })
      })
    ), { dispatch: false }
  );

  createDiscussion$ = createEffect(() =>
    this.actions$.pipe(ofType(CourseActionTypes.createDiscussion),
      tap((action) => {
        this.discussionService.Create(action.data).pipe(map((response: ResponseResult<Discussion>) => {

          this.courseStore.dispatch(CourseActionTypes.loadDiscussionsByModuleId({ _id: response.data.moduleId }));
          this.alertify.success("Discussion Saved.");
        })).subscribe(noop, error => {

          this.alertify.error(error.error.error);
        })
      })
    ), { dispatch: false }
  );

  updateDiscussion$ = createEffect(() =>
    this.actions$.pipe(ofType(CourseActionTypes.updateDiscussion),
      tap((action) => {

        this.discussionService.Update(action.id, action.discussion).pipe(map((response: ResponseResult<Discussion>) => {
          this.courseStore.dispatch(CourseActionTypes.loadDiscussionsByModuleId({_id : response.data.moduleId}));
          this.alertify.success("Discussion Saved.");
        })).subscribe(noop, error => {
          this.alertify.error(error.error.error);
        })
      })
    ), { dispatch: false }
  );

  deactivateUser$ = createEffect(() =>
    this.actions$.pipe(ofType(CourseActionTypes.deactivateCourse),
      tap((action) => {
        this.courseService.deactivateCourse(action.course).pipe(map((response: ResponseResult<Course>) => {
          this.courseStore.dispatch(CourseActionTypes.loadCourses());
          this.alertify.success("Course deactivated");
        })).subscribe(noop, error => {
          this.alertify.error(error.error.error);
        });
      })
    ), { dispatch: false }
  );

  constructor(private actions$: Actions,
    private courseStore: Store<CourseState>,
    private courseService: CourseService,
    private alertify: AlertifyjsService,
    private moduleService: ModuleService,
    private discussionService: DiscussionService,
    private assessmentListDTOService : AssessmentListDTOService) { }
}
