
import { AlertifyjsService } from './../../../core/services/alertifyjs.service';

import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { UsersService } from 'src/app/core/http/user/users.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetUserByIdResolver implements Resolve<any> {

  constructor(
    private alertify : AlertifyjsService,
    private userService : UsersService,
    private router: Router) { }

  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any> {
    return this.userService.GetById(route.params['id']).pipe(
      map((user) => user),
      catchError((error) => {    
        this.alertify.error(error.error.error);
        this.router.navigateByUrl('/mainview/users');
        return EMPTY;
      }),
    );
  }
}
