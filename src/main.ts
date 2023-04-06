import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );

    SwaggerModule.setup(
        'swagger',
        app,
        SwaggerModule.createDocument(
            app,
            new DocumentBuilder()
                .setTitle('Platzi API')
                .setDescription('Documentación Platzi API')
                .setVersion('1.0')
                .addTag('platzi')
                .build(),
        ),
    );

    app.enableCors();

    await app.listen(3000);
}
bootstrap();
