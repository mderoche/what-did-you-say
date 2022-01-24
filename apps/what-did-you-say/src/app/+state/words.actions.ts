import { createAction, props } from '@ngrx/store';
import {
    KeywordPack,
    SearchParams,
    SearchResult,
    Word,
    WordDetail
} from '@what-did-you-say/words';

export const keywordPacks = {
    load: createAction('[words] keywordPacks load'),
    loadSuccess: createAction(
        '[words] keywordPacks load success',
        props<{ keywordPacks: KeywordPack[] }>()
    ),
    loadFailure: createAction('[words] keywordPacks load failure')
};

export const search = {
    search: createAction(
        '[words] search',
        props<{ searchParams: SearchParams }>()
    ),
    searchSuccess: createAction(
        '[words] search success',
        props<{ searchResults: SearchResult[] }>()
    ),
    searchFailure: createAction('[words] search failure')
};

export const detail = {
    load: createAction('[words] detail load', props<{ word: Word }>()),
    loadSuccess: createAction(
        '[words] detail load success',
        props<{ wordDetail: WordDetail }>()
    ),
    loadFailure: createAction('[words] detail load failure')
};
