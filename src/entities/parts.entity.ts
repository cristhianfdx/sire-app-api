import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AbstractEntity } from './abstract.entity';
import { Brand } from './brand.entity';
import { Stock } from './stock.entity';
import { User } from './user.entity';

@Entity({ name: 'parts' })
export class Part extends AbstractEntity {
  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  @Column({ name: 'image_url', nullable: true })
  imageUrl?: string;

  @ManyToOne(() => Brand, (brand) => brand.parts)
  @JoinColumn({ name: 'brand_id' })
  brand?: Brand;

  @ManyToOne(() => Stock, (stock) => stock.parts)
  @JoinColumn({ name: 'stock_id' })
  stock?: Stock;

  @ManyToOne(() => User, (user) => user.parts)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
