import { IsString, MaxLength, MinLength, IsOptional } from 'class-validator';
import { Role } from 'src/entities/role.entity';

export class UserDTO {
  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsString()
  @MaxLength(14)
  documentNumber: string;

  @IsString()
  @MinLength(6)
  @MaxLength(12)
  password: string;

  @IsOptional()
  role: Role;
}
