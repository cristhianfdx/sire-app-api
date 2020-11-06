import { Role } from 'src/entities/role.entity';

export interface GetUserResponse {
  name: string;
  lastName: string;
  documentNumber: string;
  role: Role;
}
