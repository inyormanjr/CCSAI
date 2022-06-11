
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { EmptyError, Subject, Observable } from 'rxjs';
import { EnrollmentService } from 'src/app/core/http/enrollment/enrollment.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { Enrollment } from 'src/app/shared/models/Enrollment';
import { ResponseResult } from 'src/app/shared/models/response.interface';
import { EnrollmentActionTypes } from '../action/enrollment.action.types';
import { EnrollmentState } from '../reducer/enrollment.reducer';
import { EnrollmentSelectorTypes } from '../selector/enrollment.selector.types';

@Component({
  selector: 'app-enrollment-list',
  templateUrl: './enrollment-list.component.html',
  styleUrls: ['./enrollment-list.component.css']
})
export class EnrollmentListComponent implements OnInit,OnDestroy {


  limit: number = 10;
  enrollmentList : Enrollment[] = [];
  temp : Enrollment[] = [];
  enrollments$: Observable<Enrollment[]> | undefined;
  currentUser: any = {};

  constructor(
    private tokenStorage: TokenStorageService,
    private enrollmentStore: Store<EnrollmentState>) {
      if (this.tokenStorage.getDecodedUserToken() !== null) {
        this.currentUser = this.tokenStorage.getDecodedUserToken()
      } else {
        this.currentUser = {};
      }

      this.enrollmentStore.dispatch(EnrollmentActionTypes.loadEnrollments());
      this.enrollments$ = this.enrollmentStore.select(EnrollmentSelectorTypes.selectEnrollmentsList);

      this.enrollments$.subscribe(res=>{
        this.enrollmentList = res;
        this.temp = res;
    
      });
    }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  updateFilter(event: any) {

    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      return d.courseId.course.toLowerCase().indexOf(val) !== -1  || !val;
    });
    this.enrollmentList = temp;
  }

  updateEnrollment(enrollmentId : string){

  }

  newEnrollment(){

  }

}
