import { IsString, IsDate, IsOptional, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLibraryDto {
  @IsString()
  @ApiProperty({
    description: 'The title of the library reference',
    type: String,
  })
  title: string;

  @IsObject()
  @ApiProperty({
    description: 'The description of the library reference (HTML and CSS)',
    example: {
      html: '<p>Some description...</p>',
      css: 'body { color: black; }',
    },
  })
  description: { html: string; css: string };

  @IsDate()
  @ApiProperty({ description: 'The date of the library reference', type: Date })
  referenceDate: Date;

  @IsOptional()
  @ApiProperty({
    description: 'The ID of the parent note',
    type: Number,
    required: false,
  })
  parentNoteId?: number;
}
