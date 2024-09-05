import { IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateConfigDto {
  @IsObject()
  @ApiProperty({
    description: 'Normativas generales en formato JSON con HTML y CSS',
    example: {
      html: '<p>Normativas generales...</p>',
      css: 'body { color: red; }',
    },
  })
  generalNormative: { html: string; css: string };

  @IsObject()
  @ApiProperty({
    description: 'Normativas del staff en formato JSON con HTML y CSS',
    example: {
      html: '<p>Normativas del staff...</p>',
      css: 'body { font-size: 14px; }',
    },
  })
  staffNormative: { html: string; css: string };

  @IsObject()
  @ApiProperty({
    description: 'Información del proyecto en formato JSON con HTML y CSS',
    example: { html: '<p>Información del proyecto...</p>', css: '' },
  })
  projectInfo: { html: string; css: string };

  @IsObject()
  @ApiProperty({
    description: 'Políticas de privacidad en formato JSON con HTML y CSS',
    example: { html: '<p>Políticas de privacidad...</p>', css: '' },
  })
  privacyPolicies: { html: string; css: string };

  @IsObject()
  @ApiProperty({
    description: 'Aviso de privacidad en formato JSON con HTML y CSS',
    example: { html: '<p>Aviso de privacidad...</p>', css: '' },
  })
  privacyNotice: { html: string; css: string };
}

export class UpdateConfigDto extends CreateConfigDto {}
