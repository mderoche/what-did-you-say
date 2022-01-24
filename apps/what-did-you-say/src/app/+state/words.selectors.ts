import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WORDS_FEATURE_KEY, State } from './words.reducer';

/**
 * Get the entire Words state
 */
export const getWordsState = createFeatureSelector<State>(WORDS_FEATURE_KEY);

/**
 * Get all keyword packs
 */
export const getKeywordPacks = createSelector(
    getWordsState,
    (state: State) => state.keywordPacks
);

/**
 * Get keyword packs loading lifecycle
 */
export const getKeywordPacksLoaded = createSelector(
    getWordsState,
    (state: State) => state.keywordPacksLoaded
);

/**
 * Get search results
 */
export const getSearchResults = createSelector(
    getWordsState,
    (state: State) => {
        return state.searchResults;
    }
);

/**
 * Get the "best" search results; anything that ranked in the 20th percentile
 */
export const getBestSearchResults = createSelector(
    getWordsState,
    (state: State) => {
        return state.searchResults.filter(
            searchResult => (searchResult.percentile || 0) >= 80
        );
    }
);

/**
 * Get the "decent" search results; anything that ranked between the 20th and 50th percentile
 */
export const getDecentSearchResults = createSelector(
    getWordsState,
    (state: State) => {
        return state.searchResults.filter(searchResult => {
            const p = searchResult.percentile || 0;
            return p >= 50 && p <= 80;
        });
    }
);

/**
 * Get the most recently loaded Word Detail
 */
export const getWordDetail = createSelector(getWordsState, (state: State) => {
    return state.wordDetail;
});
