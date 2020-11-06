import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { UsersService } from './users.service';
import { UserDTO } from 'src/dto/user.dto';
import { GetUserResponse } from 'src/response/get-user.response';
import { GetRoleResponse } from 'src/response/get-role.response';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @UseGuards(new JwtAuthGuard())
  async create(@Body(ValidationPipe) dto: UserDTO): Promise<void> {
    await this.usersService.create(dto);
  }

  @Get()
  @UseGuards(new JwtAuthGuard())
  async getAll(): Promise<GetUserResponse[]> {
    return await this.usersService.getAll();
  }

  @Get('roles')
  @UseGuards(new JwtAuthGuard())
  async getRoles(): Promise<GetRoleResponse[]> {
    return await this.usersService.getRoles();
  }
}
