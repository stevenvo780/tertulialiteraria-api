import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { DiscordController } from './discord.controller';
import { EventsModule } from 'src/events/events.module';
import { LibraryModule } from 'src/library/library.module';

@Module({
  imports: [EventsModule, LibraryModule],
  controllers: [DiscordController],
  providers: [DiscordService],
  exports: [DiscordService],
})
export class DiscordModule {}
