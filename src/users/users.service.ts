import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { classToPlain } from 'class-transformer';

import { User } from 'src/entities/user.entity';
import { Role } from 'src/entities/role.entity';
import { UserDTO } from 'src/dto/user.dto';
import { GetUserResponse } from 'src/response/get-user.response';
import { GetRoleResponse } from 'src/response/get-role.response';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  async create(userDTO: UserDTO): Promise<void> {
    try {
      const user: User = this.userRepository.create(userDTO);
      await user.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAll(): Promise<GetUserResponse[]> {
    try {
      const users: User[] = await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.role', 'role')
        .getMany();

      return <GetUserResponse[]>classToPlain(users);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getRoles(): Promise<GetRoleResponse[]> {
    try {
      const roles: Role[] = await this.roleRepository.find();
      return <GetRoleResponse[]>classToPlain(roles);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
