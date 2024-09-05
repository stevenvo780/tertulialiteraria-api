import { IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { HtmlCssContent, exampleHtmlCssContent } from '../../utils/types';

export class CreateConfigDto {
  @IsObject()
  @ApiProperty({
    description: 'Normativas generales en formato JSON con HTML y CSS',
    example: exampleHtmlCssContent,
  })
  generalNormative: HtmlCssContent;

  @IsObject()
  @ApiProperty({
    description: 'Normativas del staff en formato JSON con HTML y CSS',
    example: exampleHtmlCssContent,
  })
  staffNormative: HtmlCssContent;

  @IsObject()
  @ApiProperty({
    description: 'Información del proyecto en formato JSON con HTML y CSS',
    example: exampleHtmlCssContent,
  })
  projectInfo: HtmlCssContent;

  @IsObject()
  @ApiProperty({
    description: 'Políticas de privacidad en formato JSON con HTML y CSS',
    example: exampleHtmlCssContent,
  })
  privacyPolicies: HtmlCssContent;

  @IsObject()
  @ApiProperty({
    description: 'Aviso de privacidad en formato JSON con HTML y CSS',
    example: exampleHtmlCssContent,
  })
  privacyNotice: HtmlCssContent;
}

export class UpdateConfigDto extends CreateConfigDto {}
