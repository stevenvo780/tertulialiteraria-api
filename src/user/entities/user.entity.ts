import { Entity, Column, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { SharedProp } from '../../common/entities/sharedProp.helper';

export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  EDITOR = 'editor',
  USER = 'user',
}

@Entity()
export class User extends SharedProp {
  @PrimaryColumn()
  @ApiProperty({
    description: 'Identificador único del usuario',
    example: 'abc123',
  })
  id: string;

  @Column({ unique: true })
  @ApiProperty({
    description: 'Correo electrónico único del usuario',
    example: 'usuario@ejemplo.com',
  })
  email: string;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'Nombre del usuario, opcional',
    example: 'Juan Pérez',
    nullable: true,
  })
  name: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  @ApiProperty({
    description: 'Rol del usuario en el sistema',
    enum: UserRole,
    example: UserRole.USER,
  })
  role: UserRole;
}
