import { Column, Entity, OneToMany } from 'typeorm';

import { AbstractEntity } from './abstract.entity';
import { Part } from './parts.entity';

@Entity({ name: 'brand' })
export class Brand extends AbstractEntity {
  @Column({ name: 'description', nullable: false, unique: true })
  description: string;

  @OneToMany(() => Part, (part) => part.brand)
  parts: Part[];
}
