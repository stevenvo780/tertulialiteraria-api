import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Library {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  referenceDate: Date;

  @ManyToOne(() => User)
  @JoinColumn()
  @Index()
  author: User;

  @ManyToOne(() => Library, (library) => library.children)
  @JoinColumn()
  parent: Library;

  @OneToMany(() => Library, (library) => library.parent)
  children: Library[];
}
