import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertifyjsService } from 'src/app/core/services/alertifyjs.service';
import { Enrollment } from 'src/app/shared/models/Enrollment';

@Component({
  selector: 'app-new-enrollment',
  templateUrl: './new-enrollment.component.html',
  styleUrls: ['./new-enrollment.component.css']
})
export class NewEnrollmentComponent implements OnInit {


  enrollmentForm = this.formBuilder.group({
    courseId: [null, Validators.required],
    termId: [null, Validators.required],
    instructorId: [null, Validators.required],
    enrollmentDate: [null, Validators.required]
  });

  constructor(private formBuilder: FormBuilder,
    private alertifyService: AlertifyjsService,) { }

  ngOnInit(): void {
  }

  get fc() {
    return this.enrollmentForm.controls;
  }

  create() {
    var enrollment = this.enrollmentForm.value as Enrollment;
    
    if (this.enrollmentForm.status !== "INVALID") {
     
    } else {

      if (this.fc.confirmPassword.errors?.mustMatch) {
        this.alertifyService.error("Password doesn't match.");
        return;
      }
      this.alertifyService.error("Please fill up all required information.");
    }
  }

}
