import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { SharedProp } from '../../common/entities/sharedProp.helper';

@Entity()
export class Config extends SharedProp {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'Identificador único de la configuración',
    example: 1,
  })
  id: number;

  @Column('text')
  @ApiProperty({
    description: 'Normativas generales en formato HTML',
    type: String,
    example: '<p>Normativas generales...</p>',
  })
  generalNormative: string;

  @Column('text')
  @ApiProperty({
    description: 'Normativas del staff en formato HTML',
    type: String,
    example: '<p>Normativas del staff...</p>',
  })
  staffNormative: string;

  @Column('text')
  @ApiProperty({
    description: 'Información del proyecto en formato HTML',
    type: String,
    example: '<p>Información del proyecto...</p>',
  })
  projectInfo: string;
}
