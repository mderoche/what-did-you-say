import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { KeywordPack } from '@what-did-you-say/words';

import { KeywordPackService } from './keyword-packs.service';

@ApiTags('keyword-packs')
@Controller('keyword-packs')
export class KeywordPacksController {
    constructor(private readonly keywordPackService: KeywordPackService) {}

    /**
     * Gets all registered keyword packs
     * @returns all registered keyword packs
     */
    @Get()
    @ApiOperation({ summary: 'Get all registered keyword packs' })
    async getAll(): Promise<KeywordPack[]> {
        let packFiles = this.keywordPackService.getPackFiles();

        // temporary...
        packFiles = [
            'attitude.json',
            'emotion.json',
            'intent.json',
            'purpose.json',
            'volume.json'
        ];

        const keywordPacks = [];
        for (let packFile of packFiles) {
            keywordPacks.push(await this.keywordPackService.getPack(packFile));
        }

        return keywordPacks;
    }
}
