import { IsString, IsDate, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePublicationDto {
  @IsString()
  @ApiProperty({ description: 'The title of the publication', type: String })
  title: string;

  @IsObject()
  @ApiProperty({
    description: 'The content of the publication, including HTML and CSS',
    type: Object,
  })
  content: {
    html: string;
    css: string;
  };

  @IsDate()
  @ApiProperty({ description: 'The date of the publication', type: Date })
  publicationDate: Date;
}
