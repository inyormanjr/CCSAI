import { Enrollment } from 'src/app/shared/models/Enrollment';
import { Action, createReducer, on } from '@ngrx/store';
import { EnrollmentActionTypes } from '../action/enrollment.action.types';


export const enrollmentFeatureKey = 'enrollment';

export interface EnrollmentState {
  enrollmentList: Enrollment[];
}

export const initialEnrollmentState: EnrollmentState = {
  enrollmentList: []
};

export const enrollmentReducer = createReducer(initialEnrollmentState,
  on(EnrollmentActionTypes.loadEnrollmentsSuccess, (state, action) => {
    return {
      ...state,
      enrollmentList: action.data
  }
}));
