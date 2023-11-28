import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppProvider } from './app.provider';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const appProvider = app.get(AppProvider);
  appProvider.setApp(app);
  const config = new DocumentBuilder()
    .setTitle('POS API')
    .setDescription(
      'The API documentation for the Point of Sale (POS) system. This includes endpoints for managing users, products, invoices, clients, categories, and cash boxes.',
    )
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(8080);
}
bootstrap();
