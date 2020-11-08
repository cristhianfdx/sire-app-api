import { IsString } from 'class-validator';

export class BranchDTO {
  @IsString()
  description: string;
}
