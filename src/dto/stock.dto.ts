import { IsNumber, IsOptional } from 'class-validator';

export class StockDTO {
  @IsOptional()
  dateOut?: Date;

  @IsNumber()
  partId: number;
}
