import { Action, createReducer, on } from '@ngrx/store';


export const mainReducerFeatureKey = 'mainReducer';

export interface MainState {

}

export const initialMainState: MainState = {

};

export const reducer = createReducer(
  initialMainState,

);
