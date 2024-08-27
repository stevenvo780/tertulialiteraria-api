import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { DiscordService } from './discord.service';
import { LibraryService } from '../library/library.service';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import {
  Interaction,
  InteractionType,
  InteractionResponseType,
  ChatInputCommandInteraction,
} from 'discord.js';
import * as nacl from 'tweetnacl';

@ApiTags('discord')
@Controller('discord')
export class DiscordController {
  constructor(
    private readonly discordService: DiscordService,
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
  async handleDiscordWebhook(
    @Body() eventPayload: Interaction,
    @Headers('x-signature-ed25519') signature: string,
    @Headers('x-signature-timestamp') timestamp: string,
  ): Promise<any> {
    const publicKey = process.env.DISCORD_PUBLIC_KEY;
    const isVerified = nacl.sign.detached.verify(
      Buffer.from(timestamp + JSON.stringify(eventPayload)),
      Buffer.from(signature, 'hex'),
      Buffer.from(publicKey, 'hex'),
    );

    if (!isVerified) {
      throw new Error('Invalid request signature');
    }

    if (eventPayload.type === (InteractionType.Ping as number)) {
      return { type: InteractionResponseType.Pong };
    }

    if (eventPayload.type === InteractionType.ApplicationCommand) {
      const interaction = eventPayload as ChatInputCommandInteraction;

      if (interaction.commandName === 'create_note') {
        const titulo = interaction.options.getString('titulo');
        const contenido = interaction.options.getString('contenido');

        const data = {
          title: titulo,
          description: contenido,
          referenceDate: new Date(),
        };

        await this.libraryService.create(data, null);

        return {
          type: InteractionResponseType.ChannelMessageWithSource,
          data: {
            content: 'Nota creada con éxito!',
          },
        };
      }
    }
  }
}
