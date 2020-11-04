import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';

import { UsersService } from './users.service';
import { UserDTO } from 'src/dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body(ValidationPipe) dto: UserDTO): Promise<void> {
    await this.usersService.create(dto);
  }
}
