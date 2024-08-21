import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Publication {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'Identificador único de la publicación',
    example: 1,
  })
  id: number;

  @Column()
  @ApiProperty({
    description: 'Título de la publicación',
    example: 'Publicación sobre filosofía moderna',
  })
  title: string;

  @Column('json')
  @ApiProperty({
    description: 'Contenido de la publicación en formato JSON con HTML y CSS',
    type: 'object',
    example: {
      html: '<p>Contenido en HTML...</p>',
      css: 'p { color: black; }',
    },
  })
  content: {
    html: string;
    css: string;
  };

  @Column()
  @ApiProperty({
    description: 'Fecha de la publicación',
    type: 'string',
    format: 'date-time',
    example: '2024-08-21T10:00:00Z',
  })
  publicationDate: Date;

  @ManyToOne(() => User)
  @JoinColumn()
  @Index()
  @ApiProperty({
    description: 'Autor de la publicación, representado por un usuario',
    type: () => User,
  })
  author: User;
}
