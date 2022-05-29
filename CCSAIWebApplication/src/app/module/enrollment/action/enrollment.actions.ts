import { Enrollment } from 'src/app/shared/models/Enrollment';
import { createAction, props } from '@ngrx/store';

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
