import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Events } from '../../events/entities/events.entity';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  name: string;

  @OneToMany(() => Events, (events) => events.author)
  events: Events[];
}
