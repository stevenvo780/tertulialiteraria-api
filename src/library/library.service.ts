import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Library, LibraryVisibility } from './entities/library.entity';
import { User, UserRole } from '../user/entities/user.entity';
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
      if (parentNote) {
        newLibraryItem.parent = parentNote;
      }
    }

    return this.libraryRepository.save(newLibraryItem);
  }

  findAll(user?: User) {
    let query = this.libraryRepository
      .createQueryBuilder('library')
      .leftJoinAndSelect('library.children', 'children')
      .where('library.parent IS NULL');

    if (user) {
      if (user.role === UserRole.USER) {
        query = query.andWhere('library.visibility IN (:...visibilities)', {
          visibilities: [LibraryVisibility.GENERAL, LibraryVisibility.USERS],
        });
      } else if (
        user.role === UserRole.ADMIN ||
        user.role === UserRole.SUPER_ADMIN
      ) {
        query = query.andWhere('library.visibility IN (:...visibilities)', {
          visibilities: [
            LibraryVisibility.GENERAL,
            LibraryVisibility.USERS,
            LibraryVisibility.ADMIN,
          ],
        });
      }
    } else {
      query = query.andWhere('library.visibility = :visibility', {
        visibility: LibraryVisibility.GENERAL,
      });
    }

    return query.getMany();
  }

  findOne(id: number, user?: User) {
    return this.libraryRepository
      .findOne({
        where: { id },
        relations: ['children'],
      })
      .then((library) => {
        if (!library) throw new Error('Nota no encontrada');

        if (
          (library.visibility === LibraryVisibility.ADMIN &&
            (!user ||
              (user.role !== UserRole.ADMIN &&
                user.role !== UserRole.SUPER_ADMIN))) ||
          (library.visibility === LibraryVisibility.USERS &&
            (!user || user.role === UserRole.USER))
        ) {
          throw new ForbiddenException('No tienes acceso a esta nota');
        }

        return library;
      });
  }

  async findLatest(limit: number, user?: User): Promise<Library[]> {
    let query = this.libraryRepository
      .createQueryBuilder('library')
      .orderBy('library.createdAt', 'DESC')
      .take(limit);

    if (user) {
      if (user.role === UserRole.USER) {
        query = query.andWhere('library.visibility IN (:...visibilities)', {
          visibilities: [LibraryVisibility.GENERAL, LibraryVisibility.USERS],
        });
      } else if (
        user.role === UserRole.ADMIN ||
        user.role === UserRole.SUPER_ADMIN
      ) {
        query = query.andWhere('library.visibility IN (:...visibilities)', {
          visibilities: [
            LibraryVisibility.GENERAL,
            LibraryVisibility.USERS,
            LibraryVisibility.ADMIN,
          ],
        });
      }
    } else {
      query = query.andWhere('library.visibility = :visibility', {
        visibility: LibraryVisibility.GENERAL,
      });
    }

    return query.getMany();
  }

  async update(id: number, updateLibraryDto: UpdateLibraryDto, user: User) {
    const libraryItem = await this.findOne(id, user);
    if (!libraryItem) throw new Error('Nota no encontrada');

    Object.assign(libraryItem, updateLibraryDto);
    return this.libraryRepository.save(libraryItem);
  }

  remove(id: number) {
    return this.libraryRepository.delete(id);
  }

  async search(query: string, user?: User): Promise<Library[]> {
    let searchQuery = this.libraryRepository.createQueryBuilder('library');

    if (user) {
      if (user.role === UserRole.USER) {
        searchQuery = searchQuery.andWhere(
          'library.visibility IN (:...visibilities)',
          {
            visibilities: [LibraryVisibility.GENERAL, LibraryVisibility.USERS],
          },
        );
      } else if (
        user.role === UserRole.ADMIN ||
        user.role === UserRole.SUPER_ADMIN
      ) {
        searchQuery = searchQuery.andWhere(
          'library.visibility IN (:...visibilities)',
          {
            visibilities: [
              LibraryVisibility.GENERAL,
              LibraryVisibility.USERS,
              LibraryVisibility.ADMIN,
            ],
          },
        );
      }
    } else {
      searchQuery = searchQuery.andWhere('library.visibility = :visibility', {
        visibility: LibraryVisibility.GENERAL,
      });
    }

    searchQuery
      .andWhere('library.title LIKE :query', { query: `%${query}%` })
      .orWhere('library.description LIKE :query', { query: `%${query}%` });

    return searchQuery.getMany();
  }
}
