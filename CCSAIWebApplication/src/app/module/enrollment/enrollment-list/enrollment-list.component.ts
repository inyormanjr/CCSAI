
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


  
  enrollments$: Observable<Enrollment[]> | undefined;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  currentUser: any = {};

  constructor(
    private tokenStorage: TokenStorageService,
    private enrollmentStore: Store<EnrollmentState>,
    private eService: EnrollmentService) {
      this.enrollmentStore.dispatch(EnrollmentActionTypes.loadEnrollments());
      this.enrollments$ = this.enrollmentStore.select(EnrollmentSelectorTypes.selectEnrollmentsList);
    }

  ngOnInit(): void {
    if (this.tokenStorage.getDecodedUserToken() !== null) {
      this.currentUser = this.tokenStorage.getDecodedUserToken()
    } else {
      this.currentUser = {};
    }

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      retrieve: true,
    };

    this.getEnrollment();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getEnrollment(){
    this.eService.Get(0,0).subscribe(responseResult => {
     
      this.dtTrigger.next();
    });
  }

  updateEnrollment(enrollmentId : string){

  }

  newEnrollment(){

  }

}
