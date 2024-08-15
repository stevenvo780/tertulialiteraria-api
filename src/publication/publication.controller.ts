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
import { PublicationService } from './publication.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
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
@ApiTags('publications')
@Controller('publications')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @ApiOperation({ summary: 'Create a new publication' })
  @ApiCreatedResponse({
    description: 'The publication has been successfully created.',
  })
  @Post()
  create(
    @Request() req: RequestWithUser,
    @Body() createPublicationDto: CreatePublicationDto,
  ) {
    return this.publicationService.create(createPublicationDto, req.user);
  }

  @ApiOperation({ summary: 'Get all publications' })
  @Get()
  findAll(@Request() req: RequestWithUser) {
    return this.publicationService.findAll(req.user);
  }

  @ApiOperation({ summary: 'Get a publication by ID' })
  @Get(':id')
  findOne(@Request() req: RequestWithUser, @Param('id') id: string) {
    return this.publicationService.findOne(+id, req.user);
  }

  @ApiOperation({ summary: 'Update a publication by ID' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePublicationDto: UpdatePublicationDto,
  ) {
    return this.publicationService.update(+id, updatePublicationDto);
  }

  @ApiOperation({ summary: 'Delete a publication by ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicationService.remove(+id);
  }
}
