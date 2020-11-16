import { IsOptional } from 'class-validator';

import { Brand } from 'src/entities/brand.entity';
import { Stock } from 'src/entities/stock.entity';

export class UpdatePartDTO {
  @IsOptional()
  name?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  imageUrl?: string;

  @IsOptional()
  brand?: Brand;

  @IsOptional()
  stock?: Stock;
}
