import { SearchResult } from '@what-did-you-say/words';

/**
 * Assigns the percentile (0 -> 100) for a given searchResult within a collection of searchResults.
 * @param searchResult searh result to find the percentile of
 * @param searchResults collection to compare it to
 */
export function percentileTransform(
    searchResult: SearchResult,
    searchResults: SearchResult[]
): SearchResult {
    const allScores = searchResults.map(result => result.score).sort();
    const worseScores = allScores.filter(
        someScore => someScore < searchResult.score
    );

    return {
        ...searchResult,
        percentile: (worseScores.length / allScores.length) * 100
    };
}
