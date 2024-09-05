import { IsString, IsDate, IsOptional, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { HtmlCssContent, exampleHtmlCssContent } from '../../utils/types';

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
    example: exampleHtmlCssContent,
  })
  description: HtmlCssContent;

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
