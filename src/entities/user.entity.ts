import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';

import { Role } from './role.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'last_name', nullable: false })
  lastName: string;

  @Column({ name: 'document_number', nullable: false, unique: true })
  documentNumber: string;

  @Column({ name: 'password', nullable: false })
  @Exclude()
  password: string;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @BeforeInsert()
  async setNewPassword() {
    this.password = await this.hashPassword(this.password);
  }

  async hashPassword(plainText: string): Promise<string> {
    return await bcrypt.hash(plainText, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }
}
