/**
 * Ranks tone keywords from multiple keyword pack files on a scale of 1-5
 */
export interface ToneRanking {
    [packName: string]: {
        [tone: string]: number;
    };
}
