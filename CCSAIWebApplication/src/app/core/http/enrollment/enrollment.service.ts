import { Enrollment } from './../../../shared/models/Enrollment';
import { ResponseResult } from './../../../shared/models/response.interface';
import { BaseService } from './../../services/base.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService extends BaseService<ResponseResult<Enrollment[]>> {

  constructor(public httpClient : HttpClient) {
    super(httpClient);
    this.baseURL = this.baseURL + '/enrollment/';
  }
}
