import { catchError, map } from 'rxjs/operators';
import { CourseService } from 'src/app/core/http/course/course.service';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { AlertifyjsService } from 'src/app/core/services/alertifyjs.service';

@Injectable({
  providedIn: 'root'
})
export class GetCourseByIdResolver implements Resolve<any> {

  constructor(private alertify : AlertifyjsService,
    private courseService : CourseService,
    private router: Router){

    }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.courseService.GetById(route.params['id']).pipe(
      map((course)=>course),
      catchError((error)=>{
        this.alertify.error(error.error.error);
        this.router.navigateByUrl('/mainview/course');
        return EMPTY;
      })
    )
  }
}
