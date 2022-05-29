import { ResponseResult } from 'src/app/shared/models/response.interface';
import { Observable } from 'rxjs';
export interface IServiceBase<T> {

    Get(skip: number, take: number): Observable<ResponseResult<T[]>>;
    GetById(id: any): Observable<ResponseResult<T>>;
    Create(model: T): Observable<ResponseResult<any>>;
    Update(id: any, model: T): Observable<ResponseResult<any>>;
    Delete(id: any): Observable<ResponseResult<any>>;
}