import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
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

  async create(
    createPublicationDto: CreatePublicationDto,
    user: User,
  ): Promise<Publication> {
    const newPublication = new Publication();
    Object.assign(newPublication, createPublicationDto);
    newPublication.author = user;
    return this.publicationRepository.save(newPublication);
  }

  findAll(limit: number, offset: number): Promise<Publication[]> {
    return this.publicationRepository.find({
      order: { createdAt: 'ASC' },
      relations: ['author'],
      skip: offset,
      take: limit,
    });
  }

  findOne(id: number): Promise<Publication | null> {
    return this.publicationRepository.findOne({
      where: { id },
    });
  }

  async update(
    id: number,
    updatePublicationDto: UpdatePublicationDto,
  ): Promise<Publication> {
    const publication = await this.publicationRepository.findOne({
      where: { id },
    });
    Object.assign(publication, updatePublicationDto);
    return this.publicationRepository.save(publication);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.publicationRepository.delete(id);
  }
}
