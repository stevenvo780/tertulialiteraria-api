import { IsEnum, IsNotEmpty, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TemplateType } from '../entities/template.entity';

export class CreateTemplateDto {
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

  @IsObject()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Contenido de la plantilla en formato JSON con HTML y CSS',
    example: {
      html: '<p>Este es el contenido de la plantilla...</p>',
      css: 'p { color: blue; }',
    },
  })
  content: { html: string; css: string };
}
