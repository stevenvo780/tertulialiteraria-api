import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Events } from '../../events/entities/events.entity';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  name: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @OneToMany(() => Events, (events) => events.author)
  events: Events[];
}
