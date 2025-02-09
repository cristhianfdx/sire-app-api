import {
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { classToPlain } from 'class-transformer';
import { Request } from 'express';

import { User } from 'src/entities/user.entity';
import { Role } from 'src/entities/role.entity';
import { UserDTO } from 'src/dto/user.dto';
import { UpdateUserDTO } from 'src/dto/update-user.dto';
import { GetUserResponse } from 'src/response/get-user.response';
import { GetRoleResponse } from 'src/response/get-role.response';

const DUPLICATE_KEY_ERROR = 'duplicate key value';

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
      if (error.message.includes(DUPLICATE_KEY_ERROR)) {
        throw new BadRequestException();
      }
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
    const user: User = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .where('user.id = :id', { id })
      .getOne();

    if (!user) {
      throw new NotFoundException('User Not Found.');
    }

    return user;
  }

  async getOne(id: number): Promise<GetUserResponse> {
    const user: User = await this.getById(id);
    return <GetUserResponse>classToPlain(user);
  }

  async delete(request: Request, id: number): Promise<void> {
    const user: User = await this.getById(id);
    const loggedUser = request.user as User;
    if (loggedUser.id === user.id) {
      throw new BadRequestException();
    }
    await this.userRepository.remove(user);
  }

  async update(id: number, dto: UpdateUserDTO): Promise<void> {
    const user: User = await this.getById(id);

    try {
      if (dto.password) {
        dto.password = await user.hashPassword(dto.password);
      }
      await this.userRepository.save({ ...dto, id: Number(id) });
    } catch (error) {
      if (error.message.includes(DUPLICATE_KEY_ERROR)) {
        throw new BadRequestException();
      }
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
