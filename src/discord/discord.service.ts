import { Injectable, OnModuleInit, HttpException } from '@nestjs/common';
import {
  initializeDiscordClient,
  getGuildMemberCount,
  getOnlineMemberCount,
} from '../utils/discordUtils';

@Injectable()
export class DiscordService implements OnModuleInit {
  private readonly guildId = process.env.DISCORD_GUILD_ID;

  async onModuleInit() {
    try {
      await initializeDiscordClient(process.env.DISCORD_BOT_TOKEN);
    } catch (error) {
      throw new HttpException('Failed to initialize Discord client', 500);
    }
  }

  async getGuildMemberCount(): Promise<number> {
    try {
      return await getGuildMemberCount(this.guildId);
    } catch (error) {
      throw new HttpException('Failed to fetch guild member count', 500);
    }
  }

  async getOnlineMemberCount(): Promise<number> {
    try {
      return await getOnlineMemberCount(this.guildId);
    } catch (error) {
      throw new HttpException('Failed to fetch online member count', 500);
    }
  }
}
