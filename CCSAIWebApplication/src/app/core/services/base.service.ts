import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseResult } from 'src/app/shared/models/response.interface';
import { environment } from 'src/environments/environment';
import { IServiceBase } from './IServiceBase';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T> implements IServiceBase<T> {
  baseURL = environment.api_uri;
  constructor(public httpClient: HttpClient) { }

  Get(skip: number, take: number): Observable<ResponseResult<T[]>> {
    return this.httpClient.get<T>(this.baseURL).pipe(map((response: any) => response));
  }
  GetById(id: any): Observable<ResponseResult<T>> {
    return this.httpClient.get<T>(this.baseURL + id).pipe(map((response: any) => response));
  }
  Create(model: T): Observable<ResponseResult<any>> {
    return this.httpClient.post<any>(this.baseURL, model).pipe(map((response: any) => response));
  }
  Update(id: any, model: T): Observable<ResponseResult<any>> {
    return this.httpClient.put<any>(this.baseURL + id, model).pipe(map((response: any) => response));
  }
  Delete(id: any): Observable<ResponseResult<any>> {
     return this.httpClient.delete<any>(this.baseURL + id).pipe(map((response: any) => response));
  }
}
