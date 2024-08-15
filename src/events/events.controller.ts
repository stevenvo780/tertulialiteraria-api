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
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventsDto } from './dto/create-events.dto';
import { UpdateEventsDto } from './dto/update-events.dto';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { RequestWithUser } from '../auth/types';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
} from '@nestjs/swagger';

@UseGuards(FirebaseAuthGuard)
@ApiBearerAuth()
@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @ApiOperation({ summary: 'Create a new event' })
  @ApiCreatedResponse({
    description: 'The event has been successfully created.',
  })
  @Post()
  create(
    @Request() req: RequestWithUser,
    @Body() createEventsDto: CreateEventsDto,
  ) {
    return this.eventsService.create(createEventsDto, req.user.uid);
  }

  @ApiOperation({ summary: 'Get all events' })
  @Get()
  findAll(@Request() req: RequestWithUser) {
    return this.eventsService.findAll(req.user.uid);
  }

  @ApiOperation({ summary: 'Get an event by ID' })
  @Get(':id')
  findOne(@Request() req: RequestWithUser, @Param('id') id: string) {
    return this.eventsService.findOne(+id, req.user.uid);
  }

  @ApiOperation({ summary: 'Update an event by ID' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventsDto: UpdateEventsDto) {
    return this.eventsService.update(+id, updateEventsDto);
  }

  @ApiOperation({ summary: 'Delete an event by ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }
}
