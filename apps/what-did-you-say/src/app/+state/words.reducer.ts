import { createReducer, on, Action } from '@ngrx/store';
import {
    KeywordPack,
    SearchResult,
    SearchParams,
    WordDetail
} from '@what-did-you-say/words';

import * as WordsActions from './words.actions';

export const WORDS_FEATURE_KEY = 'words';

export interface State {
    keywordPacks: KeywordPack[];
    keywordPacksLoaded: boolean;
    keywordPacksFailed: boolean;

    searchParams: SearchParams;
    searchResults: SearchResult[];
    searchLoaded: boolean;
    searchFailed: boolean;

    wordDetail: WordDetail;
    wordDetailLoaded: boolean;
    wordDetailFailed: boolean;
}

export interface WordsPartialState {
    readonly [WORDS_FEATURE_KEY]: State;
}

export const initialState: State = {
    keywordPacks: [],
    keywordPacksLoaded: false,
    keywordPacksFailed: false,

    searchParams: {},
    searchResults: [],
    searchLoaded: false,
    searchFailed: false,

    wordDetail: {
        word: {},
        definitions: []
    },
    wordDetailLoaded: false,
    wordDetailFailed: false
};

const wordsReducer = createReducer(
    initialState,

    // keyword packs
    on(WordsActions.keywordPacks.load, state => ({
        ...state,
        keywordPacksLoaded: false,
        keywordPacksFailed: false
    })),
    on(WordsActions.keywordPacks.loadSuccess, (state, { keywordPacks }) => ({
        ...state,
        keywordPacks,
        keywordPacksLoaded: true,
        keywordPacksFailed: false
    })),
    on(WordsActions.keywordPacks.loadFailure, state => ({
        ...state,
        keywordPacksLoaded: false,
        keywordPacksFailed: true
    })),

    // search
    on(WordsActions.search.search, (state, { searchParams }) => ({
        ...state,
        searchParams,
        searchLoaded: false,
        searchFailed: false
    })),
    on(WordsActions.search.searchSuccess, (state, { searchResults }) => ({
        ...state,
        searchResults,
        searchLoaded: true,
        searchFailed: false
    })),
    on(WordsActions.search.searchFailure, state => ({
        ...state,
        searchLoaded: false,
        searchFailed: true
    })),

    // word detail
    on(WordsActions.detail.load, state => ({
        ...state,
        wordDetailLoaded: false,
        wordDetailFailed: false
    })),
    on(WordsActions.detail.loadSuccess, (state, { wordDetail }) => ({
        ...state,
        wordDetail,
        wordDetailLoaded: true,
        wordDetailFailed: false
    })),
    on(WordsActions.detail.loadFailure, state => ({
        ...state,
        wordDetailLoaded: false,
        wordDetailFailed: true
    }))
);

export function reducer(state: State | undefined, action: Action) {
    return wordsReducer(state, action);
}
