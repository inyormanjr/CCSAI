import { HttpClient } from '@angular/common/http';
import { Exercise } from './../../../shared/models/Exercise';
import { Injectable } from '@angular/core';
import { BaseService } from '../../services/base.service';
import { Observable } from 'rxjs';
import { ResponseResult } from 'src/app/shared/models/response.interface';

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

  activateExercise(exercise : any) : Observable<ResponseResult<any>>{

    return this.httpClient.put<any>(`${this.baseURL}activate/${exercise._id}`,exercise);
  }

  deactivateExercise(exercise : any) : Observable<ResponseResult<any>>{
    return this.httpClient.put<any>(`${this.baseURL}deactivate/${exercise._id}`,exercise);
  }
}
