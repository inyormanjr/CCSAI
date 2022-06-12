
import { CourseService } from 'src/app/core/http/course/course.service';
import { UsersService } from 'src/app/core/http/user/users.service';
import { Enrollment } from './../../../shared/models/Enrollment';
import { ResponseResult } from './../../../shared/models/response.interface';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { EnrollmentService } from 'src/app/core/http/enrollment/enrollment.service';
import { EnrollmentActionTypes } from '../action/enrollment.action.types';
import { Store } from '@ngrx/store';
import { EnrollmentState } from '../reducer/enrollment.reducer';
import { noop } from 'jquery';
import { UserModel } from 'src/app/shared/models/UserModel';
import { Course } from 'src/app/shared/models/Course';
import { Term } from 'src/app/shared/models/Term';
import { TermsService } from 'src/app/core/http/terms/terms.service';



@Injectable()
export class EnrollmentEffects {

  loadEnrollments$ = createEffect(() =>
    this.actions$.pipe(ofType(EnrollmentActionTypes.loadEnrollments),
      tap((action) => {
        this.enrollmentService.Get(0, 0).pipe(map((response: ResponseResult<Enrollment[]>) => {
          this.enrollmentStore.dispatch(EnrollmentActionTypes.loadEnrollmentsSuccess({ data: response.data }))
        })).subscribe(noop, error => console.log(error))
      })
    ), { dispatch: false }
  );

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(ofType(EnrollmentActionTypes.loadUser),
      tap((action) => {
        this.userService.getUsersByRole('instructor').pipe(map((response: ResponseResult<UserModel[]>) => {
          this.enrollmentStore.dispatch(EnrollmentActionTypes.loadUsersSuccess({ data: response.data }))
        })).subscribe(noop, error => console.log(error))
      })
    ), { dispatch: false }
  );

  loadActiveCourses$ = createEffect(() =>
    this.actions$.pipe(ofType(EnrollmentActionTypes.loadActiveCourses),
      tap((action) => {
        this.courseService.getAllActiveCourse().pipe(map((response: ResponseResult<Course[]>) => {
          this.enrollmentStore.dispatch(EnrollmentActionTypes.loadActiveCoursesSuccess({ data: response.data }))
        })).subscribe(noop, error => console.log(error))
      })
    ), { dispatch: false }
  );

  loadTerms$ = createEffect(() =>
  this.actions$.pipe(ofType(EnrollmentActionTypes.loadTerms),
      tap((action) => {
          this.termService.Get(0, 0).pipe(map((response: ResponseResult<Term[]>) => {
              this.enrollmentStore.dispatch(EnrollmentActionTypes.loadTermsSuccess({ data: response.data }))
          })).subscribe(noop, error => console.log(error))
      })
  ), { dispatch: false }
);


  constructor(private actions$: Actions,
    private enrollmentStore: Store<EnrollmentState>,
    private enrollmentService: EnrollmentService,
    private userService: UsersService,
    private courseService: CourseService,
    private termService : TermsService) { }

}
