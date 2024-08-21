import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventsDto } from './dto/create-events.dto';
import { UpdateEventsDto } from './dto/update-events.dto';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../user/entities/user.entity';
import { RequestWithUser } from '../auth/types';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Events } from './entities/events.entity';
import { DeleteResult } from 'typeorm';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @ApiOperation({ summary: 'Obtener todos los eventos' })
  @ApiOkResponse({ description: 'Lista de todos los eventos', type: [Events] })
  @Get()
  findAll(): Promise<Events[]> {
    return this.eventsService.findAll();
  }

  @ApiOperation({ summary: 'Obtener todos los eventos únicos' })
  @ApiOkResponse({ description: 'Lista de eventos únicos', type: [Events] })
  @Get('/home/unique')
  findUniqueEvents(@Query('limit') limit: string): Promise<Events[]> {
    return this.eventsService.findUniqueEvents(Number(limit));
  }

  @ApiOperation({ summary: 'Obtener un evento por ID' })
  @ApiOkResponse({ description: 'Evento encontrado', type: Events })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Events> {
    return this.eventsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Crear un nuevo evento' })
  @ApiCreatedResponse({
    description: 'El evento ha sido creado correctamente.',
    type: Events,
  })
  @Post()
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  create(
    @Request() req: RequestWithUser,
    @Body() createEventsDto: CreateEventsDto,
  ): Promise<Events> {
    return this.eventsService.create(createEventsDto, req.user);
  }

  @ApiOperation({ summary: 'Actualizar un evento por ID' })
  @ApiOkResponse({
    description: 'Evento actualizado correctamente',
    type: Events,
  })
  @Patch(':id')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  update(
    @Param('id') id: string,
    @Body() updateEventsDto: UpdateEventsDto,
  ): Promise<Events> {
    return this.eventsService.update(+id, updateEventsDto);
  }

  @ApiOperation({ summary: 'Eliminar un evento por ID' })
  @ApiOkResponse({
    description: 'Evento eliminado correctamente',
    type: DeleteResult,
  })
  @Delete(':id')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.eventsService.remove(+id);
  }

  @ApiOperation({ summary: 'Obtener próximos eventos' })
  @ApiOkResponse({ description: 'Lista de próximos eventos', type: [Events] })
  @Get('home/upcoming')
  findUpcomingEvents(@Query('limit') limit: string): Promise<Events[]> {
    const parsedLimit = parseInt(limit, 10);
    return this.eventsService.findUpcomingEvents(parsedLimit);
  }
}
