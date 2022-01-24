import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Word, WordDetail } from '@what-did-you-say/words';

import { environment } from './../../../environments/environment';

@Injectable()
export class WordDetailApi {
    constructor(private readonly http: HttpClient) {}

    /**
     * API wrapper for `GET api/word-detail`
     *
     * Gets a Word Detail by Word
     *
     * @param word
     * @returns Word Detail for the Word
     */
    getWordDetail(word: Word): Observable<WordDetail> {
        return this.http.get<WordDetail>(
            `${environment.apiUrl}/word-detail/${word.id}`
        );
    }
}
