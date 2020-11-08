import { IsNumber, IsOptional } from 'class-validator';

export class StockDTO {
  @IsNumber()
  quantity: number;

  @IsOptional()
  dateOut?: Date;

  @IsNumber()
  partId: number;
}
