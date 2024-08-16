import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Publication } from './entities/publication.entity';
import { User } from '../user/entities/user.entity';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';

@Injectable()
export class PublicationService {
  constructor(
    @InjectRepository(Publication)
    private publicationRepository: Repository<Publication>,
  ) {}

  async create(createPublicationDto: CreatePublicationDto, user: User) {
    const newPublication = new Publication();
    Object.assign(newPublication, createPublicationDto);
    newPublication.author = user;
    return this.publicationRepository.save(newPublication);
  }

  findAll() {
    return this.publicationRepository.find();
  }

  findOne(id: number) {
    return this.publicationRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updatePublicationDto: UpdatePublicationDto) {
    const publication = await this.publicationRepository.findOne({
      where: { id },
    });
    Object.assign(publication, updatePublicationDto);
    return this.publicationRepository.save(publication);
  }

  remove(id: number) {
    return this.publicationRepository.delete(id);
  }
}
