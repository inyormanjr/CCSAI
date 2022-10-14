import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserLogin } from 'src/app/shared/models/UserLogin';
import { Observable } from 'rxjs';
import { RegisterUser } from 'src/app/shared/models/RegisterUser';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  loginUser(user : UserLogin) : Observable<any>{

    return this.httpClient.post<UserLogin>(`${environment.api_uri}/auth/login`,user);
  }

  authUser(){

    return this.httpClient.get(`${environment.api_uri}/auth/authuser`);
  }

  registerUser(user : RegisterUser) : Observable<any>{

    return this.httpClient.post<RegisterUser>(`${environment.api_uri}/auth/register`,user);
  }

}
