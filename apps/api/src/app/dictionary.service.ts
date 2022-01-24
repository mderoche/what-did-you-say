import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { WordDefinition, Word } from '@what-did-you-say/words';

import { environment } from './../environments/environment';

@Injectable()
export class DictionaryService {
    constructor(private readonly http: HttpService) {}

    /**
     * Get all definitions for a Word
     * @param word
     * @returns definitions for the Word
     */
    async getDefinitions(word: Word): Promise<WordDefinition[]> {
        // ask the dictionary API for the word type, short definition, stems, and synonyms
        const dictResponse = await this.http
            .get<
                {
                    fl: string;
                    shortdef: string[];
                    meta: {
                        stems: string[];
                        syns: string[][];
                    };
                }[]
            >(
                `${environment.dictionaryApiUrl}/${word.word}?key=${process.env.dictionaryApiKey}`
            )
            .toPromise();

        // just take the first verb
        // @todo support multiple definitions out of this method
        const verb = dictResponse.data
            .filter(def => def.fl.includes('verb'))
            .shift();

        // @todo compile all the synonyms into one array until this
        // method supports multiple definition
        const synonyms = verb.meta.syns.flat();

        return [
            {
                definition: verb.shortdef[0],
                stems: verb.meta.stems,
                synonyms
            }
        ];
    }
}
