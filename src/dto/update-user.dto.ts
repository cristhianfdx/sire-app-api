import { IsOptional } from 'class-validator';
import { Role } from 'src/entities/role.entity';

export class UpdateUserDTO {
  @IsOptional()
  name?: string;

  @IsOptional()
  lastName?: string;

  @IsOptional()
  documentNumber?: string;

  @IsOptional()
  password?: string;

  @IsOptional()
  role?: Role;
}
