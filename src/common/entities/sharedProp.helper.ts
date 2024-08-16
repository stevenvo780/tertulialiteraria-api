// src/common/entities/sharedProp.helper.ts
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class SharedProp {
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
