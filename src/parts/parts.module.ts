import { Module } from '@nestjs/common';
import { PartsService } from './parts.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BranchesController } from './branch.controller';
import { PartsController } from './parts.controller';
import { BranchService } from './branch.service';
import { Part } from 'src/entities/parts.entity';
import { Branch } from 'src/entities/branch.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Part, Branch])],
  providers: [PartsService, BranchService],
  controllers: [PartsController, BranchesController],
})
export class PartsModule {}
