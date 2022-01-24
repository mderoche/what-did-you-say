import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { KeywordPack, SearchParams, Word } from '@what-did-you-say/words';

import {
    getKeywordPacks,
    getBestSearchResults,
    getDecentSearchResults,
    getKeywordPacksLoaded
} from './../+state/words.selectors';
import * as WordActions from './../+state/words.actions';
import { WordDetailModal } from './word-detail-modal';

@Component({
    selector: 'wdys-find-word',
    templateUrl: './find-word.component.html',
    styleUrls: ['./find-word.component.scss']
})
export class FindWordComponent implements OnInit {
    keywordPacks$ = this.store.select(getKeywordPacks);
    keywordPacksLoaded$ = this.store.select(getKeywordPacksLoaded);
    bestSearchResults$ = this.store.select(getBestSearchResults);
    decentSearchResults$ = this.store.select(getDecentSearchResults);

    keywordPacks: KeywordPack[];
    form: FormGroup;

    constructor(
        private readonly store: Store,
        private readonly fb: FormBuilder,
        private readonly modalService: NgbModal
    ) {}

    ngOnInit() {
        // kick off keyword pack loading
        this.store.dispatch(WordActions.keywordPacks.load());

        // when keyword packs are loaded, build the search form using
        // each pack as a dropdown control
        this.keywordPacks$.subscribe(keywordPacks => {
            if (keywordPacks) {
                this.keywordPacks = keywordPacks;
            }
        });

        this.keywordPacksLoaded$.subscribe(loaded => {
            if (loaded) {
                this.form = this.fb.group({});
                for (let keyboardPack of this.keywordPacks) {
                    this.form.addControl(
                        keyboardPack.name,
                        this.fb.control('')
                    );
                }

                // re-search on form change
                this.form.valueChanges.subscribe(() => {
                    this.search(this.form.value);
                });

                // randomize form for now. eventually there will be a more
                // built-out frontpage experience
                this.randomize();
            }
        });
    }

    /**
     * Randomizes the search form, applying the search.
     */
    randomize() {
        for (let keywordPack of this.keywordPacks) {
            const randomValue =
                keywordPack.keywords[
                    Math.floor(Math.random() * keywordPack.keywords.length)
                ];

            this.form
                .get(keywordPack.name)
                ?.setValue(randomValue.name, { emitEvent: false });
        }

        this.form.updateValueAndValidity({ onlySelf: false, emitEvent: true });
    }

    /**
     * Dispatch a search action to get synonyms of "said".
     * @param searchParams search params to use when searching for synonyms.
     */
    search(searchParams: SearchParams) {
        this.store.dispatch(WordActions.search.search({ searchParams }));
    }

    /**
     * Opens the word detail modal for a clicked Word
     * @param word word to get the details of
     */
    openWordDetail(word: Word) {
        // tell ngrx to load the selected word
        this.store.dispatch(WordActions.detail.load({ word }));

        // show the modal (a smart component that will use the store state loaded from the above dispatch)
        this.modalService.open(WordDetailModal);
    }
}
