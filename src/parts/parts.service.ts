import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { classToPlain } from 'class-transformer';

import { Part } from 'src/entities/parts.entity';
import { Branch } from 'src/entities/branch.entity';
import { PartDTO } from 'src/dto/part.dto';
import { BranchDTO } from 'src/dto/branch.dto';
import { User } from 'src/entities/user.entity';
import { GetPartResponse } from 'src/response/get-part.response';
import { GetBranchResponse } from 'src/response/get-branch.response';
import { UpdatePartDTO } from 'src/dto/update-part.dto';

@Injectable()
export class PartsService {
  constructor(
    @InjectRepository(Part) private partRepository: Repository<Part>,
    @InjectRepository(Branch) private branchRepository: Repository<Branch>,
  ) {}

  async create(request: Request, partDTO: PartDTO): Promise<void> {
    try {
      partDTO.user = request.user as User;
      const part: Part = this.partRepository.create(partDTO);
      await part.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAll(): Promise<GetPartResponse[]> {
    try {
      const parts: Part[] = await this.partRepository
        .createQueryBuilder('part')
        .leftJoinAndSelect('part.branch', 'branch')
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
      .leftJoinAndSelect('part.branch', 'branch')
      .leftJoinAndSelect('part.stock', 'stock')
      .leftJoinAndSelect('part.user', 'user')
      .where('part.id = :id', { id })
      .getOne();

    if (!part) {
      throw new NotFoundException();
    }

    return part;
  }

  async getOne(id: number): Promise<GetPartResponse> {
    const part: Part = await this.getById(id);
    return <GetPartResponse>classToPlain(part);
  }

  async delete(id: number): Promise<void> {
    const part: Part = await this.getById(id);
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

  async createBranch(branchDTO: BranchDTO): Promise<void> {
    try {
      const branch: Branch = this.branchRepository.create(branchDTO);
      await branch.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getAllBranches(): Promise<GetBranchResponse[]> {
    try {
      const branches: Branch[] = await this.branchRepository.find();
      return <GetBranchResponse[]>classToPlain(branches);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getBranchById(id: number): Promise<Branch> {
    const branch: Branch = await this.branchRepository.findOne({ id });
    if (!branch) {
      throw new NotFoundException();
    }

    return branch;
  }

  async deleteBranch(id: number): Promise<void> {
    const branch: Branch = await this.getBranchById(id);
    await this.branchRepository.remove(branch);
  }
}
