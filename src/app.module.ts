import {
  Module,
  NestModule,
  MiddlewareConsumer,
  OnModuleInit,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './logger.middleware';
import AppProvider from './app.provider';
import { LibraryModule } from './library/library.module';
import { PublicationModule } from './publication/publication.module';
import { ConfigAppModule } from './config/config.module';
import { TemplateModule } from './template/template.module';
import { LikeModule } from './like/like.module';
import { DiscordModule } from './discord/discord.module';
import { registerDiscordCommands } from './utils/register-commands.ts';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'postgres',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
    }),
    AuthModule,
    EventsModule,
    UserModule,
    PublicationModule,
    LibraryModule,
    ConfigAppModule,
    TemplateModule,
    LikeModule,
    DiscordModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppProvider],
})
export class AppModule implements NestModule, OnModuleInit {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }

  async onModuleInit() {
    await registerDiscordCommands();
  }
}
