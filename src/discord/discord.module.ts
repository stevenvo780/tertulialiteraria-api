import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DiscordService } from './discord.service';
import { DiscordController } from './discord.controller';

@Module({
  imports: [ConfigModule],
  controllers: [DiscordController],
  providers: [DiscordService],
})
export class DiscordModule {}
