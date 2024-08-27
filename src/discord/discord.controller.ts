import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { DiscordService } from './discord.service';
import { EventsService } from '../events/events.service';
import { LibraryService } from '../library/library.service'; // Importamos el servicio de la librería
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('discord')
@Controller('discord')
export class DiscordController {
  constructor(
    private readonly discordService: DiscordService,
    private readonly eventsService: EventsService,
    private readonly libraryService: LibraryService,
  ) {}

  @ApiOperation({
    summary: 'Obtener el total de miembros de un servidor de Discord',
  })
  @ApiOkResponse({
    description: 'Número total de miembros en el servidor',
    type: Number,
  })
  @Get('guild/members')
  async getGuildMemberCount(): Promise<number> {
    return this.discordService.getGuildMemberCount();
  }

  @ApiOperation({
    summary: 'Obtener el número de miembros activos en un servidor de Discord',
  })
  @ApiOkResponse({
    description: 'Número de miembros activos (en línea) en el servidor',
    type: Number,
  })
  @Get('guild/online')
  async getOnlineMemberCount(): Promise<number> {
    return this.discordService.getOnlineMemberCount();
  }

  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  async handleDiscordWebhook(@Body() eventPayload: any): Promise<any> {
    if (eventPayload.type === 1) {
      return { type: 1 };
    }

    if (eventPayload.type === 'GUILD_COMMAND_CREATE_NOTE') {
      const { titulo, contenido } = eventPayload.data.options;

      await this.libraryService.create(
        {
          title: titulo,
          description: contenido,
          referenceDate: new Date(),
        },
        null,
      );
    }

    if (eventPayload.type === 'GUILD_SCHEDULED_EVENT_CREATE') {
      const { name, description, scheduled_start_time, scheduled_end_time } =
        eventPayload;

      const createEventDto = {
        title: name,
        description: { content: description },
        startDate: new Date(scheduled_start_time),
        endDate: new Date(scheduled_end_time),
        repetition: 'none',
      };

      await this.eventsService.create(createEventDto, null);
    }
  }
}
