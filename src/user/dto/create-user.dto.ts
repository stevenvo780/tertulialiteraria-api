import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({ description: 'The email of the user', type: String })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The password of the user', type: String })
  password: string;

  @IsString()
  @ApiProperty({ description: 'The name of the user', type: String })
  name: string;
}
