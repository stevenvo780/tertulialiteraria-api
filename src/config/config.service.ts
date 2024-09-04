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
    defaultConfig.generalNormative = '<p>Normativa general predeterminada.</p>';
    defaultConfig.staffNormative = '<p>Normativa del staff predeterminada.</p>';
    defaultConfig.projectInfo =
      '<p>Información del proyecto predeterminada.</p>';
    defaultConfig.privacyPolicies =
      '<p>Políticas de privacidad predeterminadas.</p>';
    defaultConfig.privacyNotice = '<p>Aviso de privacidad predeterminado.</p>';

    return this.configRepository.save(defaultConfig);
  }

  async update(updateConfigDto: UpdateConfigDto): Promise<Config> {
    const config = await this.getConfig();
    Object.assign(config, updateConfigDto);
    return this.configRepository.save(config);
  }

  async getGeneralNormative(): Promise<string> {
    const config = await this.getConfig();
    return config.generalNormative;
  }

  async getStaffNormative(): Promise<string> {
    const config = await this.getConfig();
    return config.staffNormative;
  }

  async getProjectInfo(): Promise<string> {
    const config = await this.getConfig();
    return config.projectInfo;
  }

  async getPrivacyPolicies(): Promise<string> {
    const config = await this.getConfig();
    return config.privacyPolicies;
  }

  async getPrivacyNotice(): Promise<string> {
    const config = await this.getConfig();
    return config.privacyNotice;
  }
}
