import { Term } from 'src/app/shared/models/Term';
import { createAction, props } from '@ngrx/store';

export const loadTerms = createAction(
  '[Term] Load Terms'
);

export const loadTermsSuccess = createAction(
  '[Term] Load Terms Success',
  props<{ data: Term[] }>()
);

export const loadTermsFailure = createAction(
  '[Term] Load Terms Failure',
  props<{ error: any }>()
);

export const createTerm = createAction(
  '[Term] Create Term',
  props<{data: Term}>()
);

export const getTermById = createAction(
  '[Term] Get term by Id',
  props<{_id : string}>()
);

export const getTermByIdSuccess = createAction(
  '[Term] Get term by Id Success',
  props<{term : Term}>()
);

export const getTermByIdFailure = createAction(
  '[Term] Get term by Id Failure',
  props<{ error: any }>()
);

export const createTermSuccess = createAction(
  '[Term] Create term Success',
  props<{data: Term}>()
);

export const updateTerm = createAction(
  '[Term] Update Term',
  props<{term : Term , id : string}>()
);

export const createTermFailure = createAction(
  '[Term] Create term Failure'
);