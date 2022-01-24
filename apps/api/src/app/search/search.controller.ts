import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { SearchParams, SearchResult } from '@what-did-you-say/words';

import { WordsService } from './../words.service';

@ApiTags('search')
@Controller('search')
export class SearchController {
    constructor(private readonly wordsService: WordsService) {}

    /**
     * Searches for synonyms of said using the given search parameters.
     * @param searchParams
     * @returns synonyms for said
     */
    @Post()
    @ApiOperation({ summary: 'Search for synonyms of "said"' })
    search(@Body() searchParams: SearchParams): Promise<SearchResult[]> {
        return this.wordsService.search(searchParams);
    }
}
