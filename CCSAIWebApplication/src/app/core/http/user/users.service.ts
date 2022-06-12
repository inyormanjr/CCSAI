import { updateUser } from './../../../module/user/action/user.actions';
import { ResponseResult } from './../../../shared/models/response.interface';
import { BaseService } from './../../services/base.service';
import { Injectable } from '@angular/core';
import { UserModel } from 'src/app/shared/models/UserModel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService<UserModel> {


  constructor(public httpClient : HttpClient) { 
    super(httpClient);
    this.baseURL = this.baseURL + '/users/'
  }

  updateUser(id : string ,user : any ) : Observable<ResponseResult<any>>{
   
    return this.httpClient.put<any>(`${this.baseURL}updateuser/${id}`,user);
  }

  changePassword(userChangePassword : any) : Observable<ResponseResult<any>>{
    return this.httpClient.put<any>(`${this.baseURL}changeuserpassword/`,userChangePassword);
  }

  changePasswordAdmin(id : string, userChangePassword : any) : Observable<ResponseResult<any>>{
    return this.httpClient.put<any>(`${this.baseURL}changeuserpassword/${id}`,userChangePassword);
  }

  activateUser(user : any) : Observable<ResponseResult<any>>{
    return this.httpClient.put<any>(`${this.baseURL}activate/${user._id}`,user);
  }

  deactivateUser(user : any) : Observable<ResponseResult<any>>{
    return this.httpClient.put<any>(`${this.baseURL}deactivate/${user._id}`,user);
  }

  getUsersByRole(role : string) : Observable<ResponseResult<any>>{
    return this.httpClient.get<any>(`${this.baseURL}roles/${role}`);
  }
}
