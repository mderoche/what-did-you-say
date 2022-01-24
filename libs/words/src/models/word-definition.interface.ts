/**
 * Words can have multiple definitions, each eith different sets of
 * stems and synonyms.
 */
export interface WordDefinition {
    definition: string;
    stems: string[];
    synonyms: string[];
}
