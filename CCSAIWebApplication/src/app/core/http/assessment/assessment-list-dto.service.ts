import { AssessmentListDTO } from '../../../shared/models/Assessment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../../services/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssessmentListDTOService extends BaseService<AssessmentListDTO> {

  constructor(public httpClient : HttpClient) {
    super(httpClient);
    this.baseURL = this.baseURL + '/assessment/';
   }

  getAssessmentsByModuleId(id:string): Observable<any>{
    return this.httpClient.get<any>(`${this.baseURL}getassessmentsbymoduleid/${id}`);
  }
}
