import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';
import { SharedModule } from './shared';
import { AppComponent } from './app.component';
import * as fromWords from './+state/words.reducer';
import { WordsEffects } from './+state/words.effects';
import { FindWordComponent, FindWordModule } from './find-word';

const routes: Routes = [
    { path: 'find', component: FindWordComponent },
    { path: '', redirectTo: '/find', pathMatch: 'full' }
];

@NgModule({
    declarations: [AppComponent],
    imports: [
        // Angular
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes),

        // dependencies
        NgbModule,
        StoreModule.forRoot(
            {},
            {
                metaReducers: !environment.production ? [] : [],
                runtimeChecks: {
                    strictActionImmutability: true,
                    strictStateImmutability: true
                }
            }
        ),
        EffectsModule.forRoot([]),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        StoreModule.forFeature(fromWords.WORDS_FEATURE_KEY, fromWords.reducer),
        EffectsModule.forFeature([WordsEffects]),

        // WDYS
        SharedModule,
        FindWordModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
