import { UserModel } from 'src/app/shared/models/UserModel';
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
)

export const activateUser = createAction(
  '[User] Activate User',
   props<{user : UserModel}>()
);

export const deactivateUser = createAction(
  '[User] Deactivate User',
  props<{user : UserModel}>()
);



