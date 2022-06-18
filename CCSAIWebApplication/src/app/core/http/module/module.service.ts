import { Observable } from 'rxjs';
import { CourseModelModule } from './../../../shared/models/CourseModule';
import { BaseService } from './../../services/base.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModuleService extends BaseService<CourseModelModule> {

  constructor(public httpClient : HttpClient) {
    super(httpClient);
    this.baseURL = this.baseURL + '/modules/';
  }

  getModulesByCourseId(id:string): Observable<any>{
    return this.httpClient.get<any>(`${this.baseURL}getmodulesbycourseid/${id}`);
  }
}
