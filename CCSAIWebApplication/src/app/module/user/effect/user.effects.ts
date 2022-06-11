import { AlertifyjsService } from './../../../core/services/alertifyjs.service';
import { UserModel } from './../../../shared/models/UserModel';
import { ResponseResult } from './../../../shared/models/response.interface';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { UsersService } from 'src/app/core/http/user/users.service';
import { UserActionTypes } from '../action/user.action.types';
import { Store } from '@ngrx/store';
import { UserState } from '../reducer/user.reducer';
import { noop } from 'jquery';
import { Router } from '@angular/router';
import { ClearFormService } from 'src/app/core/services/clear-form.service';



@Injectable()
export class UserEffects {

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(ofType(UserActionTypes.loadUser),
      tap((action) => {
        this.userService.Get(0, 0).pipe(map((response: ResponseResult<UserModel[]>) => {
          this.userStore.dispatch(UserActionTypes.loadUsersSuccess({ data: response.data }))
        })).subscribe(noop, error => console.log(error))
      })
    ), { dispatch: false }
  );

  getUserById$ = createEffect(() =>
    this.actions$.pipe(ofType(UserActionTypes.getUserById),
      tap((action) => {
        this.userService.GetById(action._id).pipe(map((response: ResponseResult<UserModel>) => {
          this.userStore.dispatch(UserActionTypes.getUserByIdSuccess({ user: response.data }))
        })).subscribe(noop, error => {
          this.alertify.error(error.error.error);
        })
      })
    ), { dispatch: false }
  );

  createUser$ = createEffect(() =>
  this.actions$.pipe(ofType(UserActionTypes.createUser),
    tap((action) => {
      this.userService.Create(action.data).pipe(map((response: ResponseResult<UserModel>) => {
        this.alertify.success("User Registered.");
        this.clearFormService.clearForm();
      })).subscribe(noop, error => {
          this.alertify.error(error.error.error);
      })
    })
  ), { dispatch: false }
);

  updateUser$ = createEffect(() =>
    this.actions$.pipe(ofType(UserActionTypes.updateUser),
      tap((action) => {

        this.userService.updateUser(action.id, action.user).pipe(map((response: ResponseResult<UserModel>) => {
          this.userStore.dispatch(UserActionTypes.getUserById({ _id: response.data._id }));
          this.alertify.success("User Info Saved.");
        })).subscribe(noop, error => {
          this.alertify.error(error.error.error);
        })
      })
    ), { dispatch: false }
  );

  changeUserPassword$ = createEffect(() =>
    this.actions$.pipe(ofType(UserActionTypes.changeUserPassword),
      tap((action) => {
        this.userService.changePassword(action.userPassword).pipe(map((response: ResponseResult<UserModel>) => {
          this.userStore.dispatch(UserActionTypes.getUserByIdSuccess({ user: response.data }));
          this.alertify.success("Password changed successfully.");
        })).subscribe(noop, error => {
          this.alertify.error(error.error.error);
        })
      })
    ), { dispatch: false }
  );

  changeUserPasswordAdmin$ = createEffect(() =>
  this.actions$.pipe(ofType(UserActionTypes.changeUserPasswordAdmin),
    tap((action) => {
      this.userService.changePasswordAdmin(action.id,action.userPassword).pipe(map((response: ResponseResult<UserModel>) => {
        this.userStore.dispatch(UserActionTypes.getUserByIdSuccess({ user: response.data }));
        this.alertify.success("Password changed successfully.");
      })).subscribe(noop, error => {
        this.alertify.error(error.error.error);
      })
    })
  ), { dispatch: false }
);

  activateUser$ = createEffect(() =>
    this.actions$.pipe(ofType(UserActionTypes.activateUser),
      tap((action) => {
        this.userService.activateUser(action.user).pipe(map((response: ResponseResult<UserModel>) => {
          this.userStore.dispatch(UserActionTypes.loadUser());
          this.alertify.success("User Activated");
        })).subscribe(noop, error => {
          this.alertify.error(error.error.error);
        });
      })
    ), { dispatch: false }
  );


  deactivateUser$ = createEffect(() =>
    this.actions$.pipe(ofType(UserActionTypes.deactivateUser),
      tap((action) => {
        this.userService.deactivateUser(action.user).pipe(map((response: ResponseResult<UserModel>) => {
          this.userStore.dispatch(UserActionTypes.loadUser());
          this.alertify.success("User Deactivated");
        })).subscribe(noop, error => {
          this.alertify.error(error.error.error);
        });
      })
    ), { dispatch: false }
  );


  constructor(private actions$: Actions,
    private userStore: Store<UserState>,
    private userService: UsersService,
    private alertify: AlertifyjsService,
    private router : Router,
    private clearFormService: ClearFormService) { }

}
