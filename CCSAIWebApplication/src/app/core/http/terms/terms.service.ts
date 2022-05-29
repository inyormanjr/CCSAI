import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseResult } from 'src/app/shared/models/response.interface';
import { Term } from 'src/app/shared/models/Term';
import { BaseService } from '../../services/base.service';

@Injectable({
  providedIn: 'root'
})
export class TermsService extends BaseService<Term> {

  constructor(public httpClient: HttpClient) {
    super(httpClient);
    this.baseURL = this.baseURL + '/terms/';
  }
}
