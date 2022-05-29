import { enrollmentFeatureKey, EnrollmentState } from './../reducer/enrollment.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectEnrollmentAppFeature =
  createFeatureSelector<EnrollmentState>(enrollmentFeatureKey);


export const selectEnrollmentsList = createSelector(selectEnrollmentAppFeature, x => x.enrollmentList);
