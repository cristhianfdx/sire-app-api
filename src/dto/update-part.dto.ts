import { IsOptional } from 'class-validator';

import { Branch } from 'src/entities/branch.entity';
import { Stock } from 'src/entities/stock.entity';

export class UpdatePartDTO {
  @IsOptional()
  name: string;

  @IsOptional()
  description: string;

  @IsOptional()
  imageUrl: string;

  @IsOptional()
  branch: Branch;

  @IsOptional()
  stock: Stock;
}
