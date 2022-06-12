import { Term } from './../../../shared/models/Term';
import { UserModel } from './../../../shared/models/UserModel';
import { Enrollment } from 'src/app/shared/models/Enrollment';
import { Action, createReducer, on } from '@ngrx/store';
import { EnrollmentActionTypes } from '../action/enrollment.action.types';
import { Course } from 'src/app/shared/models/Course';


export const enrollmentFeatureKey = 'enrollment';

export interface EnrollmentState {
  enrollmentList: Enrollment[];
  userList: UserModel[];
  activeCourseList: Course[];
  termList: Term[];
}

export const initialEnrollmentState: EnrollmentState = {
  enrollmentList: [],
  userList: [],
  activeCourseList: [],
  termList: []
};

export const enrollmentReducer = createReducer(initialEnrollmentState,
  on(EnrollmentActionTypes.loadEnrollmentsSuccess, (state, action) => {
    return {
      ...state,
      enrollmentList: action.data
    }
  }),
  on(EnrollmentActionTypes.loadUsersSuccess, (state, action) => {
    return {
      ...state,
      userList: action.data
    }
  }),
  on(EnrollmentActionTypes.loadActiveCoursesSuccess, (state, action) => {
    return {
      ...state,
      activeCourseList: action.data
    }
  }),
  on(EnrollmentActionTypes.loadTermsSuccess, (state, action) => {
    return {
      ...state,
      termList: action.data
    }
  }));
