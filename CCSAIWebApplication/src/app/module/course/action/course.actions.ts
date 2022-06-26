import { Discussion } from './../../../shared/models/Discussion';
import { CourseModelModule } from './../../../shared/models/CourseModule';
import { Course } from './../../../shared/models/Course';
import { createAction, props } from '@ngrx/store';

export const loadCourses = createAction(
  '[Course] Load Courses'
);

export const loadCoursesSuccess = createAction(
  '[Course] Load Courses Success',
  props<{ data: Course[] }>()
);

export const loadCoursesFailure = createAction(
  '[Course] Load Courses Failure',
  props<{ error: any }>()
);

export const loadModulesByCourseId = createAction(
  '[Course] Load Modules By Course Id',
  props<{_id : string}>()
);

export const loadModulesByCourseIdSuccess = createAction(
  '[Course] Load Modules By Course Id Success',
  props<{ data: CourseModelModule[] }>()
);

export const loadDiscussionsByModuleId = createAction(
  '[Course] Load Discussion By Module Id',
  props<{_id : string}>()
);

export const loadDiscussionsByModuleIdSuccess = createAction(
  '[Course] Load Discussion By Module Id Success',
  props<{ data: Discussion[] }>()
);


export const createDiscussion = createAction(
  '[Course] Create Discussion',
  props<{data: Discussion}>()
);

export const updateDiscussion = createAction(
  '[Course] Update Discussion',
  props<{discussion : Discussion , id : string}>()
);

export const createCourse = createAction(
  '[Course] Create Course',
  props<{data: Course}>()
);

export const getCourseById = createAction(
  '[Course] Get course by Id',
  props<{_id : string}>()
);

export const getCourseByIdSuccess = createAction(
  '[Course] Get course by Id Success',
  props<{course : Course}>()
);

export const getCourseByIdFailure = createAction(
  '[Course] Get course by Id Failure',
  props<{ error: any }>()
);

export const createCourseSuccess = createAction(
  '[Course] Create Course Success',
  props<{data: Course}>()
);

export const updateCourse = createAction(
  '[Course] Update Course',
  props<{course : Course , id : string}>()
);

export const createCourseFailure = createAction(
  '[Course] Create Course Failure'
);

export const activateCourse = createAction(
  '[Course] Activate Course',
   props<{course : Course}>()
);

export const deactivateCourse = createAction(
  '[Course] Deactivate Course',
  props<{course : Course}>()
);
