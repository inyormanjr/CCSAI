import { UserModel } from './../../../shared/models/UserModel';
import { createAction, props } from '@ngrx/store';

export const loadUser = createAction(
  '[User] Load Users'
);

export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ data: UserModel[] }>()
);

export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: any }>()
);

export const activateUser = createAction(
  '[User] Activate User',
   props<{user : UserModel}>()
);

export const activateUserFailure = createAction(
  '[User] Activate User Failure',
  props<{errorActivate : any}>()
);

export const activateUserSuccess = createAction(
  '[User] Activate User Success',
);

