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

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { StockDTO } from 'src/dto/stock.dto';
import { UpdateStockDTO } from 'src/dto/update-stock.dto';
import { GetStockResponse } from 'src/response/get-stock.response';
import { StockService } from './stock.service';

@Controller('stock')
export class StockController {
  constructor(private stockService: StockService) {}

  @Post()
  @UseGuards(new JwtAuthGuard())
  async create(@Body(ValidationPipe) dto: StockDTO): Promise<void> {
    await this.stockService.create(dto);
  }

  @Get()
  @UseGuards(new JwtAuthGuard())
  async getAll(): Promise<GetStockResponse[]> {
    return await this.stockService.getAll();
  }

  @Get('/:id')
  @UseGuards(new JwtAuthGuard())
  async getOne(@Param('id') id: number): Promise<GetStockResponse> {
    return await this.stockService.getOne(id);
  }

  @Delete('/:id')
  @UseGuards(new JwtAuthGuard())
  async delete(@Param('id') id: number): Promise<void> {
    await this.stockService.delete(id);
  }

  @Patch('/:id')
  @UseGuards(new JwtAuthGuard())
  async update(
    @Param('id') id: number,
    @Body(ValidationPipe) request: UpdateStockDTO,
  ) {
    await this.stockService.update(id, request);
  }
}
