import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

import { User } from 'src/entities/user.entity';
import { LoginResponse } from 'src/response/login.response';
import { LoginDTO } from 'src/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login({ documentNumber, password }: LoginDTO): Promise<LoginResponse> {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.role', 'role')
        .where('user.documentNumber = :documentNumber', { documentNumber })
        .getOne();

      const isValid = await user.comparePassword(password);
      if (!isValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = {
        documentNumber: user.documentNumber,
        name: user.name,
        lastName: user.lastName,
        role: user.role,
      };

      const token = this.jwtService.sign(payload, {
        secret: process.env.SECRET,
      });
      return { token };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
