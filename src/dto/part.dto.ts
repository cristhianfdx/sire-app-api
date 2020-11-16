import { IsOptional, IsString } from 'class-validator';

import { Brand } from 'src/entities/brand.entity';
import { Stock } from 'src/entities/stock.entity';
import { User } from 'src/entities/user.entity';

export class PartDTO {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  imageUrl: string;

  @IsOptional()
  brand: Brand;

  @IsOptional()
  stock: Stock;

  @IsOptional()
  user?: User;
}
