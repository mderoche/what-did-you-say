import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { WordDetail } from '@what-did-you-say/words';

import { getWordDetail } from '../../+state/words.selectors';

@Component({
    selector: 'wdys-word-detail-modal',
    templateUrl: './word-detail-modal.component.html',
    styleUrls: ['./word-detail-modal.component.scss']
})
export class WordDetailModal {
    wordDetail$ = this.store.select(getWordDetail);
    wordDetail: WordDetail;

    constructor(
        private readonly store: Store,
        public activeModal: NgbActiveModal
    ) {
        this.wordDetail$.subscribe(wordDetail => {
            this.wordDetail = wordDetail;
        });
    }
}
