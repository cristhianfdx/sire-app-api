import { IsString, IsObject } from 'class-validator';
import { Role } from 'src/entities/role.entity';

export class UserDTO {
  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsString()
  documentNumber: string;

  @IsString()
  password: string;

  @IsObject()
  role: Role;
}
