import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'branch' })
export class Branch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'description', nullable: false })
  description: string;
}
