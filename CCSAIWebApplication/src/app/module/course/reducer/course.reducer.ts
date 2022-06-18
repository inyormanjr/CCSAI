import { CourseModelModule } from './../../../shared/models/CourseModule';
import { Course } from './../../../shared/models/Course';
import { Action, createReducer, on } from '@ngrx/store';
import { CourseActionTypes } from '../action/course.action.types';


export const courseFeatureKey = 'course';

export interface CourseState {
    courses : Course[];
    course : Course;
    moduleList : CourseModelModule[]; 
}

export const initialCourseState: CourseState = {
  courses : [],
  course :  {
    _id : "",
    course : "",
    courseCode : "",
    course_status : ""
  },
  moduleList : []
};

export const courseReducer = createReducer(
  initialCourseState,
  on(CourseActionTypes.loadCoursesSuccess, (state, action) => {
    return {
      ...state,
      courses: action.data
    }
  }),
  on(CourseActionTypes.getCourseByIdSuccess,(state,action)=>{
    return {
      ...state,
      course : action.course
    }
  }),
  on(CourseActionTypes.getCourseByIdFailure,(state,action)=>{
    return {
      ...state,
      course : {
        _id : "",
        course : "",
        courseCode : "",
        course_status : ""
      }
    }
  }),
  on(CourseActionTypes.createCourseSuccess,(state,action)=>{
    return{
      ...state,
      course : action.data
    }
  }),
  on(CourseActionTypes.createCourseFailure,(state,action)=>{
    return{
      ...state,
      course : {
        _id : "",
        course : "",
        courseCode : "",
        course_status : ""
      }
    }
  }),
  on(CourseActionTypes.loadModulesByCourseIdSuccess,(state,action)=>{
    return {
      ...state,
      moduleList : action.data
    }
  })
);
