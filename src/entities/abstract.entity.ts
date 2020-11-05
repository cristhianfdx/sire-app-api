import { BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

export abstract class AbstractEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
