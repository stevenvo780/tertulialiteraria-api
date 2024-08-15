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
import { RequestWithUser } from '../auth/types';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
} from '@nestjs/swagger';

@UseGuards(FirebaseAuthGuard)
@ApiBearerAuth()
@ApiTags('library')
@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @ApiOperation({ summary: 'Create a new library reference' })
  @ApiCreatedResponse({
    description: 'The reference has been successfully created.',
  })
  @Post()
  create(
    @Request() req: RequestWithUser,
    @Body() createLibraryDto: CreateLibraryDto,
  ) {
    return this.libraryService.create(createLibraryDto, req.user.uid);
  }

  @ApiOperation({ summary: 'Get all library references' })
  @Get()
  findAll(@Request() req: RequestWithUser) {
    return this.libraryService.findAll(req.user.uid);
  }

  @ApiOperation({ summary: 'Get a library reference by ID' })
  @Get(':id')
  findOne(@Request() req: RequestWithUser, @Param('id') id: string) {
    return this.libraryService.findOne(+id, req.user.uid);
  }

  @ApiOperation({ summary: 'Update a library reference by ID' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLibraryDto: UpdateLibraryDto) {
    return this.libraryService.update(+id, updateLibraryDto);
  }

  @ApiOperation({ summary: 'Delete a library reference by ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.libraryService.remove(+id);
  }
}
