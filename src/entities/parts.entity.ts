import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AbstractEntity } from './abstract.entity';
import { Branch } from './branch.entity';
import { Stock } from './stock.entity';
import { User } from './user.entity';

@Entity({ name: 'parts' })
export class Part extends AbstractEntity {
  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'description', nullable: false })
  description: string;

  @Column({ name: 'image_url', nullable: true })
  imageUrl?: string;

  @ManyToOne(() => Branch, (branch) => branch.parts)
  @JoinColumn({ name: 'branch_id' })
  branch?: Branch;

  @ManyToOne(() => Stock, (stock) => stock.parts)
  @JoinColumn({ name: 'stock_id' })
  stock?: Stock;

  @ManyToOne(() => User, (user) => user.parts)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
