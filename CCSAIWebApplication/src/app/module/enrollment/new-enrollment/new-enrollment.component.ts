import { EnrollmentService } from './../../../core/http/enrollment/enrollment.service';
import { Term } from './../../../shared/models/Term';
import { TermsListModalComponent } from './../../term/terms-list-modal/terms-list-modal.component';
import { ActiveCourseListComponent } from './../../course/active-course-list/active-course-list.component';
import { UserModel } from './../../../shared/models/UserModel';
import { UserRoleListModalComponent } from './../../user/user-role-list-modal/user-role-list-modal.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertifyjsService } from 'src/app/core/services/alertifyjs.service';
import { Enrollment } from 'src/app/shared/models/Enrollment';
import { Course } from 'src/app/shared/models/Course';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-new-enrollment',
  templateUrl: './new-enrollment.component.html',
  styleUrls: ['./new-enrollment.component.css']
})
export class NewEnrollmentComponent implements OnInit {

  selectedInstructor : UserModel = {
    _id: '',
    firstName: '',
    lastName: '',
    fullName: '',
    email: '',
    role: '',
    user_status: ''
  };

  selectedCourse : Course = {
    _id : '',
    course_status : '',
    course : '',
    courseCode : ''
  };

  selectedTerm : Term = {
    _id : '',
    termName : ''
  }

  enrollmentForm = this.formBuilder.group({
    _id : [null],
    courseId: [null, Validators.required],
    termId: [null, Validators.required],
    instructorId: [null, Validators.required],
    enrollmentDate: [new Date(), Validators.required]
  });

  constructor(private formBuilder: FormBuilder,
    private alertifyService: AlertifyjsService,
    private modalService: NgbModal,
    private enrollmentService : EnrollmentService,
    private router : Router ) {
    }

  ngOnInit(): void {
  }

  get fc() {
    return this.enrollmentForm.controls;
  }

  create() {
    var enrollment = this.enrollmentForm.value as Enrollment;
    
    if (this.enrollmentForm.status !== "INVALID") {
        this.alertifyService.confirm("Enrollment Registration","Create Enrollment?",()=>{
          this.enrollmentService.Create(enrollment).subscribe(res=>{
            this.alertifyService.success("Successfully Created.");
            this.enrollmentForm.reset();
            this.clearValues();
            this.router.navigate([`./mainview/enrollment/updateenrollment/${res.data._id}`]);
          },
          error=>{
            this.alertifyService.error(error.error.error);
          })
        })
    } else {

      this.alertifyService.error("Please fill up all required information.");
    }
  }

  searchInstructor(){
    const modalRef = this.modalService.open(UserRoleListModalComponent, { size: 'lg', centered: true });
    modalRef.componentInstance.roleFilter = 'instructor';
    modalRef.componentInstance.passEntry.subscribe((user : UserModel)=>{
      this.selectedInstructor = user;
      this.enrollmentForm.controls['instructorId'].setValue(this.selectedInstructor._id);
    });
  }

  searchCourse(){
    const modalRef = this.modalService.open(ActiveCourseListComponent, { size: 'lg', centered: true });
    modalRef.componentInstance.passEntry.subscribe((course : Course)=>{
      this.selectedCourse = course;
      this.enrollmentForm.controls['courseId'].setValue(this.selectedCourse._id);
    });
  }

  searchTerm(){
    const modalRef = this.modalService.open(TermsListModalComponent, { size: 'lg', centered: true });
    modalRef.componentInstance.passEntry.subscribe((term : Term)=>{
      this.selectedTerm = term;
      this.enrollmentForm.controls['termId'].setValue(this.selectedTerm._id);
    });
  }

  clearValues(){
    this.selectedInstructor  = {
      _id: '',
      firstName: '',
      lastName: '',
      fullName: '',
      email: '',
      role: '',
      user_status: ''
    };
  
    this.selectedCourse  = {
      _id : '',
      course_status : '',
      course : '',
      courseCode : ''
    };
  
    this.selectedTerm  = {
      _id : '',
      termName : ''
    }
  }

}
