import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EnrollmentService } from 'src/app/core/http/enrollment.service';
import { EnrollmentDetailService } from 'src/app/core/http/enrollment/enrollment-detail.service';
import { AlertifyjsService } from 'src/app/core/services/alertifyjs.service';
import { Course } from 'src/app/shared/models/Course';
import { EnrollmentDetail } from 'src/app/shared/models/EnrollmentDetail';
import { Term } from 'src/app/shared/models/Term';
import { UserModel } from 'src/app/shared/models/UserModel';
import { EnrollmentActionTypes } from '../action/enrollment.action.types';
import { EnrollmentState } from '../reducer/enrollment.reducer';
import { EnrollmentSelectorTypes } from '../selector/enrollment.selector.types';

@Component({
  selector: 'app-enrollment-detail-list',
  templateUrl: './enrollment-detail-list.component.html',
  styleUrls: ['./enrollment-detail-list.component.css']
})
export class EnrollmentDetailListComponent implements OnInit {


  limit: number = 10;
  enrollmentDetails: EnrollmentDetail[] = [];
  temp: EnrollmentDetail[] = [];
  enrollmentDetails$: Observable<EnrollmentDetail[]> | undefined;

  selectedInstructor: UserModel = {
    _id: '',
    firstName: '',
    lastName: '',
    fullName: '',
    email: '',
    role: '',
    user_status: ''
  };

  selectedCourse: Course = {
    _id: '',
    course_status: '',
    course: '',
    courseCode: ''
  };

  selectedTerm: Term = {
    _id: '',
    termName: ''
  }

  enrollmentId = '';

  formattedDate : any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private enrollmentStore: Store<EnrollmentState>) {
      this.activatedRoute.data.subscribe(data => {
        this.initializeValues(data.routeResolver.data);
      });
     }

  ngOnInit(): void {
    this.loadEnrollmentDetails();
  }

  loadEnrollmentDetails() {
    this.enrollmentStore.dispatch(EnrollmentActionTypes.loadEnrollmentDetails({ id: this.enrollmentId }));
    this.enrollmentDetails$ = this.enrollmentStore.select(EnrollmentSelectorTypes.selectEnrollmentDetailsList);

    this.enrollmentDetails$.subscribe(res => {
      this.enrollmentDetails = res;
      this.temp = res;

    });
  }

  updateFilter(event: any) {

    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      return d.studentId.fullName.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.enrollmentDetails = temp;
  }

  initializeValues(enrollment: any) {

    const slicedDate = enrollment.enrollmentDate.split('T')[0];
    const day = slicedDate.split('-')[2];
    const year = slicedDate.split('-')[0];
    const month = slicedDate.split('-')[1];

    const formattedDate = {
      year: parseInt(year),
      month: parseInt(month),
      day: parseInt(day)
    }

    this.formattedDate = formattedDate;

    this.enrollmentId = enrollment._id;

    this.selectedCourse = enrollment.courseId as Course;
    this.selectedInstructor = enrollment.instructorId as UserModel;
    this.selectedTerm = enrollment.termId as Term;

    
  }

}
