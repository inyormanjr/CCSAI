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

  activateUser$ = createEffect(() =>
    this.actions$.pipe(ofType(UserActionTypes.activateUser),
      tap((action) => {     
        this.userService.activateUser(action.user).pipe(map((response: ResponseResult<UserModel>) => {
          this.userStore.dispatch(UserActionTypes.loadUser());
          this.alertify.success("User Activated");
        })).subscribe(noop, error => {
            this.alertify.error(error);
        });
      })
    ), {dispatch: false}
  );


  constructor(private actions$: Actions,
    private userStore: Store<UserState>,
    private userService: UsersService,
    private alertify : AlertifyjsService) { }

}
