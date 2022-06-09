import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {


  userForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    role: [null, [Validators.required]],
    user_status: ['', Validators.required],
  });

  constructor(private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,) { 

      this.activatedRoute.data.subscribe(data => {
        this.initializeValues(data.routeResolver.data);
      });

    }

  ngOnInit(): void {
  }

  get cfc() {
    return this.userForm.controls;
  }

  initializeValues(user: any) {

    this.userForm.controls['firstName'].setValue(user.firstName.toUpperCase());
    this.userForm.controls['lastName'].setValue(user.lastName.toUpperCase());
    this.userForm.controls['email'].setValue(user.email.toUpperCase());
    this.userForm.controls['role'].setValue(user.role.toUpperCase());
    this.userForm.controls['user_status'].setValue(user.user_status.toUpperCase());
  }

}
