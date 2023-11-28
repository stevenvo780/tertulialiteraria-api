import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsString()
  @ApiProperty({ description: 'The email of the user', type: String })
  email: string;

  @IsString()
  @ApiProperty({ description: 'The password of the user', type: String })
  password: string;
}
