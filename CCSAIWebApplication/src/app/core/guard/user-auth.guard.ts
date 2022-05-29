import { AlertifyjsService } from './../services/alertifyjs.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { AuthenticationService } from './../http/authentication.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService,
    private tokenStorage : TokenStorageService,
    private router: Router,
    private alertify : AlertifyjsService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.authUser().pipe(map(
        (res: any) => {
          if (res.success) {
            return this.checkUserLogin(route);
          
          }
          this.router.navigate(['/login']);
          return false;
        }
      ), catchError((error) => {
        this.router.navigate(['/login']);
        return of(false);
      }));
  }

  checkUserLogin(route: ActivatedRouteSnapshot): boolean {
      const userRole = this.tokenStorage.getDecodedUserToken().role;
    
      if (route.data.role && route.data.role.indexOf(userRole) === -1) {
        this.alertify.error('User not allowed to access the url.')
        this.router.navigate(['/login']);
        return false;
      }
      return true;   
  }
  
}
