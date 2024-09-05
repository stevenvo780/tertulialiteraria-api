import { IsString, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { HtmlCssContent, exampleHtmlCssContent } from '../../utils/types';

export class CreatePublicationDto {
  @IsString()
  @ApiProperty({ description: 'The title of the publication', type: String })
  title: string;

  @IsObject()
  @ApiProperty({
    description:
      'The content of the publication in JSON format with HTML and CSS',
    type: Object,
    example: exampleHtmlCssContent,
  })
  content: HtmlCssContent;
}
