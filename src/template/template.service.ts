import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Template, TemplateType } from './entities/template.entity';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';

@Injectable()
export class TemplateService {
  constructor(
    @InjectRepository(Template)
    private templateRepository: Repository<Template>,
  ) {}

  create(createTemplateDto: CreateTemplateDto): Promise<Template> {
    const newTemplate = this.templateRepository.create(createTemplateDto);
    return this.templateRepository.save(newTemplate);
  }

  findAll(): Promise<Template[]> {
    return this.templateRepository.find();
  }

  findByType(type: string): Promise<Template[]> {
    return this.templateRepository.find({
      where: { type: type as TemplateType },
    });
  }

  findOne(id: number): Promise<Template | null> {
    return this.templateRepository.findOne({
      where: { id },
    });
  }

  async update(
    id: number,
    updateTemplateDto: UpdateTemplateDto,
  ): Promise<Template> {
    const template = await this.templateRepository.findOne({
      where: { id },
    });
    Object.assign(template, updateTemplateDto);
    return this.templateRepository.save(template);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.templateRepository.delete(id);
  }
}
