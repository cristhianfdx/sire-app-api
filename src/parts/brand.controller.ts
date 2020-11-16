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

import { BrandDTO } from 'src/dto/brand.dto';
import { GetBrandResponse } from 'src/response/get-brand.response';
import { BrandService } from './brand.service';

@Controller('brands')
export class BrandsController {
  constructor(private brandService: BrandService) {}

  @Post()
  @UseGuards(new JwtAuthGuard())
  async create(@Body(ValidationPipe) brandDTO: BrandDTO): Promise<void> {
    await this.brandService.create(brandDTO);
  }

  @Get()
  @UseGuards(new JwtAuthGuard())
  async getAll(): Promise<GetBrandResponse[]> {
    return await this.brandService.getAll();
  }

  @Delete('/:id')
  @UseGuards(new JwtAuthGuard())
  async delete(@Param('id') id: number): Promise<void> {
    await this.brandService.delete(id);
  }
}
