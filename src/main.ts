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
    .setTitle('TERTULIA LITERARIA API')
    .setDescription(
      'Esta es la documentacion de TERTULIA LITERARIA sientete libre de aportar a nuestro proyecto',
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
