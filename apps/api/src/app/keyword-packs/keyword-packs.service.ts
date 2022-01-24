/**
 * Super simple in-memory store, good starting point.
 * @TODO expand to Mongo or something.
 */

import { join, basename } from 'path';
import { readdirSync } from 'fs';
import { Injectable } from '@nestjs/common';
import { readFile } from 'jsonfile';

import { KeywordPack } from '@what-did-you-say/words';

@Injectable()
export class KeywordPackService {
    private keywordPackRoot = join(__dirname, 'assets/keyword-packs');

    /**
     * Gets all registered keyword pack filenames.
     * @returns keyword pack filename
     */
    getPackFiles(): string[] {
        return readdirSync(this.keywordPackRoot).map(file => basename(file));
    }

    /**
     * Get a specific keyword pack by filename.
     * @param file - filename of the pack
     * @returns the keyword pack
     */
    async getPack(file: string): Promise<KeywordPack> {
        return readFile(join(this.keywordPackRoot, file));
    }
}
