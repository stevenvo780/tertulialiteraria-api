import { IsString, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLibraryDto {
  @IsString()
  @ApiProperty({
    description: 'The title of the library reference',
    type: String,
  })
  title: string;

  @IsString()
  @ApiProperty({
    description: 'The description of the library reference',
    type: String,
  })
  description: string;

  @IsDate()
  @ApiProperty({ description: 'The date of the library reference', type: Date })
  referenceDate: Date;
}
