import { Enrollment } from './../../../shared/models/Enrollment';
import { ResponseResult } from './../../../shared/models/response.interface';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { EnrollmentService } from 'src/app/core/http/enrollment/enrollment.service';
import { EnrollmentActionTypes } from '../action/enrollment.action.types';
import { Store } from '@ngrx/store';
import { EnrollmentState } from '../reducer/enrollment.reducer';



@Injectable()
export class EnrollmentEffects {

  loadEnrollments$ = createEffect(() =>
    this.actions$.pipe(ofType(EnrollmentActionTypes.loadEnrollments),
      tap((action) => {
        this.enrollmentService.Get(0, 0).pipe(map((response: ResponseResult<Enrollment[]>) => {
              this.enrollmentStore.dispatch(EnrollmentActionTypes.loadEnrollmentsSuccess({data: response.data}))
        }))
      })
    ), {dispatch: false}
  );


  constructor(private actions$: Actions,
    private enrollmentStore: Store<EnrollmentState>,
    private enrollmentService: EnrollmentService) { }

}
