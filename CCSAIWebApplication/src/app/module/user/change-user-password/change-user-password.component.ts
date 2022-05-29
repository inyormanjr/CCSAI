import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'src/app/core/http/users.service';
import { AlertifyjsService } from 'src/app/core/services/alertifyjs.service';
import { MustMatch } from 'src/app/shared/helpers/mustMatch';

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

  constructor(private userService: UsersService,
    private alertifyService: AlertifyjsService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  get fc() {
    return this.passwordForm.controls;
  }

  changePassword() {
    var password = this.passwordForm.value;

    if (this.passwordForm.status !== "INVALID") {
      this.userService.changeUserPassword(password).subscribe(
        res => {
          if (res.success) {
            this.alertifyService.success("Change password successfully.");
            this.passwordForm.reset();
          }
        },
        error => {
          this.alertifyService.error(error.error.error);
        }
      );
    } else {

      if (this.fc.confirmPassword.errors?.mustMatch) {
        this.alertifyService.error("Password doesn't match.");
        return;
      }
      this.alertifyService.error("Please fill up all required information.");
    }

  }

}
