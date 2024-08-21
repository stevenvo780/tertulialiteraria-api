import { IsString, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePublicationDto {
  @IsString()
  @ApiProperty({ description: 'The title of the publication', type: String })
  title: string;

  @IsObject()
  @ApiProperty({
    description: 'The author of the publication',
    type: Object,
  })
  content: string;
}
