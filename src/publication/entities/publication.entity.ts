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
import { SharedProp } from '../../common/entities/sharedProp.helper';

@Entity()
export class Publication extends SharedProp {
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

  @Column({ type: 'json', default: { html: '', css: '' } })
  @ApiProperty({
    description: 'Contenido de la publicación en formato JSON con HTML y CSS',
    type: 'object',
    example: {
      html: '<h1>Publicación sobre filosofía moderna</h1>',
      css: 'h1 { color: blue; }',
    },
  })
  content: { html: string; css: string };

  @ManyToOne(() => User)
  @JoinColumn()
  @Index()
  @ApiProperty({
    description: 'Autor de la publicación, representado por un usuario',
    type: () => User,
  })
  author: User;
}
