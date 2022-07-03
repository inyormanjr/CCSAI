import { createAction, props } from '@ngrx/store';
import { Anouncement } from 'src/app/shared/models/anouncement';

export const fetchAnouncements = createAction('[Dashboard] Fetch Anouncements');

export const populateAnouncement = createAction('[Dashboard] Populate Anouncements',
  props<{ data: Anouncement[] }>()
);

export const Dashboards = createAction(
  '[Dashboard]  Dashboards'
);

export const DashboardsSuccess = createAction(
  '[Dashboard]  Dashboards Success',
  props<{ data: any }>()
);

export const DashboardsFailure = createAction(
  '[Dashboard]  Dashboards Failure',
  props<{ error: any }>()
);
