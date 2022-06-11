import { TermsService } from 'src/app/core/http/terms/terms.service';
import { TermState } from './../reducer/term.reducer';
import { Term } from 'src/app/shared/models/Term';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { TermActionTypes } from '../action/term.actions.types';
import { ResponseResult } from './../../../shared/models/response.interface';
import { Store } from '@ngrx/store';
import { AlertifyjsService } from 'src/app/core/services/alertifyjs.service';

import { noop } from 'jquery';

@Injectable()
export class TermEffects {
    loadTerms$ = createEffect(() =>
        this.actions$.pipe(ofType(TermActionTypes.loadTerms),
            tap((action) => {
                this.termService.Get(0, 0).pipe(map((response: ResponseResult<Term[]>) => {

                    this.termStore.dispatch(TermActionTypes.loadTermsSuccess({ data: response.data }))
                })).subscribe(noop, error => console.log(error))
            })
        ), { dispatch: false }
    );

    getTermById$ = createEffect(() =>
        this.actions$.pipe(ofType(TermActionTypes.getTermById),
            tap((action) => {
                this.termService.GetById(action._id).pipe(map((response: ResponseResult<Term>) => {
                    this.termStore.dispatch(TermActionTypes.getTermByIdSuccess({ term: response.data }))
                })).subscribe(noop, error => {
                    this.termStore.dispatch(TermActionTypes.getTermByIdFailure({ error }));
                    this.alertify.error(error.error.error);
                })
            })
        ), { dispatch: false }
    );

    createTerm$ = createEffect(() =>
        this.actions$.pipe(ofType(TermActionTypes.createTerm),
            tap((action) => {
                this.termService.Create(action.data).pipe(map((response: ResponseResult<Term>) => {
                    this.termStore.dispatch(TermActionTypes.loadTerms());
                    this.termStore.dispatch(TermActionTypes.createTermSuccess({ data: response.data }));
                    this.alertify.success("Term Saved.");
                })).subscribe(noop, error => {
                    this.termStore.dispatch(TermActionTypes.createTermFailure());
                    this.alertify.error(error.error.error);
                })
            })
        ), { dispatch: false }
    );

    updateTerm$ = createEffect(() =>
        this.actions$.pipe(ofType(TermActionTypes.updateTerm),
            tap((action) => {

                this.termService.Update(action.id, action.term).pipe(map((response: ResponseResult<Term>) => {

                    this.termStore.dispatch(TermActionTypes.getTermById({ _id: response.data._id }));
                    this.termStore.dispatch(TermActionTypes.loadTerms());
                    this.alertify.success("Term Saved.");
                })).subscribe(noop, error => {
                    this.alertify.error(error.error.error);
                })
            })
        ), { dispatch: false }
    );

    constructor(private actions$: Actions,
        private termStore: Store<TermState>,
        private termService: TermsService,
        private alertify: AlertifyjsService) { }
}
