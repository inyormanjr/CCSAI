import { ModuleService } from './../../../core/http/module/module.service';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { AlertifyjsService } from 'src/app/core/services/alertifyjs.service';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GetModuleByIdResolver implements Resolve<any> {

  constructor(private alertify : AlertifyjsService,
    private moduleService : ModuleService,
    private router: Router){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.moduleService.GetById(route.params['id']).pipe(
      map((module)=>module),
      catchError((error)=>{
        this.alertify.error(error.error.error);
        this.router.navigateByUrl('/mainview/course');
        return EMPTY;
      })
    )
  }
}
