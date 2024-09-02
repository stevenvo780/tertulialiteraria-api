import {
  Client,
  GatewayIntentBits,
  GuildScheduledEventPrivacyLevel,
} from 'discord.js';
import axios from 'axios';
import * as TurndownService from 'turndown';
import { CreateEventsDto } from 'src/events/dto/create-events.dto';

const turndownService = new TurndownService();

let discordClient: Client | null = null;

async function getDiscordClient(): Promise<Client> {
  if (!discordClient) {
    discordClient = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildScheduledEvents,
      ],
    });

    try {
      await discordClient.login(process.env.DISCORD_BOT_TOKEN);
      console.log('Discord client initialized.');
    } catch (error) {
      console.error('Error initializing Discord client:', error);
      throw error;
    }
  }
  return discordClient;
}

export async function createDiscordEvent(
  guildId: string,
  createEventDto: CreateEventsDto,
): Promise<void> {
  const client = await getDiscordClient();

  try {
    const now = new Date();
    const startDate = new Date(createEventDto.startDate);
    const endDate = new Date(createEventDto.endDate);

    if (startDate < now) {
      throw new Error('Cannot schedule event in the past.');
    }

    if (endDate <= startDate) {
      throw new Error('End date must be after the start date.');
    }

    const guild = await client.guilds.fetch(guildId);

    const markdownDescription = turndownService.turndown(
      createEventDto.description,
    );

    await guild.scheduledEvents.create({
      name: createEventDto.title,
      scheduledStartTime: startDate,
      scheduledEndTime: endDate,
      description: markdownDescription,
      entityType: 3,
      privacyLevel: GuildScheduledEventPrivacyLevel.GuildOnly,
      entityMetadata: {
        location: 'Tertulia Literaria',
      },
    });

    console.log('Event created in Discord successfully.');
  } catch (error) {
    console.error('Error creating event in Discord:', error);
    throw error;
  }
}

export async function getGuildMemberCount(guildId: string): Promise<number> {
  const client = await getDiscordClient();

  try {
    const guild = await client.guilds.fetch(guildId);
    return guild.memberCount;
  } catch (error) {
    console.error('Error fetching guild member count:', error);
    throw error;
  }
}

export async function getOnlineMemberCount(guildId: string): Promise<number> {
  const url = `https://discord.com/api/guilds/${guildId}/widget.json`;

  try {
    const response = await axios.get(url);
    return response.data.presence_count;
  } catch (error) {
    console.error('Error fetching online member count:', error);
    throw error;
  }
}
