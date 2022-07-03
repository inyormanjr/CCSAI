import { Anouncement } from './../../../shared/models/anouncement';
import { Action, createReducer, on } from '@ngrx/store';
import { DashboardActionTypes } from '../action/dashboard.action.types';


export const dashboardFeatureKey = 'dashboard';

export interface DashboardState {
  anouncements: Anouncement[]
}

export const dashboardInitialState: DashboardState = {
  anouncements: []
};

export const dashboardReducer = createReducer(
  dashboardInitialState,
  on(DashboardActionTypes.populateAnouncement, (state, action) => {
    return {
      ...state,
      anouncements: action.data,
    };
  })
);
