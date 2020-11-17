import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { classToPlain } from 'class-transformer';
import { Repository } from 'typeorm';
import { Request } from 'express';

import { GetPartResponse } from 'src/response/get-part.response';
import { UpdatePartDTO } from 'src/dto/update-part.dto';
import { Stock } from 'src/entities/stock.entity';
import { Part } from 'src/entities/parts.entity';
import { User } from 'src/entities/user.entity';
import { PartDTO } from 'src/dto/part.dto';
import { StockDTO } from 'src/dto/stock.dto';

@Injectable()
export class PartsService {
  constructor(
    @InjectRepository(Part) private partRepository: Repository<Part>,
    @InjectRepository(Stock) private stockRepository: Repository<Stock>,
  ) {}

  async create(request: Request, partDTO: PartDTO): Promise<void> {
    try {
      partDTO.user = request.user as User;
      const newPart: Part = this.partRepository.create(partDTO);
      const part = await newPart.save();

      const stockDTO: StockDTO = { partId: part.id };
      const newStock: Stock = this.stockRepository.create(stockDTO);
      newStock.quantity = 0;

      const stock = await newStock.save();
      await this.update(part.id, { stock: { id: stock.id } } as UpdatePartDTO);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAll(): Promise<GetPartResponse[]> {
    try {
      const parts: Part[] = await this.partRepository
        .createQueryBuilder('part')
        .leftJoinAndSelect('part.brand', 'brand')
        .leftJoinAndSelect('part.stock', 'stock')
        .leftJoinAndSelect('part.user', 'user')
        .getMany();

      return <GetPartResponse[]>classToPlain(parts);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getById(id: number): Promise<Part> {
    const part: Part = await this.partRepository
      .createQueryBuilder('part')
      .leftJoinAndSelect('part.brand', 'brand')
      .leftJoinAndSelect('part.stock', 'stock')
      .leftJoinAndSelect('part.user', 'user')
      .where('part.id = :id', { id })
      .getOne();

    if (!part) {
      throw new NotFoundException('Part Not Found.');
    }

    return part;
  }

  async getOne(id: number): Promise<GetPartResponse> {
    const part: Part = await this.getById(id);
    return <GetPartResponse>classToPlain(part);
  }

  async delete(id: number): Promise<void> {
    const part: Part = await this.getById(id);
    if (part.stock.quantity > 0) {
      throw new BadRequestException('Containing items in stock');
    }
    await this.partRepository.remove(part);
  }

  async update(id: number, updatePartDTO: UpdatePartDTO): Promise<void> {
    await this.getById(id);

    try {
      await this.partRepository.save({ ...updatePartDTO, id: Number(id) });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
