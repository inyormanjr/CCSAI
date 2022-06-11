import { getTermByIdSuccess } from './../action/term.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { Term } from 'src/app/shared/models/Term';
import { TermActionTypes } from '../action/term.actions.types';


export const termFeatureKey = 'term';

export interface TermState {
    terms : Term[]
    term : Term
}

export const initialTermState: TermState = {
  terms : [],
  term : {
    _id : "",
    termName : ""
  }
};

export const termReducer = createReducer(
  initialTermState,
  on(TermActionTypes.loadTermsSuccess, (state, action) => {
    return {
      ...state,
      terms: action.data
    }
  }),
  on(TermActionTypes.getTermByIdSuccess,(state,action)=>{
    return {
      ...state,
      term : action.term
    }
  }),
  on(TermActionTypes.getTermByIdFailure,(state,action)=>{
    return {
      ...state,
      term : {
        _id : "",
        termName : ""
      }
    }
  }),
  on(TermActionTypes.createTermSuccess,(state,action)=>{
    return{
      ...state,
      term : action.data
    }
  }),
  on(TermActionTypes.createTermFailure,(state,action)=>{
    return{
      ...state,
      term : {
        _id : "",
        termName : ""
      }
    }
  }),
);
