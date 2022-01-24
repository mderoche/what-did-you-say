import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeywordPack } from '@what-did-you-say/words';
import { Observable } from 'rxjs';

import { environment } from './../../../environments/environment';

@Injectable()
export class KeywordPacksApi {
    constructor(private readonly http: HttpClient) {}

    /**
     * API wrapper for `GET api/keyword-packs`
     *
     * Gets all registered keyword packs
     *
     * @returns all registered keyword packs
     */
    getAll(): Observable<KeywordPack[]> {
        return this.http.get<KeywordPack[]>(
            `${environment.apiUrl}/keyword-packs`
        );
    }
}
