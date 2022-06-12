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
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-update-enrollment',
  templateUrl: './update-enrollment.component.html',
  styleUrls: ['./update-enrollment.component.css']
})
export class UpdateEnrollmentComponent implements OnInit {


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
    enrollmentDate: [null, Validators.required]
  });

  constructor(private formBuilder: FormBuilder,
    private alertifyService: AlertifyjsService,
    private modalService: NgbModal,
    private enrollmentService : EnrollmentService,
    private activatedRoute: ActivatedRoute,
    private datepipe: DatePipe) {
      this.activatedRoute.data.subscribe(data => {
        this.initializeValues(data.routeResolver.data);
      });
     }

  ngOnInit(): void {
  }

  searchInstructor(){
    const modalRef = this.modalService.open(UserRoleListModalComponent, { size: 'lg', centered: true });
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

  save(){
    var enrollment = this.enrollmentForm.value as Enrollment;
    
    if (this.enrollmentForm.status !== "INVALID") {
      console.log(enrollment);
        this.alertifyService.confirm("Update enrollment","Update Enrollment?",()=>{
          this.enrollmentService.Update(enrollment._id,enrollment).subscribe(res=>{
            this.alertifyService.success("Successfully Saved.");
          },
          error=>{
            this.alertifyService.error(error.error.error);
          })
        })
    } else {
      this.alertifyService.error("Please fill up all required information.");
    }
  }

  initializeValues(enrollment: any) {
    
    const slicedDate = enrollment.enrollmentDate.split('T')[0];
    const day = slicedDate.split('-')[2];
    const year =slicedDate.split('-')[0];
    const month =slicedDate.split('-')[1];
    
    const formattedDate = {
      year : parseInt(year),
      month : parseInt(month),
      day : parseInt(day)
    }
   
    this.enrollmentForm.controls['_id'].setValue(enrollment._id);
    this.enrollmentForm.controls['courseId'].setValue(enrollment.courseId._id);
    this.enrollmentForm.controls['termId'].setValue(enrollment.termId._id);
    this.enrollmentForm.controls['instructorId'].setValue(enrollment.instructorId._id);
    this.enrollmentForm.controls['enrollmentDate'].setValue(formattedDate);
  
    this.selectedCourse = enrollment.courseId as Course;
    this.selectedInstructor = enrollment.instructorId as UserModel;
    this.selectedTerm = enrollment.termId as Term;


  }

}
