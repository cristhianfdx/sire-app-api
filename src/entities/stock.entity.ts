import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'stock' })
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'quantity', nullable: false })
  quantity: string;

  @CreateDateColumn({ name: 'date_in' })
  dateIn: Date;

  @Column({ name: 'date_out' })
  dateOut: Date;
}
