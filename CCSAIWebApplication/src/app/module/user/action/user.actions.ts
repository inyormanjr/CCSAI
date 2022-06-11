import { ChangeUserPasswordAdmin } from './../../../shared/models/UserModel';
import { UserModel , ChangeUserPassword } from 'src/app/shared/models/UserModel';
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

export const getUserById = createAction(
  '[User] Get user by Id',
  props<{_id : string}>()
);

export const getUserByIdSuccess = createAction(
  '[User] Get user by Id Success',
  props<{user : UserModel}>()
);

export const getUserByIdFailure = createAction(
  '[User] Get user by Id Failure',
  props<{ error: any }>()
);

export const createUser = createAction(
  '[User] Create User',
  props<{data: UserModel}>()
);

export const updateUser = createAction(
  '[User] Update User',
  props<{user : UserModel , id : string}>()
);

export const changeUserPassword = createAction(
  '[User] Change User Password',
  props<{userPassword : ChangeUserPassword}>()
);

export const changeUserPasswordAdmin = createAction(
  '[User] Change User Password by Admin',
  props<{userPassword : ChangeUserPasswordAdmin, id : string}>()
);

export const activateUser = createAction(
  '[User] Activate User',
   props<{user : UserModel}>()
);

export const deactivateUser = createAction(
  '[User] Deactivate User',
  props<{user : UserModel}>()
);



