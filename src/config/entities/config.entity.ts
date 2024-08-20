import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { SharedProp } from '../../common/entities/sharedProp.helper';

@Entity()
export class Config extends SharedProp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  generalNormative: string;

  @Column('text')
  staffNormative: string;

  @Column('text')
  projectInfo: string;
}
