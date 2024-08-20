import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Template, TemplateType } from './entities/template.entity';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';

@Injectable()
export class TemplateService {
  constructor(
    @InjectRepository(Template)
    private templateRepository: Repository<Template>,
  ) {}

  create(createTemplateDto: CreateTemplateDto) {
    const newTemplate = this.templateRepository.create(createTemplateDto);
    return this.templateRepository.save(newTemplate);
  }

  findAll() {
    return this.templateRepository.find();
  }

  findByType(type: string) {
    return this.templateRepository.find({
      where: { type: type as TemplateType },
    });
  }

  findOne(id: number) {
    return this.templateRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateTemplateDto: UpdateTemplateDto) {
    const template = await this.templateRepository.findOne({
      where: { id },
    });
    Object.assign(template, updateTemplateDto);
    return this.templateRepository.save(template);
  }

  remove(id: number) {
    return this.templateRepository.delete(id);
  }
}
