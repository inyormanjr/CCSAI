import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { EnrollmentDetail } from 'src/app/shared/models/EnrollmentDetail';
import { BaseService } from '../../services/base.service';
import { HttpClient } from '@angular/common/http';
import { ResponseResult } from 'src/app/shared/models/response.interface';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentDetailService extends BaseService<EnrollmentDetail> {

  constructor(public httpClient : HttpClient) {
    super(httpClient);
    this.baseURL = this.baseURL + '/enrollmentdetails/';
  }

  getEnrollmentDetailsByEnrollmentId(enrollmentId : string) : Observable<ResponseResult<any>>{
    return this.httpClient.get<any>(`${this.baseURL}getbyenrollmentid/${enrollmentId}`);
  }

  
}
