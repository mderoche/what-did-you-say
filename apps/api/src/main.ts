import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app/app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });

    const options = new DocumentBuilder()
        .setTitle('WDYS API')
        .setDescription('What Did You Say: API')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);

    const port = process.env.PORT || 3333;
    await app.listen(port);

    Logger.log(`🚀 API is running on: http://localhost:${port}`);
}

bootstrap();
