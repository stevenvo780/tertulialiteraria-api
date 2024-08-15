import { IsString, IsDate, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateLibraryDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'The title of the library reference',
    type: String,
    required: false,
  })
  title?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'The description of the library reference',
    type: String,
    required: false,
  })
  description?: string;

  @IsDate()
  @IsOptional()
  @ApiProperty({
    description: 'The date of the library reference',
    type: Date,
    required: false,
  })
  referenceDate?: Date;

  @IsOptional()
  @ApiProperty({
    description: 'The ID of the parent note',
    type: Number,
    required: false,
  })
  parentNoteId?: number;
}
