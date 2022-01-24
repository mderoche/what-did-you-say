import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { WordDetail } from '@what-did-you-say/words';

import { WordsService } from './../words.service';
import { DictionaryService } from './../dictionary.service';

@ApiTags('wordDetail')
@Controller('word-detail')
export class WordDetailController {
    constructor(
        private readonly dictionaryService: DictionaryService,
        private readonly wordsService: WordsService
    ) {}

    /**
     * Get a single word detail
     * @param id
     * @returns a single word detail
     */
    @Get(':id')
    @ApiOperation({ summary: 'Get a word detail' })
    async wordDetail(@Param('id') id: string): Promise<WordDetail> {
        const word = await this.wordsService.get(id);

        return {
            word,
            definitions: await this.dictionaryService.getDefinitions(word)
        };
    }
}
