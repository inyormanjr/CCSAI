import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private httpClient : HttpClient) { }
  private header = new HttpHeaders().set("Authorization", 'Bearer ' + window.localStorage.getItem('auth-user'));

  getCourses() : Observable<any>{
    return this.httpClient.get(`${environment.api_uri}/courses/`,{'headers' : this.header});
  }

  deactivateCourse(course : any) : Observable<any>{
    return this.httpClient.put(`${environment.api_uri}/courses/deactivate/${course._id}`,course,{'headers' : this.header});
  }
  activateCourse(course : any) : Observable<any>{
    return this.httpClient.put(`${environment.api_uri}/courses/activate/${course._id}`,course,{'headers' : this.header});
  }

  getCourseById(id : string) : Observable<any>{
    return this.httpClient.get(`${environment.api_uri}/courses/${id}`,{'headers' : this.header});
  }

  updateCourseById(id : string,course : any) : Observable<any>{
   
    return this.httpClient.put(`${environment.api_uri}/courses/${id}`,course,{'headers' : this.header});
  }

  createCourse(course : any) : Observable<any>{
    return this.httpClient.post<any>(`${environment.api_uri}/courses`,course,{'headers' : this.header})
  }
}
