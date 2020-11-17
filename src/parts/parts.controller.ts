import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
  Req,
  Get,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { Request } from 'express';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { PartsService } from './parts.service';
import { PartDTO } from 'src/dto/part.dto';
import { GetPartResponse } from 'src/response/get-part.response';
import { UpdatePartDTO } from 'src/dto/update-part.dto';
import { Auth } from 'src/auth/auth.decorator';

@Controller('parts')
export class PartsController {
  constructor(private partsService: PartsService) {}

  @Post()
  @UseGuards(new JwtAuthGuard())
  async create(
    @Req() request: Request,
    @Body(ValidationPipe) partDTO: PartDTO,
  ): Promise<void> {
    await this.partsService.create(request, partDTO);
  }

  @Get()
  //@UseGuards(new JwtAuthGuard())
  async getAll(): Promise<GetPartResponse[]> {
    return await this.partsService.getAll();
  }

  @Get('/:id')
  //@UseGuards(new JwtAuthGuard())
  async getOne(@Param('id') id: number): Promise<GetPartResponse> {
    return await this.partsService.getOne(id);
  }

  @Delete('/:id')
  //@UseGuards(new JwtAuthGuard())
  async delete(@Param('id') id: number): Promise<void> {
    await this.partsService.delete(id);
  }

  @Patch('/:id')
  //@UseGuards(new JwtAuthGuard())
  async update(
    @Param('id') id: number,
    @Body(ValidationPipe) request: UpdatePartDTO,
  ) {
    await this.partsService.update(id, request);
  }
}
