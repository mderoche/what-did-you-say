import { Keyword } from './keyword.interface';

/**
 * A keyword pack is a JSON file of keywords (as tones) the user can select
 * to filter the pool of synonyms.
 */
export interface KeywordPack {
    name: string;
    keywords: Keyword[];
}
