import { IsString } from 'class-validator';

export class LoginDTO {
  @IsString()
  documentNumber: string;

  @IsString()
  password: string;
}
