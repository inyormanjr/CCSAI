import { Enrollment } from 'src/app/shared/models/Enrollment';
import { Action, createReducer, on } from '@ngrx/store';


export const enrollmentFeatureKey = 'enrollment';

export interface EnrollmentState {
  enrollmentList: Enrollment[];
}

export const initialEnrollmentState: EnrollmentState = {
  enrollmentList: []
};

export const reducer = createReducer(initialEnrollmentState);
