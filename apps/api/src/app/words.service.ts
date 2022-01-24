/**
 * Super simple in-memory store, good starting point.
 * @TODO expand to Mongo or something.
 */

import { join } from 'path';
import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { readFileSync } from 'jsonfile';

import { SearchParams, SearchResult, Word } from '@what-did-you-say/words';
import { accumulationScorer } from '@what-did-you-say/scorers';
import { percentileTransform } from '@what-did-you-say/transforms';

@Injectable()
export class WordsService {
    private readonly log = new Logger(WordsService.name);
    words: Word[] = [];

    onModuleInit() {
        const wordsFile = join(__dirname, 'assets/words.json');

        try {
            this.words = readFileSync(wordsFile);
            this.log.debug(`loaded words from: ${wordsFile}`);
        } catch (e) {
            this.log.error(
                `could not load words from: ${wordsFile} ... ${e.toString()}`
            );
        }
    }

    //
    // keeping these async for a better API on the controller level.
    // also easier to swap out in-memory store for something better.
    //

    /**
     * Get one Word
     * @param id - word ID
     */
    async get(id: string): Promise<Word> {
        return this.words.find(word => word.id === id);
    }

    /**
     * Get all known Words
     */
    async getAll(): Promise<Word[]> {
        return this.words;
    }

    /**
     * Search for Words using given search params
     *
     * Made with multiple scorer modules in mind... for now,
     * uses a simple scorer that accumulates tone ranking values.
     *
     * @param sp - search params
     */
    async search(sp: SearchParams): Promise<SearchResult[]> {
        const words = await this.getAll();

        // start with every word at zero score
        const baseSearchResults: SearchResult[] = words.map(w => ({
            word: w,
            score: 0
        }));

        // run all searchresults through each scorer
        //
        // eventually this will be separated out into some larger system where
        // multiple scorers can asynchronously consider and manipulate the results
        const scorers = [accumulationScorer];
        let searchResults = [...baseSearchResults];
        for (let scorer of scorers) {
            searchResults = await scorer(searchResults, sp);
        }

        // add percentile for each search result
        //
        // eventually this will be separated out into some larger system where
        // multiple transforms can asynchronously transform the results
        const withPercentile = searchResults.map(searchResult =>
            percentileTransform(searchResult, searchResults)
        );

        return withPercentile;
    }
}
