import { IsString, IsDate, IsJSON, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventsDto {
  @IsString()
  @ApiProperty({ description: 'El título del evento', type: String })
  title: string;

  @IsJSON()
  @ApiProperty({
    description: 'El objeto JSON que describe el evento',
    type: Object,
  })
  description: object;

  @IsDate()
  @ApiProperty({
    description: 'La fecha y hora de inicio del evento',
    type: Date,
  })
  startDate: Date;

  @IsDate()
  @ApiProperty({ description: 'La fecha y hora de fin del evento', type: Date })
  endDate: Date;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'La repetición del evento (none, weekly, monthly, yearly)',
    type: String,
  })
  repetition?: string;
}
