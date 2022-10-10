import { Assessment } from './../../../shared/models/Assessment';
import { Injectable } from '@angular/core';
import { BaseService } from '../../services/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseResult } from 'src/app/shared/models/response.interface';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService extends BaseService<Assessment> {

  constructor(public httpClient : HttpClient) {
    super(httpClient);
    this.baseURL = this.baseURL + '/assessment/';
   }

   activateAssessment(assessment : any) : Observable<ResponseResult<any>>{

    return this.httpClient.put<any>(`${this.baseURL}activate/${assessment._id}`,assessment);
  }

  deactivateAssessment(assessment : any) : Observable<ResponseResult<any>>{
    return this.httpClient.put<any>(`${this.baseURL}deactivate/${assessment._id}`,assessment);
  }
}
