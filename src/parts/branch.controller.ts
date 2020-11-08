import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { BranchDTO } from 'src/dto/branch.dto';
import { GetBranchResponse } from 'src/response/get-branch.response';
import { BranchService } from './branch.service';

@Controller('branches')
export class BranchesController {
  constructor(private branchService: BranchService) {}

  @Post()
  @UseGuards(new JwtAuthGuard())
  async create(@Body(ValidationPipe) branchDTO: BranchDTO): Promise<void> {
    await this.branchService.create(branchDTO);
  }

  @Get()
  @UseGuards(new JwtAuthGuard())
  async getAll(): Promise<GetBranchResponse[]> {
    return await this.branchService.getAll();
  }

  @Delete('/:id')
  @UseGuards(new JwtAuthGuard())
  async delete(@Param('id') id: number): Promise<void> {
    await this.branchService.delete(id);
  }
}
