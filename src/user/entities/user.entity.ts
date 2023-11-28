import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Events } from '../../events/entities/events.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @OneToMany(() => Events, (events) => events.author)
  events: Events[];
}
