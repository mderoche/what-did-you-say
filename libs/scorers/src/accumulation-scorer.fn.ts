import {
    SearchParams,
    SearchResult,
    ToneRanking
} from '@what-did-you-say/words';

/**
 * A simple scorer that accumulates the scores for each tone ranking if they
 * match the tone ranking selections in the search params.
 *
 * For example,
 *   If the SearchResult has tone ranking scores:
 *      `pack1: { a: 4, b: 5, c: 2 }`
 *      `pack2: { d: 1, e: 2, f: 3 }`
 *   And the SearchParameters has `{ pack1: 'b', pack2: 'f' }`
 *   Then the score is (pack1.b = 5) + (pack2.f = 3) = 8
 *
 * @param sp search parameters to use with scoring
 * @param words
 *
 * @returns SearchResults scored using the accumulation method
 */
export async function accumulationScorer(
    srs: SearchResult[],
    sp: SearchParams
): Promise<SearchResult[]> {
    return srs.map(sr => {
        // each Word could have multiple tone rankings if they can be used in
        // different ways. score each tone ranking.
        const toneRankingsScored = sr.word.toneRankings
            .map(toneRanking => ({
                toneRanking,
                total: scoreToneRanking(toneRanking, sp)
            }))
            .sort((a, b) => a.total - b.total);

        // for now, just take the best tone ranking
        // @todo expand this into the UI allowing for one word to have multiple rankings
        //       for multiple meanings
        const bestToneRanking = toneRankingsScored.shift();

        return {
            ...sr,
            score: bestToneRanking.total
        };
    });
}

/**
 * Helper function to score a toneRanking against searchParams. See head of document
 * for explanation of how this function scores a tone ranking.
 *
 * @param toneRanking toneTanking to score
 * @param searchParams searchParams to use for scoring
 * @returns
 */
const scoreToneRanking = (
    toneRanking: ToneRanking,
    searchParams: SearchParams
) => {
    let total = 0;

    for (let packName in searchParams) {
        const keyword = searchParams[packName];

        if (keyword && keyword.length) {
            total += toneRanking[packName][keyword];
        } else {
            total += 3;
        }
    }

    return total;
};
