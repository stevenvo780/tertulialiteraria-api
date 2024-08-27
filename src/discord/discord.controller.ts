import {
  Controller,
  Get,
  Param,
  Query,
  Redirect,
  UseGuards,
} from '@nestjs/common';
import { DiscordService } from './discord.service';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../user/entities/user.entity';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiOkResponse,
} from '@nestjs/swagger';

@ApiTags('discord')
@Controller('discord')
export class DiscordController {
  constructor(private readonly discordService: DiscordService) {}

  @ApiOperation({ summary: 'Iniciar autenticación con Discord' })
  @Get('login')
  @Redirect()
  async login() {
    const clientId = process.env.DISCORD_CLIENT_ID;
    const redirectUri = process.env.DISCORD_REDIRECT_URI;
    const scope = 'identify email';
    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri,
    )}&response_type=code&scope=${scope}`;

    return { url: discordAuthUrl };
  }

  @ApiOperation({
    summary: 'Redirección después de la autenticación con Discord',
  })
  @ApiOkResponse({
    description: 'Autenticación exitosa, devuelve la información del usuario.',
  })
  @Get('redirect')
  async handleRedirect(@Query('code') code: string) {
    const accessToken = await this.discordService.getAccessToken(code);
    const userInfo = await this.discordService.getUserInfo(accessToken);
    return { userInfo };
  }

  @ApiOperation({
    summary: 'Obtener el total de miembros de un servidor de Discord',
  })
  @ApiOkResponse({
    description: 'Número total de miembros en el servidor',
    type: Number,
  })
  @Get('guild/:guildId/members')
  async getGuildMemberCount(
    @Param('guildId') guildId: string,
  ): Promise<number> {
    return this.discordService.getGuildMemberCount(guildId);
  }

  @ApiOperation({
    summary: 'Obtener el número de miembros activos en un servidor de Discord',
  })
  @ApiOkResponse({
    description: 'Número de miembros activos (en línea) en el servidor',
    type: Number,
  })
  @Get('guild/:guildId/online')
  async getOnlineMemberCount(
    @Param('guildId') guildId: string,
  ): Promise<number> {
    return this.discordService.getOnlineMemberCount(guildId);
  }
}
