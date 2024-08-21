import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TemplateType } from '../entities/template.entity';

export class CreateTemplateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(TemplateType)
  type: TemplateType;

  @IsString()
  @IsNotEmpty()
  content: string;
}
