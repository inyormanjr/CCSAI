import { courseFeatureKey, CourseState } from './../reducer/course.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectCourseAppFeature =
  createFeatureSelector<CourseState>(courseFeatureKey);

  export const selectCourses = createSelector(selectCourseAppFeature, x => x.courses);
  export const selectCourse = createSelector(selectCourseAppFeature, x => x.course); 
