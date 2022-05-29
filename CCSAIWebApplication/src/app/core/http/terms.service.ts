import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TermsService {
  constructor(private httpClient : HttpClient) { }
  private header = new HttpHeaders().set("Authorization", 'Bearer ' + window.localStorage.getItem('auth-user'));

  
  getTerms() : Observable<any>{
    return this.httpClient.get(`${environment.api_uri}/terms/`,{'headers' : this.header});
  }

  getTermById(id : string) : Observable<any>{
    return this.httpClient.get(`${environment.api_uri}/terms/${id}`,{'headers' : this.header});
  }

  createTerm(term : any) : Observable<any>{
    return this.httpClient.post<any>(`${environment.api_uri}/terms`,term,{'headers' : this.header})
  }

  updateTerm(term : any,id : String) : Observable<any>{
    return this.httpClient.put<any>(`${environment.api_uri}/terms/${id}`,term,{'headers' : this.header});
  }

}
