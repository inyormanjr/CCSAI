import { HttpClient } from '@angular/common/http';
import { BaseService } from './../../services/base.service';
import { Injectable } from '@angular/core';
import { Anouncement } from 'src/app/shared/models/anouncement';

@Injectable({
  providedIn: 'root'
})
export class AnouncementService extends BaseService<Anouncement>{

  constructor(public httpClient: HttpClient) {
    super(httpClient);
    this.baseURL = this.baseURL + '/anouncement/';
  }
}
