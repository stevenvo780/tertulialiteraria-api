import { Entity, Column, PrimaryColumn } from 'typeorm';

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
}
