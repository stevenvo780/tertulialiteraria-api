import { Injectable, HttpException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class DiscordService {
  private readonly discordApiUrl = 'https://discord.com/api/v10';

  async getAccessToken(code: string): Promise<string> {
    const tokenUrl = `${this.discordApiUrl}/oauth2/token`;
    const clientId = process.env.DISCORD_CLIENT_ID;
    const clientSecret = process.env.DISCORD_CLIENT_SECRET;
    const redirectUri = process.env.DISCORD_REDIRECT_URI;

    try {
      const response = await axios.post(
        tokenUrl,
        new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: 'authorization_code',
          code,
          redirect_uri: redirectUri,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      return response.data.access_token;
    } catch (error) {
      throw new HttpException(
        'Failed to obtain access token',
        error.response?.status || 500,
      );
    }
  }

  async getUserInfo(accessToken: string): Promise<any> {
    const url = `${this.discordApiUrl}/users/@me`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch user info',
        error.response?.status || 500,
      );
    }
  }

  async getGuildMemberCount(guildId: string): Promise<number> {
    const url = `${this.discordApiUrl}/guilds/${guildId}`;
    const botToken = process.env.DISCORD_BOT_TOKEN;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bot ${botToken}`,
        },
      });

      return response.data.approximate_member_count;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch guild member count',
        error.response?.status || 500,
      );
    }
  }

  async getOnlineMemberCount(guildId: string): Promise<number> {
    const url = `${this.discordApiUrl}/guilds/${guildId}/widget.json`;
    const botToken = process.env.DISCORD_BOT_TOKEN;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bot ${botToken}`,
        },
      });

      return response.data.presence_count;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch online member count',
        error.response?.status || 500,
      );
    }
  }
}
