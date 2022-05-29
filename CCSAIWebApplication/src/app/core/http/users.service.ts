import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient : HttpClient) { }
  private header = new HttpHeaders().set("Authorization", 'Bearer ' + window.localStorage.getItem('auth-user'));

  changeUserPassword(password : any) : Observable<any>{
    return this.httpClient.put(`${environment.api_uri}/users/changeuserpassword`,password,{'headers' : this.header});
  }

  getUsers() : Observable<any>{
    return this.httpClient.get(`${environment.api_uri}/users/`,{'headers' : this.header});
  }

  deactivateUser(user : any) : Observable<any>{
    return this.httpClient.put(`${environment.api_uri}/users/deactivate/${user._id}`,user,{'headers' : this.header});
  }
  activateUser(user : any) : Observable<any>{
    return this.httpClient.put(`${environment.api_uri}/users/activate/${user._id}`,user,{'headers' : this.header});
  }

  getUserById(id : string) : Observable<any>{
    return this.httpClient.get(`${environment.api_uri}/users/${id}`,{'headers' : this.header});
  }

  updateUserById(id : string,user : any) : Observable<any>{
    return this.httpClient.put(`${environment.api_uri}/users/updateuser/${id}`,user,{'headers' : this.header});
  }

  changeUserPassByAdmin(id : string,password : any) : Observable<any>{
    return this.httpClient.put(`${environment.api_uri}/users/changeuserpassword/${id}`,password,{'headers' : this.header});
  }
}
