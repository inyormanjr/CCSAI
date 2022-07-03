import { DashboardState, dashboardFeatureKey } from './../reducer/dashboard.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectAnouncementFeature = createFeatureSelector<DashboardState>(dashboardFeatureKey);

export const selectAnouncementList = createSelector(selectAnouncementFeature, x => x.anouncements);
