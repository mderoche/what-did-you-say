import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

import { KeywordPacksController, KeywordPackService } from './keyword-packs';
import { SearchController } from './search';
import { WordDetailController } from './word-detail';
import { WordsService } from './words.service';
import { DictionaryService } from './dictionary.service';

@Module({
    imports: [
        HttpModule,
        ConfigModule.forRoot({
            isGlobal: true
        })
    ],
    controllers: [
        SearchController,
        KeywordPacksController,
        WordDetailController
    ],
    providers: [WordsService, KeywordPackService, DictionaryService]
})
export class AppModule {}
