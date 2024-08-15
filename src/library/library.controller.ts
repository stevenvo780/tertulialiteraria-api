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
import { LibraryService } from './library.service';
import { CreateLibraryDto } from './dto/create-library.dto';
import { UpdateLibraryDto } from './dto/update-library.dto';
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
} from '@nestjs/swagger';

@ApiTags('library')
@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @ApiOperation({ summary: 'Get all library references' })
  @Get()
  findAll() {
    return this.libraryService.findAll();
  }

  @ApiOperation({ summary: 'Get a library reference by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.libraryService.findOne(+id);
  }

  @ApiOperation({ summary: 'Create a new library reference' })
  @ApiCreatedResponse({
    description: 'The reference has been successfully created.',
  })
  @Post()
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  create(
    @Request() req: RequestWithUser,
    @Body() createLibraryDto: CreateLibraryDto,
  ) {
    return this.libraryService.create(createLibraryDto, req.user);
  }

  @ApiOperation({ summary: 'Update a library reference by ID' })
  @Patch(':id')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateLibraryDto: UpdateLibraryDto) {
    return this.libraryService.update(+id, updateLibraryDto);
  }

  @ApiOperation({ summary: 'Delete a library reference by ID' })
  @Delete(':id')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.libraryService.remove(+id);
  }
}
