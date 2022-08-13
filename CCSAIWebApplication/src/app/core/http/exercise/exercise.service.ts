import { HttpClient } from '@angular/common/http';
import { Exercise } from './../../../shared/models/Exercise';
import { Injectable } from '@angular/core';
import { BaseService } from '../../services/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService extends BaseService<Exercise> {

  constructor(public httpClient : HttpClient) {
    super(httpClient);
    this.baseURL = this.baseURL + '/exercises/';
   }

   getExerciseByDiscussionId(id:string): Observable<any>{
    return this.httpClient.get<any>(`${this.baseURL}getbydiscussionid/${id}`);
  }
}
