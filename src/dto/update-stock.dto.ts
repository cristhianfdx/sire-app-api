import { IsOptional } from 'class-validator';

export class UpdateStockDTO {
  @IsOptional()
  quantity?: number;

  @IsOptional()
  dateOut?: Date;

  @IsOptional()
  partId?: number;
}
