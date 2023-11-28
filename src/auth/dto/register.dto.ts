import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
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

  @IsString()
  @ApiProperty({ description: 'The surname of the user', type: String })
  surname: string;

  @IsString()
  @ApiProperty({ description: 'The phone of the user', type: String })
  phone: string;

  @IsString()
  @ApiProperty({ description: 'The logo of the user', type: String })
  logo: string;

  @IsString()
  @ApiProperty({ description: 'The company name of the user', type: String })
  companyName: string;

  @IsString()
  @ApiProperty({ description: 'The document number of the user', type: String })
  documentNumber: string;
}
