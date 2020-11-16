import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { UserDTO } from 'src/dto/user.dto';
import { GetUserResponse } from 'src/response/get-user.response';
import { GetRoleResponse } from 'src/response/get-role.response';
import { UpdateUserDTO } from 'src/dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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

  @Get('/:id')
  @UseGuards(new JwtAuthGuard())
  async getOne(@Param('id') id: number): Promise<GetUserResponse> {
    return await this.usersService.getOne(id);
  }

  @Delete('/:id')
  @UseGuards(new JwtAuthGuard())
  async delete(@Param('id') id: number): Promise<void> {
    await this.usersService.delete(id);
  }

  @Patch('/:id')
  @UseGuards(new JwtAuthGuard())
  async update(
    @Param('id') id: number,
    @Body(ValidationPipe) dto: UpdateUserDTO,
  ) {
    await this.usersService.update(id, dto);
  }

  @Get('roles/all')
  @UseGuards(new JwtAuthGuard())
  async getRoles(): Promise<GetRoleResponse[]> {
    return await this.usersService.getRoles();
  }
}
