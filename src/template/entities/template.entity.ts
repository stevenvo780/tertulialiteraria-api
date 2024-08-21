import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { SharedProp } from '../../common/entities/sharedProp.helper';

export enum TemplateType {
  NOTES = 'Notes',
  EVENTS = 'Events',
  PUBLICATIONS = 'Publications',
  OTHERS = 'Others',
}

@Entity()
export class Template extends SharedProp {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'Identificador único de la plantilla',
    example: 1,
  })
  id: number;

  @Column()
  @ApiProperty({
    description: 'Nombre de la plantilla',
    example: 'Plantilla de notas',
  })
  name: string;

  @Column({
    type: 'enum',
    enum: TemplateType,
  })
  @ApiProperty({
    description: 'Tipo de la plantilla',
    enum: TemplateType,
    example: TemplateType.NOTES,
  })
  type: TemplateType;

  @Column('text')
  @ApiProperty({
    description: 'Contenido de la plantilla en formato de texto largo',
    example: '<p>Este es el contenido de la plantilla...</p>',
  })
  content: string;
}
