import { IsObject, IsOptional, IsString } from 'class-validator';

import { Branch } from 'src/entities/branch.entity';
import { Stock } from 'src/entities/stock.entity';
import { User } from 'src/entities/user.entity';

export class PartDTO {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  imageUrl: string;

  @IsObject()
  branch: Branch;

  @IsOptional()
  stock: Stock;

  @IsOptional()
  user?: User;
}
