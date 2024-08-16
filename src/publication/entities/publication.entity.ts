import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Publication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('json')
  content: {
    html: string;
    css: string;
  };

  @Column()
  publicationDate: Date;

  @ManyToOne(() => User)
  @JoinColumn()
  @Index()
  author: User;
}
