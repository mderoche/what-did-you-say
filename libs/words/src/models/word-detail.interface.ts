import { Word } from './word.interface';
import { WordDefinition } from './word-definition.interface';

/**
 * Represents a WordDetail page through a BFF-style API
 */
export interface WordDetail {
    word: Word;
    definitions: WordDefinition[];
}
