import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { SharedProp } from '../../common/entities/sharedProp.helper';

@Entity()
export class Config extends SharedProp {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'Identificador único de la configuración',
    example: 1,
  })
  id: number;

  @Column({ type: 'json', default: { html: '', css: '' } })
  @ApiProperty({
    description: 'Normativas generales en formato JSON con HTML y CSS',
    type: Object,
    example: {
      html: '<p>Normativas generales...</p>',
      css: 'body { color: red; }',
    },
  })
  generalNormative: { html: string; css: string };

  @Column({ type: 'json', default: { html: '', css: '' } })
  @ApiProperty({
    description: 'Normativas del staff en formato JSON con HTML y CSS',
    type: Object,
    example: {
      html: '<p>Normativas del staff...</p>',
      css: 'body { font-size: 14px; }',
    },
  })
  staffNormative: { html: string; css: string };

  @Column({ type: 'json', default: { html: '', css: '' } })
  @ApiProperty({
    description: 'Información del proyecto en formato JSON con HTML y CSS',
    type: Object,
    example: { html: '<p>Información del proyecto...</p>', css: '' },
  })
  projectInfo: { html: string; css: string };

  @Column({ type: 'json', default: { html: '', css: '' } })
  @ApiProperty({
    description: 'Políticas de privacidad en formato JSON con HTML y CSS',
    type: Object,
    example: { html: '<p>Políticas de privacidad...</p>', css: '' },
  })
  privacyPolicies: { html: string; css: string };

  @Column({ type: 'json', default: { html: '', css: '' } })
  @ApiProperty({
    description: 'Aviso de privacidad en formato JSON con HTML y CSS',
    type: Object,
    example: { html: '<p>Aviso de privacidad...</p>', css: '' },
  })
  privacyNotice: { html: string; css: string };
}
