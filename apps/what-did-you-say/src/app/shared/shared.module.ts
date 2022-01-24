import { NgModule } from '@angular/core';

import { KeywordPacksApi, SearchApi, WordDetailApi } from './api';
import { CapitalizeSentencePipe } from './pipes';

@NgModule({
    declarations: [CapitalizeSentencePipe],
    providers: [KeywordPacksApi, SearchApi, WordDetailApi],
    exports: [CapitalizeSentencePipe]
})
export class SharedModule {}
