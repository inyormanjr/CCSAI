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
