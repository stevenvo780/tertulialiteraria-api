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
import { JwtAuthGuard } from '../auth/jwt.strategy';
import { RequestWithUser } from '../auth/types';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
} from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @ApiOperation({ summary: 'Create a new events' })
  @ApiCreatedResponse({
    description: 'The events has been successfully created.',
  })
  @Post()
  create(
    @Request() req: RequestWithUser,
    @Body() createEventsDto: CreateEventsDto,
  ) {
    return this.eventsService.create(createEventsDto, req.user);
  }

  @ApiOperation({ summary: 'Get all categories' })
  @Get()
  findAll(@Request() req: RequestWithUser) {
    return this.eventsService.findAll(req.user.id);
  }

  @ApiOperation({ summary: 'Get a events by ID' })
  @Get(':id')
  findOne(@Request() req: RequestWithUser, @Param('id') id: string) {
    return this.eventsService.findOne(+id, req.user.id);
  }

  @ApiOperation({ summary: 'Update a events by ID' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventsDto: UpdateEventsDto) {
    return this.eventsService.update(+id, updateEventsDto);
  }

  @ApiOperation({ summary: 'Delete a events by ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }
}
