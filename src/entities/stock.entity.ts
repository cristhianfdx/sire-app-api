import { Column, CreateDateColumn, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { Part } from './parts.entity';

@Entity({ name: 'stock' })
export class Stock extends AbstractEntity {
  @Column({ name: 'quantity', nullable: false })
  quantity: string;

  @CreateDateColumn({ name: 'date_in' })
  dateIn: Date;

  @Column({ name: 'date_out' })
  dateOut: Date;

  @OneToMany(() => Part, (part) => part.stock)
  parts: Part[];
}
