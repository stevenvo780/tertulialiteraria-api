import {
  Client,
  GatewayIntentBits,
  GuildScheduledEventPrivacyLevel,
} from 'discord.js';
import axios from 'axios';
import { CreateEventsDto } from 'src/events/dto/create-events.dto';

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildScheduledEvents],
});

// Iniciar sesión en Discord
export async function initializeDiscordClient(token: string): Promise<void> {
  try {
    await client.login(token);
    console.log('Discord client initialized.');
  } catch (error) {
    console.error('Error initializing Discord client:', error);
    throw error;
  }
}

// Crear un evento en Discord
export async function createDiscordEvent(
  guildId: string,
  createEventDto: CreateEventsDto,
): Promise<void> {
  try {
    console.log(createEventDto);
    const guild = await client.guilds.fetch(guildId);
    console.log('Guild fetched successfully.');
    await guild.scheduledEvents.create({
      name: createEventDto.title,
      scheduledStartTime: createEventDto.startDate,
      scheduledEndTime: createEventDto.endDate,
      description: createEventDto.description.toString(),
      entityType: 3,
      privacyLevel: GuildScheduledEventPrivacyLevel.GuildOnly,
    });

    console.log('Event created in Discord successfully.');
  } catch (error) {
    console.error('Error creating event in Discord:', error);
    throw error;
  }
}

// Obtener el número de miembros de un servidor
export async function getGuildMemberCount(guildId: string): Promise<number> {
  try {
    const guild = await client.guilds.fetch(guildId);
    return guild.memberCount;
  } catch (error) {
    console.error('Error fetching guild member count:', error);
    throw error;
  }
}

// Obtener el número de miembros en línea
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
