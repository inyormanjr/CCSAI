import { ClearFormService } from './../../../core/services/clear-form.service';
import { UserModel } from 'src/app/shared/models/UserModel';
import { Roles } from '../../../shared/models/Roles';
import { AuthenticationService } from 'src/app/core/http/authentication.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertifyjsService } from 'src/app/core/services/alertifyjs.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/shared/helpers/mustMatch';
import { Router } from '@angular/router';
import { UserState } from '../reducer/user.reducer';
import { Store } from '@ngrx/store';
import { UserActionTypes } from '../action/user.action.types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit,OnDestroy {

  clearFormSubscription = new Subscription();
  eRoles = Roles;

  userForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    role: [null, Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  },
    {
      validator: MustMatch('password', 'confirmPassword')
    });

  constructor(private authService: AuthenticationService,
    private alertifyService: AlertifyjsService,
    private formBuilder: FormBuilder,
    private router : Router,
    private userStore : Store<UserState>,
    private clearFormService : ClearFormService) { }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.clearFormSubscription.unsubscribe();
  }

  get fc() {
    return this.userForm.controls;
  }

  register() {
    var user = this.userForm.value as UserModel;
    
    if (this.userForm.status !== "INVALID") {
        this.userStore.dispatch(UserActionTypes.createUser({data : user}));
        this.clearFormSubscription = this.clearFormService.clearForm$.subscribe(response => {
          this.userForm.reset();
      })
    } else {

      if (this.fc.confirmPassword.errors?.mustMatch) {
        this.alertifyService.error("Password doesn't match.");
        return;
      }
      this.alertifyService.error("Please fill up all required information.");
    }
  }

}
