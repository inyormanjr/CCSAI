import { UserModel } from 'src/app/shared/models/UserModel';

import { Action, createReducer, on } from '@ngrx/store';
import { UserActionTypes } from '../action/user.action.types';


export const userFeatureKey = 'user';

export interface UserState {
  userList: UserModel[];
  user: UserModel;
}

export const initialUserState: UserState = {
  userList: [],
  user: {
    _id: '',
    firstName: '',
    lastName: '',
    fullName: '',
    email: '',
    role: '',
    user_status: ''
  }
};

export const userReducer = createReducer(
  initialUserState,
  on(UserActionTypes.loadUsersSuccess, (state, action) => {
    return {
      ...state,
      userList: action.data
    }
  }),
  on(UserActionTypes.getUserByIdSuccess,(state,action)=>{
    return {
      ...state,
      user : action.user
    }
  }),
  on(UserActionTypes.getUserByIdFailure,(state,action)=>{
    return {
      ...state,
      user : {
        _id: '',
        firstName: '',
        lastName: '',
        fullName: '',
        email: '',
        role: '',
        user_status: ''
      }
    }
  }),
  on(UserActionTypes.createUserSucess,(state,action)=>{
    return{
      ...state,
      user : action.data
    }
  }),
  on(UserActionTypes.createUserFailure,(state,action)=>{
    return{
      ...state,
      user : {
        _id: '',
        firstName: '',
        lastName: '',
        fullName: '',
        email: '',
        role: '',
        user_status: ''
      }
    }
  }),
);
