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
export class Events {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('json')
  description: object;

  @Column()
  eventDate: Date;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @ManyToOne(() => User)
  @JoinColumn()
  @Index()
  author: User;
}
