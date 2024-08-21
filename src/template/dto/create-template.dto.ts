import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TemplateType } from '../entities/template.entity';

export class CreateTemplateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nombre de la plantilla',
    example: 'Plantilla de notas',
  })
  name: string;

  @IsEnum(TemplateType)
  @ApiProperty({
    description: 'Tipo de la plantilla',
    enum: TemplateType,
    example: TemplateType.NOTES,
  })
  type: TemplateType;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Contenido de la plantilla en formato de texto',
    example: '<p>Este es el contenido de la plantilla...</p>',
  })
  content: string;
}
