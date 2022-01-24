/**
 * Parameters used to search for words. Keys are keyword pack names, with the value
 * as the selection from that pack.
 */
export interface SearchParams {
    [packName: string]: string;
}
