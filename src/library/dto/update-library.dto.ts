import { PartialType } from '@nestjs/swagger';
import { CreateLibraryDto } from './create-library.dto';

export class UpdateLibraryDto extends PartialType(CreateLibraryDto) {}
