import { ChangeUserPasswordAdmin } from './../../../shared/models/UserModel';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/core/http/users.service';
import { AlertifyjsService } from 'src/app/core/services/alertifyjs.service';
import { MustMatch } from 'src/app/shared/helpers/mustMatch';
import { Roles } from 'src/app/shared/models/Roles';
import { UserModel } from 'src/app/shared/models/UserModel';
import { Store } from '@ngrx/store';
import { UserState } from '../reducer/user.reducer';
import { UserActionTypes } from '../action/user.action.types';
import { UserSelectorType } from '../selector/user.selectors.types';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  eRoles = Roles;
  user$: Observable<UserModel> | undefined;
  id = "";


  userForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    role: [null, [Validators.required]],
    user_status: ['', Validators.required],
  });

  passwordForm = this.formBuilder.group({
    newPassword: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  }, {
    validator: MustMatch('newPassword', 'confirmPassword')
  });

  constructor(private userService: UsersService,
    private alertifyService: AlertifyjsService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private userStore: Store<UserState>) {

      this.activatedRoute.data.subscribe(data => {
        this.id = data.routeResolver.data._id;
        this.initializeValues(data.routeResolver.data);
      });
    
    // this.user$ = this.userStore.select(UserSelectorType.selectUser);

    // this.user$.subscribe(res => {
    //   if(res._id){
    //     this.initializeValues(res);
    //   }
    // });

  }

  ngOnInit(): void {

  }

  get cfc() {
    return this.userForm.controls;
  }

  get pfc() {
    return this.passwordForm.controls;
  }

  initializeValues(user: any) {

    this.userForm.controls['firstName'].setValue(user.firstName.toUpperCase());
    this.userForm.controls['lastName'].setValue(user.lastName.toUpperCase());
    this.userForm.controls['email'].setValue(user.email.toUpperCase());
    this.userForm.controls['role'].setValue(user.role);
    this.userForm.controls['user_status'].setValue(user.user_status.toUpperCase());
  }

  updateUser() {

    var user = this.userForm.value as UserModel;

    if (this.userForm.status !== "INVALID") {
      this.userStore.dispatch(UserActionTypes.updateUser({user : user , id : this.id}));
      this.userStore.select(UserSelectorType.selectUser).subscribe(res=>{
        this.initializeValues(res);
      });
    } else {
      this.alertifyService.error("Please fill up all required information.");
    }
  }

  changePassword() {
     var pass = this.passwordForm.value as ChangeUserPasswordAdmin;

    if (this.passwordForm.status !== "INVALID") {
      this.userStore.dispatch(UserActionTypes.changeUserPasswordAdmin({userPassword : pass , id : this.id}));
    } else {
      if (this.pfc.confirmPassword.errors?.mustMatch) {
        this.alertifyService.error("Password doesn't match.");
        return;
      }
      this.alertifyService.error("Please fill up all required information.");
    }
  }

}
