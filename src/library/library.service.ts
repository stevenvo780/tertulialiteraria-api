import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Library } from './entities/library.entity';
import { User } from '../user/entities/user.entity';
import { CreateLibraryDto } from './dto/create-library.dto';
import { UpdateLibraryDto } from './dto/update-library.dto';

@Injectable()
export class LibraryService {
  constructor(
    @InjectRepository(Library)
    private libraryRepository: Repository<Library>,
  ) {}

  async create(createLibraryDto: CreateLibraryDto, user: User) {
    const newLibraryItem = new Library();
    Object.assign(newLibraryItem, createLibraryDto);
    newLibraryItem.author = user;

    if (createLibraryDto.parentNoteId) {
      const parentNote = await this.libraryRepository.findOne({
        where: { id: createLibraryDto.parentNoteId, author: { id: user.id } },
      });
      newLibraryItem.parent = parentNote;
    }

    return this.libraryRepository.save(newLibraryItem);
  }

  findAll(user: User) {
    return this.libraryRepository.find({
      where: { author: { id: user.id }, parent: null },
      relations: ['children'],
    });
  }

  findOne(id: number, user: User) {
    return this.libraryRepository.findOne({
      where: { id, author: { id: user.id } },
      relations: ['children'],
    });
  }

  async update(id: number, updateLibraryDto: UpdateLibraryDto) {
    const libraryItem = await this.libraryRepository.findOne({ where: { id } });
    Object.assign(libraryItem, updateLibraryDto);
    return this.libraryRepository.save(libraryItem);
  }

  remove(id: number) {
    return this.libraryRepository.delete(id);
  }
}
