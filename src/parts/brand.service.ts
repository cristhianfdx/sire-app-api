import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Brand } from 'src/entities/brand.entity';
import { BrandDTO } from 'src/dto/brand.dto';
import { GetBrandResponse } from 'src/response/get-brand.response';
import { classToPlain } from 'class-transformer';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand) private brandRepository: Repository<Brand>,
  ) {}

  async create(brandDTO: BrandDTO): Promise<void> {
    try {
      const brand: Brand = this.brandRepository.create(brandDTO);
      await brand.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getAll(): Promise<GetBrandResponse[]> {
    try {
      const brands: Brand[] = await this.brandRepository.find();
      return <GetBrandResponse[]>classToPlain(brands);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getById(id: number): Promise<Brand> {
    const brand: Brand = await this.brandRepository.findOne({ id });
    if (!brand) {
      throw new NotFoundException('Brand Not Found.');
    }

    return brand;
  }

  async delete(id: number): Promise<void> {
    const brand: Brand = await this.getById(id);
    await this.brandRepository.remove(brand);
  }
}
