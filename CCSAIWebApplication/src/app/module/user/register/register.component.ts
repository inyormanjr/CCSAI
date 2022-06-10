import { UserModel } from 'src/app/shared/models/UserModel';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { Roles } from '../../../shared/models/Roles';
import { RegisterUser } from '../../../shared/models/RegisterUser';
import { AuthenticationService } from 'src/app/core/http/authentication.service';
import { Component, OnInit } from '@angular/core';
import { AlertifyjsService } from 'src/app/core/services/alertifyjs.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/shared/helpers/mustMatch';
import { Router } from '@angular/router';
import { UserState } from '../reducer/user.reducer';
import { Store } from '@ngrx/store';
import { UserActionTypes } from '../action/user.action.types';
import { UserSelectorType } from '../selector/user.selectors.types';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


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
    private userStore : Store<UserState>) { }

  ngOnInit(): void {
  }

  get fc() {
    return this.userForm.controls;
  }

  register() {
    var user = this.userForm.value as UserModel;
    
    if (this.userForm.status !== "INVALID") {
        this.userStore.dispatch(UserActionTypes.createUser({data : user}));
        this.userStore.select(UserSelectorType.selectUser).subscribe(res=>{
          if(res._id.length > 0){
            this.alertifyService.confirmWithCancel("User Registration","Would you like to create another user?",()=>{
              this.userForm.reset();
            },()=>{
              this.router.navigate(['/mainview/users']);
            })
          }     
        });
    } else {

      if (this.fc.confirmPassword.errors?.mustMatch) {
        this.alertifyService.error("Password doesn't match.");
        return;
      }
      this.alertifyService.error("Please fill up all required information.");
    }
  }

}
