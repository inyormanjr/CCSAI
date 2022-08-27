import { courseFeatureKey, CourseState } from './../reducer/course.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectCourseAppFeature =
  createFeatureSelector<CourseState>(courseFeatureKey);

  export const selectCourses = createSelector(selectCourseAppFeature, x => x.courses);
  export const selectCourse = createSelector(selectCourseAppFeature, x => x.course);
  export const selectModules = createSelector(selectCourseAppFeature, x=>x.moduleList);
  export const selectDiscussions = createSelector(selectCourseAppFeature,x=> x.discussions);
  export const selectAssessments = createSelector(selectCourseAppFeature,x=> x.assessmentsList);
