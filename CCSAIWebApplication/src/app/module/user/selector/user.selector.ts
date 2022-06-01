import { userFeatureKey, UserState } from './../reducer/user.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectUserAppFeature =
  createFeatureSelector<UserState>(userFeatureKey);


export const selectUserList = createSelector(selectUserAppFeature, x => x.userList);
export const updateSuccess = createSelector(selectUserAppFeature, x => x.updateSuccess);
export const errorActivate = createSelector(selectUserAppFeature, x => x.errorActivate)