import { ToneRanking } from './tone-ranking.interface';

/**
 * Represents a Word; a synonym of "said."
 */
export interface Word {
    id?: string;
    word?: string;
    toneRankings?: ToneRanking[];
}
