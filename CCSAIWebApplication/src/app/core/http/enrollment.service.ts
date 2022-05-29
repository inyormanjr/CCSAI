import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  constructor(private httpClient : HttpClient) { }
  private header = new HttpHeaders().set("Authorization", 'Bearer ' + window.localStorage.getItem('auth-user'));

  createEnrollment(enrollment : any) : Observable<any>{
    return this.httpClient.post<any>(`${environment.api_uri}/enrollment`,enrollment,{'headers' : this.header})
  }
  getAllEnrollment() : Observable<any>{
    return this.httpClient.get(`${environment.api_uri}/enrollment/`,{'headers' : this.header});
  }
}
