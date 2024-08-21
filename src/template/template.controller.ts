import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TemplateService } from './template.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../user/entities/user.entity';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { Template } from './entities/template.entity';
import { DeleteResult } from 'typeorm';

@ApiTags('template')
@Controller('template')
@UseGuards(FirebaseAuthGuard, RolesGuard)
@ApiBearerAuth()
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Get()
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Obtener todas las plantillas o filtrar por tipo' })
  @ApiQuery({
    name: 'type',
    required: false,
    description: 'Filtra por tipo de plantilla',
  })
  @ApiOkResponse({ type: [Template] })
  findAll(@Query('type') type?: string): Promise<Template[]> {
    if (type) {
      return this.templateService.findByType(type);
    }
    return this.templateService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Obtener una plantilla por ID' })
  @ApiOkResponse({ type: Template })
  findOne(@Param('id') id: string): Promise<Template> {
    return this.templateService.findOne(+id);
  }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Crear una nueva plantilla' })
  @ApiOkResponse({ type: Template })
  create(@Body() createTemplateDto: CreateTemplateDto): Promise<Template> {
    return this.templateService.create(createTemplateDto);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Actualizar una plantilla existente' })
  @ApiOkResponse({ type: Template })
  update(
    @Param('id') id: string,
    @Body() updateTemplateDto: UpdateTemplateDto,
  ): Promise<Template> {
    return this.templateService.update(+id, updateTemplateDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Eliminar una plantilla existente' })
  @ApiOkResponse({ type: Template })
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.templateService.remove(+id);
  }
}
