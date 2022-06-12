import { Enrollment } from 'src/app/shared/models/Enrollment';
import { createAction, props } from '@ngrx/store';
import { UserModel } from 'src/app/shared/models/UserModel';
import { Course } from 'src/app/shared/models/Course';
import { Term } from 'src/app/shared/models/Term';

export const loadEnrollments = createAction(
  '[Enrollment] Load Enrollments'
);

export const loadEnrollmentsSuccess = createAction(
  '[Enrollment] Load Enrollments Success',
  props<{ data: Enrollment[] }>()
);

export const loadEnrollmentsFailure = createAction(
  '[Enrollment] Load Enrollments Failure',
  props<{ error: any }>()
);

export const loadUser = createAction(
  '[Enrollment] Load Users'
);

export const loadUsersSuccess = createAction(
  '[Enrollment] Load Users Success',
  props<{ data: UserModel[] }>()
);


export const loadActiveCourses = createAction(
  '[Enrollment] Load Active Courses'
);

export const loadActiveCoursesSuccess = createAction(
  '[Enrollment] Load Active Courses Success',
  props<{ data: Course[] }>()
);

export const loadTerms = createAction(
  '[Enrollment] Load Terms'
);

export const loadTermsSuccess = createAction(
  '[Enrollment] Load Terms Success',
  props<{ data: Term[] }>()
);


