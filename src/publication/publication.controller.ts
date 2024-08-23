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
import { PublicationService } from './publication.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
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
import { Publication } from './entities/publication.entity';
import { DeleteResult } from 'typeorm';

@ApiTags('publications')
@Controller('publications')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @ApiOperation({ summary: 'Obtener todas las publicaciones' })
  @ApiOkResponse({
    description: 'Lista de todas las publicaciones',
    type: [Publication],
  })
  @Get()
  async findAll(
    @Query('limit') limit = 4,
    @Query('offset') offset = 0,
  ): Promise<Publication[]> {
    return this.publicationService.findAll(Number(limit), Number(offset));
  }

  @ApiOperation({ summary: 'Obtener una publicación por ID' })
  @ApiOkResponse({ description: 'Publicación encontrada', type: Publication })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Publication> {
    return this.publicationService.findOne(+id);
  }

  @ApiOperation({ summary: 'Crear una nueva publicación' })
  @ApiCreatedResponse({
    description: 'La publicación ha sido creada correctamente.',
    type: Publication,
  })
  @Post()
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  create(
    @Request() req: RequestWithUser,
    @Body() createPublicationDto: CreatePublicationDto,
  ): Promise<Publication> {
    return this.publicationService.create(createPublicationDto, req.user);
  }

  @ApiOperation({ summary: 'Actualizar una publicación por ID' })
  @ApiOkResponse({
    description: 'Publicación actualizada correctamente',
    type: Publication,
  })
  @Patch(':id')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  update(
    @Param('id') id: string,
    @Body() updatePublicationDto: UpdatePublicationDto,
  ): Promise<Publication> {
    return this.publicationService.update(+id, updatePublicationDto);
  }

  @ApiOperation({ summary: 'Eliminar una publicación por ID' })
  @ApiOkResponse({
    description: 'Publicación eliminada correctamente',
    type: DeleteResult,
  })
  @Delete(':id')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.publicationService.remove(+id);
  }
}
