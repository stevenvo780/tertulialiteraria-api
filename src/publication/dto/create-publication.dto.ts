import { IsString, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePublicationDto {
  @IsString()
  @ApiProperty({ description: 'The title of the publication', type: String })
  title: string;

  @IsObject()
  @ApiProperty({
    description:
      'The content of the publication in JSON format with HTML and CSS',
    type: Object,
    example: {
      html: '<h1>Publicación sobre filosofía moderna</h1>',
      css: 'h1 { color: blue; }',
    },
  })
  content: { html: string; css: string };
}
