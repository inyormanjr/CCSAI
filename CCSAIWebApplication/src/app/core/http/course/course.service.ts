import { HttpClient } from '@angular/common/http';
import { BaseService } from './../../services/base.service';
import { Injectable } from '@angular/core';
import { Course } from 'src/app/shared/models/Course';
import { Observable } from 'rxjs';
import { ResponseResult } from 'src/app/shared/models/response.interface';

@Injectable({
  providedIn: 'root'
})
export class CourseService extends BaseService<Course> {

  constructor(public httpClient : HttpClient) {
    super(httpClient);
    this.baseURL = this.baseURL + '/courses/'
   }

   activateCourse(course : any) : Observable<ResponseResult<any>>{

    return this.httpClient.put<any>(`${this.baseURL}activate/${course._id}`,course);
  }

  deactivateCourse(course : any) : Observable<ResponseResult<any>>{
    return this.httpClient.put<any>(`${this.baseURL}deactivate/${course._id}`,course);
  }

}
