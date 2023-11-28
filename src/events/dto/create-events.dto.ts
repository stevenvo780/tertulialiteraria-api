import { IsString, IsDate, IsJSON } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventsDto {
  @IsString()
  @ApiProperty({ description: 'The title of the event', type: String })
  title: string;

  @IsJSON()
  @ApiProperty({
    description: 'The JSON object describing the event',
    type: Object,
  })
  description: object;

  @IsDate()
  @ApiProperty({ description: 'The date of the event', type: Date })
  eventDate: Date;
}
