import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut() : void {
    window.localStorage.clear();
  }

  public saveUser(token : string) : void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, token);
  }

  public getUserToken() : string | null {
    return window.localStorage.getItem(USER_KEY);
  }

  public getDecodedUserToken(): any {
    const userToken = localStorage.getItem(USER_KEY) || "";
    console.log(userToken);
    try {
      return jwt_decode(userToken);
    }
    catch (Error) {
      return null;
    }
  }

}
