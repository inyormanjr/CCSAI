
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmptyError, Subject } from 'rxjs';
import { EnrollmentService } from 'src/app/core/http/enrollment/enrollment.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { Enrollment } from 'src/app/shared/models/Enrollment';
import { ResponseResult } from 'src/app/shared/models/response.interface';

@Component({
  selector: 'app-enrollment-list',
  templateUrl: './enrollment-list.component.html',
  styleUrls: ['./enrollment-list.component.css']
})
export class EnrollmentListComponent implements OnInit,OnDestroy {


  enrollmentList : Enrollment | undefined;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  currentUser: any = {};

  constructor(
    private tokenStorage: TokenStorageService,
    private eService : EnrollmentService) { }

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
      console.log(responseResult.data);
      this.enrollmentList = responseResult.data;
      this.dtTrigger.next();
    });
  }

  updateEnrollment(enrollmentId : string){

  }

  newEnrollment(){

  }

}
