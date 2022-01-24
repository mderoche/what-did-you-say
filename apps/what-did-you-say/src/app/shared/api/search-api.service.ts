import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchParams, SearchResult } from '@what-did-you-say/words';
import { Observable } from 'rxjs';

import { environment } from './../../../environments/environment';

@Injectable()
export class SearchApi {
    constructor(private readonly http: HttpClient) {}

    /**
     * API wrapper for `POST api/search`
     *
     * Searches for a synonym for "said".
     *
     * @param sp search parameters
     * @returns scored synonyms for "said"
     */
    search(sp: SearchParams): Observable<SearchResult[]> {
        return this.http.post<SearchResult[]>(
            `${environment.apiUrl}/search`,
            sp
        );
    }
}
