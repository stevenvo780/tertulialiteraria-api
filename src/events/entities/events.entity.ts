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

@Entity()
export class Events {
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
  description: object;

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

  @Column({ nullable: true })
  @ApiProperty({
    description: 'Cadena que describe la repetición del evento (si aplica)',
    type: String,
    required: false,
    example: 'weekly',
  })
  repetition?: string;

  @ManyToOne(() => User)
  @JoinColumn()
  @Index()
  @ApiProperty({
    description: 'Autor del evento, representado por un usuario',
    type: () => User,
  })
  author: User;
}
