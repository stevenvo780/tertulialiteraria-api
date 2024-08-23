import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @IsEmail()
  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'usuario@ejemplo.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'passwordSeguro123',
  })
  password: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Nombre del usuario, opcional',
    example: 'Juan Pérez',
    nullable: true,
  })
  name?: string;
}
