import { IsString, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePublicationDto {
  @IsString()
  @ApiProperty({ description: 'The title of the publication', type: String })
  title: string;

  @IsString()
  @ApiProperty({
    description: 'The content of the publication',
    type: String,
  })
  content: string;

  @IsDate()
  @ApiProperty({ description: 'The date of the publication', type: Date })
  publicationDate: Date;
}
