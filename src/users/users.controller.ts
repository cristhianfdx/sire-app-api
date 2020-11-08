import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { UserDTO } from 'src/dto/user.dto';
import { GetUserResponse } from 'src/response/get-user.response';
import { GetRoleResponse } from 'src/response/get-role.response';
import { UpdateUserDTO } from 'src/dto/update-user.dto';
import { Auth } from 'src/auth/auth.decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @Auth('admin')
  async create(@Body(ValidationPipe) dto: UserDTO): Promise<void> {
    await this.usersService.create(dto);
  }

  @Get()
  @Auth('admin')
  async getAll(): Promise<GetUserResponse[]> {
    return await this.usersService.getAll();
  }

  @Get('/:id')
  @Auth('admin')
  async getOne(@Param('id') id: number): Promise<GetUserResponse> {
    return await this.usersService.getOne(id);
  }

  @Delete('/:id')
  @Auth('admin')
  async delete(@Param('id') id: number): Promise<void> {
    await this.usersService.delete(id);
  }

  @Patch('/:id')
  @Auth('admin')
  async update(
    @Param('id') id: number,
    @Body(ValidationPipe) dto: UpdateUserDTO,
  ) {
    await this.usersService.update(id, dto);
  }

  @Get('roles/all')
  @Auth('admin')
  async getRoles(): Promise<GetRoleResponse[]> {
    return await this.usersService.getRoles();
  }
}
