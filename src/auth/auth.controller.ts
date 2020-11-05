import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginResponse } from 'src/response/login.response';
import { LoginDTO } from 'src/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body(ValidationPipe) dto: LoginDTO): Promise<LoginResponse> {
    return await this.authService.login(dto);
  }
}
