import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from './../shared';
import { FindWordComponent } from './find-word.component';
import { KeywordPackControlComponent } from './keyword-pack-control';
import { SearchResultsComponent } from './search-results';
import { WordDetailModal } from './word-detail-modal';
import { ToneRankingComponent } from './tone-ranking';
import { ToneRankingBarComponent } from './tone-ranking/tone-ranking-bar';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, NgbModule, SharedModule],
    declarations: [
        FindWordComponent,
        KeywordPackControlComponent,
        SearchResultsComponent,
        WordDetailModal,
        ToneRankingComponent,
        ToneRankingBarComponent
    ],
    exports: [
        FindWordComponent,
        KeywordPackControlComponent,
        SearchResultsComponent,
        WordDetailModal,
        ToneRankingComponent,
        ToneRankingBarComponent
    ],
    entryComponents: [WordDetailModal]
})
export class FindWordModule {}
