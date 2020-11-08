import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { classToPlain } from 'class-transformer';

import { User } from 'src/entities/user.entity';
import { Role } from 'src/entities/role.entity';
import { UserDTO } from 'src/dto/user.dto';
import { UpdateUserDTO } from 'src/dto/update-user.dto';
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
      throw new InternalServerErrorException();
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

  async getById(id: number): Promise<User> {
    const user: User = await this.userRepository.findOne({ id });
    if (!user) {
      throw new NotFoundException('User Not Found.');
    }

    return user;
  }

  async getOne(id: number): Promise<GetUserResponse> {
    const user: User = await this.getById(id);
    return <GetUserResponse>classToPlain(user);
  }

  async delete(id: number): Promise<void> {
    const user: User = await this.getById(id);
    await this.userRepository.remove(user);
  }

  async update(id: number, dto: UpdateUserDTO): Promise<void> {
    const user: User = await this.getById(id);
    let { password } = dto;

    try {
      if (password) {
        password = await user.hashPassword(password);
      }
      await this.userRepository.save({ ...dto, id: Number(id) });
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
