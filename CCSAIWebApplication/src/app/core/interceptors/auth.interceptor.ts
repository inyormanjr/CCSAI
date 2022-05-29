import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';

import { TokenStorageService } from '../services/token-storage.service';

import { Observable } from 'rxjs';

const TOKEN_HEADER_KEY = 'x-access-token';       // for Spring Boot back-end

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private token: TokenStorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const token = this.token.getUserToken();
    if (token != null) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + token)
      })
      return next.handle(cloned);
    }
    return next.handle(req);
  }

}

