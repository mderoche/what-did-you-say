import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { pessimisticUpdate } from '@nrwl/angular';
import { map, of } from 'rxjs';

import { KeywordPacksApi, SearchApi, WordDetailApi } from './../shared';
import * as WordsActions from './words.actions';

@Injectable()
export class WordsEffects {
    /**
     * Loads keyword packs.
     *     Triggers:        WordsActions.keywordPacks.load
     *     Success trigger: WordsActions.keywordPacks.loadSuccess
     *     Failure trigger: WordsActions.keywordPacks.loadFailure
     */
    loadKeywordPacks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WordsActions.keywordPacks.load),
            pessimisticUpdate({
                run: () => {
                    return this.keyboardPacksApi.getAll().pipe(
                        map(keywordPacks =>
                            WordsActions.keywordPacks.loadSuccess({
                                keywordPacks
                            })
                        )
                    );
                },
                onError: () => {
                    return of(WordsActions.keywordPacks.loadFailure());
                }
            })
        )
    );

    /**
     * Performs a search.
     *     Triggers:        WordsActions.search.search
     *     Success trigger: WordsActions.search.searchSuccess
     *     Failure trigger: WordsActions.search.searchFailure
     */
    search$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WordsActions.search.search),
            pessimisticUpdate({
                run: action => {
                    return this.searchApi.search(action.searchParams).pipe(
                        map(searchResults =>
                            WordsActions.search.searchSuccess({
                                searchResults
                            })
                        )
                    );
                },
                onError: () => {
                    return of(WordsActions.search.searchFailure());
                }
            })
        )
    );

    /**
     * Loads a Word Detail.
     *     Triggers:        WordsActions.detail.load
     *     Success trigger: WordsActions.detail.loadSuccess
     *     Failure trigger: WordsActions.detail.loadFailure
     */
    loadWordDetail$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WordsActions.detail.load),
            pessimisticUpdate({
                run: action => {
                    return this.wordDetailApi.getWordDetail(action.word).pipe(
                        map(wordDetail =>
                            WordsActions.detail.loadSuccess({
                                wordDetail
                            })
                        )
                    );
                },
                onError: () => {
                    return of(WordsActions.detail.loadFailure());
                }
            })
        )
    );

    constructor(
        private readonly actions$: Actions,
        private readonly keyboardPacksApi: KeywordPacksApi,
        private readonly searchApi: SearchApi,
        private readonly wordDetailApi: WordDetailApi
    ) {}
}
