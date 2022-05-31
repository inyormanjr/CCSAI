
import { Action, createReducer, on } from '@ngrx/store';
import { UserActionTypes } from '../action/user.action.types';
import { UserModel } from './../../../shared/models/UserModel';

export const userFeatureKey = 'user';

export interface UserState {
  userList : UserModel[];
}

export const initialUserState: UserState = {
  userList : []
};

export const userReducer = createReducer(
  initialUserState,
  on(UserActionTypes.loadUsersSuccess,(state,action)=>{
    return {
      ...state,
      userList : action.data
    }
  })

);
