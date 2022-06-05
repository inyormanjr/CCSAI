import { userFeatureKey, UserState } from './../reducer/user.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectUserAppFeature =
  createFeatureSelector<UserState>(userFeatureKey);


export const selectUserList = createSelector(selectUserAppFeature, x => x.userList);
export const selectUser = createSelector(selectUserAppFeature, x=>x.user);