import { ChangeUserPassword } from './../../../shared/models/UserModel';
import { changeUserPasswordAdmin } from './../action/user.actions';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AlertifyjsService } from 'src/app/core/services/alertifyjs.service';
import { MustMatch } from 'src/app/shared/helpers/mustMatch';

import { UserActionTypes } from '../action/user.action.types';
import { UserState } from '../reducer/user.reducer';

@Component({
  selector: 'app-change-user-password',
  templateUrl: './change-user-password.component.html',
  styleUrls: ['./change-user-password.component.css']
})
export class ChangeUserPasswordComponent implements OnInit {


  passwordForm = this.formBuilder.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  },
    {
      validator: MustMatch('newPassword', 'confirmPassword')
    });

  constructor(
    private alertifyService: AlertifyjsService,
    private formBuilder: FormBuilder,
    private userStore: Store<UserState>) { }

  ngOnInit(): void {
  }

  get fc() {
    return this.passwordForm.controls;
  }

  changePassword() {
    var password = this.passwordForm.value as ChangeUserPassword;

    if (this.passwordForm.status !== "INVALID") {
      this.userStore.dispatch(UserActionTypes.changeUserPassword({userPassword : password}));
      
    } else {
      if (this.fc.confirmPassword.errors?.mustMatch) {
        this.alertifyService.error("Password doesn't match.");
        return;
      }
      this.alertifyService.error("Please fill up all required information.");
    }

   

  }

}
