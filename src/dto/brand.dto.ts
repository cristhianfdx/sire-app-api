import { IsString } from 'class-validator';

export class BrandDTO {
  @IsString()
  description: string;
}
