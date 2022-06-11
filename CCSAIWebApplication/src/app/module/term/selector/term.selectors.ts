
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { termFeatureKey, TermState } from './../reducer/term.reducer';

export const selectTermAppFeature =
    createFeatureSelector<TermState>(termFeatureKey);

export const selectTerms = createSelector(selectTermAppFeature, x => x.terms);
export const selectTerm = createSelector(selectTermAppFeature, x => x.term);