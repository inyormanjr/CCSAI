import { EnrollmentService } from './../../../core/http/enrollment/enrollment.service';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AlertifyjsService } from 'src/app/core/services/alertifyjs.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateEnrollmentResolver implements Resolve<any> {

  constructor(private enrollmentService : EnrollmentService,
    private router: Router,
    private alertify : AlertifyjsService,){

  }

  resolve(route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Observable<any> {
    return this.enrollmentService.GetById(route.params['id']).pipe(
      map((enrollment) => enrollment),
      catchError((error) => {    
        this.alertify.error(error.error.error);
        this.router.navigateByUrl('/mainview/enrollment');
        return EMPTY;
      }),
    );
  }
}
