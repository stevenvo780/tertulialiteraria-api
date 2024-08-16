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
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({ nullable: true })
  repetition?: string;

  @ManyToOne(() => User)
  @JoinColumn()
  @Index()
  author: User;
}
