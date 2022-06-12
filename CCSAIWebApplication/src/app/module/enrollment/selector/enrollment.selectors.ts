import { enrollmentFeatureKey, EnrollmentState } from './../reducer/enrollment.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectEnrollmentAppFeature =
  createFeatureSelector<EnrollmentState>(enrollmentFeatureKey);


export const selectEnrollmentsList = createSelector(selectEnrollmentAppFeature, x => x.enrollmentList);
export const selectUserList = createSelector(selectEnrollmentAppFeature, x=>x.userList);
export const selectActiveCourses = createSelector(selectEnrollmentAppFeature, x=> x.activeCourseList)
export const selectTerms = createSelector(selectEnrollmentAppFeature, x=> x.termList);