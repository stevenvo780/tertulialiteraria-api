import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { SharedProp } from '../../common/entities/sharedProp.helper';

export enum Repetition {
  NONE = 'none',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  FIFTEEN_DAYS = 'fifteen_days',
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
}

@Entity()
export class Events extends SharedProp {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'Identificador único del evento',
    example: 1,
  })
  id: number;

  @Column()
  @ApiProperty({
    description: 'Título del evento',
    example: 'Tertulia literaria',
  })
  title: string;

  @Column('json')
  @ApiProperty({
    description: 'Descripción del evento en formato JSON',
    type: 'object',
    example: { content: 'Descripción detallada del evento...' },
  })
  description: string;

  @Column()
  @ApiProperty({
    description: 'Fecha de inicio del evento',
    type: 'string',
    format: 'date-time',
    example: '2024-08-21T15:30:00Z',
  })
  startDate: Date;

  @Column()
  @ApiProperty({
    description: 'Fecha de finalización del evento',
    type: 'string',
    format: 'date-time',
    example: '2024-08-21T18:30:00Z',
  })
  endDate: Date;

  @Column({ type: 'enum', enum: Repetition, default: Repetition.NONE })
  @ApiProperty({
    description: 'Cadena que describe la repetición del evento (si aplica)',
    enum: Repetition,
    required: false,
    example: 'weekly',
  })
  repetition: Repetition;

  @ManyToOne(() => User)
  @JoinColumn()
  @Index()
  @ApiProperty({
    description: 'Autor del evento, representado por un usuario',
    type: () => User,
  })
  author: User;
}
