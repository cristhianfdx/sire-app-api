import { Column, Entity, OneToMany } from 'typeorm';

import { AbstractEntity } from './abstract.entity';
import { User } from './user.entity';

@Entity({ name: 'role' })
export class Role extends AbstractEntity {
  @Column({ name: 'name', nullable: false })
  name: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
