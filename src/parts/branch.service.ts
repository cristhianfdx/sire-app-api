import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Branch } from 'src/entities/branch.entity';
import { BranchDTO } from 'src/dto/branch.dto';
import { GetBranchResponse } from 'src/response/get-branch.response';
import { classToPlain } from 'class-transformer';

@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(Branch) private branchRepository: Repository<Branch>,
  ) {}

  async create(branchDTO: BranchDTO): Promise<void> {
    try {
      const branch: Branch = this.branchRepository.create(branchDTO);
      await branch.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getAll(): Promise<GetBranchResponse[]> {
    try {
      const branches: Branch[] = await this.branchRepository.find();
      return <GetBranchResponse[]>classToPlain(branches);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getById(id: number): Promise<Branch> {
    const branch: Branch = await this.branchRepository.findOne({ id });
    if (!branch) {
      throw new NotFoundException('Branch Not Found.');
    }

    return branch;
  }

  async delete(id: number): Promise<void> {
    const branch: Branch = await this.getById(id);
    await this.branchRepository.remove(branch);
  }
}
