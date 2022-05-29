import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/core/http/users.service';
import { AlertifyjsService } from 'src/app/core/services/alertifyjs.service';
import { MustMatch } from 'src/app/shared/helpers/mustMatch';
import { Roles } from 'src/app/shared/models/Roles';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  eRoles = Roles;

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

  id = this.activatedRoute.snapshot.paramMap.get('id') || "";

  constructor(private userService: UsersService,
    private alertifyService: AlertifyjsService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getUser();
  }

  get cfc() {
    return this.userForm.controls;
  }

  get pfc() {
    return this.passwordForm.controls;
  }

  getUser() {

    this.userService.getUserById(this.id).subscribe(res => {
      if (res.success) {
        this.initializeValues(res.data);
      }
    },
      error => {

        this.alertifyService.error(error.error.error);
        this.router.navigate(['mainview/users/userlist']);
      });
  }

  initializeValues(user: any) {

    this.userForm.controls['firstName'].setValue(user.firstName.toUpperCase());
    this.userForm.controls['lastName'].setValue(user.lastName.toUpperCase());
    this.userForm.controls['email'].setValue(user.email.toUpperCase());
    this.userForm.controls['role'].setValue(user.role);
    this.userForm.controls['user_status'].setValue(user.user_status.toUpperCase());
  }

  updateUser() {

    var user = this.userForm.value;

    if (this.userForm.status !== "INVALID") {
      this.userService.updateUserById(this.id, user).subscribe(
        res => {
          if (res.success) {
            this.alertifyService.success("User saved.");
            this.getUser();
          }
        },
        error => {
          this.alertifyService.error(error.error.error);
        }
      );
    } else {
      this.alertifyService.error("Please fill up all required information.");
    }
  }

  changePassword(){
    var pass = this.passwordForm.value;
    
    if (this.passwordForm.status !== "INVALID") {
      this.userService.changeUserPassByAdmin(this.id,pass).subscribe(
        res => {
          if (res.success) {
            this.alertifyService.success("Password changed successfully.");
            this.passwordForm.reset();
            this.getUser();
          }
        },
        error => {
          this.alertifyService.error(error.error.error);
        }
      );
    } else {

      if (this.pfc.confirmPassword.errors?.mustMatch) {
        this.alertifyService.error("Password doesn't match.");
        return;
      }
      this.alertifyService.error("Please fill up all required information.");
    }
  }

}
