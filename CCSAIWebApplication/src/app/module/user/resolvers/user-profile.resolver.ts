import { UsersService } from './../../../core/http/user/users.service';
import { AuthenticationService } from './../../../core/http/authentication.service';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { AlertifyjsService } from 'src/app/core/services/alertifyjs.service';
import { catchError, map } from 'rxjs/operators';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserProfileResolver implements Resolve<any> {


  currentUser : any;

  constructor(
    private alertify : AlertifyjsService,
    private tokenStorage: TokenStorageService,
    private userService : UsersService,
    private router: Router) {
      this.currentUser = this.tokenStorage.getDecodedUserToken(); 
     }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
      return this.userService.GetById(this.currentUser.id).pipe(
        map((user) => user),
        catchError((error) => {    
          this.alertify.error(error.error.error);
          this.router.navigateByUrl('/mainview/dashboard');
          return EMPTY;
        }),
      );
  }
}
