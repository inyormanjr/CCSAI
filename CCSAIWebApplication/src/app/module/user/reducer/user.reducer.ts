
import { Action, createReducer, on } from '@ngrx/store';
import { UserActionTypes } from '../action/user.action.types';
import { UserModel } from './../../../shared/models/UserModel';

export const userFeatureKey = 'user';

export interface UserState {
  userList : UserModel[];
  updateSuccess : Boolean;
  errorActivate : any;
}

export const initialUserState: UserState = {
  userList : [],
  updateSuccess : false,
  errorActivate : undefined
};

export const userReducer = createReducer(
  initialUserState,
  on(UserActionTypes.loadUsersSuccess,(state,action)=>{
    return {
      ...state,
      userList : action.data
    }
  }),
  on(UserActionTypes.activateUserSuccess,(state,action)=>{
    return {
      ...state,
      updateSuccess : true
    }
  }),
  on(UserActionTypes.activateUserFailure,(state,action)=>{
    return {
      ...state,
      updateSuccess : false,
      errorActivate : action.errorActivate
    }
  }),
);
