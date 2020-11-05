import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/entities/user.entity';
import { UserDTO } from 'src/dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(userDTO: UserDTO): Promise<void> {
    try {
      await this.userRepository.save(userDTO);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}