import { BaseService } from './../../services/base.service';
import { Injectable } from '@angular/core';
import { UserModel } from 'src/app/shared/models/UserModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService<UserModel> {

  constructor(public httpClient : HttpClient) { 
    super(httpClient);
    this.baseURL = this.baseURL + '/users/'
  }
}
