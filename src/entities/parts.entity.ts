import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'parts' })
export class Parts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'description', nullable: false })
  description: string;

  @Column({ name: 'image_url', nullable: false })
  imageUrl: string;


}
