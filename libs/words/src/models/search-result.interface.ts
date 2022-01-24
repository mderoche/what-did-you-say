import { Word } from './word.interface';

/**
 * Represents a single search result, along with the relevancy score (bigger = better)
 * and the percentile (x/100) compared to all other search results.
 */
export interface SearchResult {
    word: Word;
    score: number;
    percentile?: number;
}
