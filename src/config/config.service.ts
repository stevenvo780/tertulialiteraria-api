import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Config } from './entities/config.entity';
import { CreateConfigDto } from './dto/create-config.dto';
import { UpdateConfigDto } from './dto/update-config.dto';

@Injectable()
export class ConfigService {
  constructor(
    @InjectRepository(Config)
    private configRepository: Repository<Config>,
  ) {}

  async create(createConfigDto: CreateConfigDto): Promise<Config> {
    const newConfig = new Config();
    Object.assign(newConfig, createConfigDto);
    return this.configRepository.save(newConfig);
  }

  async getConfig(): Promise<Config> {
    const config = await this.configRepository
      .createQueryBuilder('config')
      .orderBy('config.createdAt', 'DESC')
      .getOne();

    if (!config) {
      return this.createDefaultConfig();
    }

    return config;
  }

  async createDefaultConfig(): Promise<Config> {
    const defaultConfig = new Config();
    defaultConfig.generalNormative = {
      html: '<p>Normativa general predeterminada.</p>',
      css: '',
    };
    defaultConfig.staffNormative = {
      html: '<p>Normativa del staff predeterminada.</p>',
      css: '',
    };
    defaultConfig.projectInfo = {
      html: '<p>Información del proyecto predeterminada.</p>',
      css: '',
    };
    defaultConfig.privacyPolicies = {
      html: '<p>Políticas de privacidad predeterminadas.</p>',
      css: '',
    };
    defaultConfig.privacyNotice = {
      html: '<p>Aviso de privacidad predeterminado.</p>',
      css: '',
    };

    return this.configRepository.save(defaultConfig);
  }

  async update(updateConfigDto: UpdateConfigDto): Promise<Config> {
    const config = await this.getConfig();
    Object.assign(config, updateConfigDto);
    return this.configRepository.save(config);
  }

  async getGeneralNormative(): Promise<string> {
    const config = await this.getConfig();
    return config.generalNormative.html;
  }

  async getStaffNormative(): Promise<string> {
    const config = await this.getConfig();
    return config.staffNormative.html;
  }

  async getProjectInfo(): Promise<string> {
    const config = await this.getConfig();
    return config.projectInfo.html;
  }

  async getPrivacyPolicies(): Promise<string> {
    const config = await this.getConfig();
    return config.privacyPolicies.html;
  }

  async getPrivacyNotice(): Promise<string> {
    const config = await this.getConfig();
    return config.privacyNotice.html;
  }
}
