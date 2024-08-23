import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum LikeTarget {
  LIBRARY = 'library',
  PUBLICATION = 'publication',
  EVENT = 'event',
}

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'Identificador único del like/dislike',
    example: 1,
  })
  id: number;

  @Column({ type: 'boolean' })
  @ApiProperty({
    description: 'Valor del like: true para like, false para dislike',
    example: true,
  })
  isLike: boolean;

  @Column({
    type: 'enum',
    enum: LikeTarget,
  })
  @ApiProperty({
    description: 'Tipo de contenido al que se le dio like o dislike',
    enum: LikeTarget,
    example: LikeTarget.LIBRARY,
  })
  targetType: LikeTarget;

  @Column({ nullable: false })
  @ApiProperty({
    description: 'ID del contenido al que se le dio el like o dislike',
    example: 1,
  })
  targetId: number;

  @ManyToOne(() => User)
  @JoinColumn()
  @Index()
  @ApiProperty({
    description: 'Usuario que dio el like o dislike',
    type: () => User,
  })
  user: User;
}
