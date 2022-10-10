import { ResponseResult } from './../../../shared/models/response.interface';
import { AnouncementService } from './../../../core/http/anouncement/anouncement.service';
import { DashboardState } from './../reducer/dashboard.reducer';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { DashboardActionTypes } from '../action/dashboard.action.types';
import { map, tap } from 'rxjs/operators';
import { Anouncement } from 'src/app/shared/models/anouncement';
import { noop } from 'rxjs';



@Injectable()
export class DashboardEffects {

  fetchAnouncements$ = createEffect(() =>
    this.actions$.pipe(ofType(DashboardActionTypes.fetchAnouncements),
      tap((action) => {
        this.anouncementService.Get(0, 0).pipe(map((response: ResponseResult<Anouncement[]>) => {
          this.store.dispatch(DashboardActionTypes.populateAnouncement({ data: response.data }));
      })).subscribe(noop, error => console.log(error))
    })
    )
    , { dispatch: false });


  constructor(private actions$: Actions, private store: Store<DashboardState>,
  private anouncementService: AnouncementService) { }

}
