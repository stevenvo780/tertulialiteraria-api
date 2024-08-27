import { Injectable, HttpException, OnModuleInit } from '@nestjs/common';
import { Client, GatewayIntentBits } from 'discord.js';
import axios from 'axios';

@Injectable()
export class DiscordService implements OnModuleInit {
  private readonly client: Client;
  private readonly guildId = process.env.DISCORD_GUILD_ID;

  constructor() {
    this.client = new Client({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
    });
  }

  async onModuleInit() {
    try {
      await this.client.login(process.env.DISCORD_BOT_TOKEN);
      console.log('Discord bot logged in successfully.');
    } catch (error) {
      console.error('Error logging in to Discord:', error);
      throw new HttpException('Failed to login to Discord', 500);
    }
  }

  async getGuildMemberCount(): Promise<number> {
    try {
      const guild = await this.client.guilds.fetch(this.guildId);
      return guild.memberCount;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch guild member count',
        error.status || 500,
      );
    }
  }

  async getOnlineMemberCount(): Promise<number> {
    const url = `https://discord.com/api/guilds/${this.guildId}/widget.json`;
    try {
      const response = await axios.get(url);
      return response.data.presence_count;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch online member count from widget',
        error.response?.status || 500,
      );
    }
  }
}
