import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { classToPlain } from 'class-transformer';
import { Repository } from 'typeorm';

import { Stock } from 'src/entities/stock.entity';
import { GetStockResponse } from 'src/response/get-stock.response';
import { StockDTO } from 'src/dto/stock.dto';
import { UpdateStockDTO } from 'src/dto/update-stock.dto';
import { PartsService } from 'src/parts/parts.service';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock) private stockRepository: Repository<Stock>,
    private partsService: PartsService,
  ) {}

  async create(stockDTO: StockDTO): Promise<GetStockResponse> {
    try {
      const newStock: Stock = this.stockRepository.create(stockDTO);
      newStock.quantity = 1;
      const stock: Stock = await newStock.save();
      await this.partsService.update(stockDTO.partId, {
        stock,
      });
      return <GetStockResponse>classToPlain(stock);
    } catch (error) {
      throw error;
    }
  }

  async getAll(): Promise<GetStockResponse[]> {
    try {
      const stock: Stock[] = await this.stockRepository
        .createQueryBuilder('stock')
        .leftJoinAndSelect('stock.parts', 'parts')
        .getMany();

      return <GetStockResponse[]>classToPlain(stock);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getById(id: number): Promise<Stock> {
    const stock: Stock = await this.stockRepository
      .createQueryBuilder('stock')
      .leftJoinAndSelect('stock.parts', 'parts')
      .where('stock.id = :id', { id })
      .getOne();

    if (!stock) {
      throw new NotFoundException();
    }

    return stock;
  }

  async getOne(id: number): Promise<GetStockResponse> {
    const stock: Stock = await this.getById(id);
    return <GetStockResponse>classToPlain(stock);
  }

  async delete(id: number): Promise<void> {
    const stock: Stock = await this.getById(id);
    await this.stockRepository.remove(stock);
  }

  async update(
    id: number,
    updateStockDTO: UpdateStockDTO,
  ): Promise<GetStockResponse> {
    await this.getById(id);
    updateStockDTO.quantity =
      updateStockDTO.quantity > 0 ? updateStockDTO.quantity : 0;

    try {
      const stock: Stock = await this.stockRepository.save({
        ...updateStockDTO,
        id: Number(id),
      });

      const { partId } = updateStockDTO;
      if (partId) {
        await this.partsService.update(partId, {
          stock,
        });
      }
      return <GetStockResponse>classToPlain(stock);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
