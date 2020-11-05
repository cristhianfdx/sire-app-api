import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Part } from './parts.entity';

@Entity({ name: 'branch' })
export class Branch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'description', nullable: false })
  description: string;

  @OneToMany(() => Part, (part) => part.branch)
  parts: Part[];
}
