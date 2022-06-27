import { Observable } from 'rxjs';
import { Discussion } from './../../../shared/models/Discussion';
import { Injectable } from '@angular/core';
import { BaseService } from '../../services/base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DiscussionService extends BaseService<Discussion> {

  constructor(public httpClient : HttpClient) {
    super(httpClient);
    this.baseURL = this.baseURL + '/discussions/'
   }

   getDiscussionsByModuleId(moduleId : any) : Observable<any>{
    return this.httpClient.get<any>(`${this.baseURL}getdiscussionsbymoduleid/${moduleId}`);
   }
}
