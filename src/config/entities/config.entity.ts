import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { SharedProp } from '../../common/entities/sharedProp.helper';
import {
  HtmlCssContent,
  exampleHtmlCssContent,
  defaultHtmlCssContent,
} from '../../utils/types';

@Entity()
export class Config extends SharedProp {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'Identificador único de la configuración',
    example: 1,
  })
  id: number;

  @Column({ type: 'json', default: defaultHtmlCssContent })
  @ApiProperty({
    description: 'Normativas generales en formato JSON con HTML y CSS',
    type: Object,
    example: exampleHtmlCssContent,
  })
  generalNormative: HtmlCssContent;

  @Column({ type: 'json', default: defaultHtmlCssContent })
  @ApiProperty({
    description: 'Normativas del staff en formato JSON con HTML y CSS',
    type: Object,
    example: exampleHtmlCssContent,
  })
  staffNormative: HtmlCssContent;

  @Column({ type: 'json', default: defaultHtmlCssContent })
  @ApiProperty({
    description: 'Información del proyecto en formato JSON con HTML y CSS',
    type: Object,
    example: exampleHtmlCssContent,
  })
  projectInfo: HtmlCssContent;

  @Column({ type: 'json', default: defaultHtmlCssContent })
  @ApiProperty({
    description: 'Políticas de privacidad en formato JSON con HTML y CSS',
    type: Object,
    example: exampleHtmlCssContent,
  })
  privacyPolicies: HtmlCssContent;

  @Column({ type: 'json', default: defaultHtmlCssContent })
  @ApiProperty({
    description: 'Aviso de privacidad en formato JSON con HTML y CSS',
    type: Object,
    example: exampleHtmlCssContent,
  })
  privacyNotice: HtmlCssContent;
}
