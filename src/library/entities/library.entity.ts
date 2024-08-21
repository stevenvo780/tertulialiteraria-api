import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { SharedProp } from '../../common/entities/sharedProp.helper';
import { User } from '../../user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum LibraryVisibility {
  GENERAL = 'general',
  USERS = 'users',
  ADMIN = 'admin',
}

@Entity()
export class Library extends SharedProp {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'Identificador único de la biblioteca',
    example: 1,
  })
  id: number;

  @Column()
  @ApiProperty({
    description: 'Título de la biblioteca',
    example: 'Biblioteca de Tertulias Literarias',
  })
  title: string;

  @Column('text')
  @ApiProperty({
    description: 'Descripción de la biblioteca',
    example: 'Una colección de recursos literarios y artículos académicos...',
  })
  description: string;

  @Column()
  @ApiProperty({
    description: 'Fecha de referencia asociada a la biblioteca',
    type: 'string',
    format: 'date',
    example: '2024-08-21',
  })
  referenceDate: Date;

  @Column({
    type: 'enum',
    enum: LibraryVisibility,
    default: LibraryVisibility.GENERAL,
  })
  @ApiProperty({
    description: 'Visibilidad de la biblioteca',
    enum: LibraryVisibility,
    example: LibraryVisibility.GENERAL,
  })
  visibility: LibraryVisibility;

  @ManyToOne(() => User)
  @JoinColumn()
  @Index()
  @ApiProperty({
    description: 'Autor de la biblioteca, representado por un usuario',
    type: () => User,
  })
  author: User;

  @ManyToOne(() => Library, (library) => library.children)
  @JoinColumn()
  @ApiProperty({
    description: 'Biblioteca padre de la cual esta biblioteca es hija',
    type: () => Library,
    nullable: true,
  })
  parent: Library;

  @OneToMany(() => Library, (library) => library.parent)
  @ApiProperty({
    description: 'Lista de bibliotecas hijas asociadas a esta biblioteca',
    type: [Library],
  })
  children: Library[];
}
