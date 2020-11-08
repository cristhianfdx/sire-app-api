import { Column, Entity, OneToMany } from 'typeorm';

import { AbstractEntity } from './abstract.entity';
import { Part } from './parts.entity';

@Entity({ name: 'branch' })
export class Branch extends AbstractEntity {
  @Column({ name: 'description', nullable: false, unique: true })
  description: string;

  @OneToMany(() => Part, (part) => part.branch)
  parts: Part[];
}
