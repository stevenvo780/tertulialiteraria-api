import { IsDate, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateEventsDto } from './create-events.dto';

export class UpdateEventsDto extends PartialType(CreateEventsDto) {
  @IsOptional()
  @IsDate()
  @ApiProperty({
    description: 'La nueva fecha y hora de inicio del evento',
    type: Date,
  })
  startDate?: Date;

  @IsOptional()
  @IsDate()
  @ApiProperty({
    description: 'La nueva fecha y hora de fin del evento',
    type: Date,
  })
  endDate?: Date;
}
