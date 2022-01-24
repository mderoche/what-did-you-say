import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as WordActions from './+state/words.actions';

@Component({
    selector: 'what-did-you-say-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    constructor(private readonly store: Store) {}

    ngOnInit() {
        this.store.dispatch(WordActions.keywordPacks.load());
    }
}
