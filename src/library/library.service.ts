import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
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

  async create(
    createLibraryDto: CreateLibraryDto,
    user: User,
  ): Promise<Library> {
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

  async findAll(
    user?: User,
    page = 1,
    limit = 10,
  ): Promise<{ data: Library[]; total: number; currentPage: number }> {
    let query = this.libraryRepository
      .createQueryBuilder('library')
      .leftJoinAndSelect('library.children', 'children')
      .where('library.parent IS NULL');

    if (user) {
      if (user.role === UserRole.USER || user.role === UserRole.EDITOR) {
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

    const [data, total] = await query
      .take(limit)
      .skip((page - 1) * limit)
      .getManyAndCount();

    return { data, total, currentPage: page };
  }

  async findOne(id: number, user?: User): Promise<Library> {
    const library = await this.libraryRepository.findOne({
      where: { id },
      relations: ['children', 'author'],
    });
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
  }

  async findLatest(limit: number, user?: User): Promise<Library[]> {
    let query = this.libraryRepository
      .createQueryBuilder('library')
      .orderBy('library.createdAt', 'DESC')
      .take(limit);

    if (user) {
      if (user.role === UserRole.USER || user.role === UserRole.EDITOR) {
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

  async update(
    id: number,
    updateLibraryDto: UpdateLibraryDto,
    user: User,
  ): Promise<Library> {
    const libraryItem = await this.findOne(id, user);
    if (!libraryItem) throw new Error('Nota no encontrada');

    if (user.role === UserRole.EDITOR && libraryItem.author.id !== user.id) {
      throw new ForbiddenException(
        'No puedes editar una nota que no hayas creado',
      );
    }

    Object.assign(libraryItem, updateLibraryDto);
    return await this.libraryRepository.save(libraryItem);
  }

  async remove(id: number, user: User): Promise<DeleteResult> {
    const libraryItem = await this.findOne(id, user);

    if (!libraryItem) throw new Error('Nota no encontrada');

    if (user.role === UserRole.EDITOR && libraryItem.author.id !== user.id) {
      throw new ForbiddenException(
        'No puedes eliminar una nota que no hayas creado',
      );
    }

    return this.libraryRepository.delete(id);
  }

  async search(query: string, user?: User): Promise<Library[]> {
    let searchQuery = this.libraryRepository.createQueryBuilder('library');

    if (user) {
      if (user.role === UserRole.USER || user.role === UserRole.EDITOR) {
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
